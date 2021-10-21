/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
// declarar variable a exportar
const cursos = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
const { getUserDataByToken } = require("../middlewares/auth");
const { sendEmail } = require("../utils/mailer");
const {
  upload,
  getFolderData,
  uploadImageCursos,
  getFolderDataCurso,
  deleteObject,
} = require("../utils/s3");

// Renderizar pantalla de cursos ya con programa
cursos.cursos = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    const queries = [];
    queries.push(
      pool.query(
        "SELECT CONCAT(tb_cursos.Codigo_curso,' - ', tb_cursos.Nombre) AS Nombre, tb_instructor.Nombre AS instructor , tb_cursos.Horario , tb_cursos.Codigo_curso , (SELECT COUNT(*) FROM union_matricula WHERE id_curso = tb_cursos.Codigo_curso ) AS cantidadAlumnos FROM `tb_cursos` INNER JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado != 0  AND tb_cursos.Estado != 5  ORDER BY tb_cursos.Codigo_curso ASC",
        [programa]
      )
    );

    queries.push(
      pool.query(
        "SELECT CONCAT(Nombre,' - ',Horario) AS Nombre , Codigo_curso, (SELECT COUNT(*) FROM union_matricula WHERE id_curso = tb_cursos.Codigo_curso ) AS cantidadAlumnos , (SELECT COUNT(*) FROM union_curso_empresa WHERE id_curso = tb_cursos.Codigo_curso ) AS cantidadEmpresas , Estado FROM tb_cursos WHERE (Estado = 5 || Estado = 15)  AND id_programa=?",
        [programa]
      )
    );
    const query = await Promise.all(queries);
    return res.render("./admin/cursos", {
      datos: query[0],
      programa,
      data: usuario.data,
      oferta: query[1],
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

cursos.cursosFinalizados = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const programa = req.params.id;
  if (!programa) return res.status(400).json({ error: "ID_NOT_EXIST" });
  try {
    const query = await pool.query(
      "SELECT COUNT(*) AS c FROM tb_programa WHERE id_programa = ?",
      [programa]
    );
    if (!query[0].c)
      return res.status(400).json({ error: "PROGRAM_NOT_EXIST" });
    const datos = await pool.query(
      "SELECT `tb_cursos`.`Codigo_curso`, `tb_cursos`.`Nombre`, `tb_instructor`.`Nombre` AS instructor, `tb_cursos`.`Orden`, `tb_cursos`.`Agrupacion` FROM `tb_cursos` LEFT JOIN `tb_instructor` ON `tb_cursos`.`id_instructor` = `tb_instructor`.`DUI` WHERE tb_cursos.id_programa = ? AND tb_cursos.Estado = 0",
      [programa]
    );
    return res.render("./admin/cursos_finalizados", {
      datos,
      programa,
      data: usuario.data,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

cursos.curso_detalle = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);

  // VALIDAR si la peticion trae un codigo de curso
  const curso = req.params.id;
  const { programa, tipo } = req.params;
  if (!curso) return res.status(400).json({ error: "ID_NOT_EXIST" });
  if (!(tipo === "curso" || tipo === "oferta"))
    return res.status(400).json({ error: "TIPO_NOT_VALID" });

  try {


    const queryString = `
        SELECT DISTINCT par.DUI as dui, REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit , 
        par.Nombre as nombre, par.Telefono as telefono,par.Email as email, par.Genero as sexo, sol.id as idSolicitud, 
        sol.estado as estadoSolicitud, sol.Codigo_curso as id_curso FROM tb_habil_solicitudes AS sol 
        INNER JOIN tb_participante par on par.DUI = sol.documento WHERE sol.Codigo_curso = ? 
        AND (sol.estado = 0 OR sol.estado = 3)`;
        //Agregamos la consulta de queryString con su parametro
    const query = await pool.query(queryString,[curso]);
    // Traer de bd Las empresas que estan matriculadas al curso y los alumnos asociados
    let typeQuery;
    if (tipo === "curso") {
      typeQuery = `SELECT  tb_cursos . Codigo_curso ,  tb_cursos . Nombre ,  tb_cursos . Date_inicio ,  tb_cursos . Date_fin ,  tb_cursos . Orden ,  tb_cursos . Agrupacion ,  tb_cursos . Horario ,  tb_cursos . CostoAlumno ,  tb_cursos . Factura ,  tb_instructor . Nombre AS instructor ,  tb_instructor . DUI AS Instructor_id , tb_cursos.Modalidad , tb_cursos.id_modalidad, tb_cursos.Documento , tb_cursos.id_documento , tb_cursos.Fechas   FROM  tb_instructor  INNER JOIN  tb_cursos  ON  tb_cursos . id_instructor  =  tb_instructor . DUI  WHERE tb_cursos . Codigo_curso  = ?  GROUP BY tb_cursos.Codigo_curso`;
    }
    if (tipo === "oferta") {
      typeQuery = `SELECT CONCAT(Nombre,' - ',Horario) AS Nombre , Codigo_curso  , Date_inicio , Horario, Fechas, Nombre AS CursoName , CostoAlumno AS costo , horas  FROM tb_cursos WHERE Codigo_curso  = ?`;
    }
    const statment = `SELECT tb_empresa.Nombre,tb_empresa.id_empresa AS codigo_empresa, union_curso_empresa.comentario AS comentario  FROM tb_empresa INNER JOIN union_curso_empresa ON tb_empresa.id_empresa = union_curso_empresa.id_empresa WHERE union_curso_empresa.id_curso = ? GROUP BY tb_empresa.id_empresa ORDER BY union_curso_empresa.id_union ;SELECT tb_participante.DUI, tb_participante.Nombre, tb_participante.Telefono, tb_participante.Email, union_matricula.id_empresa , union_matricula.id_matricula FROM tb_participante  INNER JOIN union_matricula ON union_matricula.id_participante = tb_participante.DUI WHERE union_matricula.id_curso = ? ; ${typeQuery}`;

    const empresas = await pool.query(statment, [curso, curso, curso]);
    // Formatear la informacion para que existan los alumnos adentro de un objeto de empresas
    const datos = [];
    empresas[0].forEach((element, i) => {
      const AlumnosArray = [];
      empresas[1].forEach((alumno) => {
        if (alumno.id_empresa === element.codigo_empresa) {
          AlumnosArray.push(alumno);
        }
      });
      datos[i] = {
        id: element.codigo_empresa,
        Empresa: element.Nombre,
        Alumnos: AlumnosArray,
        comentario: element.comentario,
        id_matricula: element.id_union,
      };
      i += 1;
    });
    // Responder
    return res.render("./admin/curso_detalle", {
      datos,
      curso: empresas[2][0],
      programa,
      cAlumnos: empresas[1].length,
      data: usuario.data,
      tipo,
      query
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};



cursos.getInstructores = async (req, res) => {
  const PostVar = req.body.searchTerm;
  let query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor order By Nombre LIMIT 5`;
  if (PostVar)
    query = `SELECT DUI AS id, Nombre AS text FROM tb_instructor WHERE Nombre like '%${PostVar}%' order By Nombre LIMIT 5`;
  try {
    const data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

cursos.getCursosCategoria = async (req, res) => {
  const { categoria } = req.params;
  const query = `SELECT Codigo_curso  AS id, CONCAT(Codigo_curso,' // ',Nombre, ' // '  , Horario) AS text FROM tb_cursos  WHERE id_programa = ${categoria}  AND Estado != 0 AND Estado != 5`;
  try {
    const data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// agregar nuevo curso
cursos.add = async (req, res) => {
  if (!req.body.programa || !req.body.codigo_curso || !req.body.nombre)
    return res.status(400).json({ status: false, error: "empty_programa" });

  const data = [
    req.body.codigo_curso,
    req.body.nombre,
    req.body.date_inicio,
    req.body.date_fin,
    req.body.agrupacion,
    req.body.orden,
    req.body.horario,
    req.body.fechas,
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
    await pool.query(
      "INSERT INTO tb_cursos(Codigo_curso, Nombre, Date_inicio, Date_fin, Agrupacion, Orden, Horario, Fechas, CostoAlumno, Factura, id_instructor, id_programa,   Modalidad , id_modalidad , Documento, id_documento,    Estado)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)",
      data
    );
    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};
// Agregar oferta
cursos.oferta = async (req, res) => {
  if (!req.body.programa || !req.body.codigo_curso || !req.body.nombre)
    return res.status(400).json({ status: false, error: "empty_params" });
  const data = [
    req.body.codigo_curso,
    req.body.nombre,
    req.body.fechaL,
    req.body.horario,
    req.body.fechas,
    req.body.costo,
    req.body.programa,
    req.body.role,
    req.body.horas
  ];
  try {
    await pool.query(
      "INSERT INTO tb_cursos(Codigo_curso, Nombre, Date_inicio,  Horario, Fechas ,  CostoAlumno, id_programa, Estado, horas)  VALUES(?,?,?,?,?,?,?,?,?)",
      data
    );
    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

// Agregar oferta No cotizantes
cursos.ofertaNoctz = async (req, res) => {
  if (!req.body.programa || !req.body.codigo_curso || !req.body.nombre)
    return res.status(400).json({ status: false, error: "empty_params" });
  const {codigo_curso , role, nombre , horario, programa, cupo } = req.body;
  try {
    await pool.query(
      "INSERT INTO tb_cursos(Codigo_curso, Nombre, Horario, id_programa, Estado, cupo )  VALUES(?,?,?,?,?,?)",
      [codigo_curso , nombre,  horario , programa , role, cupo]
    );
    return res.json({ status: true });
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
    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.deleteEmpresaCurso = async (req, res) => {
  if (!req.body.id_empresa || !req.body.id_curso)
    return res.json({ status: false, error: "EMPTY_PARAMS" });
  try {
    const data = [
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
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

cursos.delteCursoOferta = async (req, res) => {
  if (!req.body.id_curso)
    return res.json({ status: false, error: "EMPTY_PARAMS" });
  try {
    await pool.query(`DELETE FROM tb_cursos WHERE Codigo_curso  = ?   `, [
      req.body.id_curso,
    ]);
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

cursos.editOferta = async (req, res) => {
  try {
    if (!req.body.id) throw new Error("EMPTY_ID");
    const data = [
      req.body.fecha,
      req.body.horario,
      req.body.date_inicio_oferta,
      req.body.horas,
      req.body.id,
    ];
    await pool.query(
      "UPDATE tb_cursos SET Fechas = ? , Horario = ? , Date_inicio= ?, horas = ? WHERE Codigo_curso = ?",
      data
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    if (err) console.log(err);
    return res.status(400).json({ status: false, error: err });
  }
};

cursos.edit = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) throw new Error("EMPTY_ID");
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
      req.body.instructor,
      req.body.id,
    ];
    
    const statment =
      "UPDATE tb_cursos SET Nombre = ? ,Date_inicio = ?, Date_fin = ?,  Agrupacion =  ? , Orden = ?, Horario = ?, CostoAlumno = ?, Factura = ?   , Modalidad = ? , id_modalidad= ?, Documento=?, id_documento=? , id_instructor = ?   WHERE Codigo_curso = ? ";
    await pool.query(statment, data);
    return res.status(200).json({ status: true });
  } catch (err) {
    if (err) console.log(err);
    return res.status(400).json({ status: false, error: err });
  }
};

cursos.finalizarCurso = async (req, res) => {
  try {
    const {id_curso} = req.body;
    if (!id_curso) throw new Error("EMPTY_ID");
    const statment =
      "UPDATE tb_cursos SET Estado = 0  WHERE Codigo_curso = ? ";
    await pool.query(statment, id_curso);
    return res.status(200).json({ status: true });
  } catch (err) {
    if (err) console.log(err);
    return res.status(400).json({ status: false, error: err });
  }
};

// agregar nueva matricula
cursos.matricula = async (req, res) => {
  if (!req.body.participante || !req.body.empresa || !req.body.curso)
    return res.status(400).json({ status: false, error: "empty_data" });
  const data = [req.body.participante, req.body.curso, req.body.empresa];
  try {
    await pool.query(
      "INSERT INTO union_matricula( id_participante ,id_curso , id_empresa)  VALUES(?,?, ? )",
      data
    );
    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

// Cambiar matricula curso
cursos.ChangeMatriculaCurso = async (req, res) => {
  if (!(req.body.participante || req.body.curso || req.body.tocurso))
    return res.status(400).json({ status: false, error: "VALUES_NOT_EXIST" });
  const data = [req.body.tocurso, req.body.participante, req.body.curso];
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
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.MigrarTodo = async (req, res) => {
  const { curso, empresa, tocurso } = req.body;
  if (!curso || !empresa || !tocurso)
    return res.status(400).json({ status: false, error: "VALUES_NOT_EXIST" });
  try {
    const queries = [];
    const data = [tocurso, curso, empresa];
    // curso empresa
    queries.push(
      pool.query(
        "UPDATE union_curso_empresa SET id_curso = ?  WHERE id_curso = ? AND id_empresa=?  ",
        data
      )
    );
    // union matricula
    queries.push(
      pool.query(
        "UPDATE union_matricula SET id_curso = ? WHERE  id_curso = ? AND id_empresa= ?  ",
        data
      )
    );
    // archivos
    queries.push(
      pool.query(
        "UPDATE archivo_empresa_curso SET id_curso = ? WHERE  id_curso = ? AND id_empresa= ?  ",
        data
      )
    );
    const query = await Promise.all(queries);
    return res.status(200).json({ status: true, query });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.deleteMatricula = async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({ status: false, error: "VALUES_NOT_EXIST" });

  try {
    const query = await pool.query(
      " DELETE FROM union_matricula WHERE id_matricula= ?  ",
      [id]
    );
    return res.status(200).json({ status: true, query });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.getAtZipAllFiles = async (req, res) => {
  const query = await pool.query(
    "SELECT  s3key, Role  FROM archivo_empresa_curso WHERE id_empresa=? AND id_curso = ? AND Role != 0",
    [req.body.empresa, req.body.curso]
  );
  if (!query)
    return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
  try {
    await getFolderData(``, query);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false });
  }
};

cursos.getZipCurso = async (req, res) => {
  const { curso } = req.body;

  const queryS3Keys = await pool.query(
    "SELECT  archivo_empresa_curso.s3key, archivo_empresa_curso.Role , tb_empresa.Nombre FROM archivo_empresa_curso  INNER JOIN tb_empresa ON tb_empresa.id_empresa = archivo_empresa_curso.id_empresa WHERE  id_curso = ? AND Role != 0",
    [curso]
  );

  if (!queryS3Keys)
    return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
  try {
    await getFolderDataCurso(``, queryS3Keys);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false });
  }
};

cursos.dowloadZip = (req, res) => {
  res.contentType("application/zip");
  res.sendFile("/utils/archivos.zip", { root: "./" });
};

cursos.dowloadZipCurso = (req, res) => {
  res.contentType("application/zip");
  res.sendFile("/utils/archivos_de_curso.zip", { root: "./" });
};

cursos.GestorDeDocumentos = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const { curso, empresa, programa } = req.params;
  const promesas = [];
  if (!curso || !empresa || !programa)
    return res.status(400).json({ status: false, error: "EMPTY_PARAMS" });
  promesas.push(
    pool.query(
      "SELECT id, s3key, Role, isEditable  FROM archivo_empresa_curso WHERE id_empresa=? AND id_curso = ? AND Role != 0 ORDER BY Role ASC",
      [empresa, curso]
    )
  );
  promesas.push(
    pool.query("SELECT Nombre FROM tb_empresa WHERE id_empresa = ? ", [empresa])
  );
  promesas.push(
    pool.query(
      "SELECT tb_participante.Nombre AS Nombre , tb_participante.DUI AS DUI , tb_participante.Email , tb_participante.ISSS, tb_participante.Cargo FROM tb_participante INNER JOIN union_matricula ON union_matricula.id_participante = tb_participante.DUI WHERE id_curso = ? AND id_empresa = ?",
      [curso, empresa]
    )
  );

  promesas.push(
    pool.query(
      "SELECT comentario FROM union_curso_empresa WHERE id_empresa  = ? AND id_curso = ? ",
      [empresa, curso]
    )
  );
  const promisesResult = await Promise.all(promesas);
  const query = [promisesResult[0], promisesResult[1]];
  const alumnos = promisesResult[2];
  const comentario = promisesResult[3][0].comentario;
  return res.render("admin/gestor_documentos", {
    data: usuario.data,
    query,
    curso,
    programa,
    empresa,
    alumnos,
    comentario,
    tipo: req.params.tipo,
  });
};

cursos.UpdatePermisos = async (req, res) => {
  const { valor, id } = req.body;
  if (!valor || !id)
    return res
      .status(400)
      .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
  try {
    await pool.query(
      "UPDATE archivo_empresa_curso SET isEditable = ? WHERE id = ? ",
      [valor, id]
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

cursos.UpdateComment = async (req, res) => {
  const { valor, id_curso, id_empresa } = req.body;
  if (!valor || !id_curso || !id_empresa)
    return res
      .status(400)
      .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
  try {
    await pool.query(
      "UPDATE union_curso_empresa SET comentario = ? WHERE id_curso  = ? AND id_empresa=? ",
      [valor, id_curso, id_empresa]
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

cursos.sendNotificacion = async (req, res) => {
  const { id_empresa, id_curso } = req.body;
  const promesas = [
    pool.query("SELECT email FROM tb_empresa WHERE id_empresa = ? ", [
      id_empresa,
    ]),
    pool.query("SELECT Nombre FROM tb_cursos WHERE Codigo_curso  = ? ", [
      id_curso,
    ]),
  ];
  const promisesResult = await Promise.all(promesas);
  const email = promisesResult[0][0].email;
  const curso = promisesResult[1][0].Nombre;
  const html = `<h3>REVISIÓN EXITOSA DE DOCUMENTOS: Sus documentos han sido recibidos satisfactoriamente; estaremos notificando los inicios correspondientes durante la semana previa a la fecha de inicio programada. <br> Notificación correspondiente al curso : <b>${curso}</b></h3> `;
  sendEmail(email, `DOCUMENTACIÓN APROBADA EN CURSO: ${curso}`, html);
  res.json({ promisesResult });
};

const formatExtension = (ext)=>{
  ext = ext[ext.length - 1].toLowerCase();
  if(ext == "jpg") ext = "jpeg";
  return ext;
 };

cursos.archivos = async (req, res) => {
  if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
  const { empresa, curso, archivo, id } = req.body;
  let ext = formatExtension(req.files.file.name.split("."));
  const fileContent = Buffer.from(req.files.file.data, "binary");
  const promesas = [];
  try {
    promesas.push(upload(fileContent, Date.now(), ext, empresa, archivo));
    promesas.push(
      pool.query(
        "UPDATE archivo_empresa_curso SET Role=0, isEditable=0  WHERE id=? ",
        [id]
      )
    );
    let key = await Promise.all(promesas);
    key = key[0].key;
    await pool.query(
      "INSERT INTO archivo_empresa_curso(s3Key, Role, id_empresa, id_curso, isEditable) VALUES(?,?,?,?,0)",
      [key, archivo, empresa, curso]
    );
    res.status(200).json({ status: true });

    const correos = await pool.query(
      "SELECT tb_usuarios.Email FROM tb_usuarios INNER JOIN union_programa_usuario ON union_programa_usuario.id_usuario = tb_usuarios.id_usuario WHERE union_programa_usuario.id_programa=? ",
      [req.body.programa]
    );
    const data = await pool.query(
      "SELECT Nombre, Horario FROM tb_cursos WHERE Codigo_curso = ? ; SELECT Nombre FROM tb_empresa WHERE id_empresa = ? ",
      [curso, empresa]
    );
    correos.forEach((element) => {
      const html = `<h1>Notificación automática de sistema Razón: EDICIÓN DE ARCHIVO EN CURSO : ${curso}</h1> <p> Nombre: ${data[0][0].Nombre}  Horario: ${data[0][0].Horario} </p>  <p> Empresa: ${data[1][0].Nombre}  </p>`;
      sendEmail(
        element.Email,
        `EDICIÓN DE ARCHIVO REALIZADA EN CURSO: ${curso}`,
        html
      );
    });
    return 0;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.ArchivoExtra = async (req, res) => {
  if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
  const { empresa, curso } = req.body;
  const ext = req.files.file.name.split(".")[1];
  const fileContent = Buffer.from(req.files.file.data, "binary");
  try {
    let key = await upload(fileContent, Date.now(), ext, empresa, "6");
    key = key.key;
    await pool.query(
      "INSERT INTO archivo_empresa_curso(s3Key, Role, id_empresa, id_curso, isEditable) VALUES(?,6,?,?,0)",
      [key, empresa, curso]
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.NuevoCursoHabil = async (req, res) => {
  if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
  const {
    codigo,
    nombre,
    inicio,
    fin,
    horarios,
    costo,
    descripcion,
    requisitos,
    mytextarea,
    programa,
  } = req.body;
  // console.log(req.body);
  const ext = req.files.file.name.split(".")[1];
  const fileContent = Buffer.from(req.files.file.data, "binary");
  const queryStatement = `INSERT INTO tb_cursos(Codigo_curso, Nombre,Date_inicio,Date_fin, Horario, CostoAlumno, id_programa, Estado) 
  VALUES(?,?,?,?,?,?,?,15) `;
  try {
    const imageQuery = uploadImageCursos(fileContent, ext, codigo);
    const queryData = pool.query(queryStatement, [
      codigo,
      nombre,
      inicio,
      fin,
      horarios,
      costo,
      programa,
    ]);

    const groupPromise = await Promise.all([imageQuery, queryData]);
    const { Location } = groupPromise[0];

    if (!Location) throw new Error("ERROR_IMAGE");
    const detalleCurso = await pool.query(
      "INSERT INTO tb_habil_cursos(Descripcion, Requisitos, S3keyimage, Modules , Codigo_curso) VALUES(?,?,?,?,?)",
      [descripcion, requisitos, Location, mytextarea, codigo]
    );
    return res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

cursos.form = async (req, res) => {
  const data = getUserDataByToken(req.cookies.token);
  const { programa } = req.params;
  res.render("./habil/addoferta.ejs", { data: data.data, programa });
};

cursos.deleteFiles3 = async (req, res) => {
  const { key } = req.body;
  try {
    const deleteStatus = deleteObject(key);
    const deleteSql = pool.query(
      "DELETE FROM archivo_empresa_curso WHERE s3key = ? ",
      [key]
    );
    const promisesStatus = await Promise.all([deleteStatus, deleteSql]);
    res.json({ status: true, promisesStatus }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

module.exports = cursos;
