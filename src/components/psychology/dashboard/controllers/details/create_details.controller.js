// declarar variable a exportar
const createDetails = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../../models/db");
const { getUserDataByToken } = require("../../../../../../middlewares/auth");
// Requremimos utils encriptador

createDetails.addDetail = async (req, res) => {
 const {idStudent} = req.params;
 try {
   return res.json({idStudent: idStudent});
 } catch (error) {
  console.log(error);
  return res.status(400).json({ status: false, error });
 }
};


module.exports = createDetails;
