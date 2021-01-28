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
function LoadTablaInstructor(estado = 1) {
  //DataTable Programas
  $("#tablaInstructor").DataTable({
    ajax: "/admin/instructor/table/" + estado,
    destroy: true,
    columns: [
      { data: "DUI" },
      { data: "Nombre" },
      { data: "Email" },
      { data: "Telefono" },
      {
        render: function (data, type, row) {
          if (row.Estado == 1) {
            return '<p class="text-primary">Activo</p>';
          } else {
            return '<p class="text-danger">Inactivo</p>';
          }
        },
      },
      {
        render: function (data, type, row) {
          const html = `<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success" data-toggle="modal" id="btn_editar" data-target="#editModal"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-danger" onclick="changeEstado('${row.Estado}','${row.DUI}')"  ><i class="fas fa-eye-slash"></i></button></div >`;
          return html;
        },
      },
    ],
  });
}
//Cambiar depende del estado
$("#selector").on("change", function () {
  LoadTablaInstructor(this.value);
});
//cambiar estado de instructor de activo a inactivo y viceversa
async function changeEstado(estado, dui) {
  try {
    loader();
    await $.ajax({
      url: "/admin/instructor/changeEstado",
      type: "PUT",
      data: { estado, dui },
    });
    LoadTablaInstructor($("#selector").children("option:selected").val());
    swal.close();
  } catch (error) {
    swal.close();
    console.log(error.responseJSON.error);
    errorMessage();
  }
}
//Agregar nuevo instructor
$("#formInstructor").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
     let data = await $.ajax({
      url: "/admin/instructor/add",
      type: "POST",
      data: t,
    });
    if(data.status){
      LoadTablaInstructor($("#selector").children("option:selected").val());
      swal.close();
      $("#exampleModal").modal("toggle");
      $("#formInstructor")[0].reset();
    }
  } catch (error) {
    swal.close();
    console.log(error)
    errorMessage();
  }
});


//Editar empresa
$("#formInstructor_editar").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
     let data = await $.ajax({
      url: "/admin/instructor/editar",
      type: "PUT",
      data: t,
    });
    if(data.status){
      LoadTablaInstructor($("#selector").children("option:selected").val());
      swal.close();
      $("#editModal").modal("toggle");
      $("#formInstructor_editar")[0].reset();
    }
  } catch (error) {
    console.log(error);
    swal.close();
    errorMessage();
  }
});

// Call the dataTables jQuery plugin
$(document).ready(function () {
  LoadTablaInstructor();
  $('#tablaInstructor tbody').on( 'click', '#btn_editar', function () {
    var data = $("#tablaInstructor").DataTable().row( $(this).parents('tr') ).data();
    console.log(data);
    $("#name_editar").val(data.Nombre);
    $("#DUI_editar").val(data.DUI);
    $("#tel_editar").val(data.Telefono);
    $("#email_editar").val(data.Email);
  } );
});
