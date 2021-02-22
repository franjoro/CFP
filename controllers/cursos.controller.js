// declarar variable a exportar
const cursos = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

// const mailer = require ('../utils/mailer');

// Renderizar selector de programa por cursos
cursos.main = async (req, res) => {
  try {
    const query = await pool.query(
      "SELECT id_programa AS id, Nombre , ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa WHERE Estado = 1 "
    );
    res.render("./admin/programas.cursos.ejs", { query });
  } catch (error) {
    res.status(400).json(error);
  }
};
// Renderizar pantalla de cursos ya con programa
cursos.cursos = async (req, res) => {
  const programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    const query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_programa WHERE id_programa = ?",
      [programa]
    );
    if (!query[0].c)
      return res.status(400).json({ error: "PROGRAM_NOT_EXIST" });
    const data = await pool.query(
      "SELECT `tb_cursos`.`Codigo_curso`, `tb_cursos`.`Nombre`, `tb_instructor`.`Nombre` AS instructor, `tb_cursos`.`Orden`, `tb_cursos`.`Agrupacion`, `tb_cursos`.`Estado` FROM `tb_cursos` LEFT JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado != 0",
      [programa]
    );
    res.render("./admin/cursos", { data, programa });
  } catch (error) {
    res.status(400).json(error);
  }
};

cursos.cursosFinalizados = async (req, res) => {
  const programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    const query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_programa WHERE id_programa = ?",
      [programa]
    );
    if (!query[0].c)
      return res.status(400).json({ error: "PROGRAM_NOT_EXIST" });
    const data = await pool.query(
      "SELECT `tb_cursos`.`Codigo_curso`, `tb_cursos`.`Nombre`, `tb_instructor`.`Nombre` AS instructor, `tb_cursos`.`Orden`, `tb_cursos`.`Agrupacion` FROM `tb_cursos` LEFT JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado = 0",
      [programa]
    );
    res.render("./admin/cursos_finalizados", { data, programa });
  } catch (error) {
    res.status(400).json(error);
  }
};

