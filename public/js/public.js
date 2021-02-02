errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Debes rellenar toda la información",
  });
};
$(document).ready(function () {
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  $("#select_empresa").select2({
    width: "100%",
    ajax: {
      url: "/public/getEmpresas",
      type: "post",
      dataType: "json",
      delay: 250,
      data: function (params) {
        return {
          searchTerm: params.term, // search term
        };
      },
      results: function (response) {
        $.map(response, function (item) {
          return {
            id: item.id,
            text: item.text,
          };
        });
      },

      cache: true,
    },
  });

  let t = $("#tablaParticipantes").DataTable({
    searching: false,
    paging: false,
    bInfo: false,
  });

  $("#botonAdd").on("click", function () {
    let dui = $("#dui").val(),
      nombre = $("#nombre").val(),
      tel = $("#tel").val(),
      email = $("#email").val(),
      cursoCodigo = $("#curso").children("option:selected").val();
    curso_text = $("#curso").children("option:selected").text();
    if (
      validate.isEmpty(dui) ||
      validate.isEmpty(nombre) ||
      validate.isEmpty(tel) ||
      validate.isEmpty(email)
    ) {
      return errorMessage();
    }

    $("#tablaParticipantes")
      .DataTable()
      .row.add([dui, nombre, tel, email, curso_text, cursoCodigo ])
      .draw();
      $('input[type="text"]').val('');

  });
});
