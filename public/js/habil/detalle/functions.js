/*@author: Osmaro Bonilla
  @description: Recolectar el link de
  @date: 18/08/2021
  @*/
//Variables globales
let global_linkToShare;
let global_linkDocuments;
let globalTrSeleccionado;
/*@description: Crea un enlace para compartir la ruta del formulario
  @params: curso
  @date: 18/08/2021
  @*/
const GetLinkToShare = (curso) => {
  let link = `https://${document.domain}/habil/${curso}`;
  $("#link").val(link);
  global_linkToShare = link;
  return;
};
/*@description: Crea un enlace para compartir la subida de documentación
  @params: idSolicitud, documento
  @date: 19/08/2021
  @*/
const GetLinkToShareDocuments = (idSolicitud, documento) =>{
  let link = `https://${document.domain}/habil/documentacion/habil/${idSolicitud}/documento/${documento}`;
  $("#link_document").val(link);
  global_linkDocuments = link;
  return;
};

const GetLinkToShareSolicitude = (idSolicitud, documento) =>{
  let link = `https://${document.domain}/habil/formulario/${idSolicitud}/2`;
  $("#link_solicitud").val(link);
  global_linkDocuments = link;
  return;
};

/*@description: Descarga los documentos agregados en la nube S3AWS
  @params: key, name
  @date: 20/08/2021
  @*/
const DowloadS3File = async (key, name) => {
  try {
    loaderFile();
    const query = await $.ajax({
      url: "/public/getFiles",
      type: "POST",
      data: { key },
    });
    if (query.status) {
      window.open(`/public/archivo/${query.ext}?Name=${name}`);
      Swal.close();
    }
  } catch (error) {
    console.log(error);
  }
};
/*@description: Recolecta un html adonde se podran ver los documentos
  @params: key, id
  @date: 20/08/2021
  @*/
const SeeS3File = async (key, id) => {
  try {
    loaderFile();
    const query = await $.ajax({
      url: "/public/getFiles",
      type: "POST",
      data: { key },
    });
    let html ;
    if (query.status) {
      //  const html = ` <iframe src="https://cfp.ricaldone.edu.sv/public/seefile/${
      //    query.ext
      //  }?date=${Date.now()}" width="100%" height="100%"></iframe>`;
      // if(query.ext == 'pdf'){
      //   html = ` <iframe src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%">
      //   </iframe>`;
      // }else{
      //   html = `<img src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" alt="" class="img-fluid"
      //   width="500px" height="500x"
      //   >`
      // }
      if(query.ext == 'pdf'){
        html = ` <iframe src="https://cfp.ricaldone.edu.sv/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%">
        </iframe>`;
      }else{
        html = `<img src="https://cfp.ricaldone.edu.sv/public/seefile/${query.ext}?date=${Date.now()}" alt="" class="img-fluid"
        width="500px" height="500xp"
        >`
      }

      $("#framediv").css("height", "1200px");
      $("#framediv").html(html);
      // $("#framediv").html(html1);
      $("html, body").animate(
        {
          scrollTop: $("#framediv").offset().top,
        },
        500
      );
      Swal.close();
      $(`#${globalTrSeleccionado}`).removeClass("actives");
      $(`#${id}`).addClass("actives");
      globalTrSeleccionado = id;
    }
  } catch (error) {
    console.log(error);
  }
};

const SustituirArchivo = async (idSolicitud, cantidadDocumentos, idDocumento) => {
  try {
    const { value: file } = await Swal.fire({
      title: "Seleccionar archivo",
      showCancelButton: true,
      input: "file",
      inputAttributes: {
        "aria-label": "Reemplazar archivo",
      },
    });
    if (file) {
      var fd = new FormData();
      fd.append("fileDocumentos", file);
      fd.append("idSolicitud", idSolicitud);
      fd.append("cantidadDocumentos", cantidadDocumentos);
      fd.append("idDocumento", idDocumento);

      loader();
      let datos = await $.ajax({
        url: "/admin/habil/updateFile",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
      Swal.fire({
        icon: "success",
        title: "Archivo actualizado correctamente",
        showConfirmButton: false,
      });
      location.reload();
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};
const ChangeComment = (comment) => {
  $("#comentarios").val(comment);
};

const idSolicitudChangue = (id) =>{
  $("#txtIdSolicitud").val(id);
};

const txtSol1 = (id, documentssgafp)=>{
  $("#txtSol1").val(id);
  $("#documentssgafp").val(documentssgafp);
};


const RequestEnabled = () =>{
  if($("#habilitado").val() == 1){
    $("#swRequest").prop('checked', true);
  }else{
    $("#swRequest").prop('checked', false);
  }
};

const RecuestIf = () =>{
  if($("#habilitado").val() == 1){
    $("#swRequest").prop('checked', false);
    $("#habilitado").val(0);
    updateRequest(0,$("#idCourse").val(),'Inscripciones deshabilitadas');
  }else{
    $("#swRequest").prop('checked', true);
    $("#habilitado").val(1);
    updateRequest(1,$("#idCourse").val(),'Inscripciones habilitadas');
  }
};

const updateRequest = async (enabled, idCourse, msg) =>{
  const res = await $.ajax({
    type: "PUT",
    url: "/admin/habil/updateRequest",
    data: {
      enabled: enabled,
      idCourse: idCourse
    }
  });
  console.log("update")
  console.log(res)
  if(res.status){
    toastSucces(msg);
  }
};



const addTeacher =  ()=>{
  const { value: formValues } =  Swal.fire({
    title: 'Multiple inputs',
    html:
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
      ]
    }
  })
  
  if (formValues) {
    Swal.fire(JSON.stringify(formValues))
  }
};

// Agregar nuevo instructor
$("#formInstructor").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
     const data = await $.ajax({
      url: "/admin/instructor/add",
      type: "POST",
      data: t,
    });
    if(data.status){
      // LoadTablaInstructor($("#selector").children("option:selected").val());
      swal.close();
      // $("#exampleModal").modal("toggle");
      $("#formInstructor")[0].reset();
    }
  } catch (error) {
    swal.close();
    console.log(error)
    errorMessage();
  }
});