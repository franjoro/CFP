//declarar variable a exportar
const programa = {};

//Requerimos pool de base de datos si es necesario
const pool = require('../models/db')

programa.addPrograma = async (req, res) => {
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

programa.loadTable = async (req, res) => {
    const data = await pool.query("SELECT Nombre,ImgPortada FROM tb_programa WHERE Estado = 1");
    res.json({data});
}



module.exports = programa;