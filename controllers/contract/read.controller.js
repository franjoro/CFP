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
    const sql = `SELECT id, name, description, start_date, finish_date, create_date FROM tb_contracts`;
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
