// name: delete.js
// description: delete for tb_frequent_questions
// dependencies jquery, view
// start_date: 12/15/2021 for Osmaro Bonilla
// end_date: 12/15/2021 for Osmaro Bonilla
const deleteFrecuentQuestion = async(id)=>{
    const question = await Swal.fire({
        title: "¿Borrar pregunta frecuente de este programa?",
        text: "Se eliminara esta pregunta de forma permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar",
    });
  
    if (question.isConfirmed) {
        try {
            if(!id){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes de seleccionar un item a eliminar.'
                });
            }
            const res = await $.ajax({
                url: "/frequent-questions/delete",
                type: "DELETE",
                data: {
                    id
                }
            });
            if(res.affectedRows > 0){
                Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Pregunta frecuente eliminada con exito.'
                });
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
    }
};