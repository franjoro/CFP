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

const warningMsg =(msg) =>{
  Swal.fire({
    icon: "warning",
    title: "ADVERTENCIA",
    html: msg
  });
};

const errorMsg = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    html: msg,
  });
};


//Funcion de calculo de fecha
function calculatedYearOld(fecha) {
  let date = new Date(fecha);
  let day = date.getDate();
  let month = date.getMonth()+1;
  if(month <10)
    month = "0"+month;
  if(day < 10)
    day = '0'+day;
  let year = date.getFullYear();
  let fullDate = `${year}-${month}-${day}`;
  const date1 = dayjs(fullDate);
  const date2 = dayjs(nowDate());
  return date2.diff(date1, 'year');
} 

//Fecha actual formaro yy-mm-dd
function nowDate(){
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



const toastSucces = (msg) =>{
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "success",
    title: msg,
  });
};



// const firtWordUppercase = (text)=>{
//   return text
//   .toLowerCase()
//     .split(' ')
//     .map(function(Word) {
//         return Word[0].toUpperCase() + Word.substr(1);
//     })
//     .join(' ');
// };
 
