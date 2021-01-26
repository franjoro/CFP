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
    text: "No se pudo Insertar, por favor verifica la información",
  });
};

function LoadTablaPrograma(){
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
          render: function (data, type, row) {
            if (row.Estado == 1) {
              return '<p class="text-primary">Activo</p>';
            } else {
              return '<p class="text-danger">Desactivado</p>';
            }
          },
        },
        {
          render: function (data, type, JsonResultRow, meta) {
            const html = `<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" data-toggle="modal" data-target="#modalUpdate" class="btn btn-success"><i class="fas fa-edit"></i></button><a href="/admin/programa/id${JsonResultRow.id_programa}" class="btn btn-warning"><i class="fas fa-user-friends"></i></a></div >`;
            return html;
          },
        },
      ],
    });
}


$("#formEdit").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    let query = await $.ajax({ url: "/admin/programa/updateprograma", type: "PUT", data: t });
    $("#tablePrograma").DataTable().destroy();
    LoadTablaPrograma();
    swal.close();
    $("#modalUpdate").modal("toggle");
    $("#formEdit")[0].reset();
  } catch (error) {
    swal.close();
    console.log(error.responseJSON.error);
    errorMessage();
  }
});

function EliminarInstructorDePrograma(usuario, programa) {
  Swal.fire({
    title: "¿Estás Seguro?",
    text: "No permitir acceso administrativo a usuario",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        query = $.ajax({
          url: "/admin/programa/deleteinstructor",
          type: "DELETE",
          data: { usuario, programa },
        });
        if (query) return  window.location.reload(); 
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  });
}

// Call the dataTables jQuery plugin
$(document).ready(function () {
  LoadTablaPrograma();
  $("#tableProgramaEncargado").DataTable();
  $('#tablePrograma tbody').on( 'click', 'button', function () {
    var data = $("#tablePrograma").DataTable().row( $(this).parents('tr') ).data();
    $("#nombreUpdate").val(data.Nombre);
    $("#estadoUpdate").val(data.Estado);
    $("#idUpdate").val(data.id_programa);
  } );
});