const printPdfPsychology = async (idPsychology) =>{
    const json = {
        name:$('#name').val(),
        yearOld: $("#yearOld").val(),
        date: $("#date").val().split('/').join('-'),
        state: $("#state").val(),
        scholarship: $("#scholarship").val(),
        address: $("#address").val(),
        persons: $("#persons").val(),
        tel: $("#tel").val(),
        responsable_person: $("#responsable_person").val(),
        refer_date: $("#refer_date").val().split('/').join('-'),
        reason: $("#reason").val(),
        description: $("#description").val(),
        approach: $("#approach").val(),
        recommendations: $("#recommendations").val(),
        follow_up: $("#follow_up").val().split('/').join('-'),
        namePsychology: $("#namePsychology").val(),
        nowDate: $("#nowDate").val(),
    }
    const update = await $.ajax({
        url: `/admin/psicologia/updateInform`,
        type: "PUT",
        data: {
            json: JSON.stringify(json),
            idPsychology
        },
    });
    console.log(update);
    const data = await $.ajax({
        url: `/admin/psicologia/printPdf/${JSON.stringify({
            name:$('#name').val(),
            yearOld: $("#yearOld").val(),
            date: $("#date").val().split('/').join('-'),
            state: $("#state").val(),
            scholarship: $("#scholarship").val(),
            address: $("#address").val(),
            persons: $("#persons").val(),
            tel: $("#tel").val(),
            responsable_person: $("#responsable_person").val(),
            refer_date: $("#refer_date").val().split('/').join('-'),
            reason: $("#reason").val(),
            description: $("#description").val(),
            approach: $("#approach").val(),
            recommendations: $("#recommendations").val(),
            follow_up: $("#follow_up").val().split('/').join('-'),
            namePsychology: $("#namePsychology").val(),
            nowDate: $("#nowDate").val(),
        })}`,
    }).done(function(){
        window.open(`/admin/psicologia/downloadFilePsychology`);
    });
    console.log(data);
};