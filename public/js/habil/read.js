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
        busquedaDepartamentos(values.depDomicilio, "#depdomicilio");
        busquedaMunicipio(values.depDomicilio, values.munDomicilio, "#municipioDomicilio");
        $("#direccion").val(values.direccionDom);
        $("#fijo").val(values.telFijo);
        $("#movil").val(values.telMovil);
        $("#mail").val(values.email);
        if(values.discapacidadBool == 'si'){
          $("#discapacidades1").prop("checked", true);
          $("#discapacidades").css("display", "block");
          console.log(values.discapacidad);
          const discapacidadesJson = JSON.parse(values.discapacidad);
          console.log(discapacidadesJson);
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
          if(discapacidadesJson.otroText != ''){
            
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
            if(values2.soloFirma == 'firmahuella'){
              $("#firmahuella").prop('checked', true);
            }
        }
        $("#ultgrado").val(values2.gradoFinalizado);
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
            console.log(values2.cursopositivo);
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
        }
      }else{
          console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
};
$(document).ready(function () {
    readDetSol();
});