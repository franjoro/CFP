//#region createZipParticipant
/*
name: createZipParticipant
description: create zip whit idRequest 
params: isRequest
dependences: habil.router (/saveZipParticipant) and (/fileZipCourse/zip)
date: 15/10/2021 for Osmaro Bonilla
last update: 15/10/2021 for Osmaro Bonilla
*/
const createZipParticipant = async (idReques) =>{
    try {
        loader();
        const create = await $.ajax({
          url: `/admin/habil/saveZipParticipant`,
          type: "POST",
          data: { idReques },
        });
        if (create.status) {
          window.open(`/admin/habil/fileZipCourse/zip`);
          Swal.close();
        }else{
            console.log(create.error);
        }
      } catch (error) {
        console.log(error);
        errorMessage();
      }
};
//#endregion