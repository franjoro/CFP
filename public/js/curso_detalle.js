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
  





$(document).ready(function () {
    $("#select_empresa").select2({
        width: "100%",
        ajax: {
            url: "/public/getEmpresas",
            type: "post",
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    searchTerm: params.term, // search term
                };
            },
            results: function (response) {
                $.map(response, function (item) {
                    return {
                        id: item.id,
                        text: item.text,
                    };
                });
            },
            
            cache: true,
        },
    });


//Agregar nueva empresa
$("#newEmpresa").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      let data = await $.ajax({
        url: "/admin/cursos/addEmpresaInCourse",
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


})