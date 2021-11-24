const createEnterprice = async (json)=>{
    // e.preventDefault();
    const res = axios.post('/admin/empresas/addAll', json)
    .then((response) => {
      console.log(response);
      alert(response);
    });
    console.log(res)
};
