busquedaDepartamentos = (idDepartamento, select) =>{
  const url = `https://api.salud.gob.sv/departamentos/${idDepartamento}`;
  $.ajax({
    type: "GET",
    url: url,
    data: [{
      idPais: 68,
      id: idDepartamento
    }],
    success: function(data){
      $(`${select}`).prepend(`<option value='${idDepartamento}' selected='selected'>${data.nombre}</option>`);
    }
  });
};

busquedaMunicipio = (idDepartamento,idMunicipio, select) =>{
  const url = `https://api.salud.gob.sv/municipios/${idMunicipio}`;
  $.ajax({
    type: "GET",
    url: url,
    data: [{
      idDepartamento: idDepartamento
    }],
    success: function(data){
      $(`${select}`).prepend(`<option value='${idMunicipio}' selected='selected'>${data.nombre}</option>`);
    }
  });
};


const readDetSol = async () =>{
    const data = await $.ajax({ url: `/admin/habil/readSolicitud/detalle/${$("#idSolicitud").val()}`});
    try {
      if (data.status) {
        //Recolectando los valores de json 1
        values = data.data[0];
        $("#dui").val(values.dui);
        $("#nit").val(values.nit);
        $("#nombres").val(values.nombres);
        $("#apellidos").val(values.apellidos);
        $("#sexo").val(values.sexo);
        $("#cfamilia").val(values.cfamilia);
        $("#estadofamiliar").val(values.estadoFamiliar);
        $("#jefehogar").val(values.jefeDeHogar);
        $("#nhijos").val(values.nHijos);
        if(values.booltrabajoantes == 'on'){
          $("#flexRadioDefault2").prop("checked", true);
        }else{
          $("#flexRadioDefault1").prop("checked", true);
          $("#profesiondiv").css("display", "block");
          $("#profesion").val(values.profesion);
        }
        busquedaDepartamentos(values.depNacimiento, '#depa_nac');
        busquedaMunicipio(values.depNacimiento, values.munNacimiento, "#municipioNac");
        $("#fechanac").val(values.fechNacimiento);
        $("#edad").val(calcularEdad($("#fechanac").val()));
        busquedaDepartamentos(values.depDomicilio, "#depdomicilio");
        busquedaMunicipio(values.depDomicilio, values.munDomicilio, "#municipioDomicilio");
        $("#direccion").val(values.direccionDom);
        $("#fijo").val(values.telFijo);
        $("#movil").val(values.telMovil);
        $("#mail").val(values.email);
        if(values.discapacidadBool == 'si'){
          $("#discapacidades1").prop("checked", true);
          $("#discapacidades").css("display", "block");
          const discapacidadesJson = JSON.parse(values.discapacidad);
          if(discapacidadesJson.moverseCaminar){
            
          }
          if(discapacidadesJson.moverseCaminar == 'true'){
            $("#discapacidad1").prop('checked', true);
          }
          if(discapacidadesJson.usarBrazosPiernas == 'true'){
            $("#discapacidad2").prop('checked', true);
          }
          if(discapacidadesJson.verLentes == 'true'){
            $("#discapacidad3").prop('checked', true);
          }
          if(discapacidadesJson.oirAparatos == 'true'){
            $("#discapacidad4").prop('checked', true);
          }
          if(discapacidadesJson.hablar == 'true'){
            $("#discapacidad5").prop('checked', true);
          }
          if(discapacidadesJson.retrasoMental == 'true'){
            $("#discapacidad6").prop('checked', true);
          }
          if(discapacidadesJson.vestirseAlimentarse == 'true'){
            $("#discapacidad7").prop('checked', true);
          }
          if(discapacidadesJson.otro == 'true'){
            $("#discapacidad8").prop('checked', true);
          }
          if(discapacidadesJson.otroText != 'false'){
            
            $("#otrosdiscapacidades").val(discapacidadesJson.otroText);
          }
        }else{
          $("#discapacidades2").prop("checked", true);
        }
        //Recolectando los valores de json2
        values2 = data.data2[0];
        $("#leerescribir").val(values2.sabeleerEscribir);
        if(values2.sabeleerEscribir == 0){//Si sabe leer y escribir
          $(".analfabeta").css("display", "block");
            $("#soloescribir").val(values2.leerEscribir);
        }
        $("#ultgrado").val(values2.gradoFinalizado);
        $("#txtTitleOr").val(values2.txtTitleOr);
        if(values2.txtTitleOr==''){
          $("#titleOrCert").val('no');
          $("#blockTitOr").css("display", "none");
        }else{
          $("#titleOrCert").val('si');
          $("#blockTitOr").css("display", "block");
        }
        $("#txtOtherEduc").val(values2.txtOtherEduc);
        if(values2.txtOtherEduc==''){
          $("#educacionFormal").val('no');
          $("#blockEduForm").css("display", "none");
        }else{
          $("#educacionFormal").val('si');
          $("#blockEduForm").css("display", "block");
        }
        $("#estudiaactualmente").val(values2.estudiaActualmente);
        if(values2.estudiaActualmente == 0){// Si no estudia
          $("#tiempodejoestudio").css("display", "block");
          $("#tiempoestudio").val(values2.tiempoestudio);
        }
        //1 = si 0= no
        $("#cursospasados").val(values2.cursosPasados);
        if(values2.cursosPasados == 1){

          //SECCION DE RELLENO DE INFORMACIPÓN DE CURSOS PASADOS
          $("#impartio1").val(values2.impartio1);
          $("#impartio2").val(values2.impartio2);
          $("#impartio3").val(values2.impartio3);
          $("#curso1").val(values2.curso1);
          $("#curso2").val(values2.curso2);
          $("#curso3").val(values2.curso3);
          $("#year1").val(values2.year1);
          $("#year2").val(values2.year2);
          $("#year3").val(values2.year3);
          $("#beneficio1").val(values2.beneficio1);
          $("#beneficio2").val(values2.beneficio2);
          $("#beneficio3").val(values2.beneficio3);
          $("#beneficiocursos").css("display", "block");
          if(values2.beneficio1 == 'Si' || values2.beneficio2 == 'Si' || values2.beneficio3 == 'Si'){
            $("#cursopositivo").css("display", "block");
            const jsonPositivo = JSON.parse(values2.cursopositivo);
            if(jsonPositivo.trabajarPropio == 'true'){
              $("#b2").prop("checked", true);
            }
            if(jsonPositivo.oportunidadProm == 'true'){
              $("#b3").prop("checked", true);
            }
            if(jsonPositivo.otrosIngresos == 'true'){
              $("#b4").prop("checked", true);
            }
            if(jsonPositivo.cambiarEmpleo == 'true'){
              $("#b5").prop("checked", true);
            }
            if(jsonPositivo.obtenerEmpleo == 'true'){
              $("#b6").prop("checked", true);
            }
          }
          if(values2.beneficio1 == 'No' || values2.beneficio2 == 'No' || values2.beneficio3 == 'No'){
            $("#cursonegativo").css("display", "block");
            $("#nobeneficioc").val(values2.nobeneficioc);
          }
        }
        const actividad = JSON.parse(values2.actividades);
        
        if(actividad.estudia == 'true'){
          $("#c1").prop("checked", true);
        }
        if(actividad.oficiosHogar == 'true'){
          $("#c2").prop("checked", true);
        }
        if(actividad.buscaTrabajo == 'true'){
          $("#c3").prop("checked", true);
        }
        if(actividad.trabaja == 'true'){
          $("#c4").prop("checked", true);
          $("#tiempoSinTrabajar").css("display", "none");
          $("#iftrabaja").css("display", "block");
          $("#tipoempleo").val(values2.tipoempleo);
        }
        if($("#tipoempleo").val() == 'otro'){
          $("#otherWork").css('display', 'block');
          $("#txtOtherWork").val(values2.txtOtherWork);
        }else{
          $("#otherWork").css('display', 'none');
        }
        const typeEmploye = values2.tipoempleo;
        $("#sectortrabajo").val(values2.sectortrabajo);
        if(typeEmploye == 'tmpcompleto' || typeEmploye == 'tmpparcial' || typeEmploye == 'negocio' || typeEmploye == 'inde' || typeEmploye == 'otro'){
          $("#sectordetrabajo").css('display', 'block');
        }else{
          $("#sectordetrabajo").css('display', 'none');
        }
        if(actividad.otro == 'true'){
          $("#c5").prop("checked", true);
          $("#txtOtro").val(values2.txtOtro);
        }
        //¿Ha trabajado antes?
        $("#trabajaantes").val(values2.trabajaantes);
        //1 = si a trabajado antes
        if(values2.trabajaantes == 1){
          $("#tiempoSinTrabajar").css("display", "block");
          $("#tiempoSinTrabajarselect").val(values2.tiempoSinTrabajarselect);
        }
        //¿Usted recibe ingresos?
        //1= si recibe ingresos
        $("#recibeingresosselect").val(values2.recibeIngresos);
        if(values2.recibeIngresos == 1){
          $("#sirecibeingresos").css("display", "block");
          const ingresosjson = JSON.parse(values2.ingresos);
          if(ingresosjson.trabajo == 'true'){
            $("#ingresos1").prop("checked", true);
          }
          if(ingresosjson.ayudaFamiliar == 'true'){
            $("#ingresos2").prop("checked", true);
          }
          if(ingresosjson.remesa == 'true'){
            $("#ingresos3").prop("checked", true);
          }
          if(ingresosjson.pension == 'true'){
            $("#ingresos4").prop("checked", true);
          }
          if(ingresosjson.otros == 'true'){
            $("#ingresos5").prop("checked", true);
          }
          $("#otrosIngresos").val(ingresosjson.otrosIngresos);

          // ¿Qué espera lograr con la capacitación a recibir? espectativaLogro
          //convertimos a json
          
        }
        const espectativasJson = JSON.parse(values2.espectativaLogro);
          if(espectativasJson.oportunidadProm == 'true'){
            $("#e1").prop("checked", true);
          }
          if(espectativasJson.cambEmpleo == 'true'){
            $("#e2").prop("checked", true);
          }
          if(espectativasJson.obtenerEmpleo == 'true'){
            $("#e3").prop("checked", true);
          }
          if(espectativasJson.trabajarPropio == 'true'){
            $("#e4").prop("checked", true);
          }
          if(espectativasJson.ingresosExtra == 'true'){
            $("#e5").prop("checked", true);
          }
          if(espectativasJson.ninguno == 'true'){
            $("#e6").prop("checked", true);
          }
          if(espectativasJson.otro == 'true'){
            $("#e7").prop("checked", true);
          }
          $("#otrosexpectativas").val(espectativasJson.otrosexpectativas);
          $("#pertinencia").val(values2.pertinencia);
        //Recolectando los valores de json2
        values3 = data.data3[0];
        $("#nombrecontacto").val(values3.nombreContacto);
        $("#parentesco").val(values3.parentesco);
        $("#direccioncontacto").val(values3.direccionContacto);
        busquedaDepartamentos(values3.departcontact, '#departcontact');
        busquedaMunicipio(values3.departcontact, values3.municipiocontacto, "#municipiocontacto");
        $("#fijoContact").val(values3.fijoContact);
        $("#movilContacto").val(values3.movilContacto);
        $("#emailcontacto").val(values3.emailContacto);

      }else{
          console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
};


$(document).ready(function () {
    // initialize arrow functions
    readDetSol();
});