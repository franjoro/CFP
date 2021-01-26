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
errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Por favor verifica la información",
  });
};
$("#loginForm").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    let data = await $.ajax({ url: "/signin", type: "POST", data: t });
    if(data.status){
        //CAMBIAR RUTAS
        if(data.role  == 1) window.location.replace('/admin/programa');
        if(data.role  == 0) window.location.replace('/admin/programa');
        console.log(data);
        swal.close();
    }
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
});
