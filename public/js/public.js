errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Debes rellenar toda la información",
  });
};

let global_empresa_seleccionada;
  let global_estado_participante = false;

const updateEmpresaInfo = () => {
  $("#collpaseOne").hide();
  $("#collpasetres").hide();
  $("#collapseTwo").show();
  try {
    data = {
      nit: $("#nit").val(),
      aportacion: $("#patronal").val(),
      num_empleados: $("#num_empleados").val(),
      patronal: $("#aportacion").val(),
      id: global_empresa_seleccionada,
    };
    $.ajax({ url: "/public/updateEmpresaData", type: "PUT", data });
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

$("#dui").blur(async function () {
  global_estado_participante = false;
  try {
    data = await $.ajax({ url: `/admin/participantes/get/${$(this).val()}` });
    if (data.status) {
      global_estado_participante = true;
      values = data.data[0];
      $("#nombre").val(values.Nombre);
      $("#email").val(values.Email);
      $("#tel").val(values.Telefono);
      $("#genero").val(values.Genero);
      $("#isss").val(values.ISSS);
      $("#cargo").val(values.Cargo);
    }
  } catch (error) {
    global_estado_participante = false;
    console.log(error);
  }
});

$(document).ready(() => {
  // Creacion de los dropzone
  $("#select_empresa").on("select2:select", async (e) => {
    $("#update_form").css("display", "block");
    const param = e.params.data.id;
    global_empresa_seleccionada = e.params.data.id;
    try {
      data = await $.ajax({
        url: "/public/getDataEmpresas",
        type: "POST",
        data: { param },
      });
      $("#nit").val(data.data.NIT);
      $("#patronal").val(data.data.Num_Patronal);
      $("#num_empleados").val(data.data.Num_Empleados);
      $("#num_empleados").val(data.data.Num_Empleados);
      $("#aportacion").val(data.data.Aportacion_insaforp);
      console.log(data);
    } catch (error) {
      console.log(error);
      errorMessage();
    }
  });

  // Mascaras para dui y telefono
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  // Select de empresas
  $("#select_empresa").select2({
    width: "100%",
    ajax: {
      url: "/public/getEmpresas",
      type: "post",
      dataType: "json",
      delay: 250,
      data (params) {
        return {
          searchTerm: params.term, // search term
        };
      },
      results (response) {
        $.map(response, (item) => ({
            id: item.id,
            text: item.text,
          }));
      },
      cache: true,
    },
  });

  // Cargar tabla
  $("#tablaParticipantes").DataTable({
    searching: false,
    paging: false,
    bInfo: false,
  });

  $("#botonAdd").on("click", () => {
    const dui = $("#dui").val();
      const nombre = $("#nombre").val();
      const isss = $("#isss").val();
      const cargo = $("#cargo").val();
      const tel = $("#tel").val();
      const email = $("#email").val();
      const genero = $("#genero").val();
      const cursoCodigo = $("#curso").children("option:selected").val();
    curso_text = $("#curso").children("option:selected").text();

    if (
      validate.isEmpty(dui) ||
      validate.isEmpty(nombre) ||
      validate.isEmpty(tel) ||
      validate.isEmpty(email)
    ) {
      return errorMessage();
    }
    data = [
      dui,
      nombre,
      tel,
      isss,
      cargo,
      email,
      curso_text.trim(),
      cursoCodigo.trim(),
      genero,
    ];
    populateTable(data);
    create_OR_storage_localstorage(data);
    $('input[type="text"]').val("");
    if (!global_estado_participante) {
      data = { dui, 'name': nombre, tel, email, genero, tel, isss, cargo };
      console.log(data);
      $.ajax({
        url: "/admin/participantes/add",
        type: "POST",
        data,
      }).then((data) => {
        console.log(data);
      });
    }
  });
  // Llenar tabla
  populateTable = (data) => {
    $("#tablaParticipantes").DataTable().row.add(data).draw();
  };
  // Borar tabla y localstorage+
  deleteTableAndLocal = () => {
    $("#tablaParticipantes").DataTable().clear().draw();
    localStorage.clear();
  };

  // Verificar si existe y llenar
  CheckLocalstorage = () => {
    let storage = localStorage.getItem("storage");
    if (storage) {
      storage = JSON.parse(storage);
      console.log(storage);
      storage.forEach((element) => {
        populateTable(element);
      });
    }
    
  };
  CheckLocalstorage();
  // Crear o almacenar localstorage
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
