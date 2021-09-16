/*@author: Osmaro Bonilla
  @description: Update Psychology row in tb_psychology with date, next_date and id_psychology
  @date: 10/09/2021*/
// declare variables to export
const updateDetails = {};
// We require to database pool
const pool = require("../../../../../../models/db");
// Created arrow function
updateDetails.updatePsychology = async (req, res) => {
  //We collect the req.body
  
  const data = [
    req.body.date,
    req.body.nextDate,
    req.body.idPsychology,
  ];
  if(req.body.nextDate == ''){
    data.req.body.nextDate = null;
  }

  //New format DATETIME
  try {
    //We write the query sql s
    const sql = `UPDATE tb_psychology SET  date = ?, next_date = ? WHERE id_psychology = ?`;
    //execute the query
    await pool.query(sql,data);
    //return status
    return res.json({status: true});
  }catch (error) {
    //print the error in console
    console.log(error);
    //return status false
    return res.status(400).json({ status: false, error , data: data});
  }
};

updateDetails.updatePsychologyDetail = async(req,res) =>{
  //We collect the req.body
  const data = [
    req.body.results,
    req.body.nextDate,
    req.body.observations,
    req.body.idPsychology
  ];
  console.log(data)
  //New format DATETIME
  try {
    //We write the query sql s
    const sql =`UPDATE tb_psychology SET  results = ?, next_date = ?, observations = ? WHERE id_psychology = ?`;
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

updateDetails.updateStatusPsychology = async(req,res) =>{
  //We collect the req.body
  const data = [
    req.body.status,
    req.body.idPsychology
  ];
  //New format DATETIME
  try {
    //We write the query sql s
    const sql =`UPDATE tb_psychology SET status = ? WHERE id_psychology = ?`;
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
module.exports = updateDetails;
