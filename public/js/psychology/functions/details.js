
function inputDate(id){
    $(id).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });
}
//SECCTION FOR READ SPECIFIC PSYCHOLOGY CASE 

//fcuntion model date 
const modelDate  =(date) =>{
    const year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();
    if(month<10){
        month = '0'+month;
    }
    if(day<10){
        day = '0'+day;
    }
    const dateReturn = (year+'-'+month+'-'+day);
    return dateReturn;
};
const modelHour = (date) =>{
    let hour = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    if(hour<10){
        hour = '0'+hour;
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    const hourReturn = hour+':'+minutes+':00';
    return hourReturn;
};
const readPsychology = async (idPsychology) =>{
    const data = await $.ajax({
        url: `/admin/psicologia/detailPsychology/${idPsychology}`
    });
    $("#nextDateEdit").val(modelDate(data.psychologyCase.date));
    $("#nextHourEdit").val(modelHour(data.psychologyCase.date));
    $("#idPsychology").val(data.psychologyCase.id_psychology);
    if(data.psychologyCase.next_date != null){
        $("#followUpHourEdit").val(modelHour(data.psychologyCase.next_date));
        $("#followUpDateEdit").val(modelDate(data.psychologyCase.next_date));
    }else{
        $("#followUpHourEdit").val(null);        
        $("#followUpDateEdit").val(null);

    }
    
    // console.log(data.psychologyCase.date);

    // $("#nextDateEdit").val(d);
};



//================ USO DE FECHAS =======================
//Funcion de calculo de fecha

  function convertDateFormat(string) {
    var info = string.split('/').reverse().join('/');
    return info;
}
//================ FIN USO DE FECHAS =======================

function detailsTable(){
    const idStudent = $("#idStudent").val();
    $("#detailsTable").DataTable({
        ajax: `/admin/psicologia/detailTable/${idStudent}`,
        destroy: true,
        columns: [
        { 
            render(data, type, row){
                if(row.status == 0){
                    return "Sin realizar";
                }else{
                    return 'Realizada';
                }
             
            } 
        },
        {
            render(data, type, row){
                const fullDate = modelDate(row.date);
                return (fullDate);

            }
        },
        {
            render(data, type, row){
                return (modelHour(row.date));
            }
        },
        {
            render(date, type, row){
                if(row.next_date != null){
                    const hour = modelHour(row.next_date);
                    const fullDate = modelDate(row.next_date);
                    return (fullDate + " a las "+hour);
                }else{  
                    return '-';
                }
                
            }
        },
        {
            render(data, type, row) {
              const html = `
              <button type="button" class="btn btn-danger" onclick='deleteDetail(${row.id_psychology})'><i class="fas fa-trash-alt"></i></button>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" onclick='readPsychology(${row.id_psychology})'><i class="fas fa-pen"></i></button>
                    <a class="btn btn-success" href="/admin/psicologia/formulario/${row.id_psychology}/${row.id_student}"><i class="fas fa-info"></i></a>
              `;
              return html;
            },
          },
          { data: "id_psychology", visible: false },
        ],
      });
}