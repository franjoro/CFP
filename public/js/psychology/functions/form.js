/*@author: Osmaro Bonilla
  @description: Start configure
  @date: 6/09/2021
  @params: id*/
// declare variables to export
function inputDate(id){
    $(id).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });
}
