/* 
name: functions.js
description: function to formhabil
author: OsmaroBonilla
date: 12/10/2021 for Osmaro Bonilla
last update: 12/10/2021 for Osmaro Bonilla
*/
//#region validationCompletePreviousCourses
/*
name: validationCompletePreviousCourses
description: we validate th this complete previous courses information
params: null
date: 12/20/2021
*/
const validationCompletePreviousCourses = () => {
    if(($("#beneficio1").val() == 'No' || $("#beneficio2").val() == 'No' || $("#beneficio3").val() == 'No') && $("#nobeneficioc").val() == ''){
        return ({
            status: false,
            msg: 'Debe completar el item <b>"¿Por que cree que no recibió beneficios como producto de la/las capacitación/es?"</b>'
        });
    }else if(($("#beneficio1").val() == 'Si' || $("#beneficio2").val() == 'Si' || $("#beneficio3").val() == 'Si') && 
        ($("#b2").prop('checked') == false && $("#b3").prop('checked') == false && $("#b4").prop('checked') == false && $("#b5").prop('checked') == false && $("#b6").prop('checked') == false))
    {
        return({
            status: false,
            msg: 'Debe seleccionar al menos un item de la sección <b>"¿Para que sirvió(eron) la(s) capacitacion(es) que recibió?"</b>'
        });
    }
    else{
        return({
            status: true
        })
    }
}
//#endregion

//#region validationCompleteNamePreviosCouses
/*
name validationCompleteNamePreviosCouses
description: we validate that this complete at least one course
params: null
date: 12/20/2021
*/
const validationCompleteNamePreviosCouses = () =>{
    // variables
    const selectCourse = $("#cursospasados").val();
    const name1 = $("#curso1").val();
    const name2 = $("#curso2").val();
    const name3 = $("#curso3").val();
    const impart1 = $("#impartio1").val();
    const impart2 = $("#impartio2").val();
    const impart3 = $("#impartio3").val();
    const year1 = $("#year1").val();
    const year2 = $("#year2").val();
    const year3 = $("#year3").val();
    const benefit1 = $("#beneficio1").val();
    const benefit2 = $("#beneficio2").val();
    const benefit3 = $("#beneficio3").val();
    // Validate course information
    if(selectCourse == 1 &&(name1 != '' && impart1 != '' && year1 != '' && benefit1 != '')){
        return({
            status: true
        })
    }
    if(selectCourse == 1 &&(name2 != '' && impart2 != '' && year2 != '' && benefit2 != '')){
        return({
            status: true
        })
    }
    if(selectCourse == 1 &&(name3 != '' && impart3 != '' && year3 != '' && benefit3 != '')){
        return({
            status: true
        })
    }
    if(selectCourse != 1){
        return({
            status: true
        });
    }
    return({
        status: false,
        msg: 'Dado que selecciono que si a <b>"¿Ha recibido antes algún(os) curso(s) de capacitación?"</b> debe rellenar al menos un curso completamente'
    });
}
//#endregion


//#region clearDisabilities
/*
name: Disabilities
description: clear block Disabilities
params: null
date: 12/10/2021 for Osmaro Bonilla
last update: 12/10/2021 for Osmaro Bonilla
*/
const clearDisabilities = () =>{
    // if whitout disabilities
    if($("#discapacidades2").prop('checked')){
        $("#discapacidad1").prop('checked',false);
        $("#discapacidad2").prop('checked',false);
        $("#discapacidad3").prop('checked',false);
        $("#discapacidad4").prop('checked',false);
        $("#discapacidad5").prop('checked',false);
        $("#discapacidad6").prop('checked',false);
        $("#discapacidad7").prop('checked',false);
        $("#discapacidad8").prop('checked',false);
        $("#otrosdiscapacidades").val('');
    }
}
//#endregion

