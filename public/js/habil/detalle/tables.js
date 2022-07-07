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
            const html = `<p class="r0"> ${firtWordUppercase(row.nombre)}</p>`
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
                      onclick="PrintPdf('${row.idSolicitud}')"
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
                      onclick="PrintPdf('${row.idSolicitud}')"
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

var n = 0;
const tbDetails = () => {
  // DataTable Usuarios
  const idCourse = $("#idCourse").val();
  var table = $("#tbDetailsParticipants").DataTable({
    fixedHeader: true,
    'iDisplayLength': 500,
    ajax: {
      'type': "GET",
      "url": `/admin/habil/tb-details-participants/${idCourse}`,
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
    ],
    columns: [
      { render(data, type,row){
        const html = `
          <p>${row.DUI}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${row.NIT}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${(row.NOMBRE_COMPLETO).toUpperCase()}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${(row.NACIONALIDAD).toUpperCase()}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${(row.SEXO).toUpperCase()}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${row.FECHA_NACIMIENTO}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${(row.ESTADO_FAMILIAR).toUpperCase()}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
          var departamentval;
          departaments.map((item)=>{
            if(item.id == row.DEPARTAMENTO_RESIDENCIA){
              departamentval = item.nombre;
            }
          });
          return departamentval.toUpperCase();
        }
      },
      { render(data, type,row){
        var municipalityVal;
        municipalitys.map((item)=>{
          item.map((data)=>{
            if(data.id == row.MUNICIPIO_RESIDENCIA)
              municipalityVal = data.nombre;
          });
        });
        return municipalityVal.toUpperCase();
        }
      },
      { render(data, type,row){
        var grade = finishGrade(row.GRADO_FINALIZADO);
        const html = `
          <p>${grade}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${row.CORREO}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${row.TELEFONO}<p>
        `;
        return(html)
        }
      },
      { render(data, type,row){
        const html = `
          <p>${(row.DISCAPACIDAD).toUpperCase()}<p>
        `;
        return (html)
        }
      },
      { render(data, type,row){
        var array = row.TIPO_DISCAPACIDAD;
        var json = JSON.parse(JSON.stringify(array.replace(/\s+/g, '')));
        var jsonpartido = json.split(",", 9);
        var text = '';
        jsonpartido.map((item)=>{ 
          if(item.split(":", 2)[1] == 'true'){
            switch (item.split(":", 2)[0]) {
              case '{moverseCaminar':
                text = 'FISICA';
                break;
              case 'usarBrazosPiernas':
                text = 'FISICA';
                break;
              case 'verLentes':
                text = 'VISUAL';
                break;
              case 'oirAparatos':
                text = 'AUDITIVA';
                break;
              case 'hablar':
                text = 'VERBAL';
                break;
              case 'retrasoMental':
                text = 'MENTAL';
                break;
              case 'vestirseAlimentarse':
                text = 'FISICA Y MENTAL';
                break;
            }
          }
        });
        return text;
        }
      },
      { render(data, type,row){
          var array = row.OCUPACION_ACTUAL;
          var json = JSON.parse(JSON.stringify(array.replace(/\s+/g, '')));
          var jsonpartido = json.split(",", 9);
          var ocupation = [];
          jsonpartido.map((item)=>{ 
            console.log(item.split(":", 2)[0])
            if(item.split(":", 2)[1] == 'true' || item.split(":", 2)[1] == 'true}'){
              switch (item.split(":", 2)[0]) {
                case '{estudia':
                  ocupation.push('ESTUDIA');
                  break;
                case 'oficiosHogar':
                  ocupation.push('OFICIOS DEL HOGAR');
                  break;
                case 'buscaTrabajo':
                  ocupation.push('BUSCA TRABAJO');
                  break;
                case 'trabaja':
                  ocupation.push('TRABAJA');
                  work = true;
                  break;
                case 'otro':
                  ocupation.push('OTRO');
                  break;
                default:
                  ocupation.push('OTRO');
                  break;
              }
            }
          });
          return `${ocupation}`
        }
      },
      { render(data, type,row){
        var array = row.OCUPACION_ACTUAL;
          var json = JSON.parse(JSON.stringify(array.replace(/\s+/g, '')));
          var jsonpartido = json.split(",", 9);
          var work = 'NO';
          jsonpartido.map((item)=>{ 
            if(item.split(":", 2)[1] == 'true'){
              switch (item.split(":", 2)[0]) {
                case 'trabaja':
                  work = 'SI';
                  break;
              }
            }
          });
          return `${work}`
        }
      },
      { render(data, type,row){
        var typeWork = typeOfWork(row.TIPO_TRABAJO);
        return(typeWork)
        }
      },
    ],
    responsive: false,
    paging: false,
    columnDefs: [{
      "defaultContent": "-",
      "targets": "_all"
    }]
  });
};

const typeOfWork = (typeWork) =>{
  let type = '';
  switch (typeWork) {
    case 'tmpcompleto':
      type = 'A TIEMPO COMPLETO';
      break;
    case 'tmpparcial':
      type = 'A TIEMPO PARCIAL';
      break;
    case 'temporal':
      type = 'TEMPORAL';
      break;
    case 'negocio':
      type = 'NEGOCIO FAMILIAR';
      break;
    case 'inde':
      type = 'INDEPENDIENTE/CUENTA PROPIA';
      break;
    case 'informal':
      type = 'TRABAJO INFORMAL';
      break;
    case 'informal':
      type = 'TRABAJO INFORMAL';
      break;
    case 'otro':
      type = 'TRABAJO INFORMAL';
      break;
  }
  return type;
};

const loopDisability = () =>{
  $(".disability_array").each((item, res)=>{
    var id = $(res).attr('id');
    var array = $(`#${id}`).val();
    var json = JSON.parse(JSON.stringify(array.replace(/\s+/g, '')));
    var jsonpartido = json.split(",", 9);
    jsonpartido.map((item)=>{ 
      if(item.split(":", 2)[1] == 'true'){
        switch (item.split(":", 2)[0]) {
          case '{moverseCaminar':
            $(`#val_${id}`).append('FISICA <br>');
            break;
          case 'usarBrazosPiernas':
            $(`#val_${id}`).append('FISICA <br>');
            break;
          case 'verLentes':
            $(`#val_${id}`).append('VISUAL <br>');
            break;
          case 'oirAparatos':
            $(`#val_${id}`).append('AUDITIVA <br>');
            break;
          case 'hablar':
            $(`#val_${id}`).append('VERBAL <br>');
            break;
          case 'retrasoMental':
            $(`#val_${id}`).append('MENTAL <br>');
            break;
          case 'vestirseAlimentarse':
            $(`#val_${id}`).append('FISICA Y MENTAR (No puede vestirse ni alimentarse) <br>');
            break;
          default:
            break;
        }
      }
    });
  });
};


const loopOcupation = () =>{
  $(".ocupation_array").each((item, res)=>{
    var id = $(res).attr('id');
    var array = $(`#${id}`).val();
    var json = JSON.parse(JSON.stringify(array.replace(/\s+/g, '')));
    var jsonpartido = json.split(",", 9);
    var work;
    jsonpartido.map((item)=>{ 
      if(item.split(":", 2)[1] == 'true'){
        switch (item.split(":", 2)[0]) {
          case '{estudia':
            $(`#val_${id}`).append('ESTUDIA <br>');
            break;
          case 'oficiosHogar':
            $(`#val_${id}`).append('OFICIO EN EL HOGAR <br>');
            break;
          case 'buscaTrabajo':
            $(`#val_${id}`).append('BUSCA TRABAJO <br>');
            break;
          case 'trabaja':
            $(`#val_${id}`).append('TRABAJA <br>');
            work = true;
            break;
          case 'otro':
            $(`#val_${id}`).append('OTRO <br>');
            break;
        }
      }
    });
    if(work){
      $(`#tra_${id}`).append('SI');
    }else{
      $(`#tra_${id}`).append('NO');
    }
  });
};

var departaments;
var municipalitys = [];
const departament = () =>{
  $.ajax({
    url: `https://admision.ricaldone.edu.sv/app/controllers/php/departamentos`,
    type: 'GET'
  }).then((res, key, req)=>{
    departaments = res;
    municipality();
  });
};

const municipality = ()=> {
  departaments.map((item)=>{
    $.ajax({
      url: `https://api.salud.gob.sv/municipios?idDepartamento=${item.id}`,
      dataType:'json'
    }).then((res, key, req)=>{
      municipalitys.push(res);
    });
  });
};

const finishGrade = (grade) =>{
  let gradeReturn = '';
  //
  if(grade <=9)
    gradeReturn = 'NOVENO GRADO O MENOS';
  switch (grade) {
    case 'BachInc':
      gradeReturn = 'BACHILLERATO INCOMPLETO'
      break;  
    case 'BachCom':
      gradeReturn = 'BACHILLERATO COMPLETO'
      break;
    case 'UniInc':
      gradeReturn = 'UNIVERSIDAD INCOMPLETA'
      break;
    case 'UniCom':
      gradeReturn = 'UNIVERSIDAD COMPLETA'
      break;
    case 'TecInc':
      gradeReturn = 'TECNOLÓGICA INCOMPLETA'
      break;
    case 'TecCom':
      gradeReturn = 'TECNOLÓGICA COMPLETA'
      break;
  }
  return gradeReturn
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

var address = [];
busquedaDepartamentos = (idDepartamento, i) =>{
  const url = `https://admision.ricaldone.edu.sv/app/controllers/php/departamentos.php?id=${idDepartamento}`;
  $.ajax({
    type: "GET",
    url: url,
    data: [{
      idPais: 68,
      id: idDepartamento
    }],
    success: function(data){
      address[i] = data.nombre;
    }
  });
};

busquedaMunicipio = (idDepartamento,idMunicipio, i) =>{
  const url = `https://api.salud.gob.sv/municipios/${idMunicipio}`;
  $.ajax({
    type: "GET",
    url: url,
    data: [{
      idDepartamento: idDepartamento
    }],
    success: function(data){
      address[i] = data.nombre;
    }
  });
};

const PrintPdf = async (idSolicitud) =>{
  const dataRegion = await $.ajax({
    url: `/admin/habil/findRegionForId/${idSolicitud}`,
    type: 'GET'
  });
  const json = dataRegion.data[0];
  for (let i = 0; i < Object.keys(json).length; i++) {
    if(i%2==0){
      busquedaDepartamentos(json[Object.keys(json)[i]], i);
    }else{
      busquedaMunicipio(json[Object.keys(json)[i-1]], json[Object.keys(json)[i]], i);
    }
  }
  setTimeout(consulta, 1700, idSolicitud);
};

const consulta = async (idSolicitud)=>{
  const data = await $.ajax({
    url : `/admin/habil/send/pdf/${idSolicitud}/`,
    type: 'POST',
    data:{
      depNacimiento: address[0],
      munNacimiento: address[1],
      depDomicilio: address[2],
      munDomicilio: address[3],
      departcontact: address[4],
      municipiocontacto: address[5],
    }
  })
  .done(function(){
    window.open(`/admin/habil/download/pdf/${idSolicitud}`);
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
  departament();
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