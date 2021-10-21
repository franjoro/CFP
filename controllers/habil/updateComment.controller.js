/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
// declarar variable a exportar
const updateComment = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../../models/db");

updateComment.update = async (req, res) => {
    const { comentario, estado, idSolicitud } = req.body;
    if (!comentario || !estado || !idSolicitud)
      return res
        .status(400)
        .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
    try {
      await pool.query(
        "UPDATE tb_habil_solicitudes SET comentario=?, estado=? WHERE id = ?",
        [comentario, estado, idSolicitud]
      );
      return res.status(200).json({ status: true });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  };



module.exports = updateComment;
