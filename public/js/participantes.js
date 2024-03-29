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
  // DataTable Participantes
  $("#tableParticipantes").DataTable({
    ajax: "/admin/participantes/table",
    columns: [
      { data: "DUI" },
      { data: "Nombre" },
      { data: "Telefono" },
      { data: "Email" },
      { data: "Genero" },
      {
        render(data,type,row){
          if(row.ISSS !=""){
            return row.ISSS
          }else{
            return " - "
          }
        }
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


$("#formparticipantes").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  loader();
  try {
    const data = await $.ajax({ url: "/admin/participantes/add", type: "POST", data: t });
    $("#tableParticipantes").DataTable().destroy();
    table();
    swal.close();
    $("#exampleModal").modal("toggle");
  //  $("#formparticipantes")[0].reset();
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
    const query = await $.ajax({ url: "/admin/participantes/edit", type: "PUT", data: t });
    console.log(query);
    $("#tableParticipantes").DataTable().destroy();
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

$(document).ready(() => {
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  $("#duiNew").mask("00000000-0");
 
  table();
  $('#tableParticipantes tbody').on( 'click', 'button', function () {
    const data = $("#tableParticipantes").DataTable().row( $(this).parents('tr') ).data();
    $("#duiEdit").val(data.DUI);
    $("#duiNew").val(data.DUI);
    $("#emailEdit").val(data.Email);
    $("#nameEdit").val(data.Nombre);
    $('#telEdit').val(data.Telefono);
    $('#isss_edit').val(data.ISSS);
    $("#genero_edit").val(data.Genero);
    $("#cargo_edit").val(data.Cargo);
    console.log(data.correlativo_planilla);
    $("#correlativo_planilla_edit").val(data.correlativo_planilla);
  } );
});