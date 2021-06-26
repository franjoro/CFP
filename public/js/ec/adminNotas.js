
  $(".filtro").on("change", function () { 
    const year = $("#year").val();
    const mes = $("#mes").val();
    table(year, mes);  
  }) ;

  const table = ( year = 2021 , month = 5) =>{
    // DataTable Participantes
    $("#tablaEmpresa").DataTable().destroy();
    $("#tablaEmpresa").DataTable({
      ajax: `/admin/ec/getActividades/${year}/${month}`,
      columns: [
        { data: "Grupo" },
        { data: "NombreModulo" },
        { data: "NombreUnidad" },
        {
          "render": function (data, type, JsonResultRow, meta) {
            if(JsonResultRow.Tipo == "1") return "Teórica";
            if(JsonResultRow.Tipo == "2") return "Práctica";
          }
        },
        { data: "Descripcion" },
        {
          "render": function (data, type, JsonResultRow, meta) {
            const html =`<div class="btn-group" role = "group" aria - label="Basic example"><a href="/admin/ec/getNotasAdmin/${JsonResultRow.id}/${JsonResultRow.idGrupo}" class="btn btn-info"><i class="far fa-eye"></i></a></div >`;
            return html;
          }
        },
      ],
    });
  };
  


  $("#year").val(new Date().getFullYear());
  $("#mes").val(new Date().getMonth());

  const year = $("#year").val();
  const mes = $("#mes").val();
  table(year, mes);
  