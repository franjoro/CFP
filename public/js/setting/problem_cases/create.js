const createProblemCase = async()=>{
    try {
        const name = $("#txtName").val();
        const email = $("#txtEmail").val();
        const phone = $("#txtPhone").val();
        const problem = $("#txtTrouble").val();
        const description = $("#txtDescription").val();
        const idProgram = $("#idPrograma").val();
        if(!name){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa un el campo nombre.'
            });
        }
        if(!email){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo correo.'
            });
        }
        if(!phone){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo teléfono.'
            });
        }
        if(!problem){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo problema.'
            });
        }
        if(!description){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresa el campo descripción.'
            });
        }
        if(!idProgram){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe de tener un programa asignado para poder realizar este proceso.'
            });
        }
        const data = await $.ajax({
            url:'/problem-cases/add',
            type: 'POST',
            data:{
                name,
                email,
                phone,
                problem,
                description,
                idProgram
            }
        });
        if(data.affectedRows>0){
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Su caso fue enviado con exito, nos comunicaremos con usted lo más pronto posible.'
            });
            const insertId = data.insertId;
            clearFrProblems();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Paso un error inesperado por favor pongase en contacto con soporte técnico.'
            });
        }
    } catch (error) {
        console.log(error);
    }
};