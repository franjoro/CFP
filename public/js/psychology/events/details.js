$(document).ready(function () {
    //Configuraciones iniciales
    inputDate("#nextDate");
    inputDate("#nextDateEdit");
    readDetailsStudent();
    detailsTable();
});
   

// $(document).ready(function () {
//     seeUserWhitPsichology();
//     $("#selectStudents").on("change", function () {
//         if (this.value == "no") {
//             seeUserWhitNoPsichology();
//         } else {
//             seeUserWhitPsichology();
//         }
//     });
//     table();
//     tableCadre();
// });