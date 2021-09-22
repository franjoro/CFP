/*@author: Osmaro Bonilla
  @description: Specific Controler for print pdf psychology 
  @date: 21/09/2021*/
//Declare array
const psychology_pdf = {};

//We instans necesary elements
const { getUserDataByToken } = require("../../../../../../middlewares/auth");
const pool = require("../../../../../../models/db");
const  { PrintPdf } = require('../../../../../../utils/PDF/psychology_pdf');

psychology_pdf.renderPreview = async (req,res) =>{
  const usuario = getUserDataByToken(req.cookies.token);
  const {idPsychology, idStudent} = req.params; 
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
    const sqlPsychology = `SELECT observations, results, next_date from tb_psychology WHERE id_psychology = ?`;
    const sqlStrategies = `SELECT  name as nombre , description as descripcion  FROM tb_strategies_psychology AS SP INNER JOIN tb_strategies AS S on S.id_strategy = SP.id_strategy WHERE SP.id_psychology = ?`
    const sqlReason = `SELECT name as nombre , description as descripcion FROM tb_reasons_psychology AS RP INNER JOIN tb_reasons AS R on R.id_reason = RP.id_reason WHERE RP.id_psychology = ?`
    //We collect params 
    const params = [idStudent];
    const paramsPsychology = [idPsychology];
    const paramsStrategies = [idPsychology];
    const paramsReason = [idPsychology];
    try {
      //we execute pool query
      const data = await pool.query(sql, params);
      const dataPsychology = await pool.query(sqlPsychology, paramsPsychology);
      const dataStrategies = await pool.query(sqlStrategies, paramsStrategies);
      const dataReason = await pool.query(sqlReason, paramsReason);
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
      const datosPsychology ={
        observaciones: dataPsychology[0].observations,
        resultados: dataPsychology[0].results,
        next_date: dataPsychology[0].next_date,
      };
      
      res.render("./psychology/preview", {
        data: usuario.data,
        datos,
        datosPsychology,
        dataStrategies,
        dataReason,
        idPsychology
      });
    } catch (error) {
      //return diferents errors
      return res.status(200).json(error);
    }
};
psychology_pdf.pdfDetails = async (req,res) =>{
  const {data} =req.params;
    try {
       await PrintPdf(data);
      return res.status(200).json({ status: true});
    } catch (error) {
      //return diferents errors
      return res.status(400).json(error);
    } 
};

psychology_pdf.downloadFile = (req, res) => {
  console.log('Intentando descargar');
  const path = `./public/files/tmp/reporte_psicologia.pdf`;
  res.contentType("application/pdf");
  res.download(path);
};

let json = {};

module.exports = psychology_pdf;