const error = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error,
  });
};

$("#modalSuccess").on("hidden.bs.modal", function (e) {
  window.location.href = "/";
});

$("#Register").submit(async function (e) {
  e.preventDefault();
  const file = $("#file")[0].files;
  const fileTwo = $("#file")[0];

  if (fileTwo.files.length == 0)
    return error("Debe adjuntar NIT para continuar");
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
    return error("Parece que los correos ingresados no coiciden");
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
    return error("Debe rellenar toda la información para continuar");
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
$("#Aportacion").mask("000,000,000,000,000.00", {
  reverse: true,
});

$('input[type="file"]').on("change", function () {
  let ext = $(this).val().split(".").pop();
  ext = ext.toLowerCase();
  console.log (ext);
  if ($(this).val() != "") {
    if (ext == "pdf" || ext == "png" || ext == "jpeg"  || ext == "docx" || ext =="jpg" ) {
      return;
    } else {
      $(this).val("");
      error(
        "Deber verficar el formato del archivo adjunto. Formatos permitidos:  PDF, PNG, JPEG, WORD)"
      );
    }
  }
});