//#region validateDisabilities
/*
name:  validateDisabilities
description: we validated complete disabilities information
params: null
date: 12/10/2021
last update: 12/2010/2021
*/
const validateDisabilities = () =>{
    const disabilities = $("#discapacidades1").prop('checked');
    const disability1 = $("#discapacidad1").prop('checked');
    const disability2 = $("#discapacidad2").prop('checked');
    const disability3 = $("#discapacidad3").prop('checked');
    const disability4 = $("#discapacidad4").prop('checked');
    const disability5 = $("#discapacidad5").prop('checked');
    const disability6 = $("#discapacidad6").prop('checked');
    const disability7 = $("#discapacidad7").prop('checked');
    const disability8 = $("#discapacidad8").prop('checked');
    const txtDisability = $("#otrosdiscapacidades").val();
    if(disabilities && !disability1 && !disability2 && !disability3 && !disability4 && !disability5 && !disability6 && !disability7 && !disability8){
        return({
            status: false,
            msg: '<b>Mensaje: </b>Dado que selecciono "SI" a "<b>Tiene algina discapacidad permanente?</b>" debe seleccionar al menos una.'
        });
    }
    if(disabilities && disability8 && txtDisability == ''){
        return({
            status: false,
            msg: '<b>Mensaje: </b> Dado que selecciono <b>"Otra limitación permanente"</b> por favor explique con mayor detalle.'
        });
    }
    return({
        status: true
    });
    
}
//#endregion


//#region clearSection2
/*
name: clearSection2
description: when click in button next2 clear section 2
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const clearSection2 = () =>{
    // crear if it is leerescribir value = 1 //SI
    if($("#leerescribir").val() == 1)
        $("#soloescribir").val('');
    //clrear if it's  educacionFormal value = 'no'
    if($("#educacionFormal").val() == 'no')
        $("#txtOtherEduc").val('');
    // clear if it is titleOrCert value = 'no'
    if($("#titleOrCert").val() == 'no')
        $("#txtTitleOr").val('');
    // clear if it is tiempoestudio value = 1 // SI
    if($("#estudiaactualmente").val() == 1)
        $("#tiempoestudio").val('');
    // cleat if it is cursospasados = 0 //NO
    if($("#cursospasados").val() == 0){
        $("#curso1").val('');
        $("#curso2").val('');
        $("#curso3").val('');
        $("#impartio1").val('');
        $("#impartio2").val('');
        $("#impartio3").val('');
        $("#year1").val('');
        $("#year2").val('');
        $("#year3").val('');
        $("#beneficio1").val('');
        $("#beneficio2").val('');
        $("#beneficio3").val('');
        $("#b2").prop('checked',false);
        $("#b3").prop('checked',false);
        $("#b4").prop('checked',false);
        $("#b5").prop('checked',false);
        $("#b6").prop('checked',false);
        $("#nobeneficioc").val('');
    }
}
//#endregion


//#region clearSection3
/*
name: trabajaantes
description: clear section 3 when onclick in next3
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const clearSection3 = () =>{
    // is trabajaantes value = 0 || no
    if($("#trabajaantes").val() == 0)
        $("#tiempoSinTrabajarselect").val('');
    if($("#tipoempleo").val() == 'temporal' || $("#tipoempleo").val() == 'informal')
        $("#sectortrabajo").val("");
    if($("#tipoempleo").val() != "otro")
        $("#txtOtherWork").val("");

}
//#endregion

//#region validateSection3
/*
name: validateSection3 
description: validate section 3 whit diferents errors
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const validateSection3 = () =>{
    if($("#tipoempleo").val() == "otro" && $("#txtOtherWork").val() == '')
    {
        return ({
            status: false,
            msg: "<b>Mensaje: </b>Dado que en el item <b> 'Si usted trabaja, ¿Qué tipo de trabajo tiene?' </b> selecciono <b>'Otro'</b>. Especifique que tipo de trabajo tiene."
        });
    }
    return({
        status: true
    })
}
//#endregion

//#endregion

//#region clearSection4
/*
name: clearSection4 
description: clear section 4 when clic button next4
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const clearSection4 = () =>{
    if($("#recibeingresosselect").val() == '0'/**NO*/){
        $("#ingresos1").prop('checked',false);
        $("#ingresos2").prop('checked',false);
        $("#ingresos3").prop('checked',false);
        $("#ingresos4").prop('checked',false);
        $("#ingresos5").prop('checked',false);
        $("#otrosIngresos").val("");
    }
}
//#endregion


