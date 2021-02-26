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
    }
  } catch (error) {
    console.log(error )
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
      console.log(datos)
      Swal.fire({
        icon: "success",
        title: "Archivo subido correctamente",
        showConfirmButton: false,
      });
      location.reload();
    }
  } catch (error) {
    console.log(error )
    errorMessage();
  }
};
