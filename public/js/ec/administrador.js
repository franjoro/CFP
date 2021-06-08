
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
$("#formcarrera").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  try {
    await $.ajax({ url: " /admin/ec/nuevacarrera", type: "POST", data: t });
    location.reload();
  } catch (error) {
    console.log(error);
  }
});
$("#formgrupo").submit(async function (e) {
  e.preventDefault();
  const t = $(this).serialize();
  try {
    loader();
    const datos = await $.ajax({
      url: " /admin/ec/nuevogrupo",
      type: "POST",
      data: t,
    });
    if (datos.status) {
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});

// AGREGAR NUEVA CARRERA
const addNewCarrera = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nueva carrera",
      template: "#newCarrera",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        if (!$("#carCodigo").val()) return false;
        if (!$("#carNombre").val()) return false;
        if (!$("#carHB").val()) return false;
        if (!$("#CarHA").val()) return false;
        return [
          $("#carCodigo").val(),
          $("#carNombre").val(),
          $("#carHB").val(),
          $("#CarHA").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        Id: formValues[0].trim(),
        Nombre: formValues[1],
        Basica: formValues[2],
        Alter: formValues[3],
        Total: Number(formValues[2]) + Number(formValues[3]),
      };
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/nuevacarrera",
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

// EDITAR CARRERA
const editcarrera = async (codigo, nombre, hb, ha) => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nueva carrera",
      template: "#newCarrera",
      focusConfirm: false,
      width: 800,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#carCodigo").val(codigo);
        $("#carNombre").val(nombre);
        $("#carHB").val(hb);
        $("#CarHA").val(ha);
      },
      preConfirm: () => {
        if (!$("#carCodigo").val()) return false;
        if (!$("#carNombre").val()) return false;
        if (!$("#carHB").val()) return false;
        if (!$("#CarHA").val()) return false;
        return [
          $("#carCodigo").val(),
          $("#carNombre").val(),
          $("#carHB").val(),
          $("#CarHA").val(),
        ];
      },
    });
    if (formValues) {
      const data = {
        Id: formValues[0].trim(),
        Nombre: formValues[1],
        Basica: formValues[2],
        Alter: formValues[3],
        Total: Number(formValues[2]) + Number(formValues[3]),
        IdActual: codigo,
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/editcarrera",
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



// AGREGAR NUEVO GRUPO
const addNewGrupo = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: "Agregar nuevo grupo",
      template: "#newGrupo",
      focusConfirm: false,
      width: 1200,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        // setDatePicker();
      },
      preConfirm: () => {
        if (!$("#gruCodigo").val()) { console.log("Código")  ; return false;}
        if (!$("#gruNombre").val()) { console.log("Nombre") ; return false;}
        if (!$("#gruCarrera").val()) { console.log("Carrera") ; return false;}
        if (!$("#gruInstructor").val()) { console.log("Instructor") ; return false;}
        if (!$("#gruContrato").val()) { console.log("Contrato") ; return false;}
        if (!$("#gruOferta").val()) { console.log("Oferta") ; return false;}
        if (!$("#grupoGarantia").val()) { console.log("Garantía") ; return false;}
        if (!$("#grupoInicio").val()) { console.log("Fecha inicio") ; return false;}
        if (!$("#grupoFin").val()) { console.log("Fecha Fin") ; return false;}
        if (!$("#grupoInicioGarantia").val()) { console.log("Fecha inicio garantía") ; return false;}
        if (!$("#grupoFinGarantia").val()) { console.log("Fecha fin garantía") ; return false;}
        return [
          $("#gruCodigo").val(),
          $("#gruNombre").val(),
          $("#gruCarrera").val(),
          $("#gruInstructor").val(),
          $("#gruContrato").val(),
          $("#gruOferta").val(),
          $("#grupoGarantia").val(),
          $("#grupoInicio").val(),
          $("#grupoFin").val(),
          $("#grupoInicioGarantia").val(),
          $("#grupoFinGarantia").val()
        ];
      },
    });
    if (formValues) {
      const data = {
        id: formValues[0].trim(),
        Nombre: formValues[1],
        Carrera: formValues[2],
        Instructor: formValues[3],
        Contrato: formValues[4],
        Oferta: formValues[5],
        Garantia: formValues[6],
        Inicio: formValues[7],
        Fin: formValues[8],
        InicioG: formValues[9],
        FinG: formValues[10],
      };
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/nuevogrupo",
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


// EDITAR GRUPO
const editGrupo = async (data) => {
  const { codigo, nombre , carrera, instructor , contrato , oferta, garantia, inicio, fin , iniciog, fing  } = data;
  try {
    const { value: formValues } = await Swal.fire({
      title: "Editar grupo",
      template: "#newGrupo",
      focusConfirm: false,
      width: 1200,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        $("#instrucciones").addClass("d-none")
        $("#gruCarrera").prop('disabled', 'disabled');
        $("#gruCodigo").val(codigo),
        $("#gruNombre").val(nombre),
        $("#gruCarrera").val(carrera),
        $("#gruInstructor").val(instructor),
        $("#gruContrato").val(contrato),
        $("#gruOferta").val(oferta),
        $("#grupoGarantia").val(garantia),
        $("#grupoInicio").val(inicio),
        $("#grupoFin").val(fin),
        $("#grupoInicioGarantia").val(iniciog),
        $("#grupoFinGarantia").val(fing)
      },
      preConfirm: () => {
        if (!$("#gruCodigo").val()) { console.log("Código")  ; return false;}
        if (!$("#gruNombre").val()) { console.log("Nombre") ; return false;}
        if (!$("#gruCarrera").val()) { console.log("Carrera") ; return false;}
        if (!$("#gruInstructor").val()) { console.log("Instructor") ; return false;}
        if (!$("#gruContrato").val()) { console.log("Contrato") ; return false;}
        if (!$("#gruOferta").val()) { console.log("Oferta") ; return false;}
        if (!$("#grupoGarantia").val()) { console.log("Garantía") ; return false;}
        if (!$("#grupoInicio").val()) { console.log("Fecha inicio") ; return false;}
        if (!$("#grupoFin").val()) { console.log("Fecha Fin") ; return false;}
        if (!$("#grupoInicioGarantia").val()) { console.log("Fecha inicio garantía") ; return false;}
        if (!$("#grupoFinGarantia").val()) { console.log("Fecha fin garantía") ; return false;}
        return [
          $("#gruCodigo").val(),
          $("#gruNombre").val(),
          $("#gruInstructor").val(),
          $("#gruContrato").val(),
          $("#gruOferta").val(),
          $("#grupoGarantia").val(),
          $("#grupoInicio").val(),
          $("#grupoFin").val(),
          $("#grupoInicioGarantia").val(),
          $("#grupoFinGarantia").val()
        ];
      },
    });
    if (formValues) {
      const data = {
        id: formValues[0].trim(),
        Nombre: formValues[1],
        Instructor: formValues[2],
        Contrato: formValues[3],
        Oferta: formValues[4],
        Garantia: formValues[5],
        Inicio: formValues[6],
        Fin: formValues[7],
        InicioG: formValues[8],
        FinG: formValues[9],
        oldId  : codigo
      };
      const query = await $.ajax({
        type: "PUT",
        url: "/admin/ec/editgrupo",
        data,
      });
      console.log(query)
      if (query) {
        location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire(`Error : ${error}`);
  }
};


$("#btnAddCarrera").click(() => {
  addNewCarrera();
});

$("#btnAddGrupo").click(() => {
  addNewGrupo();
});

$(".btnEditCarrera").on("click", function () {
  const data = $(this).data();
  editcarrera(data.id, data.nombre, data.basicas, data.alternancia);
});

$(".btnEditGrupo").on("click", function () {
  const data  = $(this).data();
  console.log(data);
  editGrupo(data)
});



const setDatePicker = () => {
  $("#grupoInicio").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });
  $("#grupoFin").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });
  $("#grupoInicioGarantia").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });
  $("#grupoFinGarantia").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });
}

$(".btnEliminarG").on("click", async  function ()  {
  const id = $(this).data().id;
  const alerta = await Swal.fire({
    title: "¿Deseá deshabilitar el grupo?",
    text: "Esta acción puede ser deshecha por el equipo de desarrollo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deshabilitar",
  });

  if (alerta.isConfirmed) {
    try {
      loader();
      const query = await $.ajax({
        url: "/admin/ec/disabledGrupo",
        type: "PUT",
        data: { idGrupo : id},
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
} )