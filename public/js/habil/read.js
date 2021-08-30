const readDetSol = async () =>{
    const data = await $.ajax({ url: `/admin/habil/readSolicitud/detalle/${$("#idSolicitud").val()}`});
    try {
      if (data.status) {
        values = data.data[0];
        $("#dui").val(values.dui);
        $("#nit").val(values.nit);
        $("#nombres").val(values.nombres);
        $("#apellidos").val(values.apellidos);
        $("#sexo").val(values.sexo);
        $("#cfamilia").val(values.cfamilia);
        $("#estadofamiliar").val(values.estadoFamiliar);
        $("#jefehogar").val(values.jefeDeHogar);
        $("#nhijos").val(values.nHijos);
        alert(values.booltrabajoantes);

      }else{
          console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
};
$(document).ready(function () {
    readDetSol();
});