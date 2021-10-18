//INICIAMOS CON LA FUNCION READY DE JQUERY
$(document).ready(function () {
    $("#btnEnviarDoc").click(() => {
        //Llamamos el evento en subida de datos
        if($("#txtdocumento").val().length >10){
            SendFiles('nit-frontal');
            SendFiles('nit-trasero');    
        }else{
            SendFiles('dui-frontal');
            SendFiles('dui-trasero');
            SendFiles('nit-frontal');
            SendFiles('nit-trasero');
        }
    });
});