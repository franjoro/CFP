/*@author: Osmaro Bonilla
  @description: page reasy
  @date: 6/09/2021*/
// declare variables to export
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
   