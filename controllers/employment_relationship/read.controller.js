/*
name: read.controller
description: read controller for employment relationship
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 03/11/2021 for OsmaroBonilla
last-update: 03/11/2021 for OsmaroBonilla
*/
const pool = require("../../models/db");
const readController = {};

//#region 
readController.tbStudents = async (req, res) => {
    try {
        const sql = `
        SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
        REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id as id
        FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' );`;
        const data = await pool.query(sql,[]);
      //   response
        return res.json({
            data
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = readController;