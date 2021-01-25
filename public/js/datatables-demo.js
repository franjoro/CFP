// Call the dataTables jQuery plugin
$(document).ready(function () {
  
  //DataTable Programas
  $('#tablePrograma').DataTable({
    "ajax": "/admin/programa/table",
    "columns": [
      {
        "render": function (data, type, JsonResultRow, meta) {
          return '<img class="imgTabla" src="/static/img/uploads/' + JsonResultRow.ImgPortada + '">';
        }
      },
      { "data": "Nombre" },
      {
        "render": function (data, type, JsonResultRow, meta) {
          const html =`<div class="btn-group" role = "group" aria - label="Basic example"><button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-warning"><i class="fas fa-folder-minus"></i></button></div >`;
          return html;
        }
      },
    ]
  });
});


