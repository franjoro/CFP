const calculateAge = (fecha) =>{
    const date1 = dayjs(fecha);
    const date2 = dayjs(DateNow());
    return date2.diff(date1, 'year');
};

const modelDate1 = (date) =>{
    const newDate = date.split("-").reverse().join("-");
    return newDate;
};

const DateNow = () =>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }
};
const readDetailsStudent = async () =>{
    const idStudent = $("#idStudent").val();
    const data = await $.ajax({ url: `/admin/psicologia/detailsStudent/${idStudent}`});
    try {
        $("#nombredet").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#nombre").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#carnet").text(data.datos.carnet);
        $("#carrera").text(data.datos.carrera);
        $("#edad").text(calculateAge(modelDate1(data.datos.fechaNac)));
        $("#genero").text(data.datos.genero);
        $("#nivel_academico").text(data.datos.nivel_academico);
        $("#estado_civil").text(data.datos.estado_civil);
        $("#telefono").text(data.datos.telefono_movil);
        if(data.datos.correo == null){
            $("#correo").text("No hay correo");
        }else{
            $("#correo").text(data.datos.correo);
        }
        if(data.datos.direccion == null){
            $("#direccion").text("No hay dirección");
        }else{
            $("#direccion").text(data.datos.correo);
        }
        
        
    } catch (error) {
        console.log(error);
    }
};
