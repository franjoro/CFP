const SendFiles = async () => {
    let idSolicitud = $("#id_solicitud").val();
    let documento = $("#documento").val();
    let documento2 = $("#documento2").val();

    const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
    //Recolectamos la longitud de archivos almacenados tanto en plantilla, recibo y cancelacion
    let cantidadDocumentos = $(`#fileDocumentos`)[0].files.length;
    //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
    fd.append(`fileDocumentos`, $(`#fileDocumentos`)[0].files[0]);//append para anidar y ponemos el name y id del file
    
    //Usamos append para anidar la cantidad de planilla al FormData fd para manejar documentos
    fd.append("cantidadDocumentos", cantidadDocumentos);
    //AGREGAMOS LAS VARIABLES A ENVIAR AL SERVER
    fd.append("idSolicitud", idSolicitud);
    fd.append("documento1", documento);
    fd.append("documento2", documento2);

    //Ejecutamos un try e intentamos mandar los archivos a la nube
    try {
      archivosLoader();
      const respuesta = await $.ajax({
        url: "/habil/EnviarFiles",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
      if(respuesta.status){
        swal.close();
        Swal.fire({
          icon: "success",
          title: "Solicitud enviada correctamente",
          showConfirmButton: false,
        });
      }else{
        swal.close();
        error(`No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte ${respuesta.error}`);
      }
    } catch (e) {
      console.log(e);
      error(
        "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte  <b> errorcode: </b>  " +
          e.responseJSON.error
      );
    }
  };

