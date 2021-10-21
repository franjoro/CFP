function applicationTable() {
    // DataTable Usuarios
    const idCourse = $("#idCourse").val();
    
    // console.log(idCourde);
    $("#applicationTable").DataTable({
      ajax: `/admin/habil/application-table/${idCourse}`,
      columns: [
        { render(data, type,row){
          let html;
          if(row){
            html = `<div class="" id="row${row.idSolicitud}">${row.dui}</div>`
          }else{
            html = `<div class="bg-danger">${row.dui}</div>`
          }
            return(html)
          }
        },
        { data: "nombre" },
        { data: "telefono" },
        { data: "email"},
        {
          render(data, type, row){
            let edad = calcularEdad(""+row.fechaNacimiento);
          
            return(edad+`${row.fechaNacimiento}`);
          }
        },
        { data: "fechaNacimiento"},
        {
          render(data,type,row){
            if(row.sexo == "Masculino"){
              return 'Hombre';
            }else{
              return row.sexo;
            }
          }
        },
        {
            render(data, type, row) {
              let html = ``;
              if($("#tipo").val() == 'oferta'){
                html = `
                  <div class="btn-group" role="group" aria-label="Basic example" >
                    <a href="../../../../habil/gestor-de-documentos/habil/${row.id_curso}/${row.idSolicitud}/${row.dui}/${row.programa}/oferta" class="btn btn-primary btn-sm">Ver documentos</a>
                    <a href="../../../../../habil/formulario/${row.idSolicitud}/1" class="btn btn-info btn-sm">Ver solicitud</a>
                    <button 
                        type="button" data-toggle="modal" data-target="#modal_compartir_documentacion" class="btn btn-secondary btn-sm " 
                          onclick="GetLinkToShareDocuments('${row.idSolicitud}', '${row.dui}')">
                        Obtener enlace documentación
                    </button>
                    <button 
                        type="button" data-toggle="modal" data-target="#modal_compartir_solicitud" class="btn btn-warning btn-sm " 
                          onclick="GetLinkToShareSolicitude('${row.idSolicitud}', '${row.dui}')">
                        Obtener enlace de solicitud
                    </button>
                        <a type="button" data-toggle="modal" data-target="#modal_matricular" class="btn btn-success btn-sm" onclick="idSolicitudChangue('${row.idSolicitud}')">Matricular Solicitante</a>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteNotificacion('${row.idSolicitud}')">Eliminar</button>
                  </div>`;
              }else{
                html = `
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a href="../../../../habil/gestor-de-documentos/habil/${row.id_curso}/${row.idSolicitud}/${row.dui}/${row.programa}/curso" class="btn btn-primary btn-sm">Ver documentos</a>
                  <a href="../../../../../habil/formulario/${row.idSolicitud}/" class="btn btn-info btn-sm">Ver solicitud</a>
                  <button 
                        type="button" data-toggle="modal" data-target="#modal_compartir_documentacion" class="btn btn-secondary btn-sm" 
                          onclick="GetLinkToShareDocuments('${row.idSolicitud}', '${row.dui}')">
                        Obtener enlace documentación
                    </button>
                  <a type="button" data-toggle="modal" data-target="#modal_matricular" class="btn btn-success btn-sm" onclick="idSolicitudChangue('${row.idSolicitud}')">Matricular Solicitante</a>
                  <button type="button" class="btn btn-danger btn-sm" onclick="deleteNotificacion('${row.idSolicitud}')">Eliminar</button>
                </div>
                `;
              }
              return html;
            },
        },
      ],
    });
};


const changeColor= async () =>{
  const data = await $.ajax({
    url: `/admin/habil/changecolor-table/${$("#idCourse").val()}`,
    type: 'GET',
    data: ''
  });
  if(data.status){
    $.each(data.data, function(i, item){
      //Cambiamos el color del id
      try {
        $(`#row${item.idSolicitud}`).addClass('bg-info text-white');
      } catch (error) {
        
      }
    })
  }

    // console.log("Esta es la data");
  
};

const changeColorWait = async () =>{
  
  const data = await $.ajax({
    url: `/admin/habil/changeColorWait/${$("#idCourse").val()}`,
    type: 'GET',
    data: ''
  });
  if(data.status){
    $.each(data.data, function(i, item){
      //Cambiamos el color del id
      try {
        $(`#row${item.idSolicitud}`).addClass('bg-warning');
      } catch (error) {
        
      }
    })
  }
};

$(document).ready(function () {
  applicationTable();
  changeColor();
  changeColorWait();
});

