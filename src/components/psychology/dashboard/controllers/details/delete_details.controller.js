/*@author: Osmaro Bonilla
  @description: Delete Psychology row in tb_psychology with id_psychology
  @date: 13/09/2021*/
// declare variables to export
const deleteDetails = {};
// 
const pool = require("../../../../../../models/db");
// We require a database pool

deleteDetails.deletePsychology = async (req, res) => {
    console.log(req.body.idPsychology);
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
module.exports = deleteDetails;
