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
    title: "¿Eliminar este archivo?",
    html: "Esto habilitara la edición del archivo para la empresa",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    }
  });
};

const DowloadS3File = async (key) => {
  try {
    loaderFile();
    const query = await $.ajax({
      url: "/public/getFiles",
      type: "POST",
      data: { key },
    });
    if (query.status) {
      window.open(`/public/archivo/${query.ext}`);
      Swal.close();
    }
  } catch (error) {}
};

const SeeS3File = async (key) => {
  try {
    loaderFile();
    const query = await $.ajax({
      url: "/public/getFiles",
      type: "POST",
      data: { key },
    });
    if (query.status) {
      const html = ` <iframe src="https:${document.domain}/public/archivo/pdf?date=${Date.now()}" width="100%" height="100%"></iframe>`;
      $("#framediv").html(html);
      $("#viewer").modal("show")
      Swal.close();
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
