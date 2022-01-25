const deleteS3 = (keyaws) => {
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
            url: "/admin/vinculacion-laboral/delete-file",
            type: "DELETE",
            data: { key: keyaws },
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