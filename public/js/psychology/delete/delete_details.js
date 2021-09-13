/*@author: Osmaro Bonilla
  @description: Detele detail
  @date: 6/09/2021
  @params: id*/
// declare variables to export
const deleteDetail = async (id) => {
    const alerta = await Swal.fire({
      title: "¿Eliminar cita del estudiante?",
      text: "Se eliminaran el formulario relacionado con el estudiante",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    });
  
    if (alerta.isConfirmed) {
      try {
        loader();
        const query = await $.ajax({
          url: "/admin/psicologia/deletePsychology",
          type: "DELETE",
          data: { idPsychology: id },
        });
        if (query.status) {
          swal.close();
          location.reload();
        }
      } catch (error) {
        swal.close();
        errorMessage();
      }
    }
  };