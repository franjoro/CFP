// CARGAR TABLA
function LoadTablaInstructor(estado = 1) {
    // DataTable Programas
    $("#tableContract").DataTable({
      ajax: `/contratos/read`,
      destroy: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i>',
          titleAttr: 'Excel',
          className: 'btn btn-success'
        },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          titleAttr: 'Excel',
          className: 'btn btn-primary'
        },{
          extend: 'copy',
          text: '<i class="fas fa-copy"></i>',
          exportOptions: {
              modifier: {
                  page: 'current'
              }
          },
          className: 'btn btn-info'
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i>',
          autoPrint: true,
          className: 'btn btn-secondary'
        },
        {
          extend: 'pdfHtml5',
          text: '<i class="fas fa-file-pdf"></i>',
          exportOptions: {
              modifier: {
                  page: 'current'
              }
          },
          className: 'btn btn-danger'
        },
      ],
      columns: [
        { data: "name" },
        { data: "course" },
        { data: "teacher" },
        { data: "start_date" },
        {
            render(data, type, row){
                return row.finish_date
            }
        },
        {
            render(data, type, row){
                return (`
                <div className="row">
                    <div className="col-12" >
                        <div class="btn-group" role="group" aria-label="">
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalContractUpdate"><i class="fas fa-eye"></i></button>
                            <button class="btn btn-sm btn-warning"><i class="fas fa-pen"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                `)
            }
        }
      ],
    });
  }