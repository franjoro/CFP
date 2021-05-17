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
// CARGAR TABLA
function LoadTablaEmpresas(estado = 1) {
  // DataTable Programas
  $("#tableEmpresas").DataTable({
    ajax: `/admin/empresas/table/${estado}`,
    destroy: true,
    columns: [
      { data: "Nombre" },
      { data: "NIT" },
      { data: "Tel" },
      { data: "email" },

      {
        render(data, type, row) {
          if (row.Estado == 1) {
            return '<p class="text-primary">Activo</p>';
          }
          return '<p class="text-danger">Inactivo</p>';
        },
      },
      {
        render(data, type, row) {
          const html = `<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success" data-toggle="modal" id="btn_editar" data-target="#editModal"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-danger" onclick="changeEstado('${
            row.Estado
          }','${
            row.id_empresa
          }')"  ><i class="fas fa-eye-slash"></i></button><a type="button" href="/admin/empresas/contacto/${
            row.id_empresa
          }" class="btn btn-info"   ><i class="fa fa-user-friends"></i></a><a type="button" onclick="ChangePassword('${row.NIT}')" class="btn btn-warning"   ><i class="fas fa-key"></i></a></div >`;
          return html;
        },
      },
      { data: "id_empresa", visible: false },
      { data: "Direccion", visible: false },
      { data: "Aportacion_insaforp", visible: false },
      { data: "Num_Patronal", visible: false },
      { data: "Num_Empleados", visible: false },
    ],
  });
}
// Cambiar depende del estado
$("#selector").on("change", function () {
  LoadTablaEmpresas(this.value);
});
// cambiar estado de empresa de activo a inactivo y viceversa
async function changeEstado(estado, id) {
  try {
    loader();
    const query = await $.ajax({
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

$("#formEditPassword").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();

  try {
    const data = await $.ajax({ url: "/admin/empresas/Password", type: "PUT", data:  t  });
    if(data.status){
      swal.close();
      Swal.fire("¡Contraseña actualizada!");
      $("#Password_Modal").modal("hide");
    }
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
});
// Agregar nueva empresa
$("#formEmpresas").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    const data = await $.ajax({
      url: "/admin/empresas/add",
      type: "POST",
      data: t,
    });
    if (data.status) {
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

// Eliminar contacto de una empresa
function EliminarContactoDeEmpresa(contacto, empresa) {
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
        if (query) return window.location.reload();
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
// Editar empresa
$("#formEmpresasEditar").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    const data = await $.ajax({
      url: "/admin/empresas/editarEmpresa",
      type: "PUT",
      data: t,
    });
    if (data.status) {
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
const ChangePassword = (id) => {
  $("#Password_Modal").modal("show");
  $("#nit_change").val(id);
};

// Call the dataTables jQuery plugin
$(document).ready(() => {
  LoadTablaEmpresas();

  $("#tablaContacto").DataTable();
  $("#tablaContacto tbody").on("click", "#editar", function () {
    const data = $("#tablaContacto")
      .DataTable()
      .row($(this).parents("tr"))
      .data();
    id = $(this).data().id_contacto;
    $("#name_editar").val(data[0]);
    $("#tel_editar").val(data[1]);
    $("#cel_editar").val(data[2]);
    $("#puesto_editar").val(data[3]);
    $("#email_editar").val(data[4]);
    $("#id_contacto").val(id);
  });

  $("#tableEmpresas tbody").on("click", "#btn_editar", function () {
    const data = $("#tableEmpresas")
      .DataTable()
      .row($(this).parents("tr"))
      .data();
    $("#name_edit").val(data.Nombre);
    $("#tel_edit").val(data.Tel);
    $("#actividad_edit").val(data.Actividad_eco);
    $("#direccion_edit").val(data.Direccion);
    $("#nota_edit").val(data.Nota);
    $("#id_empresa").val(data.id_empresa);
    $("#email_edit").val(data.email);
    $("#nempleado_edit").val(data.Num_Empleados);
    $("#aportacion_edit").val(data.Aportacion_insaforp);
  });



  $("#actividad").select2({
    width: "100%",
    ajax: {
      url: "/admin/empresas/actividades",
      type: "post",
      dataType: "json",
      delay: 250,
      data(params) {
        return {
          searchTerm: params.term, // search term
        };
      },
      results(response) {
        $.map(response, (item) => ({
          id: item.id,
          text: item.text,
        }));
      },
      cache: true,
    },
  });
});

$("#tel_edit").mask("0000-0000");
$("#aportacion_edit").mask("000,000,000,000,000.00", { reverse: true });

