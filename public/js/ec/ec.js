$("#carreras").select2({
    width: "100%",
    ajax: {
      url: "/admin/ec/carreras",
      dataType: "json",
      delay: 250,
      processResults: function (data) {
        return {
          results: $.map(data, function (obj, index) {
            return { id: obj.id, text: obj.Nombre };
          }),
        };
      },
      cache: true,
    },
  });
  //Selector de carreras
  $("#carreras").on("select2:select", function (e) {
    var idcarrera = e.params.data.id;
    $("#grupos").select2({
      width: "100%",
      ajax: {
        url: `/admin/ec/${idcarrera}/grupos`,
        dataType: "json",
        delay: 250,
        data(params) {
          return {
            idcarrera,
            nombre: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: $.map(data, function (obj, index) {
              return { id: obj.id, text: obj.Nombre };
            }),
          };
        },
        cache: true,
      },
    });
  });

  $("#grupos").on("change", function () { 
    table($(this).val())
  }) 


  const table = (GrupoId) =>{
    // DataTable Participantes
    $("#tablaEmpresa").DataTable().destroy();
    $("#tablaEmpresa").DataTable({
      ajax: `/admin/ec/tabla/${GrupoId}`,
      columns: [
        { data: "carnet" },
        { data: "Nombres" },
        { data: "Apellidos" },
  
        // {
        //   "render": function (data, type, JsonResultRow, meta) {
        //     const html =`<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></button></div >`;
        //     return html;
        //   }
        // },
      ],
    });
  };
  