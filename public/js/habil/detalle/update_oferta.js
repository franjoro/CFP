/*@author: Osmaro Bonilla
  @description: Formulario para editar oferta
  @date: 18/08/2021
  @*/
$(document).ready(() => {
    // Editar Oferta
    $("#form_editar_oferta_1").submit(async function (e) {
        e.preventDefault();
        const t = $(this).serialize();
        loader();
        try {
            const data = await $.ajax({
            url: "/habil/editOferta",
            type: "PUT",
            data: t,
            });
            console.log(data);
            if (data.status) {
            swal.close();
            location.reload();
            }
        } catch (error) {
            swal.close();
            console.log(error);
            errorMessage();
        }
    });
});

