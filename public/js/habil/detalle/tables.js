const applicationTable = () => {
    // DataTable Usuarios
    const idCourse = $("#idCourse").val();
    var table = $("#applicationTable").DataTable({
      fixedHeader: true,
      'iDisplayLength': 100,
      ajax: {
        'type': "GET",
        "url": `/admin/habil/application-table/${idCourse}`,
        
      },
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
          render(data,type,row){
            html = `
           
            <span>
              <div class="form-check">
                <input class="form-check-input ck" type="checkbox" value="${row.idSolicitud}" id="ck${row.idSolicitud}">
                <label class="form-check-label" for="ck${row.idSolicitud}">
                 <p>N°<span class="negrita"></span></p>       
                </label>
              </div>
            </span>`;
            return(html);

          }
        },
        {render(data,type,row){
          html = `${row.fecha_inscripcion }`;
          return(html);
        }},
        { render(data, type,row){
          let html;
          if(row){
            html = `<div class="" id="row${row.idSolicitud}">${row.dui}</div>
            <span>
              <button class = 'btn btn-danger' id='d${row.idSolicitud}'>
              </button>
            </span>`
          }else{
            html = `<div class="bg-danger">${row.dui}</div><span><button class = 'btn btn-danger' id='${row.idSolicitud}'></button></span>`
          }
            return(html)
          }
        },
        { 
          render(data,type,row){
            console.log(row.nombre)
            const html = `
              <p class="r0"> ${firtWordUppercase(row.nombre)}</p>
              
            `
            return(html);

          } },
        {
          render(data,type,row){
            const html = `
              <p class="r1"> ${firtWordUppercase(row.apellidos)}</p>
              
            `
            return(html);
          }
        },
        { data: "telefono" },
        { data: "email"},
        {
          render(data, type, row){
            let edad = calculatedYearOld(row.fechaNacimiento);
          
            return(edad);
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
                    <a href="../../../../../habil/formulario/${row.idSolicitud}/1/view" class="btn btn-info btn-sm">Ver solicitud</a>
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
                    <button
                      class="btn btn-primary btn-sm"
                      onclick="PrintPdf()"
                    >
                    Descargar boleta
                    </button>
                    <a type="button" data-toggle="modal" data-target="#modal_matricular" class="btn btn-success btn-sm" onclick="idSolicitudChangue('${row.idSolicitud}')">Matricular Solicitante</a>
                    <a type="button" data-toggle="modal" data-target="#modal_sgafp" class="btn btn-info btn-sm" onclick="txtSol1('${row.idSolicitud}', '${row.dui}')">Información SGAFP</a>
                    
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteNotificacion('${row.idSolicitud}')">Eliminar</button>
                  </div>`;
              }else{
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
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      onclick="PrintPdf()"
                    >
                    Descargar boleta
                    </button>
                    <a type="button" data-toggle="modal" data-target="#modal_matricular" class="btn btn-success btn-sm" onclick="idSolicitudChangue('${row.idSolicitud}')">Matricular Solicitante</a>
                    <a type="button" data-toggle="modal" data-target="#modal_sgafp" class="btn btn-info btn-sm" onclick="txtSol1('${row.idSolicitud} , ${row.dui}')">Información SGAFP</a>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteNotificacion('${row.idSolicitud}')">Eliminar</button>
                  </div>`;
              }
              return html;
            },
        },
      ],
      responsive: true,
      paging: false,
      columnDefs: [{
        "defaultContent": "-",
        "targets": "_all"
      }]
    });
};


const changeColor= async () =>{
  const data =  await $.ajax({
    url: `/admin/habil/changecolor-table/${$("#idCourse").val()}`,
    type: 'GET',
    data: ''
  });
  if(data.status){
    $.each(data.data, function(i, item){
      //Cambiamos el color del id
      try {
        // $(`#row${item.idSolicitud}`).addClass('bg-info text-white');
        $(`#row${item.idSolicitud}`).append(`<span><button class= 'btn btn-info'></button><span>`);
        $(`#d${item.idSolicitud}`).remove();

      } catch (error) {
        
      }
    })
  }
};

const PrintPdf = async () =>{
  const data = await $.ajax({
    url : `/admin/habil/send/pdf`,
    type: 'GET'
  })
  .done(function(){
    window.open(`/admin/habil/download/pdf`);
  });
  console.log(data);
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
        $(`#row${item.idSolicitud}`).append(`<span><button class= 'btn btn-warning'></button><span>`);
      } catch (error) {
        
      }
    })
  }
};


const inscritosSgap = async () =>{
  const data = await $.ajax({
    url: `/admin/habil/inscritosSgafp/${$("#idCourse").val()}`,
    type: 'GET',
    data: ''
  });
  if(data.status){
    $.each(data.data, function(i, item){
      //Cambiamos el color del id
      try {
        $(`#row${item.idSolicitud}`).append(`<span><button class= 'btn btn-success'></button><span>`);
      } catch (error) {
        
      }
    })
  }
};
const noInscritosSgap = async () =>{
  const data = await $.ajax({
    url: `/admin/habil/noInscritosSgafp/${$("#idCourse").val()}`,
    type: 'GET',
    data: ''
  });
  if(data.status){
    $.each(data.data, function(i, item){
      //Cambiamos el color del id
      try {
        $(`#row${item.idSolicitud}`).append(`<span><button class= 'btn btn-secondary'></button><span>`);
      } catch (error) {
        
      }
    })
  }
};

