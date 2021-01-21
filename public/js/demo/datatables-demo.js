// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable();
  
  $('#tablePrograma').DataTable({
    
    ajax: {
      url: '/admin/programa/table',
      dataSrc: "",
      "columns": [
        {  "title":"Portada", data: "ImgPortada" },
        {  "title":"Nombre", data: "Nombre" }
      ]
    }



  });
});


