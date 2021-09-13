/*@author: Osmaro Bonilla
  @description: C detail
  @date: 13/09/2021
  @params: id*/
// declare variables to export
const createReasonPsychology = async (idPsychology, idReason) =>{
  //print pop up loder
  loader();
  //setFormatDate
  const data = {
      idReason,
      idPsychology
  };
  try {
      await $.ajax({
          url: `/admin/psicologia/addReasonPsychology`,
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