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
            msg: 'Debe completar el item "¿Por que cree que no recibió beneficios como producto de la/las capacitación/es?o"'
        });
    }else if(($("#beneficio1").val() == 'Si' || $("#beneficio2").val() == 'Si' || $("#beneficio3").val() == 'Si') && 
        ($("#b2").prop('checked') == false && $("#b3").prop('checked') == false && $("#b4").prop('checked') == false && $("#b5").prop('checked') == false && $("#b6").prop('checked') == false))
    {
        return({
            status: false,
            msg: 'Debe seleccionar al menos un item de la sección "¿Para que sirvió(eron) la(s) capacitacion(es) que recibió?"'
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
    console.log($("#cursospasados").val());
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
        msg: 'Dado que selecciono que si a recibido algun curso antes debe rellenar al menos un curso completamente'
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
            msg: '<b>Mensaje: </b>Dado que selecciono que tiene alguna discapacidad permanente debe seleccionar al menos una.'
        });
    }
    if(disabilities && disability8 && txtDisability == ''){
        return({
            status: false,
            msg: '<b>Mensaje: </b> Dado que selecciono otra limitación permanente por favor explique con mayor detalle.'
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
            msg: "<b>Mensaje: </b>Dado que en el item 'Si usted trabaja, ¿Qué tipo de trabajo tiene?' selecciono otro || Especifique que tipo de trabajo tiene."
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
            msg: '<b>Mensaje: </b> Dado que en el item "De qué manera los obtiene" selecciono la opcion "Otros" especifique por favor.'
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
            msg: '<b>Mensaje</b>: Dado que en el item "¿Qué espera lograr con la capacitación a recibir?" selecciono la opción de "Otros" por favor especifique.'
        })
    }
    return({
        status: true
    });
}
//#endregion