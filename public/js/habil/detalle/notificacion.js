const enviarNotificacion = async()=>{
    let idSolicitud = $("#idSolicitud").val();
    const respesta = await $.ajax({
      url: "/admin/habil/sendNotificacion",
      type: "POST",
      data: {
        idSolicitud: idSolicitud }
    });
    console.log("ello");
    console.log(respesta);
  };
  