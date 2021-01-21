//declarar variable a exportar
const admin = {};

//Requerimos pool de base de datos si es necesario
const pool = require('../models/db')

admin.renderPrograma = (req, res, next) => {
    res.render('./admin/programa');
}

admin.addPrograma = async (req, res) => {
    //Tratamiento de imagen
    try {
        //Validar que la imagen exista
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Cambiar nombre con fecha
            let file = req.files.file;
            var file_name = new Date().getTime() + '_' + file.name;
            //Mover el archivo
            file.mv('./public/img/uploads/' + file_name);
            const data = [req.body.nombre, file_name];
            //Hacer Insert
            const query = await pool.query("INSERT INTO tb_programa(Nombre,ImgPortada,Estado) VALUES(?,?,1)", data);
            //send response
            res.redirect('/admin/programa');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

admin.loadTable = async (req,res) =>{
    const query = await pool.query("SELECT Nombre,ImgPortada FROM tb_programa WHERE Estado = 1");
    res.json(query);
}



module.exports = admin;