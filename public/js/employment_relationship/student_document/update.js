const updateChangie =(name,id)=>{
    $("#nameUpdateDocument").val(name);
    $("#idDocument").val(id);
};
const updateFile = async () => {
    // elements
    const name = $("#nameUpdateDocument").val();
    const id =$("#idDocument").val();
    const idStudent = $("#idStudent").val();
    try {
        var fd = new FormData();
        fd.append("fileDocument", $("#fileUpdateDocument")[0].files[0]);
        fd.append("name", name);
        fd.append("id", id);
        fd.append("idStudent", idStudent);
        fd.append("type", 'update');
        loader();
        let datos = await $.ajax({
          url: "/admin/vinculacion-laboral/send-files",
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
        });
        Swal.fire({
          icon: "success",
          title: "Archivo actualizado correctamente",
          showConfirmButton: false,
        });
        location.reload();
      
    } catch (error) {
      console.log(error);
      errorMessage();
    }
  };

  const updateName = async (name, id)=>{
    try {
        loader();
        await $.ajax({
            url: "/admin/vinculacion-laboral/update-name-document",
            type: "PUT",
            data: {
                name: name,
                id: id
            }
        });
        Swal.fire({
            icon: "success",
            title: "Nombre de archivo actualizado",
            showConfirmButton: false,
        });
        location.reload();
    } catch (error) {
          
    }
  };