/*@author: Osmaro Bonilla
  @description: C detail
  @date: 13/09/2021
  @params: id*/
// declare variables to export
const createStrategyPsychology = async (idPsychology, idStrategy) =>{
    //print pop up loder
    loader();
    //setFormatDate
    const data = {
        idStrategy,
        idPsychology
    };
    try {
        await $.ajax({
            url: `/admin/psicologia/addStrategyPsychology`,
            type: "POST",
            data,
        });
        Swal.close();
    } catch (error) {
        swal.close();
        console.log(error);
        errorMessage();
    }
};