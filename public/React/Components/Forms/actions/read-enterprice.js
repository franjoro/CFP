const test = (json) =>{
    axios.get('/admin/psicologia/studentsWithCadre')
    .then((response) => {
      console.log(response);
      
    });
    console.log(json);
};
