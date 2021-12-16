
errorMessage = () => {
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
$("#btn_ctzants").click(() => {
  $("#form_oferta_NoCotizantes").css("display", "block");
  $("#menu").css("display", "none");
});

$("#btn_empresas").click(() => {
  $("#form_oferta_empresas").css("display", "block");
  $("#menu").css("display", "none");
});

$(".btn_back_menu").click(() => {
  $("#form_oferta_empresas").css("display", "none");
  $("#form_oferta_NoCotizantes").css("display", "none");
  $("#menu").css("display", "block");
});

const listError = ()=>{
  console.log(JSON.parse(sessionStorage.getItem('alerts')))
  for (let index = 1; index <= Object.keys(JSON.parse(sessionStorage.getItem('alerts'))).length; index++) {
    const element = JSON.parse(sessionStorage.getItem('alerts'))[index];
    // alert(element);
    $.toast({
      title: '¡OJO!',
      subtitle: 'Tener en cuenta',
      content: `${element}`,
      type: 'error',
      delay: 30000,
      dismissible: true,
     
    });  
  }
  
  sessionStorage.setItem("alerts", '{}');
  sessionStorage.setItem("count", 0);
  
  
};

$(document).ready(() => {
  tbProblemCases("#programa_oferta");
  // chargue programOfert month configuration
  $.ajax({
    url: `/configuration-courses/read/${$("#programa_oferta").val()}`,
    type: "GET"
  }).then((data)=>{
    $("#txtMonthDoc").val(data[0].month_documentation)
  });

  $("#btnConfigCourses").click(async ()=>{
    const idProgram = $("#programa_oferta").val();
    const monthDocumentation = $("#txtMonthDoc").val();
    try {
      const data = await $.ajax({
        url: "/configuration-courses/update",
        type: "PUT",
        data:{
          idProgram: idProgram,
          monthDocumentation: monthDocumentation
        }
      });
      if (data.status) {
        swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Guardado con exito',
        });
        $('#configuration_courses_modal').modal('toggle');
      }
    } catch (error) {
      swal.close();
      console.log(error);
      errorMessage();
    }
  })
  setTimeout(listError,300);
  
  $("#modalidad").change(()=>{
    if($("#modalidad").val() == "Precalificacion"){
      $("#blockIDC").css({"display": "none"});
      $("#modadlidad_id").val("");
    }else{
      $("#blockIDC").css({"display": "block"})
    }
  });
  // //#region 
  // $("#btnAddTeacher").click(()=>{
  //   console.log("Add")
  // });
  // $(".js-example-basic-multiple").select2({
  //   language: {
  //     noResults: function(){
  //       $("#btnAddTeacher").css({"display": "block"});
        
  //     }
  //   },
  // });
  // $(".js-example-basic-multiple").change(()=>{
  //   $("#btnAddTeacher").css({"display": "none"});
  // });
  // //#endregion
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
  $("#form_curso").on( 'submit' ,async function (e) {
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
  $("#form_oferta_empresas").on( 'submit' ,async function (e) {
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
      horas: $("#horas").val(),
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

  // Agregar nueva oferta
  $("#form_oferta_NoCotizantes").on( 'submit' ,async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    const data = {
      codigo_curso: new Date().getTime(),
      role: 15,
      nombre: $("#nombre_oferta_noCtz").val(),
      horario: $("#horario_fecha_noCtz").val(),
      programa: $("#programa_oferta_noCtz").val(),
      cupo: $("#txtCupo").val(),
    };
    try {
      const query = await $.ajax({
        url: "/admin/cursos/addOfertaNoCtz",
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


  $("#formInstructor").submit(async function (e) {
    e.preventDefault();
    const t = $(this).serialize();
    loader();
    try {
       const data = await $.ajax({
        url: "/admin/instructor/add",
        type: "POST",
        data: t,
      });
      if(data.status){
        // LoadTablaInstructor($("#selector").children("option:selected").val());
        swal.close();
        // $("#exampleModal").modal("toggle");
        $("#formInstructor")[0].reset();
      }
    } catch (error) {
      swal.close();
      console.log(error)
      errorMessage();
    }
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
