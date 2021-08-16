const error = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    html: error,
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
const ProgressChange = (texto, id, val) => {
  $("#progBar").val(val);
  $("#texto").text(texto);
  $("#id").text(id);
};
let global_json1;
let global_json2;
let global_json3;
$(document).ready(function () {
  // Cambiador de progress
  // BOTONES

  $("#next1").click(() => {
    if (!$("#carnet").val())
      return error(" <b>errocode: </b> Carnet no existente ");
    if (!$("#grupos").val())
      return error(" <b>errocode: </b> Grupo no existente ");
    ProgressChange("Información familiar", "2", "50");
    $("#sec1").css("display", "none");
    $("#sec2").css("display", "block");
    global_json1 = json1();
  });
  $("#next2").click(() => {
    ProgressChange("Situación económica", "3", "100");
    $("#sec2").css("display", "none");
    $("#sec3").css("display", "block");
    global_json2 = json2();
  });
  $("#next3").click(() => {
    global_json3 = json3();
    SendFormulario();
  });
  $("#back2").click(() => {
    ProgressChange("Datos de identificación", "1", "16.66");
    $("#sec2").css("display", "none");
    $("#sec1").css("display", "block");
  });
  $("#back3").click(() => {
    ProgressChange("Información familiar", "2", "50");
    $("#sec3").css("display", "none");
    $("#sec2").css("display", "block");
  });

  //Mascara
  // $("#dui").mask("00000000-0");
  //Pendiente a edad
  $("#edad1").mask("00");
  $("#edad2").mask("00");
  $("#edad3").mask("00");
  $("#edad4").mask("00");
  $("#edad5").mask("00");

  $("#telfijocontacto").mask("0000-0000");
  $("#telmovilcontacto").mask("0000-0000");
  $("#fijo").mask("0000-0000");
  $("#movil").mask("0000-0000");
  $("#teltabl1").mask("0000-0000");
  $("#teltabl2").mask("0000-0000");
  $("#teltabl3").mask("0000-0000");
  $("#teltabl4").mask("0000-0000");
  $("#cuota").mask("000,000,000,000,000.00", {
    reverse: true,
  });
  $("#pagovi").mask("000,000,000,000,000.00", {
    reverse: true,
  });

  $("#salario1").mask("000,000,000,000,000.00", {
    reverse: true,
  });
  $("#salario2").mask("000,000,000,000,000.00", {
    reverse: true,
  });
  $("#salario3").mask("000,000,000,000,000.00", {
    reverse: true,
  });
  $("#salario4").mask("000,000,000,000,000.00", {
    reverse: true,
  });

  $(".costo").mask("000,000,000,000,000.00", {
    reverse: true,
  });
  $("#remesacantidad").mask("000,000,000,000,000.00", {
    reverse: true,
  });

  let global_salarios = currency(0);
  let global_gastos = currency(0);

  $(".salario").focusout(function () {
    global_salarios = currency($("#salario1").val())
      .add($("#salario2").val())
      .add($("#salario3").val())
      .add($("#salario4").val());
    $("#totalsalarios").text(global_salarios);
  });

  $(".costo").focusout(function () {
    global_gastos = currency($("#costo1").val())
      .add($("#costo2").val())
      .add($("#costo3").val())
      .add($("#costo4").val())
      .add($("#costo5").val())
      .add($("#costo6").val())
      .add($("#costo7").val())
      .add($("#costo8").val())
      .add($("#costo9").val())
      .add($("#costo10").val())
      .add($("#costo11").val())
      .add($("#costo12").val())
      .add($("#costo13").val());
    $("#totalgastos").text(global_gastos);
  });

  // FIN Mascara
  // fecha
  $.datepicker.setDefaults($.datepicker.regional["es"]);
  $("#fechanac").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
  });
  // Discapacidad
  // Fin fecha
  // SECCION 1 =========================================================================
  //El participante trabaja
  $("#flexRadioDefault1").click(function () {
    const checkBox = document.getElementById("flexRadioDefault1");
    if (checkBox.checked == true) {
      $("#lugartrabajo").css("display", "block");
      $("#direciontrabajo").css("display", "block");
    }
  });
  $("#flexRadioDefault2").click(function () {
    const checkBox = document.getElementById("flexRadioDefault2");
    if (checkBox.checked == true) {
      $("#lugartrabajo").css("display", "none");
      $("#direciontrabajo").css("display", "none");
    }
  });

  //Capacidad de internet
  $("#internet").on("change", function () {
    if (this.value == "residencial" || this.value == "movil") {
      $("#capacidadinternetdiv").css("display", "block");
    } else {
      $("#capacidadinternetdiv").css("display", "none");
    }
  });

  // Religión
  $("#religions").on("change", function () {
    if (this.value == "Catolico") {
      $("#sacramentos").css("display", "block");
    } else {
      $("#sacramentos").css("display", "none");
    }
  });

  $("#carreras").select2({
    width: "100%",
    ajax: {
      url: "/admin/ec/carreras",
      dataType: "json",
      delay: 250,
      processResults: function (data) {
        return {
          results: $.map(data, function (obj, index) {
            return { id: obj.id, text: obj.Nombre };
          }),
        };
      },
      cache: true,
    },
  });
  //Selector de carreras
  $("#carreras").on("select2:select", function (e) {
    var idcarrera = e.params.data.id;
    $("#grupos").select2({
      width: "100%",
      ajax: {
        url: `/admin/ec/${idcarrera}/grupos`,
        dataType: "json",
        delay: 250,
        data(params) {
          return {
            idcarrera,
            nombre: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: $.map(data, function (obj, index) {
              return { id: obj.id, text: obj.Nombre };
            }),
          };
        },
        cache: true,
      },
    });
  });

  // FIN SECCION 1 =====================================================================
  // SECCION 2 =========================================================================
  // la vivienda es otros
  $("#tipodecasa").on("change", function () {
    if (this.value == "Otro") {
      $("#especificarvivienda").css("display", "block");
    } else {
      $("#especificarvivienda").css("display", "none");
    }
    if (
      this.value == "Alquilada" ||
      this.value == "FinanciadaSocial" ||
      this.value == "Finaciada"
    ) {
      $("#pagovivienda").css("display", "block");
    } else {
      $("#pagovivienda").css("display", "none");
    }
  });
  // FIN SECCION 2 =====================================================================

  // SECCION 3 =====================================================================
  //Si trabaja
  $("#reciberemesas").on("change", function () {
    if (this.value == "true") {
      $("#remesasblock").css("display", "block");
    } else {
      $("#remesasblock").css("display", "none");
    }
  });

  // FIN SECCION 4 =====================================================================
  //SELECTS
  $("#depa_nac").select2({
    width: "100%",
    ajax: {
      url: "https://api.salud.gob.sv/departamentos",
      dataType: "json",
      delay: 250,
      data(params) {
        return {
          idPais: 68,
          nombre: params.term,
        };
      },
      processResults: function (data) {
        return {
          results: $.map(data, function (obj, index) {
            return { id: obj.id, text: obj.nombre };
          }),
        };
      },
      cache: true,
    },
  });

  $("#depa_nac").on("select2:select", function (e) {
    var idDepartamento = e.params.data.id;
    $("#municipioNac").select2({
      width: "100%",
      ajax: {
        url: "https://api.salud.gob.sv/municipios",
        dataType: "json",
        delay: 250,
        data(params) {
          return {
            idDepartamento,
            nombre: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: $.map(data, function (obj, index) {
              return { id: obj.id, text: obj.nombre };
            }),
          };
        },
        cache: true,
      },
    });
  });

  $("#depdomicilio").select2({
    width: "100%",
    ajax: {
      url: "https://api.salud.gob.sv/departamentos",
      dataType: "json",
      delay: 250,
      data(params) {
        return {
          idPais: 68,
          nombre: params.term,
        };
      },
      processResults: function (data) {
        return {
          results: $.map(data, function (obj, index) {
            return { id: obj.id, text: obj.nombre };
          }),
        };
      },
      cache: true,
    },
  });

  $("#depdomicilio").on("select2:select", function (e) {
    var idDepartamento = e.params.data.id;
    $("#municipioDomicilio").select2({
      width: "100%",
      ajax: {
        url: "https://api.salud.gob.sv/municipios",
        dataType: "json",
        delay: 250,
        data(params) {
          return {
            idDepartamento,
            nombre: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: $.map(data, function (obj, index) {
              return { id: obj.id, text: obj.nombre };
            }),
          };
        },
        cache: true,
      },
    });
  });

  $("#departcontact").select2({
    width: "100%",
    ajax: {
      url: "https://api.salud.gob.sv/departamentos",
      dataType: "json",
      delay: 250,
      data(params) {
        return {
          idPais: 68,
          nombre: params.term,
        };
      },
      processResults: function (data) {
        return {
          results: $.map(data, function (obj, index) {
            return { id: obj.id, text: obj.nombre };
          }),
        };
      },
      cache: true,
    },
  });

  $("#departcontact").on("select2:select", function (e) {
    var idDepartamento = e.params.data.id;
    $("#municipiocontacto").select2({
      width: "100%",
      ajax: {
        url: "https://api.salud.gob.sv/municipios",
        dataType: "json",
        delay: 250,
        data(params) {
          return {
            idDepartamento,
            nombre: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: $.map(data, function (obj, index) {
              return { id: obj.id, text: obj.nombre };
            }),
          };
        },
        cache: true,
      },
    });
  });
  //FIN SELECTS
});