//#region validateSection4
/*
name: validateSection4 
description: validate section 4 
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const validateSection4 = () =>{
    if($("#ingresos5").prop('checked') == true && $("#otrosIngresos").val() == ''){
        return({
            status: false,
            msg: '<b>Mensaje: </b> Dado que en el item <b>"¿De qué manera los obtiene?"</b> selecciono la opcion <b>"Otros"</b> especifique por favor.'
        })
    }
    return({
        status: true
    });

}
//#endregion



//#region validateSection5
/*
name validateSection5
description:
params: null
date: 13/10/2021 for Osmaro Bonilla
last update: 13/10/2021 for Osmaro Bonilla
*/
const validateSection5 = () =>{
    if($("#e7").prop('checked') == true && $("#otrosexpectativas").val() == ''){
        return({
            status: false,
            msg: '<b>Mensaje</b>: Dado que en el item <b>"¿Qué espera lograr con la capacitación a recibir?"</b> selecciono la opción de <b>"Otros"</b> por favor especifique.'
        })
    }
    return({
        status: true
    });
}
//#endregion


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
    if($("#beneficio1").val() != 'No' && $("#beneficio2").val() != 'No' && $("#beneficio3").val() != 'No'){
      $("#cursonegativo").css("display", "none");
    }
    if($("#beneficio1").val() != 'Si' && $("#beneficio2").val() != 'Si' && $("#beneficio3").val() != 'Si'){
      $("#cursopositivo").css("display", "none");
    }
    if (this.value == "Si") {
      $("#cursopositivo").css("display", "block");
    }
    if (this.value == "No") {
      $("#cursonegativo").css("display", "block");
    }
  });


   // SECCION 2 =========================================================================
  // Sabe leer escribir


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
/*

  name: calculingYearInChange
description: change year in moment change dateText
params: null
author: OsmaroBonilla
date: 12/10/2021
*/
const changeDateOfBirth = () =>{
  $("#fechanac").change(function(){
    $("#edad").val(calcularEdad($("#fechanac").val()));
  });
}



// name:charge title and tecnology
// description see input for change text in title and tecnology
// params: null
// author: Osmaro Bonilla
// date: 11/10/2021
const changeTitleAndTecnology = () =>{
    $("#educacionFormal").change(function(){
      if($('#educacionFormal').val() == 'si'){
        $("#blockEduForm").css('display', 'block');
      }else{
        $("#blockEduForm").css('display', 'none');
      }
    });
    $("#titleOrCert").change(function(){
      if($("#titleOrCert").val() == 'si'){
        $("#blockTitOr").css('display', 'block');
      }else{
        $("#blockTitOr").css('display', 'none');
      }
    });
  }
  
  // name changeOtherSec3_1_2
  // description: change text input select tipoempleo
  // params: null
  // author: OsmaroBonilla
  // date: 11/10/2021
  const changeOtherSec3_1_2 = () =>{
      $("#tipoempleo").change(function(){
        const typeEmploye = $("#tipoempleo").val();
        if($("#tipoempleo").val() == 'otro'){
          $("#otherWork").css('display', 'block');
        }else{
          $("#otherWork").css('display', 'none');
        }
        if(typeEmploye == 'tmpcompleto' || typeEmploye == 'tmpparcial' || typeEmploye == 'negocio' || typeEmploye == 'inde' || typeEmploye == 'otro'){
          $("#sectordetrabajo").css('display', 'block');
        }else{
          $("#sectordetrabajo").css('display', 'none');
        }
      });
  }


//#region 
/*
name: actualYear
description: to get 3 years prior to current one
params: idIinput
date: 18/10/2021 for OsmaroBonilla
last update: 18/10/2021 for OsmaroBonilla 
*/
const actualYear = (idInput) =>{
  let date = new Date();
  let year = date.getFullYear();
  let arrayYear = [];
  arrayYear[0] = year;
  arrayYear[1] = year-1;
  arrayYear[2] = year-2;
  for (let i = 0; i < arrayYear.length; i++) {
    $(idInput).prepend($('<option />', {
      text: '' + (arrayYear[i]),
      value: arrayYear[i],
    }));
  }
  $(idInput).prepend($('<option selected />', {
    text: '',
    value: '',
  }));
  
};
//#endregion


//#region 
/*
name: clearPastCourses
description: clear section past courses
params: null
date: 20/10/2021 for OsmaroBonilla 
lastupdate: 20/10/2021 for OsmaroBonilla 
*/
const clearPasrCourses = () => {
  $("#curso1").val("");
  $("#impartio1").val("");
  $("#year1").val("");
  $("#beneficio1").val("");
  $("#curso2").val("");
  $("#impartio2").val("");
  $("#year2").val("");
  $("#beneficio2").val("");
  $("#curso3").val("");
  $("#impartio3").val("");
  $("#year3").val("");
  $("#beneficio3").val("");
};
//#endregion

