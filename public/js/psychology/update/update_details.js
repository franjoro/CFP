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
          const nextDate=$("#followUpDateEdit").val()+' '+$("#followUpHourEdit").val();
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
        });
  });