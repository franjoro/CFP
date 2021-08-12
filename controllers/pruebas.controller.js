pruebas = {};

pruebas.llamada = async(req, res) =>{
    let variabel = req.params.intento;
    res.render("./pruebas/pruebas",{status: 'good', prueba:{ prueba_1: "Probando1", prueba_2: "prueba2"},intento1:variabel});
};


module.exports = pruebas;


