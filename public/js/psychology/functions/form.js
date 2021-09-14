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

//fcuntion model date 
const modelDate  =(date) =>{
  const year = new Date(date).getFullYear();
  let month = new Date(date).getMonth();
  let day = new Date(date).getDate();
  if(month<10){
      month = '0'+month;
  }
  if(day<10){
      day = '0'+day;
  }
  const dateReturn = (year+'-'+month+'-'+day);
  return dateReturn;
};
const modelHour = (date) =>{
  let hour = new Date(date).getHours();
  let minutes = new Date(date).getMinutes();
  if(hour<10){
      hour = '0'+hour;
  }
  if(minutes<10){
      minutes = '0'+minutes;
  }
  const hourReturn = hour+':'+minutes+':00';
  return hourReturn;
};

const readForm = async() =>{
  const idPsychology = $('#idPsychology').val();
  const data = await $.ajax({
    url: `/admin/psicologia/getDetailsPsychology/${idPsychology}`
  });
  $("#txtResultado").val(data.data[0].results);
  $("#txtConsideraciones").val(data.data[0].observations);
  $("#nextDate").val(modelDate(data.data[0].next_date));
  $("#nextHour").val(modelHour(data.data[0].next_date));
  if(data.data[0].next_date != null){
      $("#nextHour").val(modelHour(data.data[0].next_date));
      $("#nextDate").val(modelDate(data.data[0].next_date));
  }else{
      $("#nextHour").val(null);        
      $("#nextDate").val(null);

  }
};