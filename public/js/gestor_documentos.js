
const errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación",
  });
};
const loader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Recopilando información necesaria",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};
const loaderFile = () => {
  Swal.fire({
    title: "Por favor espere",
    html: "Descargando archivo",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

const createZip = async (curso, empresa) => {
  try {
    loader();
    const create = await $.ajax({
      url: "/admin/cursos/savezip",
      type: "POST",
      data: { curso, empresa },
    });
    if (create.status) {
      window.open(`/admin/cursos/archivo`);
      Swal.close();
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

const deleteS3 = (id) => {
  Swal.fire({
    html:
      "<h4>¿Desea borrar permanentemente este archivo?</h4> <small>Escriba <b>Eliminar</b> para confirmar, esta acción no podra revertirse</small>",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    showLoaderOnConfirm: true,
    preConfirm: (text) => {
      if (text == "eliminar" || text == "Eliminar") {
        return $.ajax({
          url: "/admin/cursos/deleteFiles3",
          type: "DELETE",
          data: { key: id },
        })
          .then((response) => {
            if (!response.status) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
      Swal.showValidationMessage(`Debe escribir correctamente eliminar`);
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result);
    if (result.value.status) {
      location.reload();
    }
  });
};

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
  } catch (error) {}
};

let globalTrSeleccionado = null;
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
      // const html = ` <iframe src="http://localhost:8081/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%"></iframe>`;
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
  } catch (error) {}
};

const SustituirArchivo = async (curso, empresa, id, archivo) => {
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
      fd.append("file", file);
      fd.append("empresa", empresa);
      fd.append("curso", curso);
      fd.append("id", id);
      fd.append("archivo", archivo);

      loader();
      let datos = await $.ajax({
        url: "/admin/cursos/EnviarFiles",
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

$(".form-check-input").click(async function () {
  const datos = $(this).data();
  try {
    const query = await $.ajax({
      url: "/admin/cursos/UpdatePermisos",
      type: "PUT",
      data: { id: datos.id, valor: datos.valor },
    });
    if (query.status) {
      swal.close();
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});

const CrearArchivoExtra = async (curso, empresa) => {
  try {
    const { value: file } = await Swal.fire({
      title: "Subir archivo extra",
      showCancelButton: true,
      input: "file",
      inputAttributes: {
        "aria-label": "Seleccionar archivo extra",
      },
    });
    if (file) {
      var fd = new FormData();
      fd.append("file", file);
      fd.append("empresa", empresa);
      fd.append("curso", curso);

      loader();
      let datos = await $.ajax({
        url: "/admin/cursos/archivoExtra",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
      console.log(datos);
      Swal.fire({
        icon: "success",
        title: "Archivo subido correctamente",
        showConfirmButton: false,
      });
      location.reload();
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};
let global_linkToShare;
const GetLinkToShare = (curso, empresa, programa) => {
  let link = `https://${document.domain}/public/editar/${curso}/${empresa}/${programa}`;
  $("#link").val(link);
  global_linkToShare = link;
  return;
};

$("#btnCorreo").click(async () => {
  const email = $("#email").val(),
    text = $("#mensaje").val(),
    enlace = global_linkToShare;
  if (!email || !text || !enlace) alert("Debe completar todos los campos");
  try {
    loader();
    const peticion = $.ajax({
      url: "/sendMail",
      type: "POST",
      data: { email, text, enlace },
    });
    console.log(peticion);
    if (peticion) {
      swal.close();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Mensaje enviado correctamente",
      });
      $("#modal_compartir").modal("toggle");
    }
  } catch (error) {
    console.log(error);
  }
});
$("#btnCopy").click(() => {
  console.log("entra");
  var copyTextarea = document.querySelector("#link");
  copyTextarea.select();
  try {
    document.execCommand("copy");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Copiado en portapapeles",
    });
  } catch (err) {
    console.log("Oops, unable to copy");
  }
});

const updateCommentFunction =async (comentario, curso, empresa) =>{
  await $.ajax({
    url: "/admin/cursos/UpdateComment",
    type: "PUT",
    data: {valor : comentario, id_curso: curso , id_empresa :empresa }
  });
    Toast.fire({
      icon: "success",
      title: "Comentario agregado",
    });
};
const enviarNotificacion = async(empresa, curso)=>{
  await $.ajax({
    url: "/admin/cursos/sendNotificacion",
    type: "POST",
    data: {id_curso: curso , id_empresa :empresa }
  });
};


$("#updateCommentBtn").click( async() => { 
  const comentario = $("#comentarios").val();
  const curso = $("#curso").val();
  const empresa = $("#empresa").val();
  updateCommentFunction(comentario, curso, empresa);
});


const ChangeComment = (comment) => {
  $("#comentarios").val(comment);
};

$("#commentCompleto").click(() => {
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Se notificara a la empresa confirmando la aprobación de sus documentos",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, notificar y guardar comentario!'
  }).then((result) => {
    if (result.isConfirmed) {
     ChangeComment("Revisión completada");
     const comentario = $("#comentarios").val();
     const curso = $("#curso").val();
     const empresa = $("#empresa").val();
     updateCommentFunction(comentario, curso, empresa);
     enviarNotificacion(empresa, curso);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  });
});

$("#commentRecibo").click(() => {
  ChangeComment("Pendiente entrega de recibo");
});

$("#commentCancelacion").click(() => {
  ChangeComment("Pendiente entrega de cancelación");
});

$("#commentPlanilla").click(() => {
  ChangeComment("Pendiente entrega de planilla");
});

$(document).ready(function () {
  let commentJson = localStorage.getItem("commentJson");
  const curso = $("#curso").val();
  const empresa = $("#empresa").val();
  if (commentJson != null) {
    commentJson = JSON.parse(commentJson);
    commentJson[curso].forEach((element, i) => {
      if (element[empresa]) {
        $("#comentarios").val(element[empresa]);
        return;
      }
    });
  }
});
