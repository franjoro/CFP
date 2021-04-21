const ProgressChange = (texto, id, val)=>{
    $('#progBar').val(val);
    $("#texto").text(texto);
    $("#id").text(id);
}

$(document).ready(function () {
   // Cambiador de progress
  // BOTONES
  $("#next1").click(() => {
    ProgressChange("Educación formal y formación ocupacional","2","33.33")
    $("#sec1").css("display", "none");
    $("#sec2").css("display", "block");
  });
  $("#next2").click(() => {
    ProgressChange("Información sobre situación laboral","3","50")
    $("#sec2").css("display", "none");
    $("#sec3").css("display", "block");
  });
  $("#next3").click(() => {
    ProgressChange("Información sobre ingresos","4","66.33")
    $("#sec3").css("display", "none");
    $("#sec4").css("display", "block");
  });
  $("#next4").click(() => {
    ProgressChange("Expectativas y pertenencia de la información","5","82.66")
    $("#sec4").css("display", "none");
    $("#sec5").css("display", "block");
  });
  $("#next5").click(() => {
    ProgressChange("Seguimiento","6","100")
    $("#sec5").css("display", "none");
    $("#sec6").css("display", "block");
  });

  // SECCION 1 =========================================================================
  //Mascara
  $("#dui").mask("00000000-0");
  $("#nit").mask("0000-000000-000-0");
  //Discapacidad
  $("#discapacidad").click(function () {
    const checkBox = document.getElementById("discapacidad");
    if (checkBox.checked == true) {
      $("#discapacidades").css("display", "block");
    } else {
      $("#discapacidades").css("display", "none");
    }
  });
  //profesion
  $("#gridCheck").click(function () {
    const checkBox = document.getElementById("gridCheck");
    if (checkBox.checked == true) {
      $("#profesiondiv").css("display", "block");
    } else {
      $("#profesiondiv").css("display", "none");
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
});
