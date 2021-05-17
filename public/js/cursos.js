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
$("#btn_empresas").click(() => {
  $("#form_oferta_empresas").css("display", "block")
  $("#menu").css("display", "none")
});

$("#btn_back_menu").click(() => {
  $("#form_oferta_empresas").css("display", "none")
  $("#menu").css("display", "block")
});

$(document).ready(() => {
  $("#costo").mask("000,000,000,000,000.00", { reverse: true });
  $("#costo_oferta").mask("000,000,000,000,000.00", { reverse: true });
  $("#date_inicio").datepicker({ dateFormat: "yy-mm-dd" });
  $("#date_fin").datepicker({ dateFormat: "yy-mm-dd" });
  $("#fecha_limite").datepicker({ dateFormat: "yy-mm-dd" });



  $("#instructor").select2({
    width: "100%",
    ajax: {
      url: "getInstructores",
      type: "post",
      dataType: "json",
      delay: 250,
      data(params) {
        return {
          searchTerm: params.term, // search term
        };
      },
      results(response) {
        $.map(response, (item) => ({
          id: item.id,
          text: item.text,
        }));
      },
      cache: true,
    },
  });

  // Agregar nuevo curso
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

  // Agregar nueva oferta
  $("#form_oferta_empresas").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    const data = {
      codigo_curso: new Date().getTime(),
      role: 5,
      nombre: $("#nombre_oferta").val(),
      horario: $("#horario_oferta").val(),
      costo: $("#costo_oferta").val(),
      programa: $("#programa_oferta").val(),
      fechas: $("#horario_fecha").val(),
      fechaL: $("#fecha_limite").val(),
    };
    try {
      const query = await $.ajax({
        url: "/admin/cursos/addOferta",
        type: "POST",
        data,
      });
      if (query.status) {
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

const deleteOferta = async (id) => {
  const alerta = await Swal.fire({
    title: "¿Eliminar la oferta disponible?",
    text: "Se eliminaran los participantes y empresas asociados",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar",
  });

  if (alerta.isConfirmed) {
    try {
      loader();
      const query = await $.ajax({
        url: "/admin/cursos/deleteOffer",
        type: "DELETE",
        data: { id_curso: id },
      });
      if (query.status) {
        swal.close();
        location.reload();
      }
    } catch (error) {
      swal.close();
      console.log(error);
      errorMessage();
    }
  }
};

const ReporteAlumnos = async (id) => {
  loader();
  try {
    const respuesta = await $.ajax(`/reportes/PartiCurso/${id}`);
    if (respuesta.status) {
      window.open("/reportes/download");
    }
    swal.close();
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};
