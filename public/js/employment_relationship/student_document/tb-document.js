const  tbStudents = () =>{
    var cookie = $.cookie("tokenapi");
    var idStudent = $("#idStudent").val();
    $("#tb-documents").DataTable({
        ajax: {url:`${routeApiCfp}/er-student-document/read/${idStudent}/${cookie}`, dataSrc:""},
        destroy: true,
        columns: [
        {
            render(data,type,row){
                const html = `
                <div class="row">
                    <div class="col-9" id="input-${row.id}">
                        <p id="p-${row.id}">${row.name}</p>
                    </div>
                    <div class="col-2" id="col-${row.id}">
                        <button class="btn btn-warning" id="btn-${row.id}"><i class="fas fa-pen"></i></button>
                    </div>
                </div>
                <script>
                    var nameChange${row.id} = "${row.name}";
                    $("#btn-${row.id}").click(()=>{
                        $('#input-${row.id}').append('<input class="form-control" type="text" value="${row.name}" id="input-save-${row.id}"></input>');
                        $('#p-${row.id}').remove();
                        $('#btn-${row.id}').remove();
                        $('#col-${row.id}').append('<button class="btn btn-primary" id="btn-save-${row.id}" onclick=updateName(nameChange${row.id},"${row.id}")><i class="fas fa-save"></i></button>');
                        $("#input-save-${row.id}").change(()=>{
                            nameChange${row.id} = $("#input-save-${row.id}").val();
                         });
                    });

                </script>
                `;
                return(html);
            }
        },
        { 
            render(data, type, row){
                const html = `<p class="text-center">
                <button class="btn btn-success btn-block" onclick="DowloadS3File('${row.keyaws}', '${row.name}')"><i class="fas fa-cloud-download-alt"></i></button>
                </p>`;
                return (html);
            } 
        },
        {
            render(data, type, row){
                const html = `<p class="text-center">
                <button class="btn btn-info btn-block" data-toggle="modal" data-target="#modalUpdateDocumentsStudent" onclick="updateChangie('${row.name}','${row.id}')"><i class="fas fa-file-signature"></i></button>
                </p>`;
                return (html);
            }    
        },
        { 
            render(data, type, row){
                const html = `<p class="text-center">
                <button class="btn btn-primary btn-block" onclick="SeeS3File('${row.keyaws}','${row.id}')"><i class="fas fa-eye"></i></button>
                </p>`;
                return (html);
            }
        },
        { 
            render(data, type, row){
                const html = `<p class="text-center">
                <button class="btn btn-danger btn-block" onclick="deleteS3('${row.keyaws}');"><i class="fas fa-trash"></i></button>
                </p>`;
                return (html);
            }
        },
        { data: "id", visible: false },
        { data: "keyaws", visible: false },
        { data: "id_student", visible: false },
        { data: "createdAt", visible: false },
        { data: "updatedAt", visible: false },
        ],
      });
}

$(document).ready(function(){
    tbStudents();
});