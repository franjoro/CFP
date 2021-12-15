$(document).ready(()=>{
    $("#btnUpdateFQ").click(()=>{
        btnUpdate();
    });
});

const btnUpdate = async()=>{
    const question = $("#txtQuestion").val();
    const answer = $("#txtAnswer").val();
    const idFQ = $("#idFQ").val();
    try {
        if(!question){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes ingresar el campo preguntas.'
            });
        }
        if(!answer){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes de ingresar el campo pregunta.'
            });
        }
        if(!idFQ){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes de seleccionar un item para modificar.'
            });
        }
        const data = await $.ajax({
            url: "/frequent-questions/update",
            type: "PUT",
            data: {
                idFQ,
                question,
                answer
            }
        });
        if(data.affectedRows > 0){
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Pregunta frecuente a sido modificada con exito.'
            });
            $("#txtAnswer").val("");
            $("#txtQuestion").val("");
            location.reload();

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: `Ocurrio un problema contacta con soporte técnico.`
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const updateFQ = (id)=>{
    disabledBtnSaveFQ();
    enabledBtnUpdateFQ();
    enabledBlockFrFQ();
    disabledBlockTableFQ();
    findForIdFQ(id)
};
