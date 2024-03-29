/*@author: Osmaro Bonilla
  @description: Se utiliza para enviar los ficheros a una sentencia AJAX en la cual se ejecuta la subida
  @see: Se utiliza en subidaDatoscontroller.js
  @param: Null
  @*/
const SendFiles = async (typeDocument) => {
  
  //Recolectamos los valores de los input
    let idSolicitud = $("#id_solicitud").val();
    if( localStorage.getItem("estado") == 1){localStorage.setItem("estado", 0)}
    const response = await $.ajax({
        url: '/admin/habil/updateStatusRequest',
        type: 'PUT',
        data: {
          idRequest: idSolicitud,
          status: localStorage.getItem("estado")
        }
    });
    //Objeto de js utilizado para mandar ficheros
    const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
    //Recolectamos la longitud de archivos almacenados tanto en plantilla, recibo y cancelacion
    let cantidadDocumentos = 2;
    switch (typeDocument) {
      case 'dui':
        fd.append(`fileDocumentos0`, $(`#fileDocumentos`)[0].files[0]);  
        fd.append(`fileDocumentos1`, $(`#fileDUIback`)[0].files[0]);  
      break;
      case 'nit':
        fd.append(`fileDocumentos0`, $(`#fileNITfront`)[0].files[0]);  
        fd.append(`fileDocumentos1`, $(`#fileNITBack`)[0].files[0]);  
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
        window.location.replace(`/habil/gracias/habil/${$("#idProgram").val()}`);
        return true;
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

const sendOtherFile = async()=>{
  //Recolectamos los valores de los input
  let idSolicitud = $("#idSolicitud").val();
  let typeDocument = $("#documentType").val();

  //Objeto de js utilizado para mandar ficheros
  const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
  //Recolectamos la longitud de archivos almacenados tanto en plantilla, recibo y cancelacion
  let cantidadDocumentos;
  
  cantidadDocumentos = $(`#documentFile`)[0].files.length;
  //Hacemos un for a pesar de que sea solo un file tiene diferentes archivos por eso mandamos un for
  for (let i = 0; i < cantidadDocumentos; i++) {
    //append para anidar y ponemos el name y id del file
    fd.append(`fileDocumentos${i}`, $(`#documentFile`)[0].files[i]);  
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
      window.location.reload();
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