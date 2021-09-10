// declarar variable a exportar
const details = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../../models/db");
const { getUserDataByToken } = require("../../../../../../middlewares/auth");



details.detailsStudent = async (req,res) =>{
    const {idStudent} = req.params; 
    const sql = `SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera,
                REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
                REPLACE(JSON_EXTRACT(json1, '$.Escolaridad'), '"','' ) as nivel_academico, 
                REPLACE(JSON_EXTRACT(json1, '$.EstadoF'), '"','' ) as estado_civil, 
                REPLACE(JSON_EXTRACT(json1, '$.TelMovilPropio'), '"','' ) as telefono_movil, 
                REPLACE(JSON_EXTRACT(json1, '$.Correo'), '"','' ) as correo, 
                REPLACE(JSON_EXTRACT(json1, '$.direccion'), '"','' ) as direccion, 
                REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id 
                FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) WHERE A.id = ?`;
    const params = [idStudent];
    
    try {
        const data = await pool.query(sql, params);
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
        return res.json({ 
            datos
         });
    } catch (error) {
        return res.status(400).json(error);
    }
};

details.detailsTable = async (req,res) =>{
    const {idStudent} = req.params; 
    const sql = `SELECT date, next_date, id_psychology, status FROM tb_psychology WHERE id_student = ? `;
    const params = [idStudent];
    try {
        const data = await pool.query(sql, params);
        return res.json({ 
            data
         });
    } catch (error) {
        return res.status(400).json(error);
    }
};

details.detailPsychology = async (req, res) =>{
    const {idPsychology} = req.params;
    const sql = `SELECT date, next_date, results, observations, status,id_psychology FROM tb_psychology WHERE id_psychology = ?`;
    const params = [idPsychology];
    try {
        const data = await pool.query(sql, params);
        const psychologyCase = data[0];
        return res.json({
            psychologyCase
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = details;
