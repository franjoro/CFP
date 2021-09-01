/*@author: Osmaro Bonilla
  @description: Se envia la notificación por correo por medio de la recoleccion de nombre, apellido y nombrecurso
*/
const sendNotification = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../../models/db");
const {sendEmail} = require("../../utils/mailer");

/*@description: Consulta SQL y envio de correo
  @see: Se utiliza en cliente de habil
  @param: req, res, req.body {idSolicitud}*/
sendNotification.send = async (req, res) => {
  const { idSolicitud } = req.body;
  const promesas = [
    pool.query(`
    SELECT REPLACE(JSON_EXTRACT(json1, '$.email'), '"','' ) as email, 
    REPLACE(JSON_EXTRACT(json1, '$.nombres'), '"','' ) as nombres, 
    REPLACE(JSON_EXTRACT(json1, '$.apellidos'), '"','' ) as apellidos, 
    C.Nombre as nombreCurso
    FROM tb_habil_solicitudes S INNER JOIN tb_cursos C ON S.Codigo_curso = C.Codigo_curso WHERE id = ?`, [
      idSolicitud,
    ]),
  ];
  const promisesResult = await Promise.all(promesas);
  const email = promisesResult[0][0].email;
  const nombres = promisesResult[0][0].nombres;
  const apellidos = promisesResult[0][0].apellidos;
  const nombreCurso = promisesResult[0][0].nombreCurso;
  const html = `<h3>REVISIÓN EXITOSA DE DOCUMENTOS: Buen dia ${nombres} ${apellidos} sus documentos han sido recibidos satisfactoriamente; estaremos notificando los inicios correspondientes durante la semana previa a la fecha de inicio programada. <br> Notificación correspondiente al curso : <b>${nombreCurso}</b></h3> `;
  sendEmail(email, `DOCUMENTACIÓN APROBADA EN CURSO: ${nombreCurso}`, html);
  res.json({ promisesResult });
};

module.exports = sendNotification;
