const insertDocument = async ()=>{
    const fd = new FormData();
    fd.append(`fileDocument`, $(`#fileDocument`)[0].files[0]);  
    const name = $("#nameDocument").val();
    const idStudent = $("#idStudent").val();
    const status = true;
    fd.append("name", name);
    fd.append("idStudent", idStudent);
    fd.append("status", status);
    fd.append("type", 'insert');
    try {
        //ventana emergente de carga
        archivosLoader();
        //const respuesta para recolectar lo traido del .ajax
        const respuesta = await $.ajax({
          url: `/admin/vinculacion-laboral/send-files`,
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
          location.reload();
        }else{
          swal.close();
          console.log(respuesta.error);
          error(`No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte ${respuesta.error}`);
        }
    } catch (e) {
        console.log(e);
        error(
          "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte  <b> errorcode: </b>  " +
           e
        );
    }
}