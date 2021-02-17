errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación",
  });
};

loader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Cargando Data",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

$(document).ready(() => {
  $("#costo").mask("000,000,000,000,000.00", { reverse: true });
  $("#date_inicio").datepicker({ dateFormat: "dd-mm-yy" });
  $("#date_fin").datepicker({ dateFormat: "dd-mm-yy" });
  $("#instructor").select2({
    width: "100%",
    ajax: {
      url: "getInstructores",
      type: "post",
      dataType: "json",
      delay: 250,
      data (params) {
        return {
          searchTerm: params.term, // search term
        };
      },
      results (response) {
        $.map(response, (item) => ({
            id: item.id,
            text: item.text,
          }));
      },
      cache: true,
    },
  });

  // Agregar nueva empresa
  $("#form_curso").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      const data = await $.ajax({
        url: "/admin/cursos/add",
        type: "POST",
        data: t,
      });
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
