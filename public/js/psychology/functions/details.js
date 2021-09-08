
function inputDate(id){
    $(id).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });
}

const readDetailsStudent = async () =>{
    const idStudent = $("#idStudent").val();
    const data = await $.ajax({ url: `/admin/psicologia/detailsStudent/${idStudent}`});
    try {
        console.log(data);
        console.log(data.datos.carnet);
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
                const day = new Date(row.date).getDate();
                const month = new Date(row.date).getMonth();
                const year = new Date(row.date).getFullYear();
                return (day+"/"+month+"/"+year);
            }
        },
        {
            render(data, type, row){
                const hour = new Date(row.date).getHours();
                const minuts = new Date(row.date).getMinutes();
                return (hour+":"+minuts);
            }
        },
        {
            render(date, type, row){
                const day = new Date(row.next_date).getDate();
                const month = new Date(row.next_date).getMonth();
                const year = new Date(row.next_date).getFullYear();
                const hour = new Date(row.next_date).getHours();
                const minuts = new Date(row.next_date).getMinutes();
                return (day+"/"+month+"/"+year + " a las "+hour+":"+minuts);
            }
        },
        {
            render(data, type, row) {
              const html = `
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#"><i class="fas fa-trash-alt"></i></button>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn btn-success" ><i class="fas fa-info"></i></button>
              `;
              return html;
            },
          },
          { data: "id_psychology", visible: false },
        ],
      });
}
