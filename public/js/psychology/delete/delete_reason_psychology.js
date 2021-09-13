/*@author: Osmaro Bonilla
  @description: Detele detail
  @date: 13/09/2021
  @params: id*/
// declare variables to export
const deleteReasonPsychology = async (idPsychology, idReason) => {
    try {
    loader();
    const query = await $.ajax({
        url: "/admin/psicologia/deleteReasonPsychology",
        type: "DELETE",
        data: { 
            idReason,
            idPsychology
        },
    });
    if (query.status) {
        swal.close();
        location.reload();
    }
    } catch (error) {
    swal.close();
    errorMessage();
    }
};