//INICIAMOS CON LA FUNCION READY DE JQUERY
$(document).ready(function () {
    $("#btnEnviarDoc").click(async() => {
        //Llamamos el evento en subida de datos
        if($("#txtdocumento").val().length >10){
            SendFiles('nit-frontal');
            SendFiles('nit-trasero');    
        }else{
            if($("#fileDocumentos").val() != '' && $("#fileDUIback").val() !=''){
                SendFiles('dui-frontal');
                SendFiles('dui-trasero');
            }else{
                error("Tiene que cargar sus documentos tanto frontal como posterior en las casillas especificadas en la ventana actual");
            }
        }
    });
});