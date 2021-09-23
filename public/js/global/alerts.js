const error = (error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: error,
    });
  };

  const successMsg = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Finalizado con exito",
      html: msg,
    });
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const loaderEnviar = () => {
    Swal.fire({
      title: "Por favor, Espere",
      allowOutsideClick: !1,
      showConfirmButton: false,
      html: `<span id="texto"> Estamos ingresando la información de su solicitud <span> <progress id="progreso" value="0" max="100">70 %</progress>`,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };
  const archivosLoader = () => {
    Swal.fire({
      title: "Por favor, Espere",
      allowOutsideClick: !1,
      showConfirmButton: false,
      html: `<span id="texto"> Estamos guardando tus archivos <span> <progress id="progreso" value="50" max="100"></progress>`,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };
  const loader = () => {
    Swal.fire({
      title: "Por favor, Espere",
      html: "Procesando información",
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