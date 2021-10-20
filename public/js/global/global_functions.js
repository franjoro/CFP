const noCopyNoPaste = (id) =>{
    $(id).bind("cut copy paste", function (e){
        e.preventDefault();
    });
};


const startWhitoutNumber = (text) =>{
    let er = /[0-9]\w+/g;
};

//#region 
/*
name: validate16
description: validate date and change text
params: id(input type=date)
dependences: function calcularEdad() and function error()
date: 20/10/2021 for OsmaroBonilla
lastupdate: 20/10/2021 for OsmaroBonilla
*/
const validate16 = (id) =>{
    $(id).change(function(){
        const edad = calcularEdad($(id).val());
        if(edad < 16){
            error("<b>Mensaje:</b> El participante debe tener más de 16 años");
            $(id).val("");
        }
    });
};
//#endregion



function calcularEdad(fecha) {
    let date = new Date(fecha);
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth()+1;
    if(month <10)
      month = "0"+month;
    if(day < 10)
      day = '0'+day;
    let year = date.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    console.log(fullDate);
    console.log(fecha);
    
    const date1 = dayjs(fullDate);
    const date2 = dayjs(fechaActual());
    return date2.diff(date1, 'year');
  } 
  //Fecha actual formaro yy-mm-dd
  function fechaActual(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }
  }
  function convertDateFormat(string) {
    var info = string.split('/').reverse().join('/');
    return info;
}



