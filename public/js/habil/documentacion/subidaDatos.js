/*@author: Osmaro Bonilla
  @description: Se utiliza para enviar los ficheros a una sentencia AJAX en la cual se ejecuta la subida
  @see: Se utiliza en subidaDatoscontroller.js
  @param: Null
  @*/
const SendFiles = async (typeDocument) => {
  console.log(typeDocument);
  
  //Recolectamos los valores de los input
    let idSolicitud = $("#id_solicitud").val();
    //Objeto de js utilizado para mandar ficheros
    const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
    //Recolectamos la longitud de archivos almacenados tanto en plantilla, recibo y cancelacion
    let cantidadDocumentos;
    switch (typeDocument) {
      case 'dui-frontal':
        cantidadDocumentos = $(`#fileDocumentos`)[0].files.length;
        //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
        for (let i = 0; i < cantidadDocumentos; i++) {
          //append para anidar y ponemos el name y id del file
          fd.append(`fileDocumentos${i}`, $(`#fileDocumentos`)[0].files[i]);  
        }
      break;
      case 'dui-trasero':
        cantidadDocumentos = $(`#fileDUIback`)[0].files.length;
        //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
        for (let i = 0; i < cantidadDocumentos; i++) {
          //append para anidar y ponemos el name y id del file
          fd.append(`fileDocumentos${i}`, $(`#fileDocumentos`)[0].files[i]);  
        }
      break;
      case 'nit-frontal':
        cantidadDocumentos = $(`#fileNITfront`)[0].files.length;
        //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
        for (let i = 0; i < cantidadDocumentos; i++) {
          //append para anidar y ponemos el name y id del file
          fd.append(`fileDocumentos${i}`, $(`#fileDocumentos`)[0].files[i]);  
        }
      break;
      case 'nit-trasero':
        cantidadDocumentos = $(`#fileNITBack`)[0].files.length;
        //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
        for (let i = 0; i < cantidadDocumentos; i++) {
          //append para anidar y ponemos el name y id del file
          fd.append(`fileDocumentos${i}`, $(`#fileDocumentos`)[0].files[i]);  
        }
      break;
      default:
        break;
    }
    
    //Usamos append para anidar la cantidad de planilla al FormData fd para manejar documentos
    fd.append("cantidadDocumentos", cantidadDocumentos);
    //AGREGAMOS LAS VARIABLES A ENVIAR AL SERVER
    fd.append("idSolicitud", idSolicitud);

    //Ejecutamos un try e intentamos mandar los archivos a la nube
    try {
      //ventana emergente de carga
      archivosLoader();
      //const respuesta para recolectar lo traido del .ajax
      const respuesta = await $.ajax({
        url: `/habil/EnviarFiles/${typeDocument}`,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
      //validamos el estado de la const respuesta
      if(respuesta.status){
        swal.close();
        Swal.fire({
          icon: "success",
          title: "Solicitud enviada correctamente",
          showConfirmButton: false,
        });
        window.location.replace('/habil/gracias/habil');
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

