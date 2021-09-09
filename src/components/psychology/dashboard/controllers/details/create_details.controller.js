// declarar variable a exportar
const createDetails = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../../models/db");
const { getUserDataByToken } = require("../../../../../../middlewares/auth");
// Requremimos utils encriptador

createDetails.addDetail = async (req, res) => {
  const {idStudent} = req.params;
  //We collect the req.body
  const data = [
    req.body.idStudent,
    req.body.fullDate
  ];
  //New format DATETIME
  try {
    //We write the query sql 
    const sql = `INSERT INTO tb_psychology(id_student, date, status) VALUES (?,?)`;
    //execute the query
    await pool.query(sql,data);
    //return status
    return res.json({status: true});
  }catch (error) {
    //print the error in console
    console.log(error);
    //return status false
    return res.status(400).json({ status: false, error });
  }
};


module.exports = createDetails;
