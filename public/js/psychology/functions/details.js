
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
    const fullDate = new Date(date);
    if(fullDate.getHours() >=18 || fullDate.getHours()<=6){
        fullDate.setDate(fullDate.getDate());
    }
    fullDate.setHours(fullDate.getHours() +6);
    const year = fullDate.getFullYear();
    let month = fullDate.getMonth()+1;
    let day = fullDate.getDate();
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
    const fullDate = new Date(date);
    if(fullDate.getHours() >=18 || fullDate.getHours()<=6){
        fullDate.setDate(fullDate.getDate());
    }
    fullDate.setHours(fullDate.getHours() +6);
    let hour = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    if(hour<10){
        hour = '0'+hour;
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    const hourReturn = hour+':'+minutes+':00';
    return hourReturn;
};

const changeTimeZone =(date)=>{
    
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
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i>',
            titleAttr: 'Excel',
            className: 'btn btn-success'
          },
          {
            extend: 'csvHtml5',
            text: '<i class="fas fa-file-csv"></i>',
            titleAttr: 'Excel',
            className: 'btn btn-primary'
          },{
            extend: 'copy',
            text: '<i class="fas fa-copy"></i>',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            },
            className: 'btn btn-info'
          },
          {
            extend: 'print',
            text: '<i class="fas fa-print"></i>',
            autoPrint: true,
            className: 'btn btn-secondary'
          },
          {
            extend: 'pdfHtml5',
            text: '<i class="fas fa-file-pdf"></i>',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            },
            className: 'btn btn-danger'
          },
        ],
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
                const fullDate = new Date(row.date);
                if(fullDate.getHours() >=18 || fullDate.getHours()<=6){
                    fullDate.setDate(fullDate.getDate());
                }
                fullDate.setHours(fullDate.getHours() +6);
                return ('Fecha: '+fullDate.toLocaleDateString() + ' Hora:'+ modelHour(row.date));

            }
        },
        {
            render(date, type, row){
                if(row.next_date != null){
                    const fullDate = new Date(row.next_date);
                    if(fullDate.getHours() >=18 || fullDate.getHours()<=6){
                        fullDate.setDate(fullDate.getDate());
                    }
                    fullDate.setHours(fullDate.getHours() +6);
                    return ('Fecha: '+fullDate.toLocaleDateString() + ' Hora:'+ modelHour(row.next_date));
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
                <a href="/admin/psicologia/previsualizacion_pdf/${row.id_psychology}/${row.id_student}" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                <a class="btn btn-success" href="/admin/psicologia/formulario/${row.id_psychology}/${row.id_student}"><i class="fas fa-info"></i></a>
              `;
              return html;
            },
          },
          { data: "id_psychology", visible: false },
        ],
      });
}
