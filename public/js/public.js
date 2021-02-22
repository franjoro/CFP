const errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación",
  });
};

const loader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Procesando información",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

let global_empresa_seleccionada;
let global_estado_participante = false;
let global_data_solicitud;

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

const registrarSolicitud = async () => {
  let local = localStorage.getItem("storage");
  local = local;
  if (!local)
    return alert(
      "Algo salio mal, contacta con el equipo de soporte técnico soporte_cfp@ricaldone.edu.sv código de error: localstorage"
    );
  $("#collpaseOne").hide();
  $("#collapseTwo").hide();
  $("#collpasetres").show();

  try {
    let query = await $.ajax({
      url: "/public/CreateSolicitud",
      type: "POST",
      data: {
        data: local,
        empresa: global_empresa_seleccionada,
      },
    });
    global_data_solicitud = query.data;
    localStorage.removeItem("storage");
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

const GenerarPdf = () => {
  window.open(
    `/public/ficha/${global_empresa_seleccionada}/${JSON.stringify(
      global_data_solicitud
    )} `
  );
};
const SendFiles = async () => {
  //Hacer validaciones aqui Pendiente
  var fd = new FormData();
  var ficha = $("#ficha")[0].files;
  var recibo = $("#recibo")[0].files;
  var cancelacion = $("#cancelacion")[0].files;
  var planilla = $("#planilla")[0].files;

  cursos = [];
  global_data_solicitud.forEach((element, index) => {
    if ((index + 1) % 2) {
      cursos.push(element);
    }
  });

  fd.append("ficha", ficha[0]);
  fd.append("recibo", recibo[0]);
  fd.append("cancelacion", cancelacion[0]);
  fd.append("planilla", planilla[0]);
  fd.append("curso", JSON.stringify(cursos));
  fd.append("empresa", global_empresa_seleccionada);

  try {
    loader();
    let datos = await $.ajax({
      url: "/public/EnviarFiles",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
    });
    swal.close();

    Swal.fire({
      icon: "success",
      title: "Solicitud enviada correctamente",
      showConfirmButton: false,
    });
    console.log(datos);
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

$(document).ready(() => {
  // Creacion de los dropzone
  $("#select_empresa").on("select2:select", async (e) => {
    $("#update_form").css("display", "block");
    const param = e.params.data.id;
    global_empresa_seleccionada = e.params.data.id;
    try {
      loader();
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
      swal.close();
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
    CreateOrStorage(data);
    $('input[type="text"]').val("");
    if (!global_estado_participante) {
      data = { dui, name: nombre, tel, email, genero, tel, isss, cargo };
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
  const populateTable = (data) => {
    $("#tablaParticipantes").DataTable().row.add(data).draw();
  };
  // Borar tabla y localstorage+
  // eslint-disable-next-line no-undef
  deleteTableAndLocal = () => {
    $("#tablaParticipantes").DataTable().clear().draw();
    localStorage.clear();
  };

  // Verificar si existe y llenar
  const CheckLocalstorage = () => {
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
  const CreateOrStorage = (data) => {
    let storage = localStorage.getItem("storage");
    if (!storage) {
      let DataJson = [data];
      DataJson = JSON.stringify(DataJson);
      return localStorage.setItem("storage", DataJson);
    }
    storage = JSON.parse(storage);
    storage.push(data);
    storage = JSON.stringify(storage);
    localStorage.clear();
    localStorage.setItem("storage", storage);
    return 1;
  };
});
