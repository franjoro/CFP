//INICIAMOS CON LA FUNCION READY DE JQUERY
$(document).ready(function () {
    $("#btnEnviarDoc").click(() => {
        //Llamamos el evento en subida de datos
        SendFiles();
    });
});