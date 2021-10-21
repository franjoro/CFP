const updateStatusRequest = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../../models/db");

updateStatusRequest.update = async (req, res) => {
    const { status, idRequest } = req.body;
    if (!status || !idRequest)
      return res
        .status(400)
        .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
    try {
      await pool.query(
        "UPDATE tb_habil_solicitudes SET estado=? WHERE id = ?",
        [status, idRequest]
      );
      return res.status(200).json({ status: true });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  };



module.exports = updateStatusRequest;
