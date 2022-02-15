/*@author: Osmaro Bonilla
  @description: Se eliminan el documento seleccionado en aws y en la base de datos
  @date: 20/08/2021*/
  const pdfController = {};
  // Requerimos pool de base de datos si es necesario
  const pool = require("../../models/db");
const  { PrintPdf } = require('../../utils/PDF/ballot_pdf');

  /*@description: Elimina el documento seleccionado con su key 
    @see: Se utiliza en cliente de habil
    @param: req, res, req.coockies.token*/
pdfController.printPDF = async (req, res) => {
    const {idSolicitud} = req.params; 
    const {
      depNacimiento, 
      munNacimiento, 
      depDomicilio, 
      munDomicilio, 
      departcontact, 
      municipiocontacto
    } = req.body;

    const data3 = {
      depNacimiento: depNacimiento,
      munNacimiento: munNacimiento,
      depDomicilio: depDomicilio,
      munDomicilio: munDomicilio,
      departcontact: departcontact,
      municipiocontacto: municipiocontacto
    };
    try {
      const sqlJson1 =`SELECT 
        timestamp,
        REPLACE(JSON_EXTRACT(json1, '$.dui'), '"','' ) as dui, 
        REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit, 
        REPLACE(JSON_EXTRACT(json1, '$.nombres'), '"','' ) as nombres,
        REPLACE(JSON_EXTRACT(json1, '$.apellidos'), '"','' ) as apellidos,
        REPLACE(JSON_EXTRACT(json1, '$.sexo'), '"','' ) as sexo,
        REPLACE(JSON_EXTRACT(json1, '$.cfamilia'), '"','' ) as cfamilia,
        REPLACE(JSON_EXTRACT(json1, '$.estadoFamiliar'), '"','' ) as estadoFamiliar,
        REPLACE(JSON_EXTRACT(json1, '$.jefeDeHogar'), '"','' ) as jefeDeHogar,
        REPLACE(JSON_EXTRACT(json1, '$.nHijos'), '"','' ) as nHijos,
        REPLACE(JSON_EXTRACT(json1, '$.otProfecionBool'), '"','' ) as booltrabajoantes,
        REPLACE(JSON_EXTRACT(json1, '$.otProfecion'), '"','' ) as profesion,
        REPLACE(JSON_EXTRACT(json1, '$.depNacimiento'), '"','' ) as depNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.munNacimiento'), '"','' ) as munNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.fechNacimiento'), '"','' ) as fechNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.depDomicilio'), '"','' ) as depDomicilio,
        REPLACE(JSON_EXTRACT(json1, '$.munDomicilio'), '"','' ) as munDomicilio,
        REPLACE(JSON_EXTRACT(json1, '$.direccionDom'), '"','' ) as direccionDom,
        REPLACE(JSON_EXTRACT(json1, '$.telFijo'), '"','' ) as telFijo,
        REPLACE(JSON_EXTRACT(json1, '$.telMovil'), '"','' ) as telMovil,
        REPLACE(JSON_EXTRACT(json1, '$.email'), '"','' ) as email,
        REPLACE(JSON_EXTRACT(json1, '$.discapacidadBool'), '"','' ) as discapacidadBool,
        JSON_EXTRACT(json1, '$.discapacidad') as discapacidad,
        REPLACE(JSON_EXTRACT(json1, '$.otroText'), '"','' ) as textoDiscapacidad
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson1 = await pool.query(sqlJson1,[idSolicitud]);
        const sqlJson2 = `SELECT 
        REPLACE(JSON_EXTRACT(json2, '$.sabeleerEscribir'), '"','' ) as sabeleerEscribir, 
        REPLACE(JSON_EXTRACT(json2, '$.leerEscribir'), '"','' ) as leerEscribir, 
        REPLACE(JSON_EXTRACT(json2, '$.soloFirma'), '"','' ) as soloFirma, 
        REPLACE(JSON_EXTRACT(json2, '$.gradoFinalizado'), '"','' ) as gradoFinalizado, 
        REPLACE(JSON_EXTRACT(json2, '$.estudiaActualmente'), '"','' ) as estudiaActualmente, 
        REPLACE(JSON_EXTRACT(json2, '$.tiempoestudio'), '"','' ) as tiempoestudio, 
        REPLACE(JSON_EXTRACT(json2, '$.cursosPasados'), '"','' ) as cursosPasados, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficioCursos'), '"','' ) as beneficioCursos, 
        REPLACE(JSON_EXTRACT(json2, '$.curso1'), '"','' ) as curso1, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio1'), '"','' ) as impartio1, 
        REPLACE(JSON_EXTRACT(json2, '$.year1'), '"','' ) as year1, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio1'), '"','' ) as beneficio1, 
        REPLACE(JSON_EXTRACT(json2, '$.curso2'), '"','' ) as curso2, 
        REPLACE(JSON_EXTRACT(json2, '$.txtTitleOr'), '"','' ) as txtTitleOr, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtherEduc'), '"','' ) as txtOtherEduc, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio2'), '"','' ) as impartio2, 
        REPLACE(JSON_EXTRACT(json2, '$.year2'), '"','' ) as year2, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio2'), '"','' ) as beneficio2, 
        REPLACE(JSON_EXTRACT(json2, '$.curso3'), '"','' ) as curso3, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio3'), '"','' ) as impartio3, 
        REPLACE(JSON_EXTRACT(json2, '$.year3'), '"','' ) as year3, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio3'), '"','' ) as beneficio3, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtro'), '"','' ) as txtOtro, 
        JSON_EXTRACT(json2, '$.cursopositivo') as cursopositivo, 
        REPLACE(JSON_EXTRACT(json2, '$.nobeneficioc'), '"','' ) as nobeneficioc, 
        JSON_EXTRACT(json2, '$.actividades') as actividades, 
        REPLACE(JSON_EXTRACT(json2, '$.trabajaantes'), '"','' ) as trabajaantes, 
        REPLACE(JSON_EXTRACT(json2, '$.tiempoSinTrabajarselect'), '"','' ) as tiempoSinTrabajarselect, 
        REPLACE(JSON_EXTRACT(json2, '$.tipoempleo'), '"','' ) as tipoempleo, 
        REPLACE(JSON_EXTRACT(json2, '$.sectorDeTrabajo'), '"','' ) as sectorDeTrabajo, 
        REPLACE(JSON_EXTRACT(json2, '$.recibeIngresos'), '"','' ) as recibeIngresos, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtherWork'), '"','' ) as txtOtherWork, 
        REPLACE(JSON_EXTRACT(json2, '$.sectortrabajo'), '"','' ) as sectortrabajo, 
        JSON_EXTRACT(json2, '$.ingresos') as ingresos, 
        JSON_EXTRACT(json2, '$.espectativaLogro') as espectativaLogro, 
        REPLACE(JSON_EXTRACT(json2, '$.pertinencia'), '"','' ) as pertinencia
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson2 = await pool.query(sqlJson2,[idSolicitud]);
        const sqlJson3 = `SELECT 
        REPLACE(JSON_EXTRACT(json3, '$.nombreContacto'), '"','' ) as nombreContacto,
        REPLACE(JSON_EXTRACT(json3, '$.parentesco'), '"','' ) as parentesco,
        REPLACE(JSON_EXTRACT(json3, '$.direccionContacto'), '"','' ) as direccionContacto,
        REPLACE(JSON_EXTRACT(json3, '$.departcontact'), '"','' ) as departcontact,
        REPLACE(JSON_EXTRACT(json3, '$.municipiocontacto'), '"','' ) as municipiocontacto,
        REPLACE(JSON_EXTRACT(json3, '$.fijoContact'), '"','' ) as fijoContact,
        REPLACE(JSON_EXTRACT(json3, '$.movilContacto'), '"','' ) as movilContacto,
        REPLACE(JSON_EXTRACT(json3, '$.emailContacto'), '"','' ) as emailContacto
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson3 = await pool.query(sqlJson3,[idSolicitud]);

        const sqljson5 = `
        SELECT C.Nombre AS nombre_curso , C.Horario, P.Nombre AS nombre_programa FROM tb_habil_solicitudes AS S 
        INNER JOIN tb_cursos AS C ON S.Codigo_curso = C.Codigo_curso 
        INNER JOIN tb_programa AS P ON P.id_programa = C.id_programa WHERE id = ?;`;
        const dataJson5 = await pool.query(sqljson5,[idSolicitud]);

        await PrintPdf(dataJson1, dataJson2, dataJson3, data3, dataJson5);
      return res.status(200).json({ status: true});
    } catch (error) {
        res.send(error);
      //return diferents errors
      return res.status(400).json(error);
    } 
};
  
pdfController.downloadFile = async (req, res) => {
  const {idSolicitud} = req.params; 
  const query = `SELECT 
  REPLACE(JSON_EXTRACT(json1, '$.nombres'), '"','' ) as nombres,
  REPLACE(JSON_EXTRACT(json1, '$.apellidos'), '"','' ) as apellidos
  FROM tb_habil_solicitudes WHERE id = ?`;
  const data = await pool.query(query,[idSolicitud]);
  const nombres  = ((data[0].nombres).toUpperCase()).split(" ",3);
  const apellidos  = ((data[0].apellidos).toUpperCase()).split(" ",3);
  const path = `./public/files/tmp/${apellidos[0]} ${apellidos[1]},${nombres[0]} ${nombres[1]}.pdf`;
  res.contentType("application/pdf");
  res.download(path);
};
  
  module.exports = pdfController;
  