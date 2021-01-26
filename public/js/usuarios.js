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

table = () => {
  //DataTable Usuarios
  $("#tableUsuario").DataTable({
    ajax: "/admin/usuarios/table",
    columns: [
      { data: "id_usuario" },
      { data: "Nombre" },
      { data: "Email" },
      {
        render: function (data, type, row) {
          if (row.Role == 1) {
            return "Administrador";
          } else {
            return "Coordinador";
          }
        },
      },
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
        "render": function (data, type, JsonResultRow, meta) {
          const html =`<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></button></div >`;
          return html;
        }
      },
    ],
  });
};


$("#formUsuarios").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    await $.ajax({ url: "/admin/usuarios/add", type: "POST", data: t });
    $("#tableUsuario").DataTable().destroy();
    table();
    swal.close();
    $("#exampleModal").modal("toggle");
    $("#formUsuarios")[0].reset();
  } catch (error) {
    swal.close();
    console.log(error.responseJSON.error);
    errorMessage();
  }
});



$("#formEdit").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    let query = await $.ajax({ url: "/admin/usuarios/edit", type: "POST", data: t });
    console.log(query);
    $("#tableUsuario").DataTable().destroy();
    table();
    swal.close();
    $("#editModal").modal("toggle");
    $("#formEdit")[0].reset();
  } catch (error) {
    swal.close();
    console.log(error.responseJSON.error);
    errorMessage();
  }
});

$(document).ready(function () {
  table();
  $('#tableUsuario tbody').on( 'click', 'button', function () {
    var data = $("#tableUsuario").DataTable().row( $(this).parents('tr') ).data();
    $("#userEdit").val(data.id_usuario);
    $("#emailEdit").val(data.Email);
    $("#nameEdit").val(data.Nombre);
    $('#EstadoEdit').val(data.Estado);
    $('#RoleEdit').val(data.Role);
  } );
});