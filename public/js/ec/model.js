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
// AGREGAR NUEVO MODULO EN MODELO
const addNewModel = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nuevo módulo",
      template: "#newModule",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        if (!$("#MdlNombre").val()) return false;
        if (!$("#MdlHoras").val()) return false;
        return [
          $("#MdlNombre").val(),
          $("#MdlInicio").val(),
          $("#MdlFin").val(),
          $("#MdlHoras").val()
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        Inicio: formValues[1],
        Fin: formValues[2],
        idCarrera: $("#carrera").val(),
        horas : formValues[3]
      };
      console.log(data);
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/addModelo",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
// AGREGAR NUEVA UNIDAD EN MODELO
const addNewUnit = async (idModulo, modulo) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Agregar nueva unidad en módulo : ${modulo}`,
      template: "#newUnit",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        if (!$("#UnitNombre").val()) return false;
        if (!$("#UnitHoras").val()) return false;
        return [$("#UnitNombre").val(), $("#UnitHoras").val()];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        horas: formValues[1],
        idModulo,
        idCarrera: $("#carrera").val(),
      };
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/addUnidad",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
// EDITAR UNIDAD EN MODELO
const editActualUnit = async (idUnidad, unidad, horas) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Editar nombre de unidad`,
      template: "#newUnit",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#UnitNombre").val(unidad);
        $("#UnitHoras").val(horas);
      },
      preConfirm: () => {
        if (!$("#UnitNombre").val()) return false;
        return [$("#UnitNombre").val() , $("#UnitHoras").val()];
      },
    });
    if (formValues) {
      const data = {
        unidad: formValues[0],
        horas : formValues[1],
        idUnidad,
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/editUnidad",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
// EDITAR MODULO EN MODELO
const editActualModule = async (idModulo, modulo, inicio, fin , horas) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Editar nombre del módulo`,
      template: "#newModule",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#MdlNombre").val(modulo);
        $("#MdlHoras").val(horas);

        $("#MdlInicio option")
          .filter(function () {
            return $(this).text() == inicio;
          })
          .prop("selected", true);

        $("#MdlFin option")
          .filter(function () {
            return $(this).text() == fin;
          })
          .prop("selected", true);
      },
      preConfirm: () => {
        if (!$("#MdlNombre").val()) return false;
        return [
          $("#MdlNombre").val(),
          $("#MdlInicio").val(),
          $("#MdlFin").val(),
          $("#MdlHoras").val()
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        Inicio: formValues[1],
        Fin: formValues[2],
        horas: formValues[3],
        idModulo,
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/editModulo",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
const editActualUnitVigente = async (
  idUnidad,
  unidad,
  inicio,
  fin,
  inicioActual,
  finActual,
  profesor
) => {
  const inicioSplit = inicio.split("/");
  const finSplit = fin.split("/");
  const minDate = new Date(inicioSplit[2], inicioSplit[1] - 1, inicioSplit[0]);
  const maxDate = new Date(finSplit[2], finSplit[1] - 1, finSplit[0]);
  try {
    const { value: formValues } = await Swal.fire({
      title: `Editar nombre de unidad`,
      template: "#newUnit",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#UnitNombre").val(unidad);
        $("#UnitInicio")
          .datepicker({ dateFormat: "dd/mm/yy", minDate, maxDate })
          .val(inicioActual);
        $("#UnitFin")
          .datepicker({ dateFormat: "dd/mm/yy", minDate, maxDate })
          .val(finActual);
        $("#UnitProfesor option")
          .filter(function () {
            return $(this).text() == profesor;
          })
          .prop("selected", true);
      },
      preConfirm: () => {
        if (!$("#UnitNombre").val()) return false;
        if (!$("#UnitProfesor").val()) return false;
        if (!$("#UnitInicio").val()) return false;
        if (!$("#UnitFin").val()) return false;
        return [
          $("#UnitNombre").val(),
          $("#UnitProfesor").val(),
          $("#UnitInicio").val(),
          $("#UnitFin").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        unidad: formValues[0],
        profesor: formValues[1],
        inicio: formValues[2],
        fin: formValues[3],
        idUnidad,
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/ConfigUnit",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
const editActualModuleVigente = async (idModulo, modulo, inicio, fin) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Editar nombre del módulo`,
      template: "#newModule",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#MdlNombre").val(modulo);
        $("#MdlInicio").val(inicio).datepicker({ dateFormat: "dd/mm/yy" });
        $("#MdlFin").val(fin).datepicker({ dateFormat: "dd/mm/yy" });
      },
      preConfirm: () => {
        if (!$("#MdlNombre").val()) return false;
        return [
          $("#MdlNombre").val(),
          $("#MdlInicio").val(),
          $("#MdlFin").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        Inicio: formValues[1],
        Fin: formValues[2],
        idModulo,
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/editModulo",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};

const addNewModelVigente = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nuevo módulo",
      template: "#newModule",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#MdlInicio").datepicker({ dateFormat: "dd/mm/yy" });
        $("#MdlFin").datepicker({ dateFormat: "dd/mm/yy" });
      },
      preConfirm: () => {
        if (!$("#MdlNombre").val()) return false;
        if (!$("#MdlInicio").val()) return false;
        if (!$("#MdlFin").val()) return false;
        return [
          $("#MdlNombre").val(),
          $("#MdlInicio").val(),
          $("#MdlFin").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        Inicio: formValues[1],
        Fin: formValues[2],
        idGrupo: $("#grupo").val(),
      };
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/addModeloVigente",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
const addNewUnitVigente = async (idModulo, modulo) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Agregar nueva unidad en módulo : ${modulo}`,
      template: "#newUnit",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#UnitInicio").datepicker({ dateFormat: "dd/mm/yy" });
        $("#UnitFin").datepicker({ dateFormat: "dd/mm/yy" });
      },
      preConfirm: () => {
        if (!$("#UnitNombre").val()) return false;
        if (!$("#UnitProfesor").val()) return false;
        if (!$("#UnitInicio").val()) return false;
        if (!$("#UnitFin").val()) return false;

        return [
          $("#UnitNombre").val(),
          $("#UnitProfesor").val(),
          $("#UnitInicio").val(),
          $("#UnitFin").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        profesor : formValues[1],
        inicio: formValues[2],
        fin: formValues[3],
        idModulo,
        idGrupo: $("#grupo").val(),
      };
      console.log(data);
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/addUnidadVigente",
        data,
      });
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};
const deleteModulo = async (id) => {
  const alerta = await Swal.fire({
    title: "¿Eliminar el módulo?",
    text: "Se eliminaran las unidades asociadas a este modulo",
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
        url: "/admin/ec/deleteModelo",
        type: "DELETE",
        data: { idModelo: id },
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
const deleteUnidad = async (id) => {
  console.log(id);
  const alerta = await Swal.fire({
    title: "¿Eliminar la unidad selecionada?",
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
        url: "/admin/ec/deleteUnidad",
        type: "DELETE",
        data: { idUnidad: id },
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

$("#addNewModuleBtn").click(() => {
  addNewModel();
});

$("#addNewModuleBtnVigente").click(() => {
  addNewModelVigente();
});



$("body").on("keyup", ".text-uppercase", function () {
  $(this).val($(this).val().toUpperCase());
});
