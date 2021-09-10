
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


const readDetailsStudent = async () =>{
    const idStudent = $("#idStudent").val();
    const data = await $.ajax({ url: `/admin/psicologia/detailsStudent/${idStudent}`});
    try {
        $("#nombredet").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#nombre").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#carnet").text(data.datos.carnet);
        $("#carrera").text(data.datos.carrera);
        $("#edad").text(data.datos.fechaNac);
        $("#genero").text(data.datos.genero);
        $("#nivel_academico").text(data.datos.nivel_academico);
        $("#estado_civil").text(data.datos.estado_civil);
        $("#telefono").text(data.datos.telefono_movil);
        if(data.datos.correo == null){
            $("#correo").text("No hay correo");
        }else{
            $("#correo").text(data.datos.correo);
        }
        
        if(data.datos.direccion == null){
            $("#direccion").text("No hay dirección");
        }else{
            $("#direccion").text(data.datos.correo);
        }
        
        
    } catch (error) {
        console.log(error);
    }
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
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#"><i class="fas fa-trash-alt"></i></button>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" onclick='readPsychology(${row.id_psychology})'><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn btn-success" ><i class="fas fa-info"></i></button>
              `;
              return html;
            },
          },
          { data: "id_psychology", visible: false },
        ],
      });
}
