$(document).ready(() => {
    //Action submit form
      $("#frmUpdateDetailPsychology").on( 'submit' ,async function (e) {
        //No reload page
          e.preventDefault();
          const t = $(this).serialize();
          //print pop up loder
          loader();
          //we collect data
          const results = $("#txtResultado").val();
          const nextDate=$("#nextDate").val()+' '+$("#nextHour").val();
          const idPsychology = $("#idPsychology").val();
          const observations = $("#txtConsideraciones").val();
          const dataSend = {
            results,
            nextDate,
            idPsychology,
            observations
          };
          try {
            const validDate = $.ajax({
              url: `/admin/psicologia/validDate/update/0000-00-00 00:00/${nextDate}/${idPsychology}`,
            }).done(function(data){
              if(data.dataCount == 0 && data.dataCount1 == 0){
                const res = $.ajax({
                  url: `/admin/psicologia/updatePsychologyDetail`,
                  type: "PUT",
                  data: dataSend,
                });
                Swal.close();
                console.log(res);
                location.reload();
              }else{
                error('Ya tiene asignada otra cita a ese día y a esa hora');
              }
            });
           
          } catch (error) {
            swal.close();
            console.log(error);
            errorMessage();
          }
        });
  });