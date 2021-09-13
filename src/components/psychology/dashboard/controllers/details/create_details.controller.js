/*@author: Osmaro Bonilla
  @description: Created Psychology row in tb_psychology with id_student, date, statud = 0
  @date: 8/09/2021*/
// declare variables to export
const createDetails = {};
// We require to database pool
const pool = require("../../../../../../models/db");
//Created arrow function 
createDetails.addDetail = async (req, res) => {
  //We collect the req.body
  const data = [
    req.body.idStudent,
    req.body.fullDate
  ];
  //New format DATETIME
  try {
    //We write the query sql 
    const sql = `INSERT INTO tb_psychology(id_student, date, status) VALUES (?,?,0)`;
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

createDetails.addStrategyPsychology = async(req, res)=>{
  //We collect the req.body
  const data = [
    req.body.idPsychology,
    req.body.idStrategy
  ];
  try {
    //We write the query sql 
    const sql = `INSERT INTO tb_strategies_psychology(id_psychology, id_strategy) VALUES (?,?)`;
    //execute the query
    await pool.query(sql,data);
    //return status
    return res.json({status: true});
  } catch (error) {
    //print the error in console
    console.log(error);
    //return status false
    return res.status(400).json({ status: false, error });
  }
};
createDetails.addReasonPsychology = async(req,res)=>{
  //We collect the req.body
  const data = [
    req.body.idPsychology,
    req.body.idReason
  ];
  try {
    //We write the query sql 
    const sql = `INSERT INTO tb_reasons_psychology(id_psychology, id_reason) VALUES (?,?)`;
    //execute the query
    await pool.query(sql,data);
    //return status
    return res.json({status: true});
  } catch (error) {
    //print the error in console
    console.log(error);
    //return status false
    return res.status(400).json({ status: false, error });
  }
};
module.exports = createDetails;
