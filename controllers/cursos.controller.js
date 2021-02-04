//declarar variable a exportar
const cursos = {};

//Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

//const mailer = require ('../utils/mailer');

//Renderizar selector de programa por cursos
cursos.main = async (req, res) => {
  try {
    let query = await pool.query(
      "SELECT id_programa AS id, Nombre , ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa WHERE Estado = 1 "
    );
    console.log(query);
    res.render("./admin/programas.cursos.ejs", { query });
  } catch (error) {
    res.status(400).json(error);
  }
};
//Renderizar pantalla de cursos ya con programa
cursos.cursos = async (req, res) => {
  let programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    let query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_programa WHERE id_programa = ?",
      [programa]
    );
    if (!query[0].c)
      return res.status(400).json({ error: "PROGRAM_NOT_EXIST" });
    let data = await pool.query(
      "SELECT `tb_cursos`.`Codigo_curso`, `tb_cursos`.`Nombre`, `tb_instructor`.`Nombre` AS instructor, `tb_cursos`.`Orden`, `tb_cursos`.`Agrupacion`, `tb_cursos`.`Estado` FROM `tb_cursos` LEFT JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado != 0",
      [programa]
    );
    res.render("./admin/cursos", { data, programa });
  } catch (error) {
    res.status(400).json(error);
  }
};

cursos.cursosFinalizados = async (req, res) => {
  let programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    let query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_programa WHERE id_programa = ?",
      [programa]
    );
    if (!query[0].c)
      return res.status(400).json({ error: "PROGRAM_NOT_EXIST" });
    let data = await pool.query(
      "SELECT `tb_cursos`.`Codigo_curso`, `tb_cursos`.`Nombre`, `tb_instructor`.`Nombre` AS instructor, `tb_cursos`.`Orden`, `tb_cursos`.`Agrupacion` FROM `tb_cursos` LEFT JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado = 0",
      [programa]
    );
    res.render("./admin/cursos_finalizados", { data, programa });
  } catch (error) {
    res.status(400).json(error);
  }
};



cursos.curso_detalle = async (req, res) => {
  //VALIDAR si la peticion trae un codigo de curso
  let curso = req.params.id;
  let programa = req.params.programa;

  if (!curso) return res.status(400).json({ error: "ID_NOT_EXIST" });

  try {
    //validar si este codigo existe
    let query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_cursos WHERE Codigo_curso = ?",
      [curso]
    );
    if (!query[0].c) return res.status(400).json({ error: "CURSO_NOT_EXIST" });

    //Traer de bd Las empresas que estan matriculadas al curso y los alumnos asociados
    let empresas = await pool.query(
      `SELECT tb_empresa.Nombre,tb_empresa.id_empresa AS codigo_empresa FROM tb_empresa INNER JOIN union_curso_empresa ON tb_empresa.id_empresa = union_curso_empresa.id_empresa WHERE union_curso_empresa.id_curso = ? ;
    SELECT tb_participante.DUI, tb_participante.Nombre, tb_participante.Telefono, tb_participante.Email, union_matricula.id_empresa FROM tb_participante  INNER JOIN union_matricula ON union_matricula.id_participante = tb_participante.DUI WHERE union_matricula.id_curso = ? ;
    SELECT  tb_cursos . Codigo_curso ,  tb_cursos . Nombre ,  tb_cursos . Date_inicio ,  tb_cursos . Date_fin ,  tb_cursos . Orden ,  tb_cursos . Agrupacion ,  tb_cursos . Horario ,  tb_cursos . CostoAlumno ,  tb_cursos . Factura ,  tb_instructor . Nombre AS instructor FROM  tb_instructor  INNER JOIN  tb_cursos  ON  tb_cursos . id_instructor  =  tb_instructor . DUI  WHERE tb_cursos . Codigo_curso  = ?  GROUP BY tb_cursos.Codigo_curso  
    `,
     [curso,curso,curso]
    );
    //Formatear la informacion para que existan los alumnos adentro de un objeto de empresas
    data = [];
    empresas[0].forEach((element, i) => {
      let alumnos_array = [];
      empresas[1].forEach((alumno) => {
        if (alumno.id_empresa == element.codigo_empresa) {
          alumnos_array.push(alumno);
        }
      });
      data[i] = { Empresa: element.Nombre, Alumnos: alumnos_array };
      i++;
    });
    //Responder
    res.render("./admin/curso_detalle",{data ,curso: empresas[2][0], programa});
  } catch (error) {
    res.status(400).json(error);
  }
};







cursos.getInstructores = async (req, res) => {
  let post_var = req.body.searchTerm,
    query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor order By Nombre LIMIT 5`;
  if (post_var)
    query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor WHERE Nombre like '%${post_var}%' order By Nombre LIMIT 5`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};


//agregar nuevo curso
cursos.add = async (req, res, next) => {
  if (!req.body.programa || ! req.body.codigo_curso || ! req.body.nombre)
    return res.status(400).json({ status: false, error: "empty_programa" });

  let data = [
    req.body.codigo_curso,
    req.body.nombre,
    req.body.date_inicio.split("-").reverse().join("-"),
    req.body.date_fin.split("-").reverse().join("-"),
    req.body.agrupacion,
    req.body.orden,
    req.body.horario,
    req.body.costo,
    req.body.factura,
    req.body.instructor,
    req.body.programa
  ];
  console.log(data);
  try {
    await pool.query(
      "INSERT INTO tb_cursos(Codigo_curso, Nombre, Date_inicio, Date_fin, Agrupacion, Orden, Horario, CostoAlumno, Factura, id_instructor, id_programa, Estado)  VALUES(?,?,?,?,?,?,?,?,?,?,?, 1)",
      data
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ status: false, error });
  }
};



//agregar nueva empresa en curso
cursos.addEmpresaCurso = async (req, res) => {
  console.log(req.body);
  if (!req.body.select_add_empresa || ! req.body.curso)
    return res.status(400).json({ status: false, error: "empty_data" });

  let data = [
    req.body.select_add_empresa,
    req.body.curso,
  ];
  try {
    await pool.query(
      "INSERT INTO union_curso_empresa(id_empresa, id_curso)  VALUES(?,?)",
      data
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ status: false, error });
  }
};






module.exports = cursos;
