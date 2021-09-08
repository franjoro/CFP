// declarar variable a exportar
const dashboard = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../models/db");
const { getUserDataByToken } = require("../../../../../middlewares/auth");
// Requremimos utils encriptador

dashboard.main = async (req, res) => {

  const usuario = getUserDataByToken(req.cookies.token);
  try {
    // let sql;
    // if(idPrograma != undefined){
    //    sql =  `SELECT 
    //   Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
    //   Fechas as fechas FROM tb_cursos WHERE id_programa = ? and (Estado = 15 );`;
    // }else{
    //    sql =  `SELECT 
    //   Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
    //   Fechas as fechas FROM tb_cursos WHERE (Estado = 15 OR Estado = 5 )`;
    // }
    
    // const cursos = await pool.query(sql,[idPrograma]);
    // return res.render("index", {
    //   data: cursos,
    //   idPrograma
    // });
    return res.render('psychology/dashboard', {
      data: usuario.data,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

dashboard.form = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    return res.render('psychology/form', {
      data: usuario.data,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

dashboard.details = async (req, res) => {
  const { idStudent } = req.params;
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    return res.render('psychology/details', {
      data: usuario.data,
      idStudent: idStudent
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

dashboard.studentsTableWithoutCadre = async (req,res) =>{
  const sql = `
  SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
  REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id as id
  FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' );`;
  try {
    const data = await pool.query(sql);
    return res.json({ data });
  } catch (error) {
    return res.status(400).json(error);
  }
};

dashboard.studentsTableWithtCadre = async (req,res) =>{
  const sql = `
  SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
  REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id FROM tb_ec_alumno as A 
  INNER JOIN tb_psychology P on P.id_student = A.id 
  INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' )`;
  try {
    const data = await pool.query(sql);
    return res.json({ data });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// empresas.table = async (req, res) => {
//   const status = req.params.estado;
//   // validamos que venga un estado de empresas activo o inactivos
//   if (!status) return res.status(400).json({ error: "Not_status" });
//   // Hacemos consulta y devolvemos data
//   try {
//     const data = await pool.query(
//       "SELECT * FROM tb_empresa WHERE Estado = ? ",
//       [status]
//     );
//     return res.json({ data });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };



module.exports = dashboard;
