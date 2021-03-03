//declarar variable a exportar
const public = {};
const pool = require("../models/db");

//Requerimos pool de base de datos si es necesario
public.home = (req, res) => {
  res.render("./public_empresas/main");
};
public.thanks = (req, res) => {
  res.render("./public_empresas/gracias");
};

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
        let html = `<h1>Notificación automática de sistema Razón: Solicitud de empresa creada en el curso : ${curso}</h1> <p> Nombre: ${data[0][0].Nombre} </p>  <p> Horario: ${data[0][0].Horario} </p>   <p> Cantidad de participantes: ${participantes.length}   </p>  <p> Empresa: ${data[1][0].Nombre}  </p>`;
        sendEmail(element.Email, `SOLICITUD REALIZADA EN CURSO: ${curso }`, html );
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
        "SELECT tb_empresa.Nombre, tb_empresa.NIT, tb_empresa.Tel, tb_empresa.Aportacion_insaforp,  tb_empresa.Num_Patronal , tb_empresa.Num_Empleados  FROM tb_empresa WHERE tb_empresa.id_empresa = ? ",
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
    const { GenerarPdf } = require("../utils/htmlToPdf");
    let pdf = await GenerarPdf({ data: MainQuery, alumnos });
    res.status(200).json({ status: true, data: pdf });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
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
  if (!req.body.key) return res.json({ status: false, error: "KEY_NOT_EXIST" });
  const key = req.body.key;
  try {
    const get = await getFiles(key);
    res.status(200).json({ status: true, ext: get });
  } catch (error) {
    res.json({ status: false, error });
    console.log(error);
  }
};
const fs = require("fs");

public.AbrirFile = (req, res) => {
  var file = fs.readFileSync("./public/files/tmp/ficha.pdf");
  res.contentType("application/pdf");
  res.send(file);
};

public.archivo = (req, res) => {
  const path = `./public/files/tmp/tmpfile.${req.params.file}`;
  res.contentType("application/pdf");
  res.download(path, `archivo.${req.params.file}`);
};

public.editar = async (req, res) => {
  const curso = req.params.curso,
    empresa = req.params.empresa,
    programa = req.params.programa;

  if (!empresa || !curso)
    return res
      .status(400)
      .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
  try {
    let queries = [];
    queries.push(
      pool.query(
        "SELECT Nombre ,id_empresa AS id FROM tb_empresa WHERE id_empresa= ?",
        [empresa]
      )
    );
    queries.push(
      pool.query(
        "SELECT CONCAT(Nombre,' - ' ,Horario) AS curso , Codigo_curso AS id FROM  tb_cursos WHERE Codigo_curso  = ? ",
        [curso]
      )
    );
    queries.push(
      pool.query(
        "SELECT id, s3key, Role  FROM archivo_empresa_curso WHERE id_curso = ? AND id_empresa  = ? AND isEditable = 1  ",
        [curso, empresa]
      )
    );
    const query = await Promise.all(queries);
    res.render("./public_empresas/editar", {
      curso: query[1][0],
      empresa: query[0][0],
      archivos: query[2],
      programa
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
};

module.exports = public;
