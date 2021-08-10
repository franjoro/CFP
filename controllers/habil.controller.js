const pool = require("../models/db");
const { upload, getFiles } = require("../utils/s3");// Lo usaremos para subir u obtener archivos

// declarar variable a exportar
const habil = {};

// Requerimos pool de base de datos si es necesario
// const pool = require('../models/db')

// const mailer = require ('../utils/mailer');

//#region RENDERIZADOS
habil.agradecimiento = async(req, res) =>{
    res.render('habil/agradecimiento');
};

habil.documentacion = async(req, res) =>{
    res.render('habil/documentacion');
};

//#endregion


habil.main = (req, res) => {
    global.global_codigoCurso = req.params.codigoCurso;//ALERTA ESTA ES UNA VARIABLE GLOBAL QUE SE UTILIZARA POCO TIEMPO TOMAR EN CUENTA QUE LAS VARIABLE GLOBALES NO SON VIABLES POR MEMORIA
    res.render('habil/formulario');
};

habil.form = async (req, res) => {
    try {
        const { global_json1, global_json2, global_json3 } = req.body;
        const { dui, nombres, telMovil, email, sexo } = global_json1;
        const { [0]: { cantidad } } = await pool.query("SELECT COUNT(*) AS cantidad FROM tb_participante WHERE DUI = ?", [dui]);
        if (!cantidad) await pool.query("INSERT INTO tb_participante(DUI, Nombre, Telefono , Email, Genero) VALUES(? ,? , ? ,? ,? )", [dui, nombres, telMovil, email, sexo]);
        const statment = `INSERT INTO tb_habil_solicitudes(DUI, Codigo_curso, json1, json2, json3) VALUES ('${dui}', '${global_codigoCurso}','${JSON.stringify(global_json1)}','${JSON.stringify(global_json2)} ','${JSON.stringify(global_json3)}')`;
        const {insertId} = await pool.query(statment);
        res.json({ status: true  , idSolicitud : insertId});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};


//SECCION DE ASOCIACIÓN DEL BUCKET CON LA SUBIDA DE DATOS
habil.archivos = async (req, res) => {
    //Sirve por si no existen archivos que subir
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    Object.keys(req.files);//Retorna propiedades names de los req.files
    const dui = req.body.curso;
    const cursos = JSON.parse(CursosCrud);
    const {
      empresa,
      CantidadPlanilla,
      CantidadRecibo,
      CantidadCancelacion,
    } = req.body;
    try {
      const promesas = [], inserts = [];
      let ext, fileContent;
      const formatExtension = (ext)=>{
       ext = ext[ext.length - 1].toLowerCase();
       if(ext == "jpg") ext = "jpeg";
       return ext;
      };
      cursos.forEach((curso, index) => {
        // SUBIR Ficha
        ext = formatExtension(req.files[`ficha${index}`].name.split("."));
        fileContent = Buffer.from(req.files[`ficha${index}`].data, "binary");
        promesas.push(
          upload(fileContent, Date.now(), ext, empresa, `ficha${index}`)
        );
  
        // SUBIR Recibo
        for (let i = 0; i < CantidadRecibo[index]; i++) {
          ext = formatExtension(req.files[`recibo${index}${i}`].name.split(".") );
          fileContent = Buffer.from(
            req.files[`recibo${index}${i}`].data,
            "binary"
          );
          promesas.push(
            upload(fileContent, Date.now(), ext, empresa, `recibo${index}${i}`)
          );
        }
  
        // SUBIR Si existe cancelación
        for (let i = 0; i < CantidadCancelacion[index]; i++) {
          ext = formatExtension(req.files[`cancelacion${index}${i}`].name.split("."));
          fileContent = Buffer.from(
            req.files[`cancelacion${index}${i}`].data,
            "binary"
          );
          promesas.push(
            upload(
              fileContent,
              Date.now(),
              ext,
              empresa,
              `cancelacion${index}${i}`
            )
          );
        }
  
        // SUBIR Archivos de planilla
        for (let i = 0; i < CantidadPlanilla[index]; i++) {
          ext = formatExtension(req.files[`planilla${index}${i}`].name.split("."));
          fileContent = Buffer.from(
            req.files[`planilla${index}${i}`].data,
            "binary"
          );
          promesas.push(
            upload(fileContent, Date.now(), ext, empresa, `planilla${index}${i}`)
          );
        }
      });
      const datos = await Promise.all(promesas);
  
      cursos.forEach((curso, index) => {
        let key;
        datos.forEach((element) => {
          if (element.posicion == `ficha${index}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, 1, empresa, curso]
              )
            );
          }
  
          for (let i = 0; i < CantidadRecibo[index]; i++) {
            if (element.posicion == `recibo${index}${i}`) {
              key = element.key;
              inserts.push(
                pool.query(
                  "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                  [key, `2${i}`, empresa, curso]
                )
              );
            }
          }
          for (let i = 0; i < CantidadCancelacion[index]; i++) {
            if (element.posicion == `cancelacion${index}${i}`) {
              key = element.key;
              inserts.push(
                pool.query(
                  "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                  [key, `3${i}`, empresa, curso]
                )
              );
            }
          }
  
          for (let i = 0; i < CantidadPlanilla[index]; i++) {
            if (element.posicion == `planilla${index}${i}`) {
              key = element.key;
              inserts.push(
                pool.query(
                  "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                  [key, `4${i}`, empresa, curso]
                )
              );
            }
          }
        });
      });
      await Promise.all(inserts);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      return res.json({ status: false, error });
    }
  };

module.exports = habil;