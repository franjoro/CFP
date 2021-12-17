
const SendFiles = async (idProblem) => {
  
  
    //Objeto de js utilizado para mandar ficheros
    const fd = new FormData(); // Objeto de javascript utilizado para mandar documentos
    //append para anidar y ponemos el name y id del file
    fd.append(`fileDocumentos`, $(`#fileSS`)[0].files[0]);  
    //AGREGAMOS LAS VARIABLES A ENVIAR AL SERVER
    fd.append("idProblem", idProblem);

    //Ejecutamos un try e intentamos mandar los archivos a la nube
    try {
      //ventana emergente de carga
      archivosLoader();
      //const respuesta para recolectar lo traido del .ajax
      const respuesta = await $.ajax({
        url: `/problem-cases/send-file`,
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
          title: "Su caso a sido enviado con éxito.",
          showConfirmButton: false,
        });
        
      }else{
        swal.close();
        error(`No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte ${respuesta.error}`);
        console.log(respuesta);
      }
    } catch (e) {
      console.log(e);
      error(
        "No se pudo realizar la operación, verifica la información o comuniquese con el encargado del programa o soporte  <b> errorcode: </b>  " +
          e.responseJSON.error
      );
    }
  };

const createProblemCase = async()=>{
    try {
        const name = $("#txtName").val();
        const email = $("#txtEmail").val();
        const phone = $("#txtPhone").val();
        const problem = $("#txtTrouble").val();
        const description = $("#txtDescription").val();
        const idProgram = $("#idPrograma").val();
        if(!name){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa un el campo nombre.'
            });
        }
        if(!email){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo correo.'
            });
        }
        if(!phone){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo teléfono.'
            });
        }
        if(!problem){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo problema.'
            });
        }
        if(!description){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo descripción.'
            });
        }
        if(!idProgram){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe de tener un programa asignado para poder realizar este proceso.'
            });
        }
        const data = await $.ajax({
            url:'/problem-cases/add',
            type: 'POST',
            data:{
                name,
                email,
                phone,
                problem,
                description,
                idProgram
            }
        });
        if(data.affectedRows>0){
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Su caso fue enviado con exito, nos comunicaremos con usted lo más pronto posible.'
            });
            const insertId = data.insertId;
            if(document.getElementById("fileSS").files.length != 0 ){
                SendFiles(insertId);    
            }
            clearFrProblems();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Paso un error inesperado por favor pongase en contacto con soporte técnico.'
            });
        }
    } catch (error) {
        console.log(error);
    }
};