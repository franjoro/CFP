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
      `SELECT  tb_programa.Nombre, tb_programa.ImgPortada FROM tb_programa WHERE id_programa= ? ;  
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
  //VALIDAR QUE EXISTA EMPRESA
  if (!empresa)
    return res
      .status(400)
      .json({ status: false, error: "EMPRESA_NOT_DEFINED" });
  //Traer todo el arreglo de información de cada alumno
  let data = req.body.data;
  data = JSON.parse(data);
  //Crear arreglo de cursos unicos y crear promesas de actualización
  let cursos = [];
  let PromesasActualizacion = [];
  data.forEach((element) => {
    if (!cursos.includes(element[7])) {
      cursos.push(element[7]);
      PromesasActualizacion.push(
        pool.query(
          "UPDATE tb_participante SET Telefono = ? , Email = ? , Cargo = ? WHERE DUI = ? ",
          [element[2], element[5], element[4], element[0]]
        )
      );
    }
  });

  try {
    // Crear solicitudes de alumnos
    Matriculas = [];
    data.forEach((participante) => {
      Matriculas.push(
        pool.query(
          "INSERT INTO union_matricula(id_participante,id_curso,id_empresa) VALUES( ? , ? , ?) ",
          [participante[0], participante[7], empresa]
        )
      );
    });

    //Creación de empresas
    empresas = [];
    cursos.forEach((curso) => {
      empresas.push(
        pool.query(
          "INSERT INTO union_curso_empresa(id_empresa,id_curso) VALUES (?,?)",
          [empresa, curso]
        )
      );
    });
    //IDS de creación de matriculas
    const IdsMatriculas = await Promise.all(Matriculas);
    // IDS de actualización de iformación de cada alumno
    const Participantes = await Promise.all(PromesasActualizacion);
    //IDS de creación de empresas
    const IdsEmpresas = await Promise.all(empresas);
    res.status(200).json({ status: true, data: cursos });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};
const fs = require("fs");

public.FichaRegistro = async (req, res) => {
  let cursos = req.params.data;
  const empresa = req.params.empresa;
  if (!cursos || !empresa || cursos === "undefined" || empresa === "undefined")
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

    let statment =
      "SELECT tb_participante.Nombre, tb_participante.Cargo, tb_participante.ISSS , tb_participante.DUI, tb_participante.Genero  FROM tb_participante INNER JOIN union_matricula ON tb_participante.DUI  = union_matricula.id_participante WHERE (union_matricula.id_curso = '${curso}' AND  union_matricula.id_empresa= '${empresa}' )  ";


    let alumnos = await pool.query(statment);
    MainQuery = await Promise.all(queries);
    //  res.json({MainQuery, alumnos});

    const { GenerarPdf } = require("../utils/htmlToPdf");
    let pdf = await GenerarPdf({ data: MainQuery, alumnos });

    var file = fs.readFileSync("./public/files/" + pdf);
    res.contentType("application/pdf");
    res.send(file);
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
    cursos.forEach((curso) => {
      count.forEach((element) => {
        const ext = req.files[element].name.split(".")[1];
        const fileContent = Buffer.from(req.files[element].data, "binary");
        promesas.push(upload(fileContent, curso, element, ext, empresa));
      });
    });

    let datos = await Promise.all(promesas);
    res.send(datos);
  } catch (error) {
    res.json({ status: false, error });
    console.log(error);
  }
};

public.GetFiles = async (req, res) => {
  if (!req.params.key)
    return res.json({ status: false, error: "KEY_NOT_EXIST" });
  const key = req.params.key.replace(/_/g, "/");
  console.log(key);
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
