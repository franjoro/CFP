// declarar variable a exportar
const ec = {};

// Requerimos pool de base de datos si es necesario
// const pool = require('../models/db')

// const mailer = require ('../utils/mailer');


ec.main = (req,res) =>{
    res.render('habil/formulario');
}



module.exports = ec;