function seeUserWhitPsichology(){
    $("#cardStudentPsuchology").css("display", "block");
    $("#cardStudentNoPsuchology").css("display", "none");
}

function seeUserWhitNoPsichology(){
    $("#cardStudentPsuchology").css("display", "none");
    $("#cardStudentNoPsuchology").css("display", "block");
}

//================ USO DE FECHAS =======================
//Funcion de calculo de fecha
function calcularEdad(fecha) {
    const date1 = dayjs(fecha, 'MM/DD/YYYY');
    const date2 = dayjs(fechaActual(), 'MM/DD/YYYY');
    return date2.diff(date1, 'year');
  } 
  //Fecha actual formaro yy-mm-dd
  function fechaActual(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }
  }
  function convertDateFormat(string) {
    var info = string.split('/').reverse().join('/');
    return info;
}
//================ FIN USO DE FECHAS =======================

function table(){
    $("#tableParticipantes").DataTable({
        ajax: `/admin/psicologia/studentsTable`,
        destroy: true,
        columns: [
          { data: "carnet" },
          { data: "Nombres" },
          {
            render(data, type, row){
                if(row.fechaNac == ''){
                    return '-';
                }else{ 
                    return  calcularEdad(convertDateFormat(row.fechaNac));
                }
            }
        },
        { data: "nombreCarrera" },
        { 
            render(data, type, row){
                if(!row.genero){
                    return "-";
                }else{
                    return row.genero;
                }
            }
         },
        {
            render(data, type, row) {
              const html = `
              <div class="btn-group" role = "group" aria - label="Basic example">
              <a href="./psicologia/detalles/${row.id}" class="btn btn-success"><i class="fas fa-plus"></i></a>
            </div >`;
              return html;
            },
          },
          { data: "id", visible: false },
        ],
      });
}

function tableCadre(){
    $("#tableParticipantsPsycology").DataTable({
        ajax: `/admin/psicologia/studentsWithCadre`,
        destroy: true,
        columns: [
          { data: "carnet" },
          { data: "Nombres" },
          {
            render(data, type, row){
                if(row.fechaNac == ''){
                    return '-';
                }else{ 
                    return  calcularEdad(convertDateFormat(row.fechaNac));
                }
            }
        },
        { data: "nombreCarrera" },
        { 
            render(data, type, row){
                if(!row.genero){
                    return "-";
                }else{
                    return row.genero;
                }
            }
         },
        {
            render(data, type, row) {
              const html = `
              <div class="btn-group" role = "group" aria - label="Basic example">
                <a href="./psicologia/detalles/${row.id}" class="btn btn-success"><i class="fas fa-plus"></i></a>
            </div >`;
              return html;
            },
          },
          { data: "id", visible: false },
        ],
      });
}