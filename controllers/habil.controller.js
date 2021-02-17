// declarar variable a exportar
const habil = {};

// Requerimos pool de base de datos si es necesario
// const pool = require('../models/db')

// const mailer = require ('../utils/mailer');


habil.main = (req,res) =>{
    res.render('habil/formulario');
}



module.exports = habil;