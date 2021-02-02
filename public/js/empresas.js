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
    text: "No se pudo realizar la operación",
  });
};
//CARGAR TABLA
function LoadTablaEmpresas(estado = 1) {
  //DataTable Programas
  $("#tableEmpresas").DataTable({
    ajax: "/admin/empresas/table/" + estado,
    destroy: true,
    columns: [
      { data: "Nombre" },
      { data: "Direccion" },
      { data: "Tel" },
      { data: "Nota" },
      {
        render: function (data, type, row) {
          if (row.Estado == 1) {
            return '<p class="text-primary">Activo</p>';
          } else {
            return '<p class="text-danger">Inactivo</p>';
          }
        },
      },
      { data: "Actividad_eco", visible: false },
      { data: "id_empresa", visible: false },
      {
        render: function (data, type, row) {
          const html = `<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success" data-toggle="modal" id="btn_editar" data-target="#editModal"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-danger" onclick="changeEstado('${row.Estado}','${row.id_empresa}')"  ><i class="fas fa-eye-slash"></i></button><a type="button" href="/admin/empresas/contacto/${row.id_empresa}" class="btn btn-info"   ><i class="fa fa-user-friends"></i></a></div >`;
          return html;
        },
      },
    ],
  });
}
//Cambiar depende del estado
$("#selector").on("change", function () {
  LoadTablaEmpresas(this.value);
});
//cambiar estado de empresa de activo a inactivo y viceversa
async function changeEstado(estado, id) {
  try {
    loader();
    let query = await $.ajax({
      url: "/admin/empresas/changeEstado",
      type: "PUT",
      data: { estado, id },
    });
    LoadTablaEmpresas($("#selector").children("option:selected").val());
    swal.close();
  } catch (error) {
    swal.close();
    console.log(error.responseJSON.error);
    errorMessage();
  }
}
//Agregar nueva empresa
$("#formEmpresas").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
     let data = await $.ajax({
      url: "/admin/empresas/add",
      type: "POST",
      data: t,
    });
    if(data.status){
      LoadTablaEmpresas($("#selector").children("option:selected").val());
      swal.close();
      $("#exampleModal").modal("toggle");
      $("#formEmpresas")[0].reset();
    }
  } catch (error) {
    swal.close();
    errorMessage();
  }
});
//Eliminar contacto de una empresa
function EliminarContactoDeEmpresa(contacto,empresa) {
  Swal.fire({
    title: "¿Estás Seguro?",
    text: "Eliminar contacto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        query = $.ajax({
          url: "/admin/empresas/DeleteContacto",
          type: "DELETE",
          data: { contacto, empresa },
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
//Editar empresa
$("#formEmpresasEditar").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
     let data = await $.ajax({
      url: "/admin/empresas/editarEmpresa",
      type: "PUT",
      data: t,
    });
    if(data.status){
      LoadTablaEmpresas($("#selector").children("option:selected").val());
      swal.close();
      $("#editModal").modal("toggle");
      $("#formEmpresasEditar")[0].reset();
    }
  } catch (error) {
    console.log(error);
    swal.close();
    errorMessage();
  }
});
// Call the dataTables jQuery plugin
$(document).ready(function () {
  LoadTablaEmpresas();

  $("#tablaContacto").DataTable();
  $('#tablaContacto tbody').on( 'click', '#editar', function () {
    var data = $("#tablaContacto").DataTable().row( $(this).parents('tr') ).data();
    id = $(this).data().id_contacto;
    $("#name_editar").val(data[0]);
    $("#tel_editar").val(data[1]);
    $("#cel_editar").val(data[2]);
    $("#puesto_editar").val(data[3]);
    $("#email_editar").val(data[4]);
    $("#id_contacto").val(id);
  } );




  $('#tableEmpresas tbody').on( 'click', '#btn_editar', function () {
    var data = $("#tableEmpresas").DataTable().row( $(this).parents('tr') ).data();
    $("#name_edit").val(data.Nombre);
    $("#tel_edit").val(data.Tel);
    $("#actividad_edit").val(data.Actividad_eco);
    $("#direccion_edit").val(data.Direccion);
    $("#nota_edit").val(data.Nota);
    $("#id_empresa").val(data.id_empresa);
  } );


  


  
});
