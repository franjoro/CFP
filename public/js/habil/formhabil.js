//VARIABLES GLOBALES
let global_json1;
let global_json2;
let global_json3;

//Funciones globales
const error = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    html: error,
  });
};
//Funcion de calculo de fecha
function calcularEdad(fecha) {
  const date1 = dayjs(fecha);
  const date2 = dayjs(fechaActual());
  return date2.diff(date1, 'year');
} 

//Fecha actual formaro yy-mm-dd
function fechaActual(){
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`
  }else{
    return `${year}-${month}-${day}`
  }
}
const ProgressChange = (texto, id, val) => {
  $("#progBar").val(val);
  $("#texto").text(texto);
  $("#id").text(id);
};
$(document).ready(function () {
  // Cambiador de progress
  // BOTONES
  $("#next1").click(() => {
    //Comenzamos las validaciones de la sección1
    if ($("#dui").val().length < 10)
      return error(" <b>errocode: </b> Colocar el campo DUI correctamente");
    if ($("#nit").val().length < 17)
      return error(" <b>errocode: </b> Colocar el campo NIT correctamente");
    if (!$("#nombres").val())
      return error(" <b>errocode: </b> Colocar el campo Nombres correctamente");
    if (!$("#apellidos").val())
      return error(" <b>errocode: </b> Colocar el campo Apellidos correctamente");
    if (!$("#sexo").val())
      return error(" <b>errocode: </b> Seleccione un sexo");
    if (!$("#estadofamiliar").val())
      return error(" <b>errocode: </b> Seleccione un Estado Familiar");
    if (!$("#jefehogar").val())
      return error(" <b>errocode: </b> Seleccione un sexo");
    if (!$("#depa_nac").val())
      return error(" <b>errocode: </b> Seleccione un departamento de nacimiento");
    if (!$("#municipioNac").val())
      return error(" <b>errocode: </b> Seleccione un municipio de nacimiento");
    if (!$("#fechanac").val())
      return error(" <b>errocode: </b> Seleccione una fecha de nacimiento");
    if (!$("#depdomicilio").val())
      return error(" <b>errocode: </b> Seleccione un departamento de domicilio");
    if (!$("#municipioDomicilio").val())
      return error(" <b>errocode: </b> Seleccione un departamento de domicilio");
    if (!$("#direccion").val())
      return error(" <b>errocode: </b> Colocar una dirección");
    if ($("#fijo").val().length<9)
      return error(" <b>errocode: </b> Colocar un teléfono fijo valido.");
    if ($("#movil").val().length<9)
      return error(" <b>errocode: </b> Colocar un teléfono movil valido.");
    if (!$("#mail").val())
      return error(" <b>errocode: </b> Colocar un correo valido");
    alert(calcularEdad($("#fechanac").val()))
    if(calcularEdad($("#fechanac").val()) < 16)
      return error(" <b>errocode: </b> El participante tiene ser mayor o igual a 16 años");

    //Ya completas las validaciones procedemos a pasar a la siguiente seccion (Seccion2 )
    ProgressChange("Educación formal y formación ocupacional", "2", "33.33");
    $("#sec1").css("display", "none");
    $("#sec2").css("display", "block");
    global_json1 = json1();
    console.log(global_json1);
  });
  $("#next2").click(() => {

    //Realizamos las validaciones en el lado del cliente de la seccion2
    if(!$("#leerescribir").val()){
      return error(" <b>errocode: </b> Seleccione si usted sabe leer y escribir.");
    }else{
      if($("#leerescribir").val() == 0){
        if($("#soloescribir").val()){
          return error(" <b>errocode: </b> Seleccione si usted solo sabe leer, si solo sabe escribir o ninguna de las anteriores opciones.");
        }
      }
    } 
    if(!$("#estudiaactualmente").val())
      return error(" <b>errocode: </b> Seleccione si estudia actualmente.");
    else{
      if($("#estudiaactualmente").val() == 0){
        if(!$("#tiempoestudio").val()){
          return error(" <b>errocode: </b> Seleccione hace cuanto tiempo dejo de estudiar.");
        }
      }
    }
    if(!$("#cursospasados").val())
      return error(" <b>errocode: </b> Seleccione si a recibido cursos previamente o no.");
    //Finalizamos las validaciones seccion 2
    ProgressChange("Información sobre situación laboral", "3", "50");
    $("#sec2").css("display", "none");
    $("#sec3").css("display", "block");
  });
  $("#next3").click(() => {
    ProgressChange("Información sobre ingresos", "4", "66.33");
    $("#sec3").css("display", "none");
    $("#sec4").css("display", "block");
  });
  $("#next4").click(() => {
    ProgressChange(
      "Expectativas y pertenencia de la información",
      "5",
      "82.66"
    );
    $("#sec4").css("display", "none");
    $("#sec5").css("display", "block");
  });
  $("#next5").click(() => {
    ProgressChange("Seguimiento", "6", "100");
    $("#sec5").css("display", "none");
    $("#sec6").css("display", "block");
    global_json2 = json2();
  });

  $("#ant2").click(() => {
    ProgressChange("Educación formal y formación ocupacional", "1", "10");
    $("#sec1").css("display", "block");
    $("#sec2").css("display", "none");
  });
  $("#ant3").click(() => {
    ProgressChange("Información sobre situación laboral", "2", "33");
    $("#sec2").css("display", "block");
    $("#sec3").css("display", "none");
  });
  $("#ant4").click(() => {
    ProgressChange("Información sobre ingresos", "3", "50");
    $("#sec3").css("display", "block");
    $("#sec4").css("display", "none");
  });
  $("#ant5").click(() => {
    ProgressChange(
      "Expectativas y pertenencia de la información",
      "4",
      "66.33"
    );
    $("#sec4").css("display", "block");
    $("#sec5").css("display", "none");
  });
  $("#ant6").click(() => {
    ProgressChange("Seguimiento", "5", "82.66");
    $("#sec5").css("display", "block");
    $("#sec6").css("display", "none");
  });

  

 
  
  // #region Mascara
  $("#dui").mask("00000000-0");
  $("#nit").mask("0000-000000-000-0");
  $("#year1").mask("0000");
  $("#year2").mask("0000");
  $("#year3").mask("0000");
  $("#telfijocontacto").mask("0000-0000");
  $("#telmovilcontacto").mask("0000-0000");
  $("#fijo").mask("0000-0000");
  $("#movil").mask("0000-0000");
  // FIN Mascara
  // fecha
  $.datepicker.setDefaults( $.datepicker.regional.es );
  $("#fechanac").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0"
  });
  // Discapacidad
  // Fin fecha
  // SECCION 1 =========================================================================
  $("#discapacidad").click(function () {
    const checkBox = document.getElementById("discapacidad");
    if (checkBox.checked == true) {
      $("#discapacidades").css("display", "block");
    } else {
      $("#discapacidades").css("display", "none");
    }
  });
  $("#discapacidades1").click(function () {
    const checkBox = document.getElementById("discapacidades1");
    if (checkBox.checked == true) {
      $("#discapacidades").css("display", "block");
    }
  });
  $("#discapacidades2").click(function () {
    const checkBox = document.getElementById("discapacidades2");
    if (checkBox.checked == true) {
      $("#discapacidades").css("display", "none");
    }
  });
  //profesion
  $("#flexRadioDefault1").click(function () {
    const checkBox = document.getElementById("flexRadioDefault1");
    if (checkBox.checked == true) {
      $("#profesiondiv").css("display", "block");
    }
  });
  $("#flexRadioDefault2").click(function () {
    const checkBox = document.getElementById("flexRadioDefault2");
    if (checkBox.checked == true) {
      $("#profesiondiv").css("display", "none");
    }
  });
  // Paises
  $("#nacionalidad").on("change", function () {
    if (this.value == "salvadoreno") {
      $("#pais")
        .append(`<option value="sv">El Salvador</option> `)
        .prop("disabled", true);
    } else {
      $("#pais").prop("disabled", false);
      $("#pais").select2({
        width: "100%",
        ajax: {
          url: "https://api.salud.gob.sv/pais",
          dataType: "json",
          delay: 250,
          data(params) {
            return {
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
    }
  });

  // FIN SECCION 1 =====================================================================
  // SECCION 2 =========================================================================
  // Sabe leer escribir
  $("#leerescribir").on("change", function () {
    if (this.value == "0") {
      $(".analfabeta").css("display", "block");
    } else {
      $(".analfabeta").css("display", "none");
    }
  });
  // Estudia actualmete
  $("#estudiaactualmente").on("change", function () {
    if (this.value == "0") {
      $("#tiempodejoestudio").css("display", "block");
    } else {
      $("#tiempodejoestudio").css("display", "none");
    }
  });
  //Cursos pasados
  $("#cursospasados").on("change", function () {
    if (this.value == "1") {
      $("#beneficiocursos").css("display", "block");
    } else {
      $("#beneficiocursos").css("display", "none");
    }
  });

  $(".beneficios").on("change", function () {
    if (this.value == "Si") {
      $("#cursopositivo").css("display", "block");
    }
    if (this.value == "No") {
      $("#cursonegativo").css("display", "block");
    }
  });

  // FIN SECCION 2 =====================================================================

  // SECCION 3 =====================================================================
  //Si trabaja
  $("#c4").change(function () {
    if (this.checked) {
      $("#iftrabaja").css("display", "block");
      $("#ifnottrabaja").css("display", "none");
    } else {
      $("#iftrabaja").css("display", "none");
      $("#ifnottrabaja").css("display", "flex");
    }
  });
  // Si no trabaja
  $("#trabajaantes").on("change", function () {
    if (this.value == "1") {
      $("#tiempoSinTrabajar").css("display", "block");
    } else {
      $("#tiempoSinTrabajar").css("display", "none");
    }
  });

  $("#tipoempleo").on("change", function () {
    if (
      this.value == "tmpcompleto" ||
      this.value == "tmpparcial" ||
      this.value == "temporal"
    ) {
      $("#sectordetraajo").css("display", "block");
    } else {
      $("#sectordetraajo").css("display", "none");
    }
  });

  // FIN SECCION 3 =====================================================================
  // SECCION 4 =====================================================================
  // Si recibe ingresos
  $("#recibeingresosselect").on("change", function () {
    if (this.value == "1") {
      $("#sirecibeingresos").css("display", "block");
    } else {
      $("#sirecibeingresos").css("display", "none");
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




  //#region INICIO PROCESAR JSON
  const json1 = () =>{
    const  dui = $("#dui").val(),
      nit  = $("#nit").val(),
      nombres = $("#nombres").val(),
      apellidos = $("#apellidos").val(),
      sexo = $("#sexo").val(),
      cfamilia = $("#cfamilia").val(),
      estadoFamiliar = $("#estadofamiliar").val(),
      jefeDeHogar = $("#jefehogar").val(),
      nHijos = $("#nhijos").val(),
      otProfecionBool = $("input[name='flexRadioDefault']:checked").val(),
      otProfecion = $("#profesion").val(),
      depNacimiento = $("#depa_nac").val(),
      munNacimiento = $("#municipioNac").val(),
      fechNacimiento = $("#fechanac").val(),
      depDomicilio = $("#depdomicilio").val(),
      munDomicilio = $("#municipioDomicilio").val(),
      direccionDom = $("#direccion").val(),
      telFijo = $("#fijo").val(),
      telMovil = $("#movil").val(),
      email = $("#mail").val(),
      discapacidadBool = $("input[name='discapacidadesc']:checked").val(),
      discapacidad = {
        moverseCaminar: $("#bautismo").is(":checked"),
        usarBrazosPiernas: $("#comunion").is(":checked"),
        verLentes: $("#confirmacion").is(":checked"),
        oirAparatos: $("#confirmacion").is(":checked"),
        hablar: $("#confirmacion").is(":checked"),
        retrasoMental: $("#confirmacion").is(":checked"),
        vestirseAlimentarse: $("#confirmacion").is(":checked"),
        otro: $("#confirmacion").is(":checked"),
        otroText: $("#confirmacion").is(":checked"),
      }
      return{
        dui,
        nit,
        nombres,
        apellidos,
        sexo,
        cfamilia,
        estadoFamiliar,
        jefeDeHogar,
        nHijos,
        otProfecionBool,
        otProfecion,
        depNacimiento, 
        munNacimiento, 
        fechNacimiento, 
        depDomicilio, munDomicilio,
        direccionDom, 
        telFijo, 
        telMovil,
        email, 
        discapacidadBool, 
        discapacidad
      }
    
  }

  const json2 = () =>{
    const sabeleerEscribir = $("#leerescribir").val(),
      leerEscribir = $("#soloescribir").val(),
      soloFirma = $("#firmahuella").val(),//importante terminar porque aca no lee todo
      gradoFinalizado = $("#ultgrado").val(),
      estudiaActualmente = $("#estudiaactualmente").val(),
      tiempoestudio = $("#tiempoestudio").val(),
      cursosPasados = $("#cursospasados").val(),
      beneficioCursos = $("#beneficiocursos").val(),
      impartio1 = $("#impartio1").val(),
      year1 = $("#year1").val(),
      beneficio1 = $("#beneficio1").val(),
      curso2 = $("#curso2").val(),
      impartio2 = $("#impartio2").val(),
      year2 = $("#year2").val(),
      beneficio2 = $("#beneficio2").val(),
      curso3 = $("#curso2").val(),
      impartio3 = $("#impartio2").val(),
      year3 = $("#year2").val(),
      beneficio3 = $("#beneficio2").val(),
      cursopositivo = {
        trabajarPropio: $("#b2").is(":checked"),
        oportunidadProm: $("#b3").is(":checked"),
        otrosIngresos : $("#b4").is(":checked"),
        cambiarEmpleo : $("#b5").is(":checked"),
        obtenerEmpleo : $("#b6").is(":checked"),
      },
      nobeneficioc = $("#nobeneficioc").val(),
      actividades = {
        estudia :$("#c1").is(":checked"),
        oficiosHogar :$("#c2").is(":checked"),
        buscaTrabajo :$("#c3").is(":checked"),
        trabaja :$("#c4").is(":checked"),
        estudia :$("#c1").is(":checked"),
      },
      trabajaantes = $("#trabajaantes").val(),
      tiempoSinTrabajar = $("#tiempoSinTrabajar").val(),
      tiempoSinTrabajarselect = $("tiempoSinTrabajarselect").val(),
      tipoempleo = $("#tipoempleo").val(),
      sectorDeTrabajo = $("#sectordetrabajo").val(),
      recibeIngresos = $("#recibeingresosselect").val(),
      ingresos = {
        trabajo :$("#ingresos1").is(":checked"),
        ayudaFamiliar : $("#ingresos2").is(":checked"),
        remesa : $("#ingresos3").is(":checked"),
        pension : $("#ingresos4").is(":checked"),
        otros : $("#ingresos5").is(":checked"),
        otrosIngresos : $("#otrosIngresos").val()
      },
      espectativaLogro = {
        oportunidadProm : $("#e1").is(":checked"),
        cambEmpleo : $("#e2").is(":checked"),
        obtenerEmpleo : $("#e3").is(":checked"),
        trabajarPropio : $("#e4").is(":checked"),
        ingresosExtra : $("#e5").is(":checked"),
        ninguno : $("#e6").is(":checked"),
        otro : $("#e7").is(":checked"),
        otrosexpectativas : $("#otrosexpectativas").val(),
      },
      pertinencia = $("#pertinencia").val()
    return{
      sabeleerEscribir,
      leerEscribir,
      soloFirma,
      gradoFinalizado,
      estudiaActualmente,
      tiempoestudio,
      cursosPasados,
      beneficioCursos,
      impartio1,
      year1,
      beneficio1,
      curso2,
      impartio2,
      year2,
      beneficio2,
      curso3,
      impartio3,
      year3,
      beneficio3,
      cursopositivo,
      nobeneficioc,
      actividades,
      trabajaantes,
      tiempoSinTrabajar,
      tiempoSinTrabajarselect,
      tipoempleo,
      sectorDeTrabajo,
      recibeIngresos,
      ingresos,
      espectativaLogro,
      pertinencia
    }
  }

  const json3 = () =>{
    const nombreContacto = $("#nombrecontacto").val(),
      parentesco = $("#parentesco").val(),
      direccionContacto = $("#direccioncontacto").val(),
      departcontact = $("#departcontact").val(),
      municipiocontacto = $("#municipiocontacto").val(),
      fijoContact = $("#fijoContact").val(),
      movilContacto = $("#movilContacto").val(),
      emailContacto = $("#emailcontacto").val()
    return {
      nombreContacto,
      parentesco,
      direccionContacto,
      departcontact,
      municipiocontacto,
      fijoContact,
      movilContacto,
      emailContacto
    }
  }
});
