/*
name: formhabil.js
description: sent post form and diferents sections whit button next
dependencies: functions.js
authors: Franklin Lopez || Osmaro Bonilla
creation date: 12/06/2021 for Franklin Lopez
last modification: 12/20/2021 for Osmaro Bonilla
*/

//VARIABLES GLOBALES
let global_json1;
let global_json2;
let global_json3;



const infoMsg = (msg) =>{
  Swal.fire({
    icon:"info",
    title:"Información",
    html: msg,
  });
};

const hidenAll = ()=>{
  $("#sec1").css("display", "none");
  $("#sec2").css("display", "none");
  $("#sec3").css("display", "none");
  $("#sec4").css("display", "none");
  $("#sec5").css("display", "none");
  $("#sec6").css("display", "none");
};

function inputDate(id){
  $(id).datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true,
      yearRange: "-100:+0"
  });
};

//Loader
var loader = () => {
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
//Funcion de calculo de fecha
function calcularEdad(fecha) {
  let date = new Date(fecha);
  console.log(date);
  let day = date.getDate();
  let month = date.getMonth()+1;
  if(month <10)
    month = "0"+month;
  if(day < 10)
    day = '0'+day;
  let year = date.getFullYear();
  let fullDate = `${year}-${month}-${day}`;
  console.log(fullDate);
  console.log(fecha);
  
  const date1 = dayjs(fullDate);
  const date2 = dayjs(fechaActual());
  return date2.diff(date1, 'year');
} 

//Fecha actual formaro yy-mm-dd
function fechaActual(){
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}
const ProgressChange = (texto, id, val) => {
  $("#progBar").val(val);
  $("#texto").text(texto);
  $("#id").text(id);
};


$(document).ready(function () {
  if($("#view").val() ==""){
    $("#headerSection").css("display", "none");
  }
  findForProgram();
  countSolicitud();
  localStorage.setItem('section','1');
  actualYear("#year1");
  actualYear("#year2");
  actualYear("#year3");
  noCopyNoPaste("#fechanac");
  changeDateOfBirth();
  validate16("#fechanac");
  changeOtherSec3_1_2();
    changeTitleAndTecnology();
    $("#blockTitOr").css("display", "none");
    $("#blockEduForm").css("display", "none");
  //Asignamos valor por defecto a combobox Has trabajadoAntes?
  $("#trabajaantes").val('0');
  // Cambiador de progress
  // BOTONES

  /**INPUT CHECKED*/
  $("input[name='espec']").click(()=>{
    $("#e6").prop('checked',false);
  });

  $("#e6").click(()=>{
    onlyNone();
  });
  /*
  CLICK btnDeletePastCourses
  */
  $("#btnDeletePastCourses").click(function(){
    clearPasrCourses();
  });
  // FUNCTION SECTIONS
  const next1 = ()=>{
    if(validateDisabilities().status){
        //Comenzamos las validaciones de la sección1
        clearDisabilities();
        validateDisabilities();
        if (($("#dui").val().length < 10 || $("#dui").val() =="00000000-0") && ($("#nit").val().length < 17 || $("#nit").val() =="0000-000000-000-0") )
          return error(`<b>errocode: </b> Debe de colocar al menos un documento para poder enviar la solicitud`);
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
        if(calcularEdad($("#fechanac").val()) < 16)
          return error(" <b>errocode: </b> El participante tiene ser mayor o igual a 16 años");

        //Ya completas las validaciones procedemos a pasar a la siguiente seccion (Seccion2 )
        ProgressChange("Educación formal y formación ocupacional", "2", "22.22");
        hidenAll();
        $("#sec2").css("display", "block");
        global_json1 = json1();
    }else{
      return error(validateDisabilities().msg);
    }
  }

  const next2 = ()=>{
    // we validate that complete  previos courses
    if(validationCompleteNamePreviosCouses().status){
      if(validationCompletePreviousCourses().status){
        //Realizamos las validaciones en el lado del cliente de la seccion2
        if(!$("#leerescribir").val()){
          return error(" <b>errocode: </b> Seleccione si usted sabe leer y escribir.");
        }else{
          if($("#leerescribir").val() == 0){
            if(!$("#soloescribir").val()){
              return error(" <b>errocode: </b> Seleccione si usted solo sabe leer, si solo sabe escribir o ninguna de las anteriores opciones.");
            }
          }
        } 
        if(!$("#ultgrado").val())
          return error(" <b>errocode: </b> Seleccione el ultimo de estudio finalizado.");
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
        ProgressChange("Información sobre situación laboral", "3", "33.33");
        hidenAll();
        $("#sec3").css("display", "block");
        clearSection2();

      }else{
        return error(`<b>errorcode</b> ${validationCompletePreviousCourses().msg}`);
      }
    }else{
      return error(`<b>errorcode</b> ${validationCompleteNamePreviosCouses().msg}`);
    }
  }

  const next3 = ()=>{
    if(validateSection3().status){
      //INICIAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA TERCERA PARTE DEL FORMULARIO
        if($("#c1").is(":checked") == false && $("#c2").is(":checked") == false && $("#c3").is(":checked") == false && $("#c4").is(":checked") == false && $("#c5").is(":checked")==false)
        return error(" <b>errocode: </b> Seleccione a que se dedica actualmente.");
        if($("#c5").is(":checked")==true && $("#txtOtro").val() == ''){
          return error("<b>errorcode:</b> Especifique a que otra actividad se dedica usted");
        }
        if($("#c5").is(":checked")==false && $("#txtOtro").val() != ''){
          return error("<b>errorcode:>/b> Rellene el cuatro de oto solo si selecciona otra actividad a la cual se dedica.");
        }
        if(!$("#trabajaantes").val()){
          return error(" <b>errocode: </b> Seleccione si a trabajado antes.");
        }else{
          if($("#trabajaantes").val() == 1){
            if(!$("#tiempoSinTrabajarselect").val()){
              return error(" <b>errocode: </b> Seleccione HACE CUANTO TIEMPO QUE NO TRABAJA.");
            }
          }
        }
        //FINALIZAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA TERCERA PARTE DEL FORMULARIO
        ProgressChange("Información sobre ingresos", "4", "44.44");
        hidenAll();
        $("#sec4").css("display", "block");
        clearSection3();
    }else{
      return error(validateSection3().msg);
    }
  }

  const next4 = ()=>{
    if(validateSection4().status){
        //INICIAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA CUARTA PARTE DEL FORMULARIO
        if(!$("#recibeingresosselect").val()){
          return error(" <b>errocode: </b> Seleccione si recibe ingresos.");
        }else{
          if($("#recibeingresosselect").val() == 1){
            if($("#ingresos1").is(":checked") == false && $("#ingresos2").is(":checked") == false && $("#ingresos3").is(":checked") == false && $("#ingresos4").is(":checked") == false && $("#ingresos5").is(":checked") == false){
              return error(" <b>errocode: </b> Seleccione al menos una manera por la cual obtiene ingresos.");
            }
          }
        }
          
        //FINALIZAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA CUARTA PARTE DEL FORMULARIO
        ProgressChange(
          "Expectativas y pertenencia de la información",
          "5",
          "55.55"
        );
        hidenAll();
        $("#sec5").css("display", "block");
        clearSection4();
    }else{
      return error(validateSection4().msg);
    }
  }

  const next5 = ()=>{
    if(validateSection5().status){
      //INICIAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA QUINTA PARTE DEL FORMULARIO
      if($("#e1").is(":checked") == false && $("#e2").is(":checked") == false && $("#e3").is(":checked") == false && $("#e4").is(":checked") == false && $("#e5").is(":checked") == false && $("#e6").is(":checked") == false && $("#e7").is(":checked") == false)
        return error(" <b>errocode: </b> Seleccione al menos una casilla de '¿Qué espera lograr con la capacitación a recibir?'.");

      if(!$("#pertinencia").val())
        return error(" <b>errocode: </b> Seleccione al menos una pertinencia del curso.");
      

      //FINALIZAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA QUINTA PARTE DEL FORMULARIO
      ProgressChange("Seguimiento", "6", "66.66");
      hidenAll();
      $("#sec6").css("display", "block");
      global_json2 = json2();
      localStorage.setItem('section','2');
      console.log(global_json2);
      infoMsg("<b>IMPORTANTE</b> Recuerde que en el seguimiento debe colocar una persona distinta a usted.");
    }else{
      return error(validateSection5().msg);
    }
  }

  const next6 = async () =>{
    //INICIAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA QUINTA PARTE DEL FORMULARIO
    const name1= $("#nombrecontacto").val().toLowerCase().replace(/ /g, "");
    const name2= ($("#nombres").val() +" "+ $("#apellidos").val()).toLowerCase().replace(/ /g, ""); 
    if(name1 == name2)
      return error(`<b>Error: </b> No puede ser la misma persona el solicitante y el contacto de seguimiento`)
    if(!$("#nombrecontacto").val())
      return error(" <b>errocode: </b> Rellene el campo 'Nombre completo del contacto.'");
    if(!$("#parentesco").val())
      return error(" <b>errocode: </b> Rellene el campo 'Parentesco'");
    if(!$("#direccioncontacto").val())
      return error(" <b>errocode: </b> Rellene el campo 'Dirección'");
    if(!$("#departcontact").val())
      return error(" <b>errocode: </b> Rellene el campo 'Departamento'");
    if(!$("#municipiocontacto").val())
      return error(" <b>errocode: </b> Rellene el campo 'Municipio'");
    if(!$("#movilContacto").val())
      return error(" <b>errocode: </b> Rellene el campo 'Tel. Movil'");
    global_json3 = json3();
    SendFormulario();
  }

  const ant2 = () =>{
    ProgressChange("Educación formal y formación ocupacional", "1", "11.11");
    hidenAll();
    $("#sec1").css("display", "block");
  };

  $("#next1").click(() => {
    next1();
  });
  //========================================== 
  //#region      SECCTION NEXT 2
  // =========================================
  $("#next2").click(() => {
    next2();
  });
//#endregion
  //========================================== 
  //#region    SECCTION NEXT 3
  // =========================================
  $("#next3").click(() => {
    next3();
  });
//#endregion

  $("#next4").click(() => {
    next4();
  });

  $("#next5").click(() => {
    next5();
  });


  //CRAMOS BOTON FINALIZAR PARA ENVIAR EL PEDIDO AL SERVIDOR
  $("#next6").click(() => {
    next6();
  });



  $("#ant2").click(() => {
    ant2();
  });
  $("#ant3").click(() => {
    ProgressChange("Información sobre situación laboral", "2", "22.22");
    $("#sec2").css("display", "block");
    $("#sec3").css("display", "none");
  });
  $("#ant4").click(() => {
    ProgressChange("Información sobre ingresos", "3", "33.33");
    $("#sec3").css("display", "block");
    $("#sec4").css("display", "none");
  });
  $("#ant5").click(() => {
    ProgressChange(
      "Expectativas y pertenencia de la información",
      "4",
      "44.44"
    );
    $("#sec4").css("display", "block");
    $("#sec5").css("display", "none");
  });
  $("#ant6").click(() => {
    ProgressChange("Seguimiento", "5", "55.55");
    $("#sec5").css("display", "block");
    $("#sec6").css("display", "none");
  });

  

  $("#next1N").click(()=>{
    next1();
  });
  $("#next2N").click(()=>{
    next2();
  });
  $("#next3N").click(()=>{
    next3();
  });
  $("#next4N").click(()=>{
    next4();
  });
  $("#next5N").click(()=>{
    next5();
  });
  $("#ant2N").click(()=>{
    ant2();
  });
  
  // #region Mascara
  $("#dui").mask("00000000-0");
  $("#nit").mask("0000-000000-000-0");
  $("#fijoContact").mask("0000-0000");
  $("#movilContacto").mask("0000-0000");
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
 
  //ORDENAMIENTO 
  function ordenarSelect(id_componente)
  {
    var selectToSort = jQuery('#' + id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
      return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
    })).val(optionActual);
  }

  //Funcion busqueda de municipios
  
   
  //SELECTS
  $("#depa_nac").focus({
    width: "100%",
    ajax: {
      url: "https://api.salud.gob.sv/departamentos",
      dataType: "json",
      delay: 250,
      data:[{
        idPais: 68,
        nombre: 12,
      }], 
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
      complete: function(){
        ordenarSelect("depa_nac");
      },
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
    let dui;
    if($("#dui").val().length == 0){
      dui = $("#nit").val();
    }else{
      dui = $("#dui").val();
    }
    
    const  nit  = $("#nit").val(),
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
        moverseCaminar:$("#discapacidad1").is(":checked"),
        usarBrazosPiernas:$("#discapacidad2").is(":checked"),
        verLentes:$("#discapacidad3").is(":checked"),
        oirAparatos:$("#discapacidad4").is(":checked"),
        hablar:$("#discapacidad5").is(":checked"),
        retrasoMental:$("#discapacidad6").is(":checked"),
        vestirseAlimentarse:$("#discapacidad7").is(":checked"),
        otro:$("#discapacidad8").is(":checked"),
        otroText:$("#otrosdiscapacidades").val(),
      };
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
      };
  };

  const json2 = () =>{
    
    const sabeleerEscribir = $("#leerescribir").val(),
      leerEscribir = $("#soloescribir").val(),
      gradoFinalizado = $("#ultgrado").val(),
      estudiaActualmente = $("#estudiaactualmente").val(),
      tiempoestudio = $("#tiempoestudio").val(),
      txtOtherEduc = $("#txtOtherEduc").val(),
      txtTitleOr = $("#txtTitleOr").val(),
      cursosPasados = $("#cursospasados").val(),
      beneficioCursos = $("#beneficiocursos").val(),
      curso1 = $("#curso1").val(),
      impartio1 = $("#impartio1").val(),
      year1 = $("#year1").val(),
      beneficio1 = $("#beneficio1").val(),
      curso2 = $("#curso2").val(),
      impartio2 = $("#impartio2").val(),
      year2 = $("#year2").val(),
      beneficio2 = $("#beneficio2").val(),
      curso3 = $("#curso2").val(),
      impartio3 = $("#impartio3").val(),
      year3 = $("#year3").val(),
      beneficio3 = $("#beneficio3").val(),
      cursopositivo = {
        trabajarPropio:$("#b2").is(":checked"),
        oportunidadProm:$("#b3").is(":checked"),
        otrosIngresos:$("#b4").is(":checked"),
        cambiarEmpleo:$("#b5").is(":checked"),
        obtenerEmpleo:$("#b6").is(":checked"),
      },
      nobeneficioc = $("#nobeneficioc").val(),
      actividades = {
        estudia:$("#c1").is(":checked"),
        oficiosHogar:$("#c2").is(":checked"),
        buscaTrabajo:$("#c3").is(":checked"),
        trabaja:$("#c4").is(":checked"),
        otro:$("#c5").is(":checked")
      },
      txtOtro = $("#txtOtro").val(),
      trabajaantes = $("#trabajaantes").val(),
      tiempoSinTrabajar = $("#tiempoSinTrabajar").val(),
      tiempoSinTrabajarselect = $("#tiempoSinTrabajarselect").val(),
      tipoempleo = $("#tipoempleo").val(),
      txtOtherWork = $("#txtOtherWork").val(),
      sectortrabajo = $("#sectortrabajo").val(),
      sectorDeTrabajo = $("#sectordetrabajo").val(),
      recibeIngresos = $("#recibeingresosselect").val(),
      ingresos = {
        trabajo:$("#ingresos1").is(":checked"),
        ayudaFamiliar:$("#ingresos2").is(":checked"),
        remesa:$("#ingresos3").is(":checked"),
        pension:$("#ingresos4").is(":checked"),
        otros:$("#ingresos5").is(":checked"),
        otrosIngresos:$("#otrosIngresos").val()
      },
      otrosIngresos = $("#otrosIngresos").val(),
      espectativaLogro = {
        oportunidadProm:$("#e1").is(":checked"),
        cambEmpleo:$("#e2").is(":checked"),
        obtenerEmpleo:$("#e3").is(":checked"),
        trabajarPropio:$("#e4").is(":checked"),
        ingresosExtra:$("#e5").is(":checked"),
        ninguno:$("#e6").is(":checked"),
        otro:$("#e7").is(":checked"),
        otrosexpectativas:$("#otrosexpectativas").val(),
      },
      otrosexpectativas = $("#otrosexpectativas").val(),
      pertinencia = $("#pertinencia").val();
    return{
      sabeleerEscribir,
      leerEscribir,
      gradoFinalizado,
      estudiaActualmente,
      tiempoestudio,
      txtTitleOr,
      txtOtherEduc,
      cursosPasados,
      beneficioCursos,
      curso1,
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
      txtOtro,
      trabajaantes,
      tiempoSinTrabajar,
      tiempoSinTrabajarselect,
      tipoempleo,
      txtOtherWork,
      sectortrabajo,
      sectorDeTrabajo,
      recibeIngresos,
      ingresos,
      espectativaLogro,
      pertinencia,
      otrosIngresos,
      otrosexpectativas
    };
  };

  const json3 = () =>{
    const nombreContacto = $("#nombrecontacto").val(),
      parentesco = $("#parentesco").val(),
      direccionContacto = $("#direccioncontacto").val(),
      departcontact = $("#departcontact").val(),
      municipiocontacto = $("#municipiocontacto").val(),
      fijoContact = $("#fijoContact").val(),
      movilContacto = $("#movilContacto").val(),
      emailContacto = $("#emailcontacto").val();
    return {
      nombreContacto,
      parentesco,
      direccionContacto,
      departcontact,
      municipiocontacto,
      fijoContact,
      movilContacto,
      emailContacto
    };
  };


  const SendFormulario = async (req) => {
    try {
      let nombreCurso = $("#nombreCurso").val();
      let horarioCurso = $("#horarioCurso").val();
      let codigoCurso = $("#codigoCurso").val();
      const alerta = await Swal.fire({
        title: `¿Deseá enviar la solicitud para el curso ${nombreCurso} con horario ${horarioCurso}?`,
        text:
          "Por favor verificar que la información ingresada sea correcta antes de enviar.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, enviar",
      });
      if (alerta.isConfirmed) {
        const data = {
          global_json1,
          global_json2,
          global_json3,
          codigoCurso: codigoCurso
        };
        loader();
        const respuesta = await $.ajax({
          url: "/habil",
          type: "POST",
          data,
          dataType: "json"
        });
        Swal.close();
        if(respuesta){
          const response = await $.ajax({
            url: '/admin/habil/updateStatusRequest',
            type: 'PUT',
            data: {
              idRequest: respuesta.idSolicitud,
              status: localStorage.getItem("estado")
            }
          });
          window.location.replace(`/habil/documentacion/habil/${respuesta.idSolicitud}/documento/${global_json1.dui}`);
        }else{
          error(respuesta);
        }
      }
    } catch (e) {
      console.log(e);
      error(`<b>errocode: </b> ${e}`);
    }
  };

  const updateFormulario = async (req) => {
    try {
      let nombreCurso = $("#nombreCurso").val();
      let horarioCurso = $("#horarioCurso").val();
      let idSolicitud = $("#idSolicitud").val();
      const alerta = await Swal.fire({
        title: `¿Deseá modificar la solicitud para el curso ${nombreCurso} con horario ${horarioCurso}?`,
        text:
          "Por favor verificar que la información ingresada sea correcta antes de enviar.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, enviar",
      });
      if (alerta.isConfirmed) {
        const data = {
          global_json1,
          global_json2,
          global_json3,
          idSolicitud: idSolicitud
        };
        loader();
        const respuesta = await $.ajax({
          url: "/habil",
          type: "PUT",
          data,
          dataType: "json"
        });
        Swal.close();
        console.log(respuesta);
        if(respuesta){
          //tiene que redireccionar
          if($("#type").val() == 1){
            location.replace(`/admin/cursos/detallectz/${$("#codigoCurso").val()}/28/oferta`);
          }else{
            location.replace('/habil/gracias/habil'); 
          }
        }else{
          error(respuesta);
        }
      }
    } catch (e) {
      console.log(e);
      error(`<b>errocode: </b> ${e}`);
    }
  };

  $("#btnUpdate").click(() => {
      //INICIAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA QUINTA PARTE DEL FORMULARIO
      if(!$("#nombrecontacto").val())
      return error(" <b>errocode: </b> Rellene el campo 'Nombre completo del contacto.'");
      if(!$("#parentesco").val())
          return error(" <b>errocode: </b> Rellene el campo 'Parentesco'");
      if(!$("#direccioncontacto").val())
          return error(" <b>errocode: </b> Rellene el campo 'Dirección'");
      if(!$("#departcontact").val())
          return error(" <b>errocode: </b> Rellene el campo 'Departamento'");
      if(!$("#municipiocontacto").val())
          return error(" <b>errocode: </b> Rellene el campo 'Municipio'");
      if(!$("#movilContacto").val())
          return error(" <b>errocode: </b> Rellene el campo 'Tel. Movil'");
      

      //FINALIZAMOS EL PROCESO DE VALIDACION DEL LADO DEL CLIENTE EN LA QUINTA PARTE DEL FORMULARIO
      global_json1 = json1();
      global_json2 = json2();
      global_json3 = json3();
      updateFormulario();
  });
});



const findForProgram = () => {
  // DataTable Usuarios
  const idProgram = $("#idPrograma").val();
  $("#tbFrequentQuestions").DataTable({
      ajax: `/frequent-questions/find-for-program/${idProgram}`,
      destroy: true,
      columns: [
      {
          render(data, type, row){
              return(`${row.question}`)
          }
      },
      {
          render(date, type, row){
              return(`${row.answer}`)
              
          }
      },
        { data: "id", visible: false },
      ],
  });
};

function NumText(string){//solo letras y numeros
  var out = '';
  //Se añaden las letras validas
  var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890 ';//Caracteres validos

  for (var i=0; i<string.length; i++)
     if (filtro.indexOf(string.charAt(i)) != -1) 
     out += string.charAt(i);

  if(out == ''){
    infoMsg(`No puedes introducir caracteres especiales como "",<>,!,#,_`);
  }
  return out;
}