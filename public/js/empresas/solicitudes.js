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
errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación",
  });
};

loader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Cargando Data",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
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
      window.open(`../../${query.path}`);
      return Swal.close();
    }
  } catch (error) {
    errorMessage();
    console.log(error);
  }
};

const Aprobar = async (id, nit, mail) => {
  const alerta = await Swal.fire({
    title: "¿Aprobar solicitud de empresa?",
    text: "Se notificara a la empresa y se le permitirá ingresar solicitudes",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Aprobar",
  });

  if (alerta.isConfirmed) {
    try {
      loader();
      $.ajax({
        url: "/admin/empresas/solicitudes",
        type: "POST",
        data: { id, nit, mail },
      });
      swal.close();
      location.reload();
    } catch (error) {
      errorMessage();
      return console.log(error);
    }
  }
  return;
};
