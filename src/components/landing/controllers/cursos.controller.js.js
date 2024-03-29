// declarar variable a exportar
const cursos = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../models/db");
// Requremimos utils encriptador

cursos.main = async (req, res) => {
  const {idPrograma} = req.params;
  try {
    let sql;
    if(idPrograma != undefined){
       sql =  `SELECT 
      Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
      Fechas as fechas FROM tb_cursos WHERE id_programa = ? and (Estado = 15 );`;
    }else{
       sql =  `SELECT 
      Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
      Fechas as fechas FROM tb_cursos WHERE (Estado = 15 OR Estado = 5 ) AND (id_programa = 32 OR id_programa = 31 OR id_programa = 28)`;
    }
    
    const cursos = await pool.query(sql,[idPrograma]);
    return res.render("index", {
      data: cursos,
      idPrograma
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};



module.exports = cursos;
