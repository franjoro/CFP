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
        const sql = `SELECT DISTINCT REPLACE(JSON_EXTRACT(json1, '$.dui'), '"','' ) as dui, 
        REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit ,
        REPLACE(JSON_EXTRACT(json1, '$.apellidos'), '"','' ) as apellidos,  
        REPLACE(JSON_EXTRACT(json1, '$.fechNacimiento'), '"','') as fechaNacimiento, 
        REPLACE(JSON_EXTRACT(json1, '$.telMovil'), '"','') as telefono, 
        REPLACE(JSON_EXTRACT(json1, '$.nombres'), '"','' ) as nombre,
        par.Email as email, par.Genero as sexo, sol.id as idSolicitud, sol.estado as estadoSolicitud, 
        sol.Codigo_curso as id_curso, C.id_programa as programa, sol.timestamp as fecha_inscripcion FROM tb_habil_solicitudes 
        AS sol INNER JOIN tb_participante par on par.DUI = sol.documento INNER JOIN tb_cursos AS C on C.Codigo_curso = sol.Codigo_curso 
        WHERE sol.Codigo_curso = ? AND (sol.estado = 0 OR sol.estado = 3 OR sol.estado = 4);`;
        const params = [idCourse];
        console.log("Hellos")
        const data = await pool.query(sql, params);
        console.log(data);
        // .then((item)=>{
        //     console.log(item);
        // });
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


tablesHabil.notComplete = async (req,res) =>{
    try {
        const {idCourse} = req.params;
        console.log(idCourse)
        const sql = `SELECT doc.id_solicitud, count(sol.documento) as count FROM tb_habil_solicitudes as sol 
        INNER JOIN tb_habil_documentos as doc ON doc.id_solicitud = sol.id 
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


tablesHabil.inscritosSgafp = async(req, res)=>{
    try {
        const {idCourse} = req.params;
        const sql = `SELECT id as idSolicitud FROM tb_habil_solicitudes
         WHERE aceptado = 'true' and Codigo_curso=?;`;
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
tablesHabil.noInscritosSgafp = async(req,res)=>{
    try {
        const {idCourse} = req.params;
        const sql = `SELECT id as idSolicitud FROM tb_habil_solicitudes
         WHERE aceptado = 'false' and Codigo_curso=?;`;
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