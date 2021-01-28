//declarar variable a exportar
const participantes = {};

//Requerimos pool de base de datos si es necesario
//const pool = require('../models/db')

//const mailer = require ('../utils/mailer');


participantes.main = (req,res) =>{
    res.render('./admin/main');
}



module.exports = participantes;