// CREACIÓN DE JSON POR PASOS
// PASO 1
const json1 = () => {
  const Carnet = $("#carnet").val(),
    Carrera = $("#carreras").val(),
    Grupo = $("#grupos").val(),
    Nombres = $("#nombres").val(),
    Apellidos = $("#apellidos").val(),
    Sexo = $("#sexo").val(),
    EstadoF = $("#estadofamiliar").val(),
    Trabaja = $("input[name='flexRadioDefault']:checked").val(),
    LugarTrabajo = $("#trabajolugar").val(),
    DireccionTrabajo = $("#direcciont").val(),
    Escolaridad = $("#escolaridad").val(),
    CentroDondeEstudio = $("#instituto").val(),
    Cuota = $("#cuota").val(),
    ViveCon = $("#vivecon").val(),
    Oficio = $("#ocupacionec").val(),
    Religion = $("#religions").val(),
    depDomicilio = $("#depdomicilio option:selected").text(),
    municipioDomicilio = $("#municipioDomicilio option:selected").text(),
    direccion = $("#direccion").val(),
    Sacramentos = {
      Bautismo: $("#bautismo").is(":checked"),
      Comunion: $("#comunion").is(":checked"),
      confirmacion: $("#confirmacion").is(":checked"),
    },
    NacDepartamento = $("#depa_nac option:selected").text();
  NacMunicipio = $("#municipioNac option:selected").text();
  (FechaNac = $("#fechanac").val()),
    (TelFijoPropio = $("#fijo").val()),
    (TelMovilPropio = $("#movil").val()),
    (PoseeInternet = $("#internet").val()),
    (CapacidadInternet = $("#capacidadinter").val()),
    (EmerNombre = $("#nombrecontacto").val()),
    (EmerParentesco = $("#parentesco").val()),
    (EmerDireccion = $("#direccioncontacto").val()),
    (EmerDep = $("#departcontact option:selected").text());
  EmerMuni = $("#municipiocontacto option:selected").text();
  (EmergenciaTel = $("#telfijocontacto").val()),
    (EmergenciaMov = $("#telmovilcontacto").val()),
    (EmergenciaEmail = $("#emailcontacto").val());
  return {
    Carnet,
    Carrera,
    Grupo,
    Nombres,
    Apellidos,
    Sexo,
    EstadoF,
    Trabaja,
    LugarTrabajo,
    DireccionTrabajo,
    Escolaridad,
    CentroDondeEstudio,
    Cuota,
    ViveCon,
    Oficio,
    Religion,
    depDomicilio,
    municipioDomicilio,
    direccion,
    Sacramentos,
    NacDepartamento,
    NacMunicipio,
    FechaNac,
    TelFijoPropio,
    TelMovilPropio,
    PoseeInternet,
    CapacidadInternet,
    EmerNombre,
    EmerParentesco,
    EmerDireccion,
    EmerDep,
    EmerMuni,
    EmergenciaTel,
    EmergenciaMov,
    EmergenciaEmail,
  };
};

