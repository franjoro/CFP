/*@author: Osmaro Bonilla
  @description: Delete Psychology row in tb_psychology with id_psychology
  @date: 13/09/2021*/
// declare variables to export
const deleteDetails = {};
// 
const pool = require("../../../../../../models/db");
// We require a database pool

deleteDetails.deletePsychology = async (req, res) => {
  //We collect the req.body
  const data = [
    req.body.idPsychology,
  ];
  try {
    //We write the query sql 
    const sql = `DELETE FROM tb_psychology WHERE id_psychology = ?`;
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

deleteDetails.deleteStrategyPsychology = async (req, res) =>{
  //We collect the req.body
  const data = [
    req.body.idPsychology,
    req.body.idStrategy
  ];
  try {
    //We write the query sql 
    const sql = `DELETE FROM tb_strategies_psychology WHERE id_psychology = ? AND id_strategy = ?`;
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

deleteDetails.deleteReasonPsychology = async(req,res) =>{
  //We collect the req.body
  const data = [
    req.body.idPsychology,
    req.body.idReason
  ];
  try {
    //We write the query sql 
    const sql = `DELETE FROM tb_reasons_psychology WHERE id_psychology = ? AND id_reason = ?`;
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
module.exports = deleteDetails;
