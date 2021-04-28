const ProgressChange = (texto, id, val) => {
  $("#progBar").val(val);
  $("#texto").text(texto);
  $("#id").text(id);
};
$(document).ready(function () {
  // Cambiador de progress
  // BOTONES
  $("#next1").click(() => {
    ProgressChange("Información familiar", "2", "50");
    $("#sec1").css("display", "none");
    $("#sec2").css("display", "block");
  });
  $("#next2").click(() => {
    ProgressChange("Situación económica", "3", "100");
    $("#sec2").css("display", "none");
    $("#sec3").css("display", "block");
  });
  $("#next3").click(() => {
    ProgressChange("Información sobre ingresos", "4", "100");
    $("#sec3").css("display", "none");
    $("#sec4").css("display", "block");
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
    global_gastos = 
    currency($("#txt_alimentacion").val())
      .add($("#txt_vivienda").val())
      .add($("#txt_agua").val())
      .add($("#txt_energia").val())
      .add($("#txt_cable").val())
      .add($("#txt_higiene").val())
      .add($("#txt_celular").val())
      .add($("#txt_servicio").val())
      .add($("#txt_cotizacion").val())
      .add($("#txt_transporte").val())
      .add($("#txt_vigilancia").val())
      .add($("#txt_salud").val())
      .add($("#txt_educacion").val());
      
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
      url: "/ec/carreras",
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
        url: `/ec/${idcarrera}/grupos`,
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
});
