const updateCommentFunction = async (comentario, estado, idSolicitud) =>{
    const respuesta = await $.ajax({
      url: "/admin/habil/updateComment",
      type: "PUT",
      data: {
            comentario : comentario, 
          estado: estado , 
          idSolicitud :idSolicitud 
    }
    });
      Toast.fire({
        icon: "success",
        title: "Comentario agregado",
    });
    console.log(respuesta);
};

$("#formMatriculacionPart").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    const data = await $.ajax({
      url: "/admin/habil/matricular",
      type: "PUT",
      data: t,
    });
    if (data.status) {
      swal.close();
      Swal.fire(
        "Curso matriculado correctamente",
        "success"
      );
      $("#modal_matricular").modal("hide");
    }
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
});