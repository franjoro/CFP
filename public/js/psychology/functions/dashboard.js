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
              <a href="/admin/psicologia/detalles/${row.id}" class="btn btn-success"><i class="fas fa-plus"></i></a>
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
                <a href="/admin/psicologia/detalles/${row.id}" class="btn btn-success"><i class="fas fa-plus"></i></a>
            </div >`;
              return html;
            },
          },
          { data: "id", visible: false },
        ],
        
      });
}