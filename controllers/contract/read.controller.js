// name: read.controller.js (In module contract)
// description: read and render funciont
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 01/03/2022 for Osmaro Bonilla
// last update: 01/03/2022 for Osmaro Bonilla

// import dependencies
const { getUserDataByToken } = require("../../middlewares/auth");
const pool = require("../../models/db");
const moment = require('moment');
// create constructor json
const read = {};


read.read = async (req,res) =>{
  try {
    const sql = `SELECT CON.id, COU.Nombre AS course, INS.Nombre AS teacher, name, start_date, 
    finish_date FROM tb_contracts as CON INNER JOIN tb_cursos as COU ON CON.id_course = COU.Codigo_curso 
    INNER JOIN tb_instructor AS INS ON INS.DUI = COU.id_instructor;`;
    const data = await pool.query(sql, []);
    // format date in data
    data.map((item)=>{
      item.start_date = moment(item.start_date).format('DD/MM/YYYY');
      item.create_date = moment(item.create_date).format('DD/MM/YYYY');
      item.finish_date = moment(item.finish_date).format('DD/MM/YYYY');
    })
    // console.log(newData);
    // console.log(data);
    return res.json({
      data
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

read.readCourses = async(req,res) =>{
  try {
    const { searchTerm } = req.body;
    let sql;
    if (searchTerm) {
      sql = `SELECT CONCAT(C.Nombre, '-', C.Codigo_curso) AS text, C.Codigo_curso AS id from tb_cursos AS C 
      INNER JOIN tb_instructor AS I ON C.id_instructor = I.DUI WHERE C.Nombre LIKE '%${searchTerm}%' OR C.Codigo_curso LIKE '%${searchTerm}%';`;
    } else {
      sql = `SELECT CONCAT(C.Nombre, '-', C.Codigo_curso) AS text, C.Codigo_curso AS id from tb_cursos AS C 
      INNER JOIN tb_instructor AS I ON C.id_instructor = I.DUI;`;
    }
    const data = await pool.query(sql,[]);
    return res.json({ results: data });
  } catch (error) {
    return res.status(400).json(error);
  }
};

read.readPresbyter = async (req,res)=>{
  try {
    const { searchTerm } = req.body;
    let sql;
    if (searchTerm) {
      sql = `SELECT name as text, id  FROM tb_presbyters WHERE name LIKE '%${searchTerm}%';`;
    } else {
      sql = `SELECT name as text, id  FROM tb_presbyters;`;
    }
    const data = await pool.query(sql,[]);
    return res.json({ results: data });
  } catch (error) {
    return res.status(400).json(error);
  }
};

read.renderMenu = (req,res)=>{
  const usuario = getUserDataByToken(req.cookies.token);
    try {
        return res.render("contract/menu",{
            data: usuario.data 
        });
      } catch (error) {
          return res.status(400).json(error);
      }


};

module.exports = read;
