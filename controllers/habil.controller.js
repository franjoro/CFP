const pool = require("../models/db");
const { upload, getFiles } = require("../utils/s3");// Lo usaremos para subir u obtener archivos
const {sendEmail} = require("../utils/mailer");
const { getUserDataByToken } = require("../middlewares/auth");
const { query } = require("express");

// declarar variable a exportar
const habil = {};

//#region RENDERIZADOS
habil.agradecimiento = async(req, res) =>{
    const {idProgram} =req.params;
    if(idProgram == null || idProgram == undefined){
        idProgram = "";
    }
    try {
        res.render('habil/gracias',{idProgram});
    } catch (error) {
        console.log(error);
        res.send(error);        
    }
};

habil.disabled = async (req, res)=>{
    res.render("habil/deshabilitado");
}

habil.documentacion = async(req, res) =>{
    let id_solicitud = req.params.idSolicitud;
    let documento = req.params.documento;
    let documento2 = req.params.documento2;
    const query = `SELECT P.id_programa AS id_programa FROM tb_habil_solicitudes AS S 
    INNER JOIN tb_cursos AS C ON C.Codigo_curso = S.Codigo_curso 
    INNER JOIN tb_programa AS P ON P.id_programa = C.id_programa WHERE id = ?;`;
    const data = await pool.query(query, [id_solicitud]);
    const idProgram = data[0].id_programa;
    res.render('habil/documentacion',{id_solicitud, documento, documento2, idProgram});
};

habil.gestorDeDocumentacion = async(req,res) =>{
    //RECOLECTANDO PARAMETROS
    const usuario = getUserDataByToken(req.cookies.token);
    const { idCurso, idSolicitud, dui, programa, tipo } = req.params;
    //SECCION DE CONSULTAS
    const queryCursos = `SELECT Nombre, Horario FROM tb_cursos WHERE Codigo_curso = ?`;
    const queryParticipante = `
    SELECT DISTINCT par.DUI as dui, REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit, par.Nombre as nombre, sol.comentario 
    FROM tb_habil_solicitudes AS sol INNER JOIN tb_participante par on par.DUI = sol.documento WHERE sol.id =?`;
    const queryDocumentos = `SELECT id, s3key,estado, tipo, id_solicitud FROM tb_habil_documentos WHERE id_solicitud = ?`;
    //EJECUTANDO CONSULTAS
    const cursos = await pool.query(queryCursos,[idCurso]);
    const participantes = await pool.query(queryParticipante,[idSolicitud]);
    const documentos = await pool.query(queryDocumentos,[idSolicitud]);
    //MANIPULANDO RES DE CONSULTA
    const nCurso = cursos[0].Nombre;
    const hCurso = cursos[0].Horario;
    const comentario = participantes[0].comentario;
    const participante = participantes[0].nombre;
    const nit = participantes[0].nit;
    //IMPORTANDO DATA
    const dataSend = {
        data: usuario.data, 
        idCurso,
        idSolicitud,
        dui,
        programa,
        tipo,
        nCurso,
        hCurso,
        participante,
        nit,
        documentos,
        comentario
    };
    //RENDERIZANDO Y MANDANDO PARAMETROS
    res.render('habil/gestion_de_documentos', dataSend);
};
//#endregion


habil.main = async (req, res) => {
    //global.global_codigoCurso = req.params.codigoCurso;//ALERTA ESTA ES UNA VARIABLE GLOBAL QUE SE UTILIZARA POCO TIEMPO TOMAR EN CUENTA QUE LAS VARIABLE GLOBALES NO SON VIABLES POR MEMORIA
    const { codigoCurso, view } = req.params;
    const type = 0 ;
    const idSolicitud =''; //Pasamos esta variabñe vacia
    try {
        const sql =`SELECT C.Nombre as Nombre, C.Horario as Horario, C.id_programa as id_programa, P.ImgPortada as img_programa 
        FROM tb_cursos AS C INNER JOIN tb_programa AS P ON C.id_programa = P.id_programa WHERE Codigo_curso = ?`;
        const curso = await pool.query(sql,[codigoCurso]);
        const nombre = curso[0].Nombre;
        const horario = curso[0].Horario;
        const idPrograma = curso[0].id_programa;
        const idProgram ="";
        const imgProgram = curso[0].img_programa
        return res.render("habil/formulario", {
            nombre,
            horario,
            idSolicitud,
            codigoCurso,
            type,
            view,
            idPrograma,
            idProgram,
            imgProgram
        });
    } catch (error) {
            return res.status(400).json(error);
    }
};

