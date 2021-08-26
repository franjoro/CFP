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

  module.exports = updateHabil;