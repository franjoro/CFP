// declarar variable a exportar
const dashboard = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../models/db");
// Requremimos utils encriptador

dashboard.main = async (req, res) => {
  const {idPrograma} = req.params;
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
    return res.render('psychology/dashboard');
  } catch (error) {
    return res.status(400).json(error);
  }
};



module.exports = dashboard;
