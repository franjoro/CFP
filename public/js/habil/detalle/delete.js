const deleteNotificacion = (idSolicitud) => {
    Swal.fire({
      html:
        "<h4>¿Desea borrar permanentemente este archivo?</h4> <small>Escriba <b>Eliminar</b> para confirmar, esta acción no podra revertirse</small>",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        if (text == "eliminar" || text == "Eliminar") {
          return $.ajax({
            url: "/admin/habil/deleteSolicitud",
            type: "DELETE",
            data: { idSolicitud: idSolicitud },
          })
            .then((response) => {
              if (!response.status) {
                throw new Error(response.statusText);
              }
              return response;
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        }
        Swal.showValidationMessage(`Debe escribir correctamente eliminar`);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      location.reload();

      if (result.value.status) {
        location.reload();
      }
    });
  };


  const deleteS3 = (id) => {
    Swal.fire({
      html:
        "<h4>¿Desea borrar permanentemente este archivo?</h4> <small>Escriba <b>Eliminar</b> para confirmar, esta acción no podra revertirse</small>",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        if (text == "eliminar" || text == "Eliminar") {
          return $.ajax({
            url: "/admin/habil/deleteFiles3",
            type: "DELETE",
            data: { key: id },
          })
            .then((response) => {
              if (!response.status) {
                throw new Error(response.statusText);
              }
              return response;
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        }
        Swal.showValidationMessage(`Debe escribir correctamente eliminar`);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      if (result.value.status) {
        location.reload();
      }
    });
  };



  const deleteParticipants = () => {
    selectParticipants();
    Swal.fire({
      html:
        "<h4>¿Desea borrar permanentemente este conjunto de solicitudes?</h4> <small>Escriba <b>Eliminar</b> para confirmar, esta acción no podra revertirse</small>",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        if (text == "eliminar" || text == "Eliminar") {
          $(JSON.parse(sessionStorage.getItem('participants'))).each(async(index, element) =>{
            await $.ajax({
            url: "/admin/habil/deleteSolicitud",
            type: "DELETE",
            data: { idSolicitud: element },
            })
            .then((response) => {
              if (!response.status) {
                throw new Error(response.statusText);
              }
              return response;
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
          });
        }else{
          Swal.showValidationMessage(`Debe escribir correctamente eliminar`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      location.reload();
      if (result.value.status) {
        location.reload();
      }
    });
  };