//#region 
/*
name : onlyNone
dascription: in chekbox not selct other option for none
params: null
date: 20/10/2021 for OsmaroBonilla
lastupdate: 20/10/2021 for OsmaroBonilla
*/
const onlyNone =  () =>{
  if($("#e6").prop('checked') == true){
    $("#e1").prop('checked',false);
    $("#e2").prop('checked',false);
    $("#e3").prop('checked',false);
    $("#e4").prop('checked',false);
    $("#e5").prop('checked',false);
    $("#e7").prop('checked',false);
  }
};
//#endregion



//#region 
/*
name: selectSection
description: select section whit cache
params: localStorage(section)
date: 20/10/2021 for OsmaroBonilla
lastupdate: 20/10/2021 for OsmaroBonilla
*/
//#endregion


//#region 
/*
name: countSolicitud()
description count
date: 21/10/2021 for OsmaroBonilla
lastupdate: 21/10/2021 for OsmaroBonilla
*/
const countSolicitud = async () =>{
  const data = await $.ajax({
    url: `/admin/habil/count-solicitud/${$("#codigoCurso").val()}`,
  });
  if(data.status){
    const count = data.data[0].count;
    const cupo = data.data[0].cupo;
    const habilitado = data.data[0].habilitado;
    if($("#codigoCurso").val() == 'rygfvghbjhvshkrdjbgvjhgbjdh'){
        errorMsg("<b>Mensaje: </b>Ya no se pueden realizar más inscripciones.");
        setTimeout(function(){
          window.location.href = "./deshabilitado/habil";
        },2000);
    }else{
      if($("#view").val() != 'view'){
        if(habilitado == 0){
          errorMsg("<b>Mensaje: </b>Se han deshabilitado las inscripciones");
          setTimeout(function(){
            window.location.href = "./deshabilitado/habil";
          },2000);
        }else{
          const type = $("#type").val();
          if(type == 0){
            if((count+1) > cupo){
              localStorage.setItem('estado', 4);
              warningMsg("<b>Mensaje:</b> Los cupos de este curso estan llenos pero puedes llenar el formulario y quedar pendiente para confirmación de apertura de algun cupo.")
            }else{
              localStorage.setItem('estado', 1);
            }
          }
        }
      }
    }
    
  }
};
//#endregion
const validateInscriptions = async () =>{
  const dui = $("#dui").val();
  let retorno = false;
  const nameCourse = $("#nameCourse").val();
  const idCourse = $("#idCourse").val();
  const data = await $.ajax({
    url: `/admin/habil/nameInscriptions/${dui}/${idCourse}`,
  });
  for (let i = 0; i < JSON.parse(JSON.stringify(data.listCourses)).length; i++) {
    const element = JSON.parse(JSON.stringify(data.listCourses))[i];
    if(nameCourse == element.nombre_curso){
      retorno = true;
    }
  }
  return(retorno);
};

const otherCourse = async (req,res) =>{
  const idCourse = $("#idCourse").val();
  const nameCourse = $("#nameCourse").val();
  const schedule = $("#schedule").val();
  let msg = '<b>errocode: </b> Existe un conflicto de horarios no puedes inscribir 2 cursos con los mismos horarios';
  try {
    const data = await $.ajax({ url: `/admin/habil/options-schedule/${idCourse}`});
    for (let i = 0; i < JSON.parse(JSON.stringify(data.list)).length; i++) {
      const element = JSON.parse(JSON.stringify(data.list))[i];
      // console.log(`Horario Intentando: ${schedule} - Horario de otros cursos ${element.schedule}`);
      console.log(`Nombre de curso intentado: ${nameCourse} - Nombre de otro curso: ${element.name_course}`);
      if(nameCourse == element.name_course){
        msg = `Tienes un curso ya en este horario pero te podemos recomendar el curso <b>${element.name_course} con los horarios ${element.schedule}</b>`;
      }
    }
    return(msg);
  } catch (error) {
    console.log(error)
  }
};

const validateSchedule = async () =>{
  const dui = $("#dui").val();
  const idCourse = $("#idCourse").val();
  const schedule = $("#schedule").val();
  let retorno = false;
  try {
    const data = await $.ajax({ url: `/admin/habil/validate-schedule/${dui}/${idCourse}`});
    for (let i = 0; i < JSON.parse(JSON.stringify(data.list)).length; i++) {
      const element = JSON.parse(JSON.stringify(data.list))[i];
      if(schedule == element.schedule){
        retorno = true;
      }
    }
    return(retorno);  
  } catch (error) {
    console.log(error)
  }
}; 
