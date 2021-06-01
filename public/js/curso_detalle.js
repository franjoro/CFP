const errorMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación",
  });
};

const loader = () => {
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

let global_empresa, global_curso;

$(document).ready(() => {
  $("#dui").mask("00000000-0");
  $("#tel").mask("0000-0000");
  $("#costo").mask("000,000,000,000,000.00", { reverse: true });
  $("#date_inicio").datepicker({ dateFormat: "yy-mm-dd" });
  $("#date_fin").datepicker({ dateFormat: "yy-mm-dd" });
  $("#date_inicio_oferta").datepicker({ dateFormat: "yy-mm-dd" });

  $("#select_empresa").select2({
    width: "100%",
    ajax: {
      url: "/public/getEmpresas",
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

  // Agregar nueva empresa
  $("#newEmpresa").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      const data = await $.ajax({
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

  // Editar curso
  $("#form_editar").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      const data = await $.ajax({
        url: "/admin/cursos/edit",
        type: "PUT",
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
  // Editar Oferta
  $("#form_editar_oferta").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
      const data = await $.ajax({
        url: "/admin/cursos/editOferta",
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
    const alerta = await Swal.fire({
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
        const data = await $.ajax({
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

  quitarMatricula = async (id) => {
    const alerta = await Swal.fire({
      title: "¿Borrar participación en este curso?",
      text: "Se eliminara a este participante del curso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    });

    if (alerta.isConfirmed) {
      try {
        loader();
        const data = await $.ajax({
          url: "/admin/cursos/deleteMatricula",
          type: "DELETE",
          data: { id },
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

  cambiarMatricula = async (participante, curso, programa, empresa) => {
    $("#selec_cursos").select2({
      width: "100%",
      ajax: {
        url: `/admin/cursos/getCursos/${programa}`,
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

    $("#modal_migrar_curso").modal("show");
    $("#change_matricula").click(async () => {
      try {
        const tocurso = $("#selec_cursos").val();
        loader();
        const data = await $.ajax({
          url: "/admin/cursos/ChangeMatriculaCurso",
          type: "PUT",
          data: { participante, curso, tocurso, empresa },
        });
        console.log(data);
        swal.close();
        location.reload();
      } catch (error) {
        console.log(error);
        errorMessage();
      }
    });
  };

  let global_estado_participante = false;
  let global_empresa;

  $("#dui").blur(async function () {
    global_estado_participante = false;
    data = await $.ajax({ url: `/admin/participantes/get/${$(this).val()}` });
    try {
      if (data.status) {
        global_estado_participante = true;
        values = data.data[0];
        $("#name").val(values.Nombre);
        $("#email").val(values.Email);
        $("#tel").val(values.Telefono);
        $("#genero").val(values.Genero);
      }
    } catch (error) {
      console.log(error);
    }
  });

  agregarParticipante = (empresa) => {
    global_empresa = empresa;
    $("#modal_participante").modal("show");
  };
  // Agregar nuevo participante
  $("#formparticipantes").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    const curso = $("#curso").val();
    const dui_existente = $("#dui").val();
    const empresa = global_empresa;
    try {
      console.log(global_estado_participante);
      if (global_estado_participante) {
        await $.ajax({
          url: "/admin/cursos/matricula",
          type: "POST",
          data: { participante: dui_existente, curso, empresa },
        });
      } else {
        await $.ajax({
          url: "/admin/participantes/add",
          type: "POST",
          data: t,
        });
        await $.ajax({
          url: "/admin/cursos/matricula",
          type: "POST",
          data: { participante: dui_existente, curso, empresa },
        });
      }
      swal.close();
      location.reload();
    } catch (error) {
      swal.close();
      console.log(error);
      errorMessage();
    }
  });
});

$("#ficha").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#ficha1").html(fileName);
});
$("#recibo").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#recibo1").html(fileName);
});
$("#cancelacion").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#cancelacion1").html(fileName);
});
$("#planilla").change(function (e) {
  var fileName = e.target.files[0].name;
  $("#planilla1").html(fileName);
});

const SendFiles = async (key) => {
  //Hacer validaciones aqui Pendiente
  var fd = new FormData();
  var ficha = $(`#${key}`)[0].files;
  fd.append("file", ficha[0]);
  fd.append("empresa", global_empresa);
  fd.append("curso", global_curso);
  fd.append("archivo", key);
  try {
    loader();
    let datos = await $.ajax({
      url: "/admin/cursos/EnviarFiles",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
    });
    swal.close();
    $(`#${key}1`).html("Choose File");
    Swal.fire({
      icon: "success",
      title: "Archivo actualizado correctamente",
      showConfirmButton: false,
    });

    console.log(datos);
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};

const MigrarAll = async (empresa, curso, programa) => {
  $("#selec_cursos2").select2({
    width: "100%",
    ajax: {
      url: `/admin/cursos/getCursos/${programa}`,
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
  $("#modal_migrar_all").modal("show");
  $("#btn_migrar_todo").click(async () => {
    const alerta = await Swal.fire({
      title: "¿Deseá migrar la solicitud a otro curso ? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, migrar",
    });

    if (alerta.isConfirmed) {
      try {
        const tocurso = $("#selec_cursos2").val();
        loader();
        const data = await $.ajax({
          url: "/admin/cursos/migrarall",
          type: "PUT",
          data: { curso, tocurso, empresa },
        });
        console.log(data);
        swal.close();
        location.reload();
      } catch (error) {
        console.log(error);
        errorMessage();
      }
    }
  });
};

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
      Swal.fire(
        "Curso creado correctamente",
        "Vuelva atrás para verificar",
        "success"
      );
      $("#insertar_modal").modal("hide");
    }
  } catch (error) {
    swal.close();
    console.log(error);
    errorMessage();
  }
});
$("#instructor").select2({
  width: "100%",
  ajax: {
    url: "/admin/cursos/getInstructores",
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

const createZipCurso = async (curso) => {
  try {
    loader();
    const create = await $.ajax({
      url: "/admin/cursos/saveZipCurso",
      type: "POST",
      data: { curso },
    });
    if (create.status) {
      window.open(`/admin/cursos/archivoZipCurso`);
      Swal.close();
    }
  } catch (error) {
    console.log(error);
    errorMessage();
  }
};
