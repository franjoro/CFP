//INICIAMOS CON LA FUNCION READY DE JQUERY
$(document).ready(function () {
    $("#btnEnviarDoc").click(async() => {
        //Llamamos el evento en subida de datos
        if($("#txtdocumento").val().length >10){
            if($("#fileNITfront").val() != '' && $("#fileNITBack").val() != ''){
                SendFiles('nit-frontal');
                SendFiles('nit-trasero');   
            }else{
                error("Tiene que cargar sus documentos tanto frontal como posterior en las casillas especificadas en la ventana actual");
            }
        }else{
            if($("#fileDocumentos").val() != '' && $("#fileDUIback").val() !=''){
                SendFiles('dui-frontal');
                SendFiles('dui-trasero');
            }else{
                error("Tiene que cargar sus documentos tanto frontal como posterior en las casillas especificadas en la ventana actual");
            }
        }
    });
    $("#btnSection2").click(()=>{
        $("#block2").css('display', 'block');
        $("#block1").css('display', 'none');
        $("#block3").css('display', 'none');
    })
    $("#btnSection3").click(()=>{
        if($("#txtdocumento").val().length >10){
            if($("#fileNITfront").val() != ''){
                $("#block2").css('display', 'none');
                $("#block1").css('display', 'none');
                $("#block3").css('display', 'block');
                ProgressChange("Ingresar el documento posterior", "9", "99.99");
            }else{
                error("Tiene que cargar su documento frontal");
            }
        }else{
            if($("#fileDocumentos").val() != ''){
                $("#block2").css('display', 'none');
                $("#block1").css('display', 'none');
                $("#block3").css('display', 'block');
                ProgressChange("Ingresar el documento posterior", "9", "99.99");
            }else{
                error("Tiene que cargar su documento frontal");
            }
        }
    })
    const ProgressChange = (texto, id, val) => {
        $("#progBar").val(val);
        $("#progBar2").val(val);
        $(".texto").text(texto);
        $(".id").text(id);
    };
    ProgressChange("Ingresar el documento frontal", "8", "88.88");
    $("#block2").css('display', 'none');
    $("#block3").css('display', 'none');
});