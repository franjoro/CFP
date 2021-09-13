const readDetailsStudent = async () =>{
    const idStudent = $("#idStudent").val();
    const data = await $.ajax({ url: `/admin/psicologia/detailsStudent/${idStudent}`});
    try {
        $("#nombredet").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#nombre").text(data.datos.nombres + " " + data.datos.apellidos);
        $("#carnet").text(data.datos.carnet);
        $("#carrera").text(data.datos.carrera);
        $("#edad").text(data.datos.fechaNac);
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
