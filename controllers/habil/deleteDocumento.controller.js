/*@author: Osmaro Bonilla
  @description: Se eliminan el documento seleccionado en aws y en la base de datos
  @date: 20/08/2021*/
const deleteDocumentos = {};
// Requerimos pool de base de datos si es necesario
const pool = require("../../models/db");
const { deleteObject} = require("../../utils/s3");
/*@description: Elimina el documento seleccionado con su key 
  @see: Se utiliza en cliente de habil
  @param: req, res, req.coockies.token*/
deleteDocumentos.deleteFiles3 = async (req, res) => {
    const { key } = req.body;
    try {
      const deleteStatus = deleteObject(key);
      const deleteSql = pool.query(
        "DELETE FROM tb_habil_documentos WHERE s3key =  ? ",
        [key]
      );
      const promisesStatus = await Promise.all([deleteStatus, deleteSql]);
      res.json({ status: true, promisesStatus }).status(200);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error });
    }
};


module.exports = deleteDocumentos;