// FIN PASO 1
// PASO 2
const json2 = () => {
  const GrupoFamiliar = [];
  for (let index = 1; index <= 5; index++) {
    const nombre = $(`#nombrec${index}`).val(),
      parentesco = $(`#parentesco${index}`).val(),
      edad = $(`#edad${index}`).val(),
      ocupacion = $(`#oficicio${index}`).val();
    GrupoFamiliar.push({ nombre, parentesco, edad, ocupacion });
  }
  const EstadoVivienda = $("#tipodecasa").val(),
    TipoViviendaOtros = $("#especificarvivienda").val(),
    PagoVivienda = $("#pagovi").val(),
    ZonaVivienda = $("#zonaresidencia").val(),
    ZonasDeRiesgo = {
      Rios: $("#Rios").is(":checked"),
      Deslaves: $("#deslaves").is(":checked"),
      Costera: $("#costera").is(":checked"),
      Volcanes: $("#volcanes").is(":checked"),
    },
    ComoSeMoviliza = $("#movilizacion").val(),
    PoseeEquipos = {
      computadora: $("#computadora").is(":checked"),
      Laptop: $("#Laptop").is(":checked"),
      Tablet: $("#Tablet").is(":checked"),
      Celular: $("#Celular").is(":checked"),
    },
    IngresosFamiliares = [];

  for (let index = 1; index <= 4; index++) {
    const trabajador = $(`#trabajador${index}`).val(),
      salario = $(`#salario${index}`).val(),
      trabajo = $(`#trabajo${index}`).val(),
      cargo = $(`#cargo${index}`).val(),
      teltabl = $(`#teltabl${index}`).val();
    IngresosFamiliares.push({ trabajador, salario, trabajo, cargo, teltabl });
  }
  const totalingreso = $("#totalsalarios").text();
  return {
    GrupoFamiliar,
    EstadoVivienda,
    TipoViviendaOtros,
    PagoVivienda,
    ZonaVivienda,
    ZonasDeRiesgo,
    ComoSeMoviliza,
    PoseeEquipos,
    IngresosFamiliares,
    totalingreso,
  };
};
// FIN PASO 2
// PASO 3
const json3 = () => {
  const GastosFamiliares = {
      alimentacion: $(`#costo1`).val(),
      vivienda: $(`#costo2`).val(),
      agua: $(`#costo3`).val(),
      energia: $(`#costo4`).val(),
      cable: $(`#costo5`).val(),
      higiene: $(`#costo6`).val(),
      celular: $(`#costo7`).val(),
      domestico: $(`#costo8`).val(),
      cotizaciones: $(`#costo9`).val(),
      transporte: $(`#costo10`).val(),
      vigilancia: $(`#costo11`).val(),
      salud: $(`#costo12`).val(),
      educacion: $(`#costo13`).val(),
    },
    reciberemesas = $("#reciberemesas").val(),
    remesacantidad = $("#remesacantidad").val(),
    cadacuantoreme = $("#cadacuantoreme").val(),
    quienremesa = $("#quienremesa").val(),
    totalgastos = $("#totalgastos").text();
  return {
    reciberemesas,
    remesacantidad,
    cadacuantoreme,
    quienremesa,
    GastosFamiliares,
    totalgastos,
  };
};
// FIN PASO 3

const SendFormulario = async () => {
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
      const carnet = $("#carnet").val() ;
      const grupo = $("#grupos").val();
      const data = {
        carnet,
        grupo,
        global_json1,
        global_json2,
        global_json3,
        Nombres: $("#nombres").val(),
        Apellidos: $("#apellidos").val()
      };
      console.log(data);
      loader();
      await $.ajax({
        url: "/admin/ec/form",
        type: "POST",
        data,
        dataType: "json",
      });
      Swal.close();
      window.location.replace('/admin/ec');
    }
  } catch (e) {
    console.log(e);
    error(`<b>errocode: </b> ${e}`);
  }
};

$('input.text-uppercase').keyup(function(){
  $(this).val($(this).val().toUpperCase());
});