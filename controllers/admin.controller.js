//declarar variable a exportar
const admin = {};

//Requerimos pool de base de datos si es necesario
//const pool = require('../models/db')

//const mailer = require ('../utils/mailer');


admin.main = (req,res) =>{
    res.render('./admin/main');
}

//Render programa
admin.renderPrograma = (req, res, next) => {
    res.render('./admin/programa');
}
//Render Usuarios
admin.rendeUsuarios = (req,res) =>{
    res.render('./admin/usuarios');
}

admin.renderEmpresas = (req,res) =>{
    res.render('./admin/empresas');
}

admin.renderInstructor = (req,res) =>{
    res.render('./admin/instructor');
}


module.exports = admin;