cursos.curso_detalle = async (req, res) => {
  // VALIDAR si la peticion trae un codigo de curso
  const curso = req.params.id;
  const { programa } = req.params;

  if (!curso) return res.status(400).json({ error: "ID_NOT_EXIST" });

  try {
    // validar si este codigo existe
    const query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_cursos WHERE Codigo_curso = ?",
      [curso]
    );
    if (!query[0].c) return res.status(400).json({ error: "CURSO_NOT_EXIST" });

    // Traer de bd Las empresas que estan matriculadas al curso y los alumnos asociados
    const empresas = await pool.query(
      `SELECT tb_empresa.Nombre,tb_empresa.id_empresa AS codigo_empresa FROM tb_empresa INNER JOIN union_curso_empresa ON tb_empresa.id_empresa = union_curso_empresa.id_empresa WHERE union_curso_empresa.id_curso = ? ;
    SELECT tb_participante.DUI, tb_participante.Nombre, tb_participante.Telefono, tb_participante.Email, union_matricula.id_empresa FROM tb_participante  INNER JOIN union_matricula ON union_matricula.id_participante = tb_participante.DUI WHERE union_matricula.id_curso = ? ;
    SELECT  tb_cursos . Codigo_curso ,  tb_cursos . Nombre ,  tb_cursos . Date_inicio ,  tb_cursos . Date_fin ,  tb_cursos . Orden ,  tb_cursos . Agrupacion ,  tb_cursos . Horario ,  tb_cursos . CostoAlumno ,  tb_cursos . Factura ,  tb_instructor . Nombre AS instructor , tb_cursos.Modalidad , tb_cursos.id_modalidad, tb_cursos.Documento , tb_cursos.id_documento   FROM  tb_instructor  INNER JOIN  tb_cursos  ON  tb_cursos . id_instructor  =  tb_instructor . DUI  WHERE tb_cursos . Codigo_curso  = ?  GROUP BY tb_cursos.Codigo_curso  
    `,
      [curso, curso, curso]
    );
    // Formatear la informacion para que existan los alumnos adentro de un objeto de empresas
    data = [];
    empresas[0].forEach((element, i) => {
      const alumnos_array = [];
      empresas[1].forEach((alumno) => {
        if (alumno.id_empresa == element.codigo_empresa) {
          alumnos_array.push(alumno);
        }
      });
      data[i] = {
        id: element.codigo_empresa,
        Empresa: element.Nombre,
        Alumnos: alumnos_array,
      };
      i++;
    });
    // Responder
    res.render("./admin/curso_detalle", {
      data,
      curso: empresas[2][0],
      programa,
      cAlumnos: empresas[1].length,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

cursos.getInstructores = async (req, res) => {
  const post_var = req.body.searchTerm;
  let query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor order By Nombre LIMIT 5`;
  if (post_var)
    query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor WHERE Nombre like '%${post_var}%' order By Nombre LIMIT 5`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

cursos.getCursosCategoria = async (req, res) => {
  const { categoria } = req.params;
  query = `SELECT Codigo_curso  AS id, CONCAT(Nombre, ' '  , Horario) AS text FROM tb_cursos  WHERE id_programa = ${categoria}  AND Estado != 0`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// agregar nuevo curso
cursos.add = async (req, res, next) => {
  if (!req.body.programa || !req.body.codigo_curso || !req.body.nombre)
    return res.status(400).json({ status: false, error: "empty_programa" });

  const data = [
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
    req.body.programa,
    req.body.modalidad,
    req.body.modadlidad_id,
    req.body.documento,
    req.body.documento_id,
  ];
  try {
    console.log(data);
    await pool.query(
      "INSERT INTO tb_cursos(Codigo_curso, Nombre, Date_inicio, Date_fin, Agrupacion, Orden, Horario, CostoAlumno, Factura, id_instructor, id_programa,   Modalidad , id_modalidad , Documento, id_documento,    Estado)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)",
      data
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

// agregar nueva empresa en curso
cursos.addEmpresaCurso = async (req, res) => {
  if (!req.body.select_add_empresa || !req.body.curso)
    return res.status(400).json({ status: false, error: "empty_data" });

  const data = [req.body.select_add_empresa, req.body.curso];
  try {
    await pool.query(
      "INSERT INTO union_curso_empresa(id_empresa, id_curso)  VALUES(?,?)",
      data
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.deleteEmpresaCurso = async (req, res) => {
  if (!req.body.id_empresa || !req.body.id_curso)
    return res.json({ status: false, error: "EMPTY_PARAMS" });
  try {
    data = [
      req.body.id_empresa,
      req.body.id_curso,
      req.body.id_empresa,
      req.body.id_curso,
    ];
    await pool.query(
      `DELETE FROM union_curso_empresa WHERE id_empresa = ? AND id_curso = ? ;    
     DELETE FROM union_matricula WHERE id_empresa = ? AND id_curso = ? 
      `,
      data
    );
    res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

cursos.edit = async (req, res) => {
  try {
    if (!req.body.id) throw "EMPTY_ID";
    const data = [
      req.body.nombre,
      req.body.date_inicio.split("-").reverse().join("-"),
      req.body.date_fin.split("-").reverse().join("-"),
      req.body.agrupacion,
      req.body.orden,
      req.body.horario,
      req.body.costo,
      req.body.factura,
      req.body.modalidad,
      req.body.modalidad_id,
      req.body.Documento,
      req.body.documento_id,
      req.body.id,
    ];
    statment =
      "UPDATE tb_cursos SET Nombre = ? ,Date_inicio = ?, Date_fin = ?,  Agrupacion =  ? , Orden = ?, Horario = ?, CostoAlumno = ?, Factura = ?   , Modalidad = ? , id_modalidad= ?, Documento=?, id_documento=?    WHERE Codigo_curso = ? ";
    const query = await pool.query(statment, data);
    res.status(200).json({ status: true });
  } catch (err) {
    if (err) console.log(err);
    res.status(400).json({ status: false, error: err });
  }
};

// agregar nueva matricula
cursos.matricula = async (req, res) => {
  if (!req.body.participante || !req.body.empresa || !req.body.curso)
    return res.status(400).json({ status: false, error: "empty_data" });
  const data = [req.body.participante, req.body.curso, req.body.empresa];
  console.log(data);
  try {
    await pool.query(
      "INSERT INTO union_matricula( id_participante ,id_curso , id_empresa)  VALUES(?,?, ? )",
      data
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

// Cambiar matricula curso
cursos.ChangeMatriculaCurso = async (req, res) => {
  if (!(req.body.participante || req.body.curso || req.body.tocurso))
    return res.status(400).json({ status: false, error: "VALUES_NOT_EXIST" });
  data = [req.body.tocurso, req.body.participante, req.body.curso];
  try {
    const query1 = pool.query(
      "UPDATE union_matricula SET id_curso= ?  WHERE id_participante = ? AND id_curso=?  ",
      data
    );
    const query2 = pool.query(
      "SELECT COUNT(*) AS c FROM   union_curso_empresa WHERE id_empresa = ? AND id_curso = ?  ",
      [req.body.empresa, req.body.tocurso]
    );

    const values = await Promise.all([query2, query1]);
    if (!values[0][0].c) {
      await pool.query(
        "INSERT INTO union_curso_empresa(id_empresa, id_curso) VALUES(?,?) ",
        [req.body.empresa, req.body.tocurso]
      );
    }
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
};

cursos.deleteMatricula = async (req, res) => {
  if (!(req.body.participante || req.body.curso))
    return res.status(400).json({ status: false, error: "VALUES_NOT_EXIST" });

  data = [req.body.participante, req.body.curso];
  try {
    const query = await pool.query(
      " DELETE FROM union_matricula WHERE id_participante=? AND id_curso = ? ",
      data
    );
    res.status(200).json({ status: true, query, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
};

cursos.getAtZipAllFiles = async (req, res) => {
  res.send("Hola mundo")
  // const { getFolderData } = require("../utils/s3");
  // const empresa = req.params.empresa;
  // const curso = req.params.curso;
  // if (!empresa || !curso)
  //   return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
  // try {
  //   await getFolderData(`app/cursos/${curso}/${empresa}/`);
  //   res.status(200).json({ status: true });
  // } catch (error) {
  //   res.status(400).json({ status: false });
  // }
};
cursos.dowloadZip = (req, res) => {
  res.contentType("application/zip");
  res.sendFile(__dirname + "/utils/archivos.zip", "pruebasssss");
};

module.exports = cursos;
