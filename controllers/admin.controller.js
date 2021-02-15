//declarar variable a exportar
const admin = {};



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

//Requerimos pool de base de datos si es necesario
const pool = require('../models/db')

admin.renderInstructor = async (req,res) =>{
    let data = await pool.query("SELECT * FROM tb_categoria_instructores");
    console.log(data);
    res.render('./admin/instructor' ,{data});
}


module.exports = admin;


    
