$(document).ready(function () {
    seeUserWhitPsichology();
    $("#selectStudents").on("change", function () {
        if (this.value == "no") {
            seeUserWhitNoPsichology();
        } else {
            seeUserWhitPsichology();
        }
    });
    table();
    tableCadre();
});
   