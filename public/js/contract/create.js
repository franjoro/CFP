const create = async ()=>{
    try {
        const nameContract = $("#name").val();
        const date_issue = $("#date_issue").val();
        const start_date = $("#start_date").val();
        const finish_date = $("#finish_date").val();
        const id_course = $("#id_course").val();
        const days = $("#days").val();
        const way_pay = $("#way_pay").val();
        const id_presbyters = $("#id_presbyters").val();
        loader();
        const data = await $.ajax({
          url: "/contratos/add",
          type: "POST",
          data: {
            name: nameContract,
            date_issue: date_issue,
            start_date: start_date,
            finish_date: finish_date,
            id_course: id_course,
            days: days,
            way_pay: way_pay,
            id_presbyters: id_presbyters
          },
        });
        console.log(data);
        if(data.status == 'error'){
            swal.close();
            $('#modalContract').modal('show'); 
            data.errors.map((item)=>{
                $.toast({
                    title: '¡Atención!',
                    subtitle: 'Tener en cuenta',
                    content: `${item}`,
                    type: 'error',
                    delay: 3000,
                    dismissible: true,
                   
                  });  
            })
        }
        if (data.status == 'success') {
          swal.close();
          location.reload();
        }
      } catch (error) {
        swal.close();
        console.log(error);
        errorMessage();
      }
};