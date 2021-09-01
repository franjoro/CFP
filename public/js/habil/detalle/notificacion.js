const enviarNotificacion = async()=>{
    let idSolicitud = $("#idSolicitud").val();
    try {
      const respuesta = await $.ajax({
        url: "/admin/habil/sendNotificacion",
        type: "POST",
        data: {
          idSolicitud: idSolicitud 
        },
        success: function(){
          return { status: true, data: respuesta};
        }
      });
    } catch (error) {
      console.log(respuesta);
      return{ status: false, data: respuesta };
    }
    
  };
  