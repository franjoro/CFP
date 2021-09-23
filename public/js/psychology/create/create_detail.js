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
        if($("#nextDate").val() !='' && $("#nextHour").val()!=''){
          const validationDate = $.ajax({
            url: `/admin/psicologia/validDate/create/${fullDate}/0/0`,
          }).done(function(data){
            if(data.dataCount == 0){
              const data = {
                idStudent: $("#idStudent").val(),
                fullDate
              };
              try {
                const res = $.ajax({
                  url: `/admin/psicologia/addDetails/${$("#idStudent").val()}`,
                  type: "POST",
                  data,
                });
                Swal.close();
                if(res){
                  location.reload();
                }else{
                  swal.close();
                  error(res);
                }
              } catch (error) {
                swal.close();
                console.log(error);
              }
            }else{
              error('Ya tiene asignada otra cita a ese día y a esa hora');
            }  
          });
        }else{
          error('Debe seleccionar una fecha de inicio para la cita');
        }
      });
});