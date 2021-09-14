/*@author: Osmaro Bonilla
  @description: Delete Psychology row in tb_psychology with id_psychology
  @date: 13/09/2021*/
// declare variables to export
const details = {};
// We require to database pool
const pool = require("../../../../../../models/db");
//Create arrow function detailsStudent
details.detailsStudent = async (req,res) =>{
    //We collect params for sql query
    const {idStudent} = req.params; 
    //Writte sql query
    const sql = `SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera,
                REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
                REPLACE(JSON_EXTRACT(json1, '$.Escolaridad'), '"','' ) as nivel_academico, 
                REPLACE(JSON_EXTRACT(json1, '$.EstadoF'), '"','' ) as estado_civil, 
                REPLACE(JSON_EXTRACT(json1, '$.TelMovilPropio'), '"','' ) as telefono_movil, 
                REPLACE(JSON_EXTRACT(json1, '$.Correo'), '"','' ) as correo, 
                REPLACE(JSON_EXTRACT(json1, '$.direccion'), '"','' ) as direccion, 
                REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id 
                FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) WHERE A.id = ?`;
    //We collect params 
    const params = [idStudent];
    try {
        //we execute pool query
        const data = await pool.query(sql, params);
        //writted data after execute
        const datos = {
            carnet: data[0].carnet,
            nombres: data[0].Nombres,
            apellidos: data[0].Apellidos,
            carrera: data[0].nombreCarrera,
            genero: data[0].genero,
            nivel_academico: data[0].nivel_academico,
            estado_civil: data[0].estado_civil,
            telefono_movil: data[0].telefono_movil,
            correo: data[0].correo,
            direccion: data[0].direccion,
            fechaNac: data[0].fechaNac,
        };
        //return json datos
        return res.json({ 
            datos
         });
    } catch (error) {
        //return diferents errors
        return res.status(400).json(error);
    }
};
//Create arrow function detailsStudent
details.detailsTable = async (req,res) =>{
    //We collect params for sql query
    const {idStudent} = req.params; 
    //Writte sql query
    const sql = `SELECT date, next_date, id_psychology,id_student, status FROM tb_psychology WHERE id_student = ? `;
    //We collect params 
    const params = [idStudent];
    try {
        //we execute pool query
        const data = await pool.query(sql, params);
        //return json datos
        return res.json({ 
            data
         });
    } catch (error) {
        //return diferents errors
        return res.status(400).json(error);
    }
};
//Create arrow function detailsStudent
details.detailPsychology = async (req, res) =>{
    //We collect params for sql query
    const {idPsychology} = req.params;
    //Writte sql query
    const sql = `SELECT date, next_date, results, observations, status,id_psychology FROM tb_psychology WHERE id_psychology = ?`;
    //We collect params 
    const params = [idPsychology];
    try {
        //we execute pool query
        const data = await pool.query(sql, params);
        const psychologyCase = data[0];
        //return json datos
        return res.json({
            psychologyCase
        });
    } catch (error) {
        //return diferents errors
        return res.status(400).json(error);
    }
};

details.getDetailsPsychology = async(req,res) =>{
    //We collect params for sql query
    const {idPsychology} = req.params;
    //Writte sql query
    const sql = `SELECT next_date, results, observations FROM tb_psychology WHERE id_psychology = ?`;
    //We collect params 
    const params = [idPsychology];
    try {
        //we execute pool query
        const data = await pool.query(sql, params);
        //return json datos
        return res.json({
            data
        });
    } catch (error) {
        //return diferents errors
        return res.status(400).json(error);
    }
};
module.exports = details;
