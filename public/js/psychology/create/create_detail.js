$(document).ready(() => {
  //Action submit form
    $("#formparticipantes").on( 'submit' ,async function (e) {
      //No reload page
        e.preventDefault();
        const t = $(this).serialize();
        //print pop up loder
        loader();
        //setFormatDate
        const fullDate = ($("#nextDate").val()+" "+$("#nextHour").val()+":00");
        const data = {
          idStudent: $("#idStudent").val(),
          fullDate
        };
        try {
          const res = await $.ajax({
            url: `/admin/psicologia/addDetails/${$("#idStudent").val()}`,
            type: "POST",
            data,
          });
          Swal.close();
          if(res){
            // Toast.fire({
            //   icon: "success",
            //   title: "Insertado correctamente",
            // });
           location.reload();
            // window.location.replace(`/habil/documentacion/habil/${respuesta.idSolicitud}/documento/${global_json1.dui}`);
          }else{
            error(res);
          }
        } catch (error) {
          swal.close();
          console.log(error);
          errorMessage(error);
        }
      });
});