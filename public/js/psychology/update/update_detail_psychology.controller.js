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
          const data = {
            results,
            nextDate,
            idPsychology,
            observations
          };
          try {
            const res = await $.ajax({
              url: `/admin/psicologia/updatePsychologyDetail`,
              type: "PUT",
              data,
            });
            Swal.close();
            console.log(res);
            location.reload();
          } catch (error) {
            swal.close();
            console.log(error);
            errorMessage();
          }
        });
  });