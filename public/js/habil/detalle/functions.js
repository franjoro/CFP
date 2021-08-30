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
    console.log(query);
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
    if (query.status) {
      console.log(query);
       const html = ` <iframe src="https://cfp.ricaldone.edu.sv/public/seefile/${
         query.ext
       }?date=${Date.now()}" width="100%" height="100%"></iframe>`;
       //const html = ` <iframe src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%"></iframe>`;
      $("#framediv").css("height", "1200px");
      $("#framediv").html(html);
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

