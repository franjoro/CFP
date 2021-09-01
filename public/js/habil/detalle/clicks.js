/*@author: Osmaro Bonilla
  @description: Clicks de la parte del cliente de detalle cursos habil 
  @date: 18/08/2021
  @*/
//INICIAMOS CON LA FUNCION READY DE JQUERY
$(document).ready(function () {
  
  $("#btnCopy").click(() => {
      
  });
  $("#btnCorreo").click(async () => {
      const cursoNombre = $("#cursoNombre").val();
      const email = $("#emailLink").val(),
      text = $("#mensaje").val(),
      enlace = global_linkToShare;
      if (!email || !text || !enlace) alert("Debe completar todos los campos");
      try {
        loader();
        const peticion = $.ajax({
          url: "/habil/sendMail",
          type: "POST",
          data: { email, text, enlace, cursoNombre },
        });
        console.log(peticion);
        if (peticion) {
          swal.close();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "success",
            title: "Mensaje enviado correctamente",
          });
          $("#modal_compartir").modal("toggle");
        }
      } catch (error) {
        console.log(error);
      }
  });
  $("#btnCorreoDoc").click(async () => {
    const cursoNombre = $("#cursoNombre").val();
    const email = $("#emailLink1").val(),
    text = $("#mensaje1").val(),
    enlace = global_linkDocuments;
    if (!email || !text || !enlace) alert("Debe completar todos los campos");
    try {
      loader();
      const peticion = $.ajax({
        url: "/habil/sendMailDocument",
        type: "POST",
        data: { email, text, enlace, cursoNombre },
      });
      console.log(peticion);
      if (peticion) {
        swal.close();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: "Mensaje enviado correctamente",
        });
        $("#modal_compartir_documentacion").modal("toggle");
      }
    } catch (error) {
      console.log(error);
    }
  });
  $("#commentCompleto").click(() => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se notificara al participante confirmando la aprobación de sus documentos",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, notificar y guardar comentario!'
    }).then((result) => {
      if (result.isConfirmed) {
       ChangeComment("Revisión completada");
       const comentario = $("#comentarios").val();
       const idSolicitud = $("#idSolicitud").val();
       updateCommentFunction(comentario, 3, idSolicitud);
       const respuesta = enviarNotificacion();
       console.log(respuesta);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  });
  $("#updateCommentBtn").click(() => {
    const comentario = $("#comentarios").val();
    const idSolicitud = $("#idSolicitud").val();
    updateCommentFunction(comentario, 3, idSolicitud);
  });
});

