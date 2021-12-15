// name: frequent questions
// description CRUD frecuent cuestions whit jquery 
// dependencies jquery, view
// start_date: 12/15/2021 for Osmaro Bonilla
// end_date: 12/15/2021 for Osmaro Bonilla

// global variables


$(document).ready(()=>{
    // click btn save questions
    $("#btnSaveFrequentQuestion").click(()=>{
        // excecute function arrow create frecuente question
        createFrecuentQuestion();
    })
});


const createFrecuentQuestion = async()=>{
    try {
        const question = $("#txtQuestion").val();
        const answer = $("#txtAnswer").val();
        const idProgram = $("#programa_oferta").val();
        if(!question){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa un valor en pregunta.'
            });
        }
        if(!answer){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa un valor en respuesta.'
            });
        }
        if(!idProgram){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes de estar en un programa inscrito.'
            });
        }
        const res = await $.ajax({
            url: "/frequent-questions/add",
            type: "POST",
            data: {
                question,
                answer,
                idProgram
            }
        });
        if(res.affectedRows > 0){
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Pregunta frecuente agregada con exito.'
            });
            $("#txtAnswer").val("");
            $("#txtQuestion").val("");
            disabledBlockFrFQ();
            enabledBlockTableFQ();
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