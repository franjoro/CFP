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
  $("#costo").mask("000,000,000,000,000.00", { reverse: true });
  $("#date_inicio").datepicker({ dateFormat: "dd-mm-yy" });
  $("#date_fin").datepicker({ dateFormat: "dd-mm-yy" });
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

  //Editar curso
  $("#form_editar").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      let data = await $.ajax({
        url: "/admin/cursos/edit",
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

  desasociarEmpresa = async (empresa, curso) => {
    let alerta = await Swal.fire({
      title: "¿Borrar participación de empresa en este curso?",
      text: "Se eliminaran los participantes asociados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    });

    if (alerta.isConfirmed) {
      try {
        loader();
        let data = await $.ajax({
          url: "/admin/cursos/deleteEmpresaInCourse",
          type: "DELETE",
          data: { id_empresa: empresa, id_curso: curso },
        });
        console.log(data);
        swal.close();
        location.reload();
      } catch (error) {
        console.log(error);
        errorMessage();
      }
    }
  };

  $("#dui").blur(async function () {
    data  = await $.ajax({url: `/admin/participantes/get/${ $(this).val() }` } );
    console.log(data.data[0])
    try {
      if(data.status){
        values = data.data[0];
        $("#name").val(values.Nombre);
        $("#email").val(values.Email);
        $("#tel").val(values.Telefono);
        $("#genero").val(values.Genero);
      }
    } catch (error) {
      console.log(error)
    }

  });

  agregarParticipante = (empresa) => {
    $("#modal_participante").modal("show");
  };
});
