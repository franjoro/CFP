// name: tables.js
// description: client tables for problem cases module
// dependencies: jquery
// start_date: 16/12/2021 for Osmaro Bonilla
// last_update: 16/12/2021 for Osmaro Bonilla
const tbProblemCases = (idInput)=>{
    const idProgram = $(idInput).val();
    $("#tbProblemCases").DataTable({
        ajax: `/problem-cases/find-for-program/${idProgram}`,
        responsive: true,
        destroy: true,
        columns: [
        // {
        //     render(data, type, row){
        //         return(`${row.timestamp}`)
        //     }
        // },
        {
            render(data, type, row){
                return(`${row.name}`)
            }
        },
        {
            render(date, type, row){
                return(`${row.email}`)
                
            }
        },
        {
            render(date, type, row){
                return(`${row.phone}`)
                
            }
        },
        {
            render(date, type, row){
                return(`${row.problem}`)
                
            }
        },
        {
            render(date, type, row){
                return(`${row.description}`)
                
            }
        },
        {
            render(date, type, row){
                return(`
                    <div >
                        <a href="/problem-cases/detalles-de-casos/${row.id}" class="btn btn-sm btn-success"><i class="fas fa-eye"></i></a>
                    </div>
                `)
                
            }
        },
          { data: "id", visible: false },
          { data: "timestamp", visible: false },
        ],
    });
};