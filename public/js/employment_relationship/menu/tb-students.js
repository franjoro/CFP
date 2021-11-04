const  tbStudents = () =>{
    $("#tb-students").DataTable({
        ajax: `/admin/vinculacion-laboral/tb-students`,
        destroy: true,
        columns: [
          { data: "carnet" },
          { data: "Nombres" },
          {
            render(data, type, row){
                if(row.fechaNac == ''){
                    return '-';
                }else{ 
                    return  calculatedYearOld(convertDateFormat(row.fechaNac));
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
              <a href="/admin/vinculacion-laboral/detalle/${row.id}" class="btn btn-success"><i class="fas fa-file-alt"></i></i></a>
            </div >`;
              return html;
            },
          },
          { data: "id", visible: false },
        ],
      });
}

$(document).ready(function(){
    tbStudents();
});