const countParticipants = async () =>{
  await $(".negrita").each(function(index,element){
    $(element).text((index+1));
  });
};

const selectParticipants = async () =>{
  const arr = [];
  await $(".ck").each((index,element)=>{
    let idRequest = $(element).val();
    if($(element).is(":checked")){
      arr.push(idRequest);
    }
  });
  sessionStorage.setItem('participants',JSON.stringify(arr));
};
const removeForWaitingList =  () =>{
  selectParticipants(); 
  $(JSON.parse(sessionStorage.getItem('participants'))).each( async (index, element) =>{
    try {
      const data = await $.ajax({
        url: "/admin/habil/updateStatusRequest",
        type: "PUT",
        data: {
          status: 0,
          idRequest: element
        },
      }).then(
        () => {
          if ((index+1 == JSON.parse(sessionStorage.getItem('participants')).length)) {
            swal.close();
            Swal.fire(
              `${(index+1)} participante matriculado correctamente`,
              "success"
            );
            $("#modal_matricular_c").modal("hide");
            location.reload();
          }
        }
      );
      
    } catch (error) {
      swal.close();
      console.log(error);
      errorMessage();
    }
  });
};
const enrollParticipants = () =>{
  $(JSON.parse(sessionStorage.getItem('participants'))).each(async(index, element) =>{
    try {
      const data = await $.ajax({
        url: "/admin/habil/matricular",
        type: "PUT",
        data: {
          cmbCurso: $("#cmbCursoC").val(),
          txtIdSolicitud: element
        },
      });
      if (data.status) {
        swal.close();
        Swal.fire(
          `${(index+1)} participante matriculado correctamente`,
          "success"
        );
        $("#modal_matricular_c").modal("hide");
        location.reload();
      }
    } catch (error) {
      swal.close();
      console.log(error);
      errorMessage();
    }
  });
};

const sgafp = async ()=>{
  try {
    const data = await $.ajax({
      url: "/admin/habil/sgafp",
      type: "PUT",
      data: {
        aceptado: $("#cmbAceptado").val(),
        idSolicitud: $("#txtSol1").val(),
        documentssgafp: $("#documentssgafp").val(),
      },
    });
    if (data.status) {
      swal.close();
      Swal.fire(
        `Información guardada con exito`,
        "success"
      );
      $("#modal_sgafp").modal("hide");
      location.reload();
    }
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
};

const printBallot = async () =>{
  try {
    
  } catch (error) {
    
  }
}

const classClick = () =>{
  $(document).on('click','.ck',() =>{
    event.stopPropagation();
    event.stopImmediatePropagation();
    if( $('.ck').is(':checked') ) {
      blockChecked();
      selectParticipants();
    }else{
      $(".btnBlock").remove();
    }
  });
};

const clickCkAll = ()=>{
  $(document).on('click','#ckAll',() =>{
    event.stopPropagation();
    event.stopImmediatePropagation();

    $(".ck").each((index,element)=>{
      $(element).prop("checked", true);
    });
    blockChecked();
    selectParticipants();
  });
};
const blockChecked = () =>{
  setTimeout(function(){
    $(".btnBlock").remove();
    // $(".blockChecked").css({'background-color': '#F4F4F4'})
    // $('#blockChecked').tooltip(options)
    // $('#blockChecked').tooltip('enable');
    $("#blockChecked").append(`
    <button 
      class="btn btn-success btnBlock btn-sm"
      data-toggle="modal" data-target="#modal_matricular_c"
      onclick="selectParticipants()"
    >
      <i class="fas fa-exchange-alt"></i> Matricular
    </button>
    <button
      class="btn btn-warning btn-sm btnBlock"
      onclick = "removeForWaitingList()"
      >
      <i class="fas fa-exclamation"></i> Quitar de lista de espera
     
    </button>
    <button class="btn btn-primary btn-sm btnBlock">
      <i class="fas fa-file-alt"></i> Descargar boletas
    </button>
    <button 
      class="btn btn-danger btnBlock btn-sm"
      data-toggle="tooltip" data-placement="top" title="Eliminar estudiantes seleccionados"
      onclick="deleteParticipants()"
    >
      <i class="fas fa-trash-alt"></i> Eliminar
    </button>
    
  `);
  },100)
  
};

$(document).ready( ()  => {
  $("#btnEnrollParticipants").click(() =>{
    enrollParticipants();
  });
  $("#btnSgafp").click(()=>{
    sgafp();
  });
  applicationTable();
  setTimeout(changeColorWait, 300);
  setTimeout(changeColor, 300);
  setTimeout(countParticipants, 300);
  setTimeout(noInscritosSgap,300);
  setTimeout(inscritosSgap,300);
  classClick();
  clickCkAll();
});


// function asignar (){
//   for (let i = 0; i < constante.length; i++) {
//     alert("Hoekj");
//   }
// }
// asignar();
