/*@author: Osmaro Bonilla
  @description: Read in db for tables
  @date: 24/09/2021
  @see: ./routes/habil.router.js*/
const pool = require("../../models/db");
// const { getUserDataByToken } = require("../../middlewares/auth");
//inizialitation json xport
const tablesHabil = {};

tablesHabil.aplicationsTable = async(req,res) =>{
    const {idCourse} = req.params;
    try {

        const sql = `SELECT DISTINCT par.DUI as dui, REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit , 
        REPLACE(JSON_EXTRACT(json1, '$.fechNacimiento'), '"','') as fechaNacimiento, par.Nombre as nombre, par.Telefono as 
        telefono,par.Email as email, par.Genero as sexo, sol.id as idSolicitud, sol.estado as estadoSolicitud, 
        sol.Codigo_curso as id_curso, C.id_programa as programa, sol.timestamp as fecha_inscripcion FROM tb_habil_solicitudes 
        AS sol INNER JOIN tb_participante par on par.DUI = sol.documento INNER JOIN tb_cursos AS C on C.Codigo_curso = sol.Codigo_curso 
        WHERE sol.Codigo_curso = ? AND (sol.estado = 0 OR sol.estado = 3 OR sol.estado = 4);`;
        const params = [idCourse];
        const data = await pool.query(sql, params);
        res.json({
            data,
        });
    } catch (error) {
        res.json({status: false, error: error})
    }
};


tablesHabil.changeColor = async(req,res) =>{
    try {
        const {idCourse} = req.params;
        console.log(idCourse)
        const sql = `SELECT DISTINCT doc.id_solicitud as idSolicitud FROM 
        tb_habil_documentos as doc inner join tb_habil_solicitudes as sol on sol.id = doc.id_solicitud 
        WHERE sol.Codigo_curso = ?;`;
        const params = [idCourse];
        const data = await pool.query(sql, params);
        res.json({
            data,
            status: true,
        });
    } catch (error) {
        res.json({status: false, error: error})
    }
};

tablesHabil.changeColorWait = async(req,res) =>{
    try {
        const {idCourse} = req.params;
        console.log(idCourse)
        const sql = `SELECT id as idSolicitud FROM tb_habil_solicitudes
         WHERE estado = 4 and Codigo_curso=?;`;
        const params = [idCourse];
        const data = await pool.query(sql, params);
        res.json({
            data,
            status: true,
        });
    } catch (error) {
        res.json({status: false, error: error})
    }
};

module.exports = tablesHabil;