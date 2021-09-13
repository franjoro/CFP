/*@author: Osmaro Bonilla
  @description: Delete Psychology row in tb_psychology with id_psychology
  @date: 6/09/2021*/
// declare variables to export
const dashboard = {};
//We require to database pool
const pool = require("../../../../../models/db");
//We require middlewares
const { getUserDataByToken } = require("../../../../../middlewares/auth");

//We create arrow function main and later render 'psychology/dashboard'
dashboard.main = async (req, res) => {
  //We collect req.cookies.token usuario
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    //We return render
    return res.render('psychology/dashboard', {
      data: usuario.data,
    });
  } catch (error) {
    //We return error
    return res.status(400).json(error);
  }
};
//We create arrow function form and later render 'psychology/form'
dashboard.form = async (req, res) => {
  //We collect req.cookies.token
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    //We return render
    return res.render('psychology/form', {
      data: usuario.data,
    });
  } catch (error) {
    //We return error
    return res.status(400).json(error);
  }
};
//We create arrow details form and later render 'psychology/details'
dashboard.details = async (req, res) => {
  //We collect req.params
  const { idStudent } = req.params;
  //We collect req.cookies.token
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    //We return render
    return res.render('psychology/details', {
      data: usuario.data,
      idStudent: idStudent
    });
  } catch (error) {
    //We return error
    return res.status(400).json(error);
  }
};
//We create arrow studentsTableWithoutCadre and return data with table
dashboard.studentsTableWithoutCadre = async (req,res) =>{
  //We writte sql query
  const sql = `
  SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
  REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id as id
  FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' );`;
  try {
    //We excecute pool query
    const data = await pool.query(sql);
    //return data
    return res.json({ data });
  } catch (error) {
    //we return json error
    return res.status(400).json(error);
  }
};
//We create arrow studentsTableWithtCadre and return data with table
dashboard.studentsTableWithtCadre = async (req,res) =>{
  //we writte sql query
  const sql = `
  SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
  REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id FROM tb_ec_alumno as A 
  INNER JOIN tb_psychology P on P.id_student = A.id 
  INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' )`;
  try {
    //we execute pool query
    const data = await pool.query(sql);
    //we return json data
    return res.json({ data });
  } catch (error) {
    //we return json error
    return res.status(400).json(error);
  }
};
module.exports = dashboard;
