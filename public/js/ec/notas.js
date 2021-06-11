const loader = () => {
    Swal.fire({
      title: "Por favor, Espere",
      html: "Procesando información",
      allowOutsideClick: !1,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };
$(".nota").mask("0Z.00", {
    translation: {
        'Z': {
            pattern: /[0-9]/, optional: true
        }
    }
});

$(".nota").focusin(function () {
    let value = $(this).val();
    if (value == 0) $(this).val("");
});


$(".nota").focusout(function () {
    let value = $(this).val();
    if (value == "") $(this).val(0);
    if (value > 10) $(this).val(10);

});

$("#btnEnviar").click(() => {
    const datos = [];
    $("input[name='notas[]']").map(function (i) {
        let obj ={};
        obj.Nota  = $(this).val();
        obj.alumnoId  = $(this).data("alumno");
        obj.isExist = $(this).data("isexist");
        obj.evaluacion  = $(this).data("evaluacion");
        obj.idNota = $(this).data("idnota");
        obj.comentario = $(`#comment${i}`).val();
        datos.push(obj);
    });
    let datosJsonString = JSON.stringify(datos); 
    Swal.fire({
        title: '¿Ingresar notas?',
        text: "Podrá actualizar las nota mientras no se llegue a la fecha límite",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si actualizar'
      }).then( async(result) => {
        if (result.isConfirmed) {
            loader();
            const query = await $.ajax({
                url: "/admin/ec/notas",
                type: "POST",
                data: { notas: datosJsonString },
              });
              if (query.status) {
                swal.close();
                Swal.fire(
                    '¡Perfecto!',
                    'Notas actualizadas correctamente',
                    'success'
                  );
            }
        }
      });
});