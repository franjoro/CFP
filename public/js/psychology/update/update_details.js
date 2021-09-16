$(document).ready(() => {
    //Action submit form
      $("#formparticipantesEdit").on( 'submit' ,async function (e) {
        //No reload page
          e.preventDefault();
          const t = $(this).serialize();
          //print pop up loder
          loader();
          //setFormatDate

          const date=$("#nextDateEdit").val()+' '+$("#nextHourEdit").val();
          if($("#nextDateEdit").val() != '' && $("#nextHourEdit").val() != ''){
            let nextDate=$("#followUpDateEdit").val()+' '+$("#followUpHourEdit").val();
            if($("#followUpDateEdit").val() == '' || $("#followUpHourEdit").val() == ''){
              nextDate = null;
            }
            const idPsychology = $("#idPsychology").val();
            console.log("Fecha");
            console.log(date);
            console.log("Siguiente fecha");
            console.log(nextDate);
            console.log("idPsychology");
            console.log(idPsychology);
            const data = {
              date,
              nextDate,
              idPsychology
            };
            try {
              const res = await $.ajax({
                url: `/admin/psicologia/updatePsychology`,
                type: "PUT",
                data,
              });
              Swal.close();
              console.log(res);
              console.log('data')
              console.log(res.data);
              // if(res){
              //  location.reload();
              // }else{
              //   error(res);
              // }
            } catch (error) {
              swal.close();
              console.log(error);
              errorMessage();
            }
          }else{
            alert("Tienes que ingresar una fecha y una hora inicial"+ $("#nextDateEdit").val()+ $("#nextHourEdit").val()); 
          }
          
        });
  });