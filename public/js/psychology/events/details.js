/*@author: Osmaro Bonilla
  @description: Created Psychology row in tb_psychology with id_student, date, statud = 0
  @date: 6/09/2021*/
// declare variables to export
$(document).ready(function () {
    //Configuraciones iniciales
    inputDate("#nextDate");
    inputDate("#nextDateEdit");
    inputDate("#followUpDateEdit");
    readDetailsStudent();
    detailsTable();
    
});