const error = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    html: error,
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
const archivosLoader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    allowOutsideClick: !1,
    showConfirmButton: false,
    html: `<span id="texto"> Estamos guardando tus archivos <span> <progress id="progreso" value="50" max="100"></progress>`,
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
let global_data_firmante;

localStorage.removeItem('paso');
const seccion =() =>{
  if(localStorage.getItem('paso') == 2){
    stepper1.next();
    AsginarGlobalEmpresa();
  }
  if(localStorage.getItem('paso') == 3){
    stepper1.next();
    stepper1.next();
    AsginarGlobalEmpresa();
    AsginarGlobalCursos();
  }
}
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
  console.log($("#id_program").val())
  $.ajax({
    url: `/configuration-courses/read/${$("#id_program").val()}`,
    type: "GET"
  }).then((data)=>{
    Swal.fire({
      icon: 'warning',
      title: 'IMPORTANTE',
      html:`<p>Los documentos de respaldo para esta inscripción, deben corresponder al mes de: <span><h4 style="text-transform: uppercase;"><b>${data[0].month_documentation}</b></h4></span></p>`
    });
    
  });

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
      <hr><div class="card">
        <h5 class="card-header">
          <i class="fas fa-arrow-right"></i>${element[6]}
        </h5>
        <div class="card-body">
        <h5 class="card-title">Adjunte los siguientes documentos:</h5>
        <div class="row"><div class="col-md-3">
          <p class="text-justify">1. Solicitud de capacitación firmada y sellada. Puede descargar la ficha aquí: 
            <i class="fas fa-arrow-right"></i> 
            <a onclick="GenerarPdf('${element[7]}', '${$("#id_program").val()}')" href="#">DESCARGAR PLANTILLA</a>
          </p>
        </div>
        <div class="col-md-3">
          <p class="text-justify">2. Recibo de ingresos por cotización (Recibo de aportación) del último mes cancelado - 
            <i class="fas fa-arrow-right"></i> 
            <a target="_blank" href="/static/files/recibo.pdf" class="text-danger">VER EJEMPLO</a>
          </p></div><div class="col-md-3">
          <p class="text-justify">Comprobante de pago en línea (Opcional) del último mes cancelado - 
            <i class="fas fa-arrow-right"></i> 
            <a target="_blank" href="/static/files/cancelacion.pdf" class="text-danger">VER EJEMPLO</a>
          </p>
        </div>
        <div class="col-md-3">
          <p class="text-justify">3. Planilla ISSS (Resaltar colaboradores a inscribir) 
          <i class="fas fa-arrow-right"></i> 
          <a target="_blank" href="/static/files/planilla.pdf" class="text-danger">VER EJEMPLO</a>
          </p>
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" name="ficha${i}" data-i="FichaLabel${i}"  id="ficha${i}" > 
              <label class="custom-file-label" id="FichaLabel${i}"  for="customFile">Choose file</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" multiple max="5" name="recibo${i}"  data-i="ReciboLabel${i}"  id="recibo${i}"> 
              <label id="ReciboLabel${i}" class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" multiple max="5" name="cancelacion${i}" data-i="CancelacionLabel${i}"  id="cancelacion${i}" > 
              <label id="CancelacionLabel${i}" class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <div class="col-md-3"><div class="custom-file">
            <input type="file" class="custom-file-input" multiple max="10" name="planilla${i}" data-i="PlanillaLabel${i}"   id="planilla${i}"> 
            <label id="PlanillaLabel${i}" class="custom-file-label" for="customFile">Choose file</label>
          </div>
        </div></div></div></div><hr>
      `;
      i = i + 1;
    }
  });
  $("#cursos_files").append(ContentHtml);
  global_data_solicitud = JSON.stringify(local);
  global_data_cursos = JSON.stringify(data);
  localStorage.setItem('paso',3);
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
  } catch (e) {
    console.log(e);
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte <b> errorcode: </b> " +
        e.responseJSON.error
    );
  }
};
const SendFiles = async () => {
  const cursos = JSON.parse(global_data_cursos);
  const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
  cursos.forEach((element, index) => {
    fd.append(`ficha${index}`, $(`#ficha${index}`)[0].files[0]);

    //Recolectamos la longitud de archivos almacenados tanto en plantilla, recibo y cancelacion
    let CantidadPlanilla = $(`#planilla${index}`)[0].files.length;
    let CantidadRecibo = $(`#recibo${index}`)[0].files.length;
    let CantidadCancelacion = $(`#cancelacion${index}`)[0].files.length;

    //Usamos append para anidar la cantidad de planilla al FormData fd para manejar documentos
    fd.append("CantidadPlanilla", CantidadPlanilla);
    fd.append("CantidadRecibo", CantidadRecibo);
    fd.append("CantidadCancelacion", CantidadCancelacion);

    for (let i = 0; i < CantidadRecibo; i++) {
      fd.append(`recibo${index}${i}`, $(`#recibo${index}`)[0].files[i]);
    }
    for (let i = 0; i < CantidadCancelacion; i++) {
      fd.append(`cancelacion${index}${i}`, $(`#cancelacion${index}`)[0].files[i]);
    }
    for (let i = 0; i < CantidadPlanilla; i++) {
      fd.append(`planilla${index}${i}`, $(`#planilla${index}`)[0].files[i]);
    }
  });
  fd.append("curso", global_data_cursos);
  fd.append("empresa", global_empresa_seleccionada);
  try {
    archivosLoader();
    const respuesta = await $.ajax({
      url: "/public/EnviarFiles",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
    });
    console.log(respuesta);
    swal.close();
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada correctamente",
        showConfirmButton: false,
      });
      window.location.href = "/public/gracias";  
  } catch (e) {
    console.log(e);
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte  <b> errorcode: </b>  " +
        e.responseJSON.error
    );
  }
};


