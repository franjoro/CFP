// name: tables.js
// description: tables for tb_frequent_questions
// dependencies: jquery
// start_date: 12/15/2021 for Osmaro Bonilla
// end_date: 12/15/2021 for Osmaro Bonilla
$(document).ready(()=>{
    findForProgram();
});


const findForProgram = () => {
    // DataTable Usuarios
    const idProgram = $("#programa_oferta").val();
    $("#tbFrequentQuestions").DataTable({
        ajax: `/frequent-questions/find-for-program/${idProgram}`,
        destroy: true,
        dom: 'Bfrtip',
        buttons: [
            {
                text: '<i class="fas fa-plus"></i>',
                className: 'btn btn-success',
                action: function ( e, dt, node, config ) {
                    enabledBlockFrFQ();
                    disabledBlockTableFQ();
                    disabledBtnUpdateFQ();
                    enabledBtnSaveFQ();
                }
            },
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
        {
            render(data, type, row){
                return(`${row.question}`)
            }
        },
        {
            render(date, type, row){
                return(`${row.answer}`)
                
            }
        },
        {
            render(date, type, row){
                return(`
                    <div >
                        <button class="btn btn-sm btn-warning" onclick="updateFQ(${row.id})"><i class="fas fa-pen"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteFrecuentQuestion(${row.id})"><i class="far fa-trash-alt"></i></button>
                    </div>
                `)
                
            }
        },
          { data: "id", visible: false },
        ],
    });
};
  