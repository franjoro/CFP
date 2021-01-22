//declarar variable a exportar
const usuarios = {};
const { query } = require("../models/db");
//Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
//Requremimos utils encriptador
const encriptador = require("../utils/decrypt");
//Requerimos validator
const { isEmail, isEmpty } = require("validator");

usuarios.addUsuario = async (req, res) => {
  try {
    if (
      !(
        isEmail(req.body.email) ||
        isEmpty(req.body.user) ||
        isEmpty(req.body.name) ||
        isEmpty(req.body.role)
      )
    )
      throw "Empty";
    const data = [
      req.body.user,
      req.body.name,
      req.body.email,
      await encriptador.encriptar("Ricaldone_21"),
      req.body.role,
    ];
    statment =
      "INSERT INTO tb_usuarios(id_usuario,Nombre,Email,Password,Role,Estado) VALUES(?,?,?,?,?,1)";
    query = await pool.query(statment, data);
    res.json(query.insertId);
  } catch (err) {
    if (err.sqlState)
      return res.status(400).json({ error: "SQL ERROR", data: err.sqlMessage });
    res.json(err);
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
      throw "Empty";
    const data = [
      req.body.nameEdit,
      req.body.emailEdit,
      await encriptador.encriptar(req.body.password),
      req.body.RoleEdit,
      req.body.EstadoEdit,
      req.body.userEdit,
    ];
    statment =
      "UPDATE tb_usuarios SET Nombre = ? , Email = ?, Password = ?,  Role= ?, Estado = ? WHERE id_usuario= ? ";
    let query = await pool.query(statment, data);
    res.json(query);
  } catch (err) {
    if (err.sqlState)
      return res.status(400).json({ error: "SQL ERROR", data: err.sqlMessage });
    res.status(400).json(err);
  }
};

usuarios.loadTable = async (req, res) => {
  const data = await pool.query(
    "SELECT id_usuario,Nombre,Email,Role,Estado FROM tb_usuarios"
  );
  res.json({ data });
};

module.exports = usuarios;
