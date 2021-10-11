const NotFoundM = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hemos encontrado un usuario con ese NIT , por favor intenta de nuevo o contacta con soporte Técnico",
    });
  };

  const FoundedEmailM = (email) => {
    Swal.fire({
      icon: "success",
      title: "Correo enviado",
      text: `Hemos enviado un correo electrónico a : ${email} con las instrucciones, por favor verifica la carpeta SPAM`,
    });
  };



  $("#nit").mask("0000-000000-000-0");


  $("#restaurar").submit(async e => {
    e.preventDefault();
    const nit = $("#nit").val();
    loader();
    const data = await $.ajax({ url: `/public/passwordSender?nit=${nit}`, type: "GET" })
    if (data.error == "USER_NOT_EXIST") return NotFoundM();
    FoundedEmailM(data.email)
    $("#exampleModal").modal('hide')

  })