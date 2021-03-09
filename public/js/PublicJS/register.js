const errorMessageEmpty = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Debe rellenar toda la información para continuar",
  });
};

const errorMessageEmails = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Parece que los correos ingresados no coiciden",
  });
};

$("#modalSuccess").on("hidden.bs.modal", function (e) {
    window.location.href ="/"
});

$("#Register").submit(async function (e) {
  e.preventDefault();
  const file = $("#file")[0].files;
  const Nombre = $("#Nombre").val();
  const Nit = $("#Nit").val();
  const Direccion = $("#Direccion").val();
  const Tel = $("#Tel").val();
  const Actividad = $("#Actividad").val();
  const Email = $("#Email").val();
  const Patronal = $("#Patronal").val();
  const Aportacion = $("#Aportacion").val();
  const Empleados = $("#Empleados").val();
  const Responsable = $("#Responsable").val();
  const EmailR = $("#EmailR").val();
  const TelR = $("#TelR").val();
  const fd = new FormData();
  fd.append("Nombre", Nombre);
  fd.append("Nit", Nit);
  fd.append("Direccion", Direccion);
  fd.append("Actividad", Actividad);
  fd.append("Tel", Tel);
  fd.append("Email", Email);
  fd.append("Patronal", Patronal);
  fd.append("Aportacion", Aportacion);
  fd.append("Empleados", Empleados);
  fd.append("Responsable", Responsable);
  fd.append("EmailR", EmailR);
  fd.append("TelR", TelR);
  fd.append("file", file[0]);
  if (Email !== $("#EmailConfirmacion").val()) {
    return errorMessageEmails();
  }

  if (
    !file ||
    !Nombre ||
    !Nit ||
    !Direccion ||
    !Tel ||
    !Actividad ||
    !Email ||
    !Patronal ||
    !Aportacion ||
    !Empleados ||
    !Responsable ||
    !EmailR ||
    !TelR
  ) {
    return errorMessageEmpty();
  }

  try {
    loader();
    await $.ajax({
      url: "/public/register",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
    });
    $("#modalSuccess").modal("show");
    Swal.close();
  } catch (error) {
    console.log(error);
    errorMessage();
  }
});
$("#Nit").mask("0000-000000-000-0");
$("#Tel").mask("0000-0000");
$("#TelR").mask("0000-0000");
$("#Aportacion").mask("000,000,000,000,000.00", { reverse: true });
