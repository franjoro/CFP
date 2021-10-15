// create json for after export
const zipCourse = {};
// import necesari element
const {createZipHabil} = require('../../utils/zip/zip');
const pool = require("../../models/db");
const { getUserDataByToken } = require("../../middlewares/auth");
//#region getZipCouse
// description: Select documents in specific course
// params: req, res || req.body. course

zipCourse.getZipCouse = async (req, res) => {
    const { course } = req.body;
    const queryS3Keys = await pool.query(
        `SELECT D.s3key as s3key, 
        REPLACE(JSON_EXTRACT(S.json1, '$.nombres'), '"','' ) as nombre, 
        REPLACE(JSON_EXTRACT(S.json1, '$.apellidos'), '"','' ) as apellidos   
        FROM tb_habil_documentos AS D INNER JOIN tb_habil_solicitudes AS S ON S.id = D.id_solicitud 
        WHERE S.Codigo_curso = ?;`,
        [course]
    );

    if (!queryS3Keys)
        return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
    try {
        await createZipHabil(``, queryS3Keys);
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, error: error });
    }
};
//#endregion

//#region 
/*
name: getZipParticipant
description: select documents in spefi¿¿cific participant
params: idReques
date: 15/10/2021 for Osmaro Bonilla
last update: 15/10/2021 for Osmaro Bonilla
*/
zipCourse.getZipParticipant = async(req,res) =>{
    const {idReques} = req.body;
    console.log(idReques);
    const queryS3Keys = await pool.query(
        `SELECT D.s3key as s3key, REPLACE(JSON_EXTRACT(S.json1, '$.nombres'), '"','' ) as nombre, 
        REPLACE(JSON_EXTRACT(S.json1, '$.apellidos'), '"','' ) as apellidos 
        FROM tb_habil_documentos AS D INNER JOIN tb_habil_solicitudes AS S ON S.id = D.id_solicitud 
        WHERE S.id = ?;`,
        [idReques]
    );

    if (!queryS3Keys)
        return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
    try {
        await createZipHabil(``, queryS3Keys);
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, error: error });
    }
}
//#endregion

//#region dowloadZipCourse
zipCourse.dowloadZipCourse = (req, res) => {
    try {
        res.contentType("application/zip");
        res.sendFile("/utils/zip/file_course_habil.zip", { root: "./" });  
    } catch (error) {
        console.log(error);
        res.json({status: true, error: error});
    }
    
};

// export json zipCourse
module.exports = zipCourse;