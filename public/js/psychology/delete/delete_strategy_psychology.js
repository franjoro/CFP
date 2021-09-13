/*@author: Osmaro Bonilla
  @description: Detele detail
  @date: 13/09/2021
  @params: id*/
// declare variables to export
const deleteStrategyPsychology = async (idStrategy, idPsychology) => {
    try {
    loader();
    const query = await $.ajax({
        url: "/admin/psicologia/deleteStrategyPsychology",
        type: "DELETE",
        data: { 
            idStrategy,
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