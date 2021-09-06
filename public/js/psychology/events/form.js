$(document).ready(function () {
    
    //Configuraciones iniciales
    inputDate("#nextDate");
    $("#nextDate").prop("disabled", true);
    $("#nextHour").prop("disabled", true);
    //Eventos $("#").change
    $("#ckCita").change(function() {
        if ($(this).prop('checked')) {
            $("#nextDate").prop("disabled", false);
            $("#nextHour").prop("disabled", false);
        }
        else {
            $("#nextHour").prop("disabled", true);
            $("#nextDate").prop("disabled", true);
        }
    });
});
   