habil.renderFormulario = async(req,res) =>{
    const {idSolicitud, type, view} = req.params;
    try {
        const sql = `SELECT P.ImgPortada as img_programa, C.Nombre as nombre,C.habilitado as habilitado, 
        C.Horario as horario, C.Codigo_curso as codigoCurso, C.id_programa AS idProgram 
        FROM tb_habil_solicitudes AS S INNER JOIN tb_cursos C ON S.Codigo_curso = C.Codigo_curso 
        INNER JOIN tb_programa AS P ON P.id_programa = C.id_programa WHERE id = ?`;
        const curso = await pool.query(sql,[idSolicitud]);
        const nombre = curso[0].nombre;
        const horario = curso[0].horario;
        const habilitado =curso[0].habilitado;
        const codigoCurso = curso[0].codigoCurso;
        const idProgram = curso[0].idProgram;
        const idPrograma = curso[0].idProgram;
        const imgProgram = curso[0].img_programa;
        console.log(idProgram)
        return res.render("habil/formulario", {
            nombre,
            horario,
            idSolicitud,
            codigoCurso,
            type,
            habilitado,
            view,
            idPrograma,
            idProgram,
            imgProgram
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};


habil.form = async (req, res) => {
    try {
        const {codigoCurso} = req.body;
        const { global_json1, global_json2, global_json3 } = req.body;
        const { dui, nombres, telMovil, email, sexo } = global_json1;
        const { [0]: { cantidad } } = await pool.query("SELECT COUNT(*) AS cantidad FROM tb_participante WHERE DUI = ?", [dui]);
        if (!cantidad) await pool.query("INSERT INTO tb_participante(DUI, Nombre, Telefono , Email, Genero) VALUES(? ,? , ? ,? ,? )", [dui, nombres, telMovil, email, sexo]);
        const statment = `INSERT INTO tb_habil_solicitudes(documento, Codigo_curso, json1, json2, json3) VALUES ('${dui}', '${codigoCurso}','${JSON.stringify(global_json1)}','${JSON.stringify(global_json2)} ','${JSON.stringify(global_json3)}')`;
        const {insertId} = await pool.query(statment);
        res.json({ status: true  , idSolicitud : insertId});
    } catch (error) {
        console.log(error); 
        res.status(400).json(error);
    }
};

habil.sendEmail = async (req,res) =>{
    const to = req.body.email;
    const { text } = req.body;
    const { enlace } = req.body;
    const { cursoNombre } = req.body;
    console.log(text);
    console.log(enlace);
    console.log(cursoNombre);
    const asunto = `RELLENO DE FORMULARIO PARA CURSO ${cursoNombre.toUpperCase()}`;
    const html = `<h5>Reciba un cordial saludo de parte del Centro de Formación Profesional Don Pedro Ricaldone<h5> <p> por este medio solicitamos el relleno de formulario para aplicar a los cursos aperturados.</p><br>
    <b>Este link esta habilitado para el curso ${cursoNombre}</b>
    <b>Enlace:</b>
    <a href="${enlace}">${enlace}</a> <br>
    <p>Mensaje adjunto: ${text}</p>
    `;
    try {
      await sendEmail(to, asunto, html);
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, error });
    }
};

habil.sendMailDocument = async (req,res) =>{
    const to = req.body.email;
    const { text } = req.body;
    const { enlace } = req.body;
    const { cursoNombre } = req.body;
    const asunto = `INGRESA TUS DOCUMENTOS PARA CURSO ${cursoNombre.toUpperCase()}`;
    const html = `<h5>Reciba un cordial saludo de parte del Centro de Formación Profesional Don Pedro Ricaldone<h5> <p> por este medio solicitamos la subida de su documentación para seguir con la solicitud.</p><br>
    <b>Este link esta habilitado para el curso ${cursoNombre}</b>
    <b>Enlace:</b>
    <a href="${enlace}">${enlace}</a> <br>
    <p>Mensaje adjunto: ${text}</p>
    `;
    try {
      await sendEmail(to, asunto, html);
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, error });
    }
};


habil.sendEmailSol = async (req,res) =>{
    const to = req.body.email;
    const { text } = req.body;
    const { enlace } = req.body;
    const { cursoNombre } = req.body;
    const asunto = `INFORMACIÓN DEL CURSO ${cursoNombre.toUpperCase()}`;
    const html = `<h5>Reciba un cordial saludo de parte del Centro de Formación Profesional Don Pedro Ricaldone<h5> <p> por este medio solicitamos la revisión de su información si tiene alguna observación en el correo revisela detenidamente.</p><br>
    <b>Este link esta habilitado para la solicitud del curso ${cursoNombre}</b>
    <b>Enlace:</b>
    <a href="${enlace}">${enlace}</a> <br>
    <p>Observaciones: ${text}</p>
    `;
    try {
      await sendEmail(to, asunto, html);
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, error });
    }
};



habil.countSolicitud = async (req,res) =>{
    const {idCourse} = req.params;
    const sql = `
    SELECT (SELECT DISTINCT cupo FROM tb_cursos WHERE Codigo_curso = ?) as cupo,
    (SELECT DISTINCT habilitado FROM tb_cursos WHERE Codigo_curso = ?) as habilitado, 
    (SELECT DISTINCT COUNT(*) from tb_habil_solicitudes as sol 
    WHERE sol.Codigo_curso = ? AND (sol.estado = 4 OR sol.estado = 0)) as count;
    `;
    const params = [idCourse,idCourse, idCourse];
    const data = await pool.query(sql, params);
    console.log(data);
    console.log(data[0])
    res.json({
        data,
        status: true,
    });
};

module.exports = habil;