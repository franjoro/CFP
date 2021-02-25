const errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación, verifica la información",
  });
};
const errorMessageEmpresa = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Debe seleccionar su empresa para continuar",
  });
};
const errorMessageArchivo = () => {
  Swal.fire({
    icon: "error",
    title: "Oops... Archivos faltantes",
    text: "Debe subir los archivos obligatorios",
  });
};

const loaderEnviar = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Estamos ingresando la información de su solicitud",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

const loaderArchivos = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Estamos guardando los archivos adjuntados",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
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

let global_empresa_seleccionada = false;
let global_estado_participante = false;

//Contiene información a insertar
let global_data_solicitud;
let global_data_actualizacionEmpresa;
let global_data_cursos;

const AsginarGlobalEmpresa = () => {
  global_data_actualizacionEmpresa = {
    nit: $("#nit").val(),
    aportacion: $("#patronal").val(),
    num_empleados: $("#num_empleados").val(),
    patronal: $("#aportacion").val(),
    id: global_empresa_seleccionada,
  };
  $.ajax({
    url: "/public/updateEmpresaData",
    type: "PUT",
    data: { data: global_data_actualizacionEmpresa },
  });
};

const AsginarGlobalCursos = () => {
  let local = localStorage.getItem("storage");
  if (!local)
    return alert(
      "Algo salio mal, contacta con el equipo de soporte técnico soporte_cfp@ricaldone.edu.sv código de error: LOCALSTORAGE_NOT_EXIST_IN_ASSIGMENT"
    );
  local = JSON.parse(local);
  let ContentHtml = "";
  data = [];
  local.forEach((element, index) => {
    if (!data.includes(element[7])) {
      data.push(element[7]);
      let select = $(`#curso option[value='${element[7]}'] `).text().trim();
      ContentHtml += `
      <label>Curso: <b> ${select}</b> Puede descargar la ficha aquí: <a href="#" onclick="GenerarPdf('${
        element[7]
      }')">DESCARGAR PLANTILLA</a></label>
<div class="input-group">
<div class="custom-file">
  <input type="file" class="custom-file-input ficha" data-next="fichass${
    index + 1
  }" id="ficha${index}" name="ficha${index}" >
  <label class="custom-file-label" id="fichass${index + 1}">Choose file</label>
</div>
</div>
<hr>
      `;
    }
  });
  $("#cursos_files").append(ContentHtml);
  global_data_solicitud = JSON.stringify(local);
  global_data_cursos = JSON.stringify(data);
};

const registrarSolicitud = async () => {
  let participantes = localStorage.getItem("storage");
  const cursos = global_data_cursos;
  const empresa = global_empresa_seleccionada;
  //Validar si existe
  if (!participantes || !cursos || !empresa)
    return alert(
      "Algo salio mal, contacta con el equipo de soporte técnico soporte_cfp@ricaldone.edu.sv código de error: DATA_NOT_COMPLETE"
    );
  try {
    loaderEnviar();
    let query = await $.ajax({
      url: "/public/CreateSolicitud",
      type: "POST",
      data: { cursos, empresa, participantes, programa : $("#id_programa").text()},
    });
    if (query.status) {
      swal.close();
      SendFiles();
      localStorage.removeItem("storage");
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

const SendFiles = async () => {
  //Hacer validaciones aqui Pendiente
  const recibo = $("#recibo")[0].files;
  const cancelacion = $("#cancelacion")[0].files;
  const planilla = $("#planilla")[0].files;
  const cursos = JSON.parse(global_data_cursos);
  
  const fd = new FormData();
  cursos.forEach((element, index) => {
    fd.append(`ficha${index}`, ( $(`#ficha${index}`)[0].files )[0] );
  });

  fd.append("recibo", recibo[0]);
  fd.append("cancelacion", cancelacion[0]);
  fd.append("planilla", planilla[0]);
  fd.append("curso", global_data_cursos);
  fd.append("empresa", global_empresa_seleccionada);
  try {
    loaderArchivos();
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

const GenerarPdf = async (curso) => {
  loader();
  AlumnosParaEnviar = [];
  try {
    alumnos = JSON.parse(global_data_solicitud);
    alumnos.forEach((element) => {
      if (element.includes(curso)) {
        AlumnosParaEnviar.push(element);
      }
    });
    AlumnosParaEnviar = JSON.stringify(AlumnosParaEnviar);
    let query = await $.ajax({
      url: `/public/ficha/${global_empresa_seleccionada}/${curso} `,
      type: "POST",
      data: { alumnos: AlumnosParaEnviar },
    });
    if (query.status) {
      swal.close();
      window.open(`/public/ficha/OpenFile `);
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

$(document).ready(() => {
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
      $.ajax({
        url: "/admin/participantes/add",
        type: "POST",
        data,
      });
    }
  });
  // Llenar tabla
  const populateTable = (data) => {
    $("#tablaParticipantes").DataTable().row.add(data).draw();
  };
  // Borar tabla y localstorage+
  deleteTableAndLocal = () => {
    $("#tablaParticipantes").DataTable().clear().draw();
    localStorage.clear();
  };

  // Verificar si existe y llenar
  const CheckLocalstorage = () => {
    let storage = localStorage.getItem("storage");
    if (storage) {
      storage = JSON.parse(storage);
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

$(document).on("change", ".ficha", function (e) {
  var fileName = e.target.files[0].name;
  $("#" + $(this).data().next).html(fileName);
});

$("#cancelacion").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#cancelacion1").html(fileName);
});
$("#recibo").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#recibo1").html(fileName);
});
$("#planilla").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#planilla1").html(fileName);
});

const ReiniciarInputs = () => {
  $("#cursos_files").html("<div></div>");
};
const VerificarEmpresa = () => {
  if (!global_empresa_seleccionada) {
    errorMessageEmpresa();
  } else {
    AsginarGlobalEmpresa();
    stepper1.next();
  }
};
const VerificarArchivos = () => {
  const recibo = $("#recibo")[0];
  const planilla = $("#planilla")[0];
  if (recibo.files.length == 0 || planilla.files.length == 0) {
    errorMessageArchivo();
  } else {
    registrarSolicitud()
  }
};
