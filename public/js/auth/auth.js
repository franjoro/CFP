
const loader = () => {
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
const errorMessage = () => {
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
    const data1 = await $.ajax({url: "http://localhost:3000/sesion/signin", type: "POST", data: t});
    console.log("Procesando");
    console.log(data1.token);
    if(data1 != ""){
      const data = await $.ajax({ url: "/signin", type: "POST", data: t });
      if(data.status){
         $.cookie("tokenapi", data1.token);
          // CAMBIAR RUTAS
          if(data.role  === 0) window.location.replace('/admin/cursos');
          if(data.role  === 1) window.location.replace('/admin/');
          if(data.role  === 2) window.location.replace('/admin/ec/instructor');
          if(data.role  === 3) window.location.replace('/public/rechazado');
          if(data.role  === 4) window.location.replace('/public/');
          if(data.role  === 5) window.location.replace('/admin/ec');
          if(data.role  === 6) window.location.replace('/admin/psicologia');
          swal.close();
      }
    }
   
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
});
