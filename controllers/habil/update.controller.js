/*@author: Osmaro Bonilla
  @description: Controlador de modificaciones para ofertas controller
  @date: 18/08/2021*/
  const pool = require("../../models/db");
  const updateHabil = {};


  /*@description: Recibe los res.body y realiza el update correspondiente a oferta habil
  @param: req, res, req.body.nombre, req.body.horario, req.body.idOferta = id*/
  updateHabil.editOferta = async (req, res) => {
    try {
      if (!req.body.idCurso) throw new Error("EMPTY_ID");
      const data = [
        req.body.nameEditOferta,
        req.body.horario,
        req.body.idCurso,
      ];
      await pool.query(
        "UPDATE tb_cursos SET Nombre = ? , Horario = ?  WHERE Codigo_curso = ?",
        data
      );
      return res.status(200).json({ status: true });
    } catch (error) {
      if (error) console.log(error);
      return res.status(400).json({ status: false, error: error });
    }
  };

  updateHabil.cambiarCurso = async (req, res) =>{
    try {
      const codigoCurso = req.body.cmbCurso;
      const idSolicitud = req.body.txtIdSolicitud;
      const query =`UPDATE tb_habil_solicitudes SET Codigo_curso = ? WHERE id = ?`;
      await pool.query(query,[codigoCurso, idSolicitud]);
      return res.status(200).json({ status: true });
    } catch (error) {
      if (error) console.log(error);
      return res.status(400).json({ status: false, error: error });
    }
  };

  updateHabil.updateSolicitud = async(req,res) =>{
    try {
      
      const { global_json1, global_json2, global_json3 , idSolicitud} = req.body;
      console.log(global_json1);
      console.log(global_json2);
      console.log(global_json3);
      console.log(idSolicitud);
      const query =`UPDATE tb_habil_solicitudes SET json1 = ?, json2 = ?, json3 = ? WHERE id = ?`;
      await pool.query(query,[JSON.stringify(global_json1), JSON.stringify(global_json2), JSON.stringify(global_json3), idSolicitud]);
      return res.status(200).json({ status: true });
    } catch (error) {
      if (error) console.log(error);
      return res.status(400).json({ status: false, error: error });
    }
  };
  module.exports = updateHabil;