$("#dui").blur(async function () {//cuando pierde el foco es diferente al onfocus 
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
      $("#txtCorrelativoPlanilla").val(values.correlativo_planilla);
    }
  } catch (error) {
    global_estado_participante = false;
  }
});
const GenerarPdf = async (curso, program) => {
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
      data: { alumnos: AlumnosParaEnviar, firmante, program },
    });
    if (query.status) {
      swal.close();
      window.open(`/public/ficha/OpenFile `);
    }
  } catch (e) {
    console.log(e);
    error(
      "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte"
    );
  }
};
$(document).ready(() => {
  //seccion();
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
    const storage = localStorage.getItem("storage");
    if(JSON.parse(storage) == null){
      inscribirParticipantesTabla();
    }else{
      const nameCourse = $("#curso").children("option:selected").text().trim().toLowerCase().replace(/ /g, "");
      let countCourse = 0;
      for (let i = 0; i < JSON.parse(storage).length; i++) {
        const element = (JSON.parse(storage)[i][6].trim().toLowerCase().replace(/ /g, ""));
        if(element == nameCourse){
          countCourse ++;
        }
      }
      if(
        ($("#id_program").val() == 29 && countCourse < 10) || 
        ($("#id_program").val() == 30 && countCourse < 7)
        )
      {
        inscribirParticipantesTabla();
      }else{
        if($("#id_program").val() == 29){
          return error("Unicamente se permite agregar 10 participantes");
        }
        if($("#id_program").val() == 30){
          return error("Unicamente se permite agregar 7 participantes");
        }
      }
    }
  });

  const inscribirParticipantesTabla = ()=>{
    // localStorage.removeItem('nParticipantes');
      const dui = $("#dui").val();
      const nombre =  capitalize ($("#nombre").val());
      const isss = $("#isss").val();
      const cargo = $("#cargo").val();
      const tel = $("#tel").val();
      const email = $("#email").val();
      const genero = $("#genero").val();
      const cursoCodigo = $("#curso").children("option:selected").val();
      const correlativo_planilla = $("#txtCorrelativoPlanilla").val().trim();
      curso_text = $("#curso").children("option:selected").text();
      if (
        !dui ||
        !nombre ||
        !isss ||
        !tel ||
        !email ||
        !genero || 
        !cursoCodigo ||
        !correlativo_planilla
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
        correlativo_planilla.trim(),
      ];
      populateTable(data);
      CreateOrStorage(data);
      Toast.fire({
        icon: "success",
        title: "Agregado correctamente",
      });

    // ================ VERIFICAR LONGITUD DE PARTICIPANTES ================================
      // console.log(localStorage.getItem('nParticipantes'));
      // if(localStorage.getItem('nParticipantes') != undefined){
      //   console.log(localStorage.getItem('nParticipantes'));
      //   localStorage.setItem('nParticipantes', (parseInt(localStorage.getItem('nParticipantes'))+1));
      // }else{
      //   localStorage.setItem('nParticipantes', 1);
      //   console.log(localStorage.getItem('nParticipantes'));
      // }
    // ================ FIN DE VERIFICAR LONGITUD DE PARTICIPANTES ================================



      $('input[type="text"]').val("");
      if (!global_estado_participante) {
        data = { dui, name: nombre, tel, email, genero,  isss, cargo, correlativo_planilla };
        $.ajax({
          url: "/admin/participantes/add",
          type: "POST",
          data,
        });
      }else{
        var duiNew = dui;
        var nameEdit = nombre;
        var emailEdit = email;
        var telEdit = tel;
        var duiEdit = dui;
        var isss_edit = isss;
        var genero_edit = genero;
        var cargo_edit = cargo;
        data = { duiNew, nameEdit, emailEdit, telEdit, duiEdit, correlativo_planilla, isss_edit, genero_edit, cargo_edit };
        $.ajax({
          url: "/admin/participantes/edit",
          type: "PUT",
          data,
        });
      }
  };
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
    localStorage.setItem('paso',2);
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
      if (e.target.files.length > 10) {
        $(this).val("");
        return error("Unicamente se permite adjuntar 10 archivos");
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
  if( !$("#primerape").val()  ||  !$("#nombres").val()  || !$("#cargof").val()   ){
    error("<b>errcode: </b> DEBE RELLENAR LOS CAMPOS DEL FIRMANTE");
  }else{
    AsginarGlobalEmpresa();
    localStorage.setItem('paso',2);
    stepper1.next();
  }
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
function capitalize(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}