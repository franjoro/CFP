
// Call the dataTables jQuery plugin
$(document).ready(function () {
  //DataTable Programas
  $("#tablePrograma").DataTable({
    ajax: "/admin/programa/table",
    columns: [
      {
        render: function (data, type, JsonResultRow, meta) {
          return (
            '<img class="imgTabla" src="/static/img/uploads/' +
            JsonResultRow.ImgPortada +
            '">'
          );
        },
      },
      { data: "Nombre" },
      {
        render: function (data, type, JsonResultRow, meta) {
          const html = `<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button><a href="/admin/programa/id${JsonResultRow.id_programa}" class="btn btn-warning"><i class="fas fa-user-friends"></i></a></div >`;
          return html;
        },
      },
    ],
  });
  $("#tableProgramaEncargado").DataTable();
});

function EliminarInstructorDePrograma(usuario,programa) {
  Swal.fire({
    title: "¿Estás Seguro?",
    text: "No permitir acceso administrativo a usuario",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then( async(result) => {
    if (result.isConfirmed) {
      try {
        query = $.ajax({url:"/admin/programa/deleteinstructor", type:"DELETE", data:{usuario,programa}})
        if(query) return Swal.fire("Eliminado", "Instructor desvinculado", "success");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })     
      }
      
    }
  });
}
