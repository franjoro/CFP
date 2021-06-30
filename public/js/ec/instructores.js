const errorMessage = (error) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error,
  });
};


// AGREGAR NUEVA EVALUACION
const addNewEva = async () => {
  try {
    const { value: formValues } = await Swal.fire({
      title: `Agregar nueva evaluación`,
      template: "#newEvaluacion",
      focusConfirm: false,
      width: 1000,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        if (!$("#EvaNombre").val()) return false;
        if (!$("#EvaTipo").val()) return false;
        return [
          $("#EvaNombre").val(),
          $("#EvaTipo").val()
        ];
      },
    });
    if (formValues) {
      const data = {
        Nombre: formValues[0],
        Tipo: formValues[1],
        idUnidad: $("#idUnidad").val(),
      };
      const query = await $.ajax({
        type: "POST",
        url: "/admin/ec/newEv",
        data,
      });
      if (query.status) {
        return location.reload();
      }
    }
  } catch (error) {
    console.log(error);
    return errorMessage("Parece que ha alcanzado el número máximo de actividades de este tipo en el mes");
  }
};
// ELIMINAR EVALUACION 
const deleteModulo = async (id) => {
  const alerta = await Swal.fire({
    title: "¿Eliminar evaluación ?",
    text: "Se eliminaran las notas asociadas a esta evaluación",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar",
  });

  if (alerta.isConfirmed) {
    try {
      const query = await $.ajax({
        url: "/admin/ec/deleteEva",
        type: "DELETE",
        data: { idEva: id },
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
$("#btnAddEva").click(() => {
  addNewEva();
});
$("body").on("keyup", ".text-uppercase", function () {
  $(this).val($(this).val().toUpperCase());
});


const getCheckedContenidos = ()=>{
  const arrContenidos = [];
  $(".switch").each(function ( element){
    const {id} = $(this).data();
    const {status} = $(this).data();
    const isCheck= $(this).is(':checked');
    const obj = {id,isCheck, status};
    arrContenidos.push(obj);
  });
  return arrContenidos;
};


$("#btnSave").click( async ()=>{
  const data = getCheckedContenidos();
  const idEvaluacion = $("#idEvaluacion").val();
  const query = await  $.ajax({
    type: "POST",
    url: "/admin/ec/contenidos",
    data: {contenido : JSON.stringify(data) , idEvaluacion}
  });
  if(query.status) {
    Swal.fire(
      '¡Perfecto!',
      'Contenidos actualizados correctamente',
      'success'
    );
  }
});
