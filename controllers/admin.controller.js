//declarar variable a exportar
const admin = {};

//Requerimos pool de base de datos si es necesario
//const pool = require('../models/db')

const mailer = require ('../utils/mailer');

//Render programa
admin.renderPrograma = (req, res, next) => {
    res.render('./admin/programa');
}
//Render Usuarios
admin.rendeUsuarios = (req,res) =>{
    res.render('./admin/usuarios');
}



module.exports = admin;