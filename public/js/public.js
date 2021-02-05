errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Debes rellenar toda la información",
  });
};
$(document).ready(function () {
  //Mascaras para dui y telefono
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  //Select de empresas
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

  //Cargar tabla
  $("#tablaParticipantes").DataTable({
    searching: false,
    paging: false,
    bInfo: false,
  });

  $("#botonAdd").on("click", function () {
    let dui = $("#dui").val(),
      nombre = $("#nombre").val(),
      tel = $("#tel").val(),
      email = $("#email").val(),
      genero = $("#genero").val(),
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
    data = [dui, nombre, tel, email, curso_text, cursoCodigo, genero];
    populateTable(data);
    create_OR_storage_localstorage(data);
    $('input[type="text"]').val("");
  });
  //Llenar tabla
  populateTable = (data) => {
    $("#tablaParticipantes").DataTable().row.add(data).draw();
  };
  //Borar tabla y localstorage
  deleteTableAndLocal = () => {
    $("#tablaParticipantes").DataTable().clear().draw();
    localStorage.clear();
  };

  //Verificar si existe y llenar
  CheckLocalstorage = () => {
    let storage = localStorage.getItem("storage");
    if (storage) {
      storage = JSON.parse(storage);
      console.log(storage);
      storage.forEach((element) => {
        populateTable(element);
      });
    }
    return;
  };
  CheckLocalstorage();
  //Crear o almacenar localstorage
  create_OR_storage_localstorage = (data) => {
    let storage = localStorage.getItem("storage");
    if (!storage) {
      data_json = [data];
      data_json = JSON.stringify(data_json);
      return localStorage.setItem("storage", data_json);
    }
    storage = JSON.parse(storage);
    storage.push(data);
    storage = JSON.stringify(storage);
    localStorage.clear();
    localStorage.setItem("storage", storage);
  };
});
