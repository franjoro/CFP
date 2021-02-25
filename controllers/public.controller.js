//declarar variable a exportar
const public = {};
const pool = require("../models/db");

//Requerimos pool de base de datos si es necesario

public.main = async (req, res) => {
  let programa = req.params.id;
  //Aqui redireccionar a selector de programas
  if (!programa) return res.redirect("/public/");
  try {
    data = await pool.query(
      `SELECT  tb_programa.Nombre, tb_programa.ImgPortada , tb_programa.id_programa  FROM tb_programa WHERE id_programa= ? ;  
     SELECT Codigo_curso, Nombre, Horario FROM tb_cursos WHERE id_programa = ? AND Estado= 1 `,
      [req.params.id, programa]
    );
    if (!data.length) return res.redirect("/public/");
    data_format = { programa: data[0][0], cursos: data[1] };
    res.render("./public_empresas/empresa", data_format);
  } catch (error) {
    res.status(400).json({ error });
  }
};

public.getEmpresas = async (req, res) => {
  let post_var = req.body.searchTerm,
    query = `SELECT id_empresa AS id, Nombre AS text FROM tb_empresa order By Nombre LIMIT 5`;
  if (post_var)
    query = `SELECT id_empresa AS id, Nombre AS text  FROM tb_empresa WHERE Nombre like '%${post_var}%' order By Nombre LIMIT 5`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

public.getDataEmpresas = async (req, res) => {
  let param = req.body.param;
  if (!param)
    return res.status(400).json({ status: false, error: "PARAM_NOT_EXIST" });
  let query = await pool.query(
    "SELECT NIT, Aportacion_insaforp ,Num_Patronal, Num_Empleados FROM tb_empresa WHERE id_empresa = ? ;",
    param
  );
  res.status(200).json({ data: query[0], cantidad: query.length });
  try {
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

public.UpdateDataEmpresa = async (req, res) => {
  data = [
    req.body.nit,
    req.body.aportacion,
    req.body.patronal,
    req.body.num_empleados,
    req.body.id,
  ];
  try {
    pool.query(
      "UPDATE tb_empresa SET  NIT= ? , Aportacion_insaforp = ? , Num_Patronal = ?, Num_Empleados = ? WHERE id_empresa = ?  ",
      data
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

public.CreateSolicitud = async (req, res) => {
  const empresa = req.body.empresa;
  const cursos = JSON.parse(req.body.cursos);
  const participantes = JSON.parse(req.body.participantes);

  try {
    //VALIDAR QUE EXISTAN LOS DATOS
    if (!empresa) throw "EMPRESA_NOT_EXIST";
    if (!cursos) throw "CURSOS_NOT_EXIST";
    if (!participantes) throw "PARTICIPANTES_NOT_EXIST";

    //Hacer consultas en arreglos para hacer promesas
    let empresas_cursos = [];
    let participantes_cursos = [];
    let participantes_actualizacion = [];

    //Empresas y cursos
    cursos.forEach((curso) => {
      empresas_cursos.push(
        pool.query(
          "INSERT INTO union_curso_empresa(id_empresa,id_curso) VALUES (?,?)",
          [empresa, curso]
        )
      );
    });

    //Matriculas
    participantes.forEach((participante) => {
      participantes_cursos.push(
        pool.query(
          "INSERT INTO union_matricula(id_participante,id_curso,id_empresa) VALUES( ? , ? , ?) ",
          [participante[0], participante[7], empresa]
        )
      );
    });

    //Actualización participantes
    participantes.forEach((element) => {
      participantes_actualizacion.push(
        pool.query(
          "UPDATE tb_participante SET Telefono = ? , Email = ? , Cargo = ? WHERE DUI = ? ",
          [element[2], element[5], element[4], element[0]]
        )
      );
    });

    const QueryEmpresas = await Promise.all(empresas_cursos);
    const QueryMatriculas = await Promise.all(participantes_cursos);
    const QueryActualizacionP = await Promise.all(participantes_actualizacion);

    res.status(200).json({
      status: true,
      data: { QueryEmpresas, QueryMatriculas, QueryActualizacionP },
    });

    const { sendEmail } = require("../utils/mailer");
    let correos = await pool.query(
      "SELECT tb_usuarios.Email FROM tb_usuarios INNER JOIN union_programa_usuario ON union_programa_usuario.id_usuario = tb_usuarios.id_usuario WHERE union_programa_usuario.id_programa=? ",
      [req.body.programa]
    );

    cursos.forEach(async (curso) => {
      let data = await pool.query(
        "SELECT Nombre, Horario FROM tb_cursos WHERE Codigo_curso = ? ; SELECT Nombre FROM tb_empresa WHERE id_empresa = ? ",
        [curso, empresa]
      );
      console.log(correos);
      correos.forEach((element) => {
        sendEmail(
          element.Email,
          "SOLICITUD DE EMPRESA REALIZADA",
          `Notificación automática de sistema Razón: Solicitud de empresa creada en el curso : ${curso} Nombre: ${data[0][0].Nombre} Horario: ${data[0][0].Horario}  - Cantidad de participantes: ${participantes.length}   - Empresa: ${data[1][0].Nombre}   `
        );
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

public.FichaRegistro = async (req, res) => {
  let cursos = req.params.data;
  const empresa = req.params.empresa;
  let alumnos = req.body.alumnos;

  if (
    !alumnos ||
    !cursos ||
    !empresa ||
    cursos === "undefined" ||
    empresa === "undefined"
  )
    return res.json({ status: false, error: "PARAMS_NOT_EXIST" });

  queries = [];
  try {
    queries.push(
      pool.query(
        "SELECT tb_empresa.Nombre, tb_empresa.NIT, tb_empresa.Tel, tb_empresa.Aportacion_insaforp,  tb_empresa.Num_Patronal , tb_empresa.Num_Empleados , tb_actividad_economica.Nombre  AS 'Actividad' FROM tb_empresa INNER JOIN tb_actividad_economica ON tb_actividad_economica.id = tb_empresa.Actividad_eco WHERE tb_empresa.id_empresa = ? ",
        [empresa]
      )
    );

    queries.push(
      pool.query(
        "SELECT Horario, Nombre FROM tb_cursos WHERE Codigo_curso = ? ",
        [cursos]
      )
    );
    let alumnos = req.body.alumnos;
    alumnos = JSON.parse(alumnos);
    MainQuery = await Promise.all(queries);
    // res.json({MainQuery, alumnos});
    const { GenerarPdf } = require("../utils/htmlToPdf");
    let pdf = await GenerarPdf({ data: MainQuery, alumnos });
    res.status(200).json({ status: true, data: pdf });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

public.AbrirFile = (req, res) => {
  const fs = require("fs");
  var file = fs.readFileSync("./public/files/archivo_random.pdf");
  res.contentType("application/pdf");
  res.send(file);
};

const { upload, getFiles } = require("../utils/s3");

public.archivos = async (req, res) => {
  if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
  var count = Object.keys(req.files);
  const CursosCrud = req.body.curso;
  const cursos = JSON.parse(CursosCrud);
  const empresa = req.body.empresa;
  try {
    let promesas = [];
    let inserts = [];
    let ext;
    let fileContent;
    cursos.forEach((curso, index) => {
      ext = req.files[`ficha${index}`].name.split(".")[1];
      fileContent = Buffer.from(req.files[`ficha${index}`].data, "binary");
      promesas.push(
        upload(fileContent, Date.now(), ext, empresa, `ficha${index}`)
      );
    });

    ext = req.files[`recibo`].name.split(".")[1];
    fileContent = Buffer.from(req.files[`recibo`].data, "binary");
    promesas.push(upload(fileContent, Date.now(), ext, empresa, "recibo"));

    if (req.files[`cancelacion`]) {
      ext = req.files[`cancelacion`].name.split(".")[1];
      fileContent = Buffer.from(req.files[`recibo`].data, "binary");
      promesas.push(
        upload(fileContent, Date.now(), ext, empresa, "cancelacion")
      );
    }

    ext = req.files[`planilla`].name.split(".")[1];
    fileContent = Buffer.from(req.files[`recibo`].data, "binary");
    promesas.push(upload(fileContent, Date.now(), ext, empresa, "planilla"));

    let datos = await Promise.all(promesas);
    cursos.forEach((curso, index) => {
      let key;
      datos.forEach((element, index2) => {
        if (element.posicion == `ficha${index}`) {
          key = element.key;
          inserts.push(
            pool.query(
              "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
              [key, 1, empresa, curso]
            )
          );
        }
        if (element.posicion == `recibo`) {
          key = element.key;
          inserts.push(
            pool.query(
              "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
              [key, 2, empresa, curso]
            )
          );
        }
        if (req.files[`cancelacion`]) {
          if (element.posicion == `cancelacion`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, 3, empresa, curso]
              )
            );
          }
        }
        if (element.posicion == `planilla`) {
          key = element.key;
          inserts.push(
            pool.query(
              "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
              [key, 4, empresa, curso]
            )
          );
        }
      });
    });

    const inserted = await Promise.all(inserts);
    res.status(200).json({ status: true });
  } catch (error) {
    res.json({ status: false, error });
    console.log(error);
  }
};

public.GetFiles = async (req, res) => {
  if (!req.params.key)
    return res.json({ status: false, error: "KEY_NOT_EXIST" });
  const key = req.params.key.replace(/_/g, "/");
  try {
    const get = await getFiles(key);
    res.status(200).json({ status: true });
  } catch (error) {
    res.json({ status: false, error });
    console.log(error);
  }
};

public.archivo = (req, res) => {
  var file = fs.readFileSync("./public/files/tmpfile.pdf");
  res.contentType("application/pdf");
  res.send(file);
};

module.exports = public;
