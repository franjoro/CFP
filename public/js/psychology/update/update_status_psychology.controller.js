const updateStatudPsychology = async() =>{
    loader();
    const idPsychology = $("#idPsychology").val();
    const data = {
        idPsychology,
        status: 1,
    };
    try {
        const res = await $.ajax({
            url: `/admin/psicologia/updateStatusPsychology`,
            type: "PUT",
            data,
        });
        Swal.close();
        console.log(res);
        location.reload();
    } catch (error) {
        swal.close();
        console.log(error);
        errorMessage();
    }
};