$(document).ready(() => {
    $("#formparticipantes").on( 'submit' ,async function (e) {
        e.preventDefault();
        const t = $(this).serialize();
        loader();
        const data = {
            idStudent: $("#idStudent").val(),
            date: $("#nextDate").val(),
            hour: $("#nextHour").val()
        };
        try {
          const query = await $.ajax({
            url: `/admin/psicologia/addDetails/${$("#idStudent").val()}`,
            type: "POST",
            data,
          });
          alert(query.idStudent);
        } catch (error) {
          swal.close();
          console.log(error);
          errorMessage();
        }
      });
});