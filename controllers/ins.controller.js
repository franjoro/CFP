//declarar variable a exportar
const instructor = {};

//Requerimos pool de base de datos si es necesario
const pool = require('../models/db')

//const mailer = require ('../utils/mailer');

//Tabla principal de instructores
instructor.table = async (req, res) => {
    let status = req.params.estado;
    //validamos que venga un estado de instructor activo o inactivos
    if (!status) return res.status(400).json({ error: "Not_status" });
    //Hacemos consulta y devolvemos data
    try {
      let data = await pool.query("SELECT * FROM tb_instructor WHERE Estado = ? ", [
        status,
      ]);
      res.json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }
}
//Cambiar estado de activo a inactivo
instructor.changeEstado = async (req, res) => {
    //validar codigo y estado
    let estadoCambio = 1;
    if (req.body.estado == 1) estadoCambio = 0;
    let data = [estadoCambio, req.body.dui];
    try {
      let query = await pool.query(
        "UPDATE tb_instructor SET Estado= ? WHERE DUI = ? ",
        data
      );
      res.json({ status: true });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  };

//agregar nueva empresa
instructor.add = async (req, res, next) => {
    if (!req.body.name || ! req.body.DUI)
      return res.status(400).json({ status: false, error: "empty_name" });
    let data = [
      req.body.DUI,
      req.body.name,
      req.body.tel,
      req.body.email,
    ];
    try {
      await pool.query(
        "INSERT INTO tb_instructor(DUI,Nombre,Email,Telefono,Estado) VALUES(?,?,?,?,1)",
        data
      );
      res.json({ status: true });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  };

  instructor.editar = async (req, res, next) => {
    if (!req.body.name_editar  || !req.body.DUI_editar)
      return res.status(400).json({ status: false, error: "empty_name" });
    let data = [
      req.body.name_editar,
      req.body.email_editar,
      req.body.tel_editar,
      req.body.DUI_editar
    ];
    try {
      await pool.query(
        "UPDATE tb_instructor SET Nombre = ?, Email = ? , Telefono = ? WHERE DUI = ?",
        data
      );
      res.json({ status: true });
    } catch (error) {
      if (!req.body.name) return res.status(400).json({ status: false, error });
    }
  };

module.exports = instructor;
