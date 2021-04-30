// declarar variable a exportar
const usuarios = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
// Requremimos utils encriptador
const encriptador = require("../utils/decrypt");
// Requerimos validator

usuarios.addUsuario = async (req, res) => {
  try {
    const data = [
      req.body.user,
      req.body.name,
      req.body.email,
      await encriptador.encriptar(req.body.paswordinput),
      req.body.role,
    ];
    console.log(data);
    const statment =
      "INSERT INTO tb_usuarios(id_usuario,Nombre,Email,Password,Role,Estado) VALUES(?,?,?,?,?,1)";
    const query = await pool.query(statment, data);
    return res.json(query.insertId);
  } catch (err) {
    if (err.sqlState)
      return res.status(400).json({ error: "SQL ERROR", data: err.sqlMessage });
    return res.json(err);
  }
};

usuarios.editUsuario = async (req, res) => {
  try {
    if (
      !(
        isEmail(req.body.emailEdit) ||
        isEmpty(req.body.nameEdit) ||
        isEmpty(req.body.RoleEdit)
      )
    )
      throw new Error("Empty" );
    const data = [
      req.body.nameEdit,
      req.body.emailEdit,
      await encriptador.encriptar(req.body.password),
      req.body.RoleEdit,
      req.body.EstadoEdit,
      req.body.userEdit,
    ];
  const statment =
      "UPDATE tb_usuarios SET Nombre = ? , Email = ?, Password = ?,  Role= ?, Estado = ? WHERE id_usuario= ? ";
    const query = await pool.query(statment, data);
    return res.json(query);
  } catch (err) {
    if (err.sqlState)
      return res.status(400).json({ error: "SQL ERROR", data: err.sqlMessage });
   return res.status(400).json(err);
  }
};

usuarios.loadTable = async (req, res) => {
  const data = await pool.query(
    "SELECT id_usuario,Nombre,Email,Role,Estado FROM tb_usuarios WHERE id_usuario !=  'god' AND (Role = 1 OR Role = 0 OR Role = 5) "
  );
  res.json({ data });
};

module.exports = usuarios;
