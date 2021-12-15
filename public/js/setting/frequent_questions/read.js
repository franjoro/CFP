const findForIdFQ = async(idFQ)=>{
    try {
        if(!idFQ){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes de seleccionar un item para esta busqueda.'
            });
        }
        const res = await $.ajax({
            url: `/frequent-questions/find-for-id/${idFQ}`,
            type: "GET",
        });
        $("#txtQuestion").val(res[0].question);
        $("#txtAnswer").val(res[0].answer);
        $("#idFQ").val(idFQ);
    } catch (error) {
        console.log(error);
    }
};