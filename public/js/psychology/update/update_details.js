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
          //Valid not ''
          if($("#nextDateEdit").val() != '' && $("#nextHourEdit").val() != ''){
            //recolect and edir nextDate model
            let nextDate=$("#followUpDateEdit").val()+' '+$("#followUpHourEdit").val();
              if($("#followUpDateEdit").val() == '' || $("#followUpHourEdit").val() == ''){
                nextDate = null;
            }
            const idPsychology = $("#idPsychology").val();
            //valid not equals date
            const validationDate = $.ajax({
              url: `/admin/psicologia/validDate/update/${date}/${nextDate}/${idPsychology}`,
            }).done(function(data){
              if(data.dataCount == 0 && data.dataCount1 == 0){
                const data = {
                  date,
                  nextDate,
                  idPsychology
                };
                try {
                  const res =  $.ajax({
                    url: `/admin/psicologia/updatePsychology`,
                    type: "PUT",
                    data,
                  });
                  Swal.close();
                  console.log(res);
                  location.reload();
                } catch (error) {
                  swal.close();
                  console.log(error);
                  console.log('data');
                  console.log(res.data);
                  errorMessage();
                  $('#editModal').modal('toggle');
                }
              }else{
                error('Ya tiene asignada otra cita a ese día y a esa hora');
              }  
            });
          }else{
            alert("Tienes que ingresar una fecha y una hora inicial"+ $("#nextDateEdit").val()+ $("#nextHourEdit").val()); 
          }
          
        });
  });