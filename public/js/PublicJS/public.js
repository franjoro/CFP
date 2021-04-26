const error = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error,
  });
};
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const loaderEnviar = () => {
  Swal.fire({
    title: "Por favor, Espere",
    allowOutsideClick: !1,
    showConfirmButton: false,
    html: `<span id="texto"> Estamos ingresando la información de su solicitud <span> <progress id="progreso" value="0" max="100">70 %</progress>`,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};
const archivosLoader = () =>{
  Swal.fire({
    title: "Por favor, Espere",
    allowOutsideClick: !1,
    showConfirmButton: false,
    html: `<span id="texto"> Estamos guardando tus archivos <span> <progress id="progreso" value="50" max="100"></progress>`,
    willOpen: () => {
      Swal.showLoading();
    },
  });
}
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
let global_data_firmante;
const AsginarGlobalEmpresa = () => {
  global_data_actualizacionEmpresa = {
    aportacion: $("#aportacion").val(),
    num_empleados: $("#num_empleados").val(),
    id: global_empresa_seleccionada,
  };
  global_data_firmante = {
    primera: $("#primerape").val(),
    segundoa: $("#segunape").val(),
    nombres: $("#nombres").val(),
    cargo: $("#cargof").val(),
  };
  $.ajax({
    url: "/public/updateEmpresaData",
    type: "PUT",
    data: global_data_actualizacionEmpresa,
  });
};
const AsginarGlobalCursos = () => {
  let local = localStorage.getItem("storage");
  if (!local) return error("Debe ingresar participantes para continuar");
  local = JSON.parse(local);
  let ContentHtml = "";
  data = [];
  let i = 0;
  local.forEach((element, index) => {
    if (!data.includes(element[7])) {
      data.push(element[7]);
      ContentHtml += `
      <hr><div class="card"><h5 class="card-header"><i class="fas fa-arrow-right"></i>${element[6]}</h5><div class="card-body"><h5 class="card-title">Adjunte los siguientes documentos:</h5><div class="row"><div class="col-md-3"><p class="text-justify">1. Solicitud de capacitación firmada y sellada. Puede descargar la ficha aquí: <i class="fas fa-arrow-right"></i> <a onclick="GenerarPdf('${element[7]}')" href="#">DESCARGAR PLANTILLA</a></p></div><div class="col-md-3"><p class="text-justify">2. Recibo de ingresos por cotización (Recibo de aportación) del último mes cancelado - <i class="fas fa-arrow-right"></i> <a target="_blank" href="/static/files/recibo.pdf" class="text-danger">VER EJEMPLO</a></p></div><div class="col-md-3"><p class="text-justify">Comprobante de pago en línea (Opcional) del último mes cancelado - <i class="fas fa-arrow-right"></i> <a target="_blank" href="/static/files/cancelacion.pdf" class="text-danger">VER EJEMPLO</a></p></div><div class="col-md-3"><p class="text-justify">3. Planilla ISSS (Resaltar colaboradores a inscribir) <i class="fas fa-arrow-right"></i> <a target="_blank" href="/static/files/planilla.pdf" class="text-danger">VER EJEMPLO</a></p></div></div><div class="row"><div class="col-md-3"><div class="custom-file"><input type="file" class="custom-file-input" name="ficha${i}" data-i="FichaLabel${i}"  id="ficha${i}" > <label class="custom-file-label" id="FichaLabel${i}"  for="customFile">Choose file</label></div></div><div class="col-md-3"><div class="custom-file"><input type="file" class="custom-file-input" name="recibo${i}"  data-i="ReciboLabel${i}"  id="recibo${i}"> <label id="ReciboLabel${i}" class="custom-file-label" for="customFile">Choose file</label></div></div><div class="col-md-3"><div class="custom-file"><input type="file" class="custom-file-input" name="cancelacion${i}" data-i="CancelacionLabel${i}"  id="cancelacion${i}" > <label id="CancelacionLabel${i}" class="custom-file-label" for="customFile">Choose file</label></div></div><div class="col-md-3"><div class="custom-file"><input type="file" class="custom-file-input" multiple max="10" name="planilla${i}" data-i="PlanillaLabel${i}"   id="planilla${i}"> <label id="PlanillaLabel${i}" class="custom-file-label" for="customFile">Choose file</label></div></div></div></div></div><hr>
      `;
      i = i + 1;
    }
  });
  $("#cursos_files").append(ContentHtml);
  global_data_solicitud = JSON.stringify(local);
  global_data_cursos = JSON.stringify(data);
  stepper1.next();
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
    const alerta = await Swal.fire({
      title: "¿Deseá enviar la solicitud?",
      text:
        "Por favor verificar que la información ingresada sea correcta antes de enviar.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, enviar",
    });
    if (alerta.isConfirmed) {
      loaderEnviar();
      let query = await $.ajax({
        url: "/public/CreateSolicitud",
        type: "POST",
        data: {
          cursos,
          empresa,
          participantes,
          programa: $("#id_programa").text(),
        },
      });
      if (query.status) {
        SendFiles();
        localStorage.removeItem("storage");
      }
    }
  } catch (error) {
    console.log(error);
    if (error == "CURSO_EXISTENTE")
      return error(
        "Su empresa ya cuenta con una solicitud pendiente en un curso seleccionado , por favor comuniquese con el encargado del programa o soporte técnico"
      );
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte "
    );
  }
};
const SendFiles = async () => {
  const cursos = JSON.parse(global_data_cursos);
  const fd = new FormData();
  cursos.forEach((element, index) => {
    let CantidadPlanilla = $(`#planilla${index}`)[0].files.length;

    fd.append(`ficha${index}`, $(`#ficha${index}`)[0].files[0]);
    fd.append(`recibo${index}`, $(`#recibo${index}`)[0].files[0]);
    fd.append(`cancelacion${index}`, $(`#cancelacion${index}`)[0].files[0]);
    fd.append("CantidadPlanilla", CantidadPlanilla);
    for (let i = 0; i < CantidadPlanilla; i++) {
      fd.append(`planilla${index}${i}`, $(`#planilla${index}`)[0].files[i]);
    }
  });
  fd.append("curso", global_data_cursos);
  fd.append("empresa", global_empresa_seleccionada);
  try {
    archivosLoader();
    await $.ajax({
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
    window.location.href = "/public/gracias";
  } catch (error) {
    console.log(error);
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte "
    );
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
    firmante = JSON.stringify(global_data_firmante);

    let query = await $.ajax({
      url: `/public/ficha/${global_empresa_seleccionada}/${curso} `,
      type: "POST",
      data: { alumnos: AlumnosParaEnviar, firmante },
    });
    if (query.status) {
      swal.close();
      window.open(`/public/ficha/OpenFile `);
    }
  } catch (error) {
    console.log(error);
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte "
    );
  }
};
$(document).ready(() => {
  global_empresa_seleccionada = $("#id_empresa").val();
  // Mascaras para dui y telefono
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  $("#nit").mask("0000-000000-000-0");
  $("#aportacion").mask("000,000,000,000,000.00", { reverse: true });
  // Cargar tabla
  $("#tablaParticipantes").DataTable({
    columnDefs: [
      {
        targets: [7],
        visible: false,
      },
      {
        targets: [9],
        data: null,
        defaultContent: `<button class='btn btn-sm btn-danger'><i class="far fa-trash-alt"></i></button>`,
      },
    ],
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
      return error(
        "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte "
      );
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
    Toast.fire({
      icon: "success",
      title: "Agregado correctamente",
    });
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
//Borrar row de la tabla
$("#tablaParticipantes tbody").on("click", "button", function () {
  const table = $("#tablaParticipantes").DataTable().row();
  let dui = table.data()[0];
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  for (var i = 0; i < storage.length; i++) {
    if (storage[i][0] == dui) {
      storage.splice(i, 1);
    }
  }
  storage = JSON.stringify(storage);
  localStorage.clear();
  localStorage.setItem("storage", storage);
  table.remove().draw();
});
$(document).on("change", ".custom-file-input", function (e) {
  const { i } = $(this).data();
  let ext = $(this).val().split(".").pop();
  ext = ext.toLowerCase();
  if ($(this).val() != "") {
    if (ext == "pdf" || ext == "png" || ext == "jpeg" || ext == "jpg") {
      if(e.target.files.length >10 ){
        $(this).val("");
        return error(
          "Unicamente se permite adjuntar 10 archivos"
        );
      }
      $(`#${i}`).html(e.target.files[0].name);
      return;
    } else {
      $(this).val("");
      error(
        "Deber verficar el formato del archivo adjunto. Formatos permitidos:  PDF, PNG, JPEG)"
      );
    }
  }
});
const ReiniciarInputs = () => {
  $("#cursos_files").html("<div></div>");
};
const VerificarEmpresa = () => {
  AsginarGlobalEmpresa();
  stepper1.next();
};
const VerificarArchivos = () => {
  const cursos = JSON.parse(global_data_cursos);
  try {
    cursos.forEach((element, index) => {
      if (!$(`#ficha${index}`)[0].files.length)
        throw new Error("No se permite la ficha vacía");
      if (!$(`#recibo${index}`)[0].files.length)
        throw new Error("No se permite el recibo vacío");
      if (!$(`#planilla${index}`)[0].files.length)
        throw new Error("No se permite la planilla vacía");
    });
    registrarSolicitud();
  } catch (err) {
    error("Debe subir los archivos obligatorios " + err);
  }
};
