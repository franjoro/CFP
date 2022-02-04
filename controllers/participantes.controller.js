/* eslint-disable no-console */
// declarar variable a exportar
const participantes = {};

// Requerimos pool de base de datos si es necesario
const { isEmpty } = require("validator");
const pool = require("../models/db");

participantes.main = (req, res) => {
  res.render("./admin/participantes");
};

participantes.loadTable = async (req, res) => {
  const data = await pool.query("SELECT * FROM tb_participante");
  res.json({ data });
};

//sql query add participant in tb_participante 
participantes.add = async (req, res) => {
  try {
    if (
      isEmpty(req.body.dui) ||
      isEmpty(req.body.name) ||
      isEmpty(req.body.email) ||
      isEmpty(req.body.correlativo_planilla)
    )
      throw new Error("Empty");
    const data = [
      req.body.dui,
      req.body.name,
      req.body.tel,
      req.body.email,
      req.body.genero,
      req.body.isss,
      req.body.cargo,
      req.body.correlativo_planilla,
    ];
    const statment =
      "INSERT INTO tb_participante(DUI,Nombre,Telefono,Email,Genero, ISSS, Cargo, correlativo_planilla) VALUES(?,?,?,?,?,?,?,?)";
    const query = await pool.query(statment, data);
    return res.status(200).json({ status: true, data: query });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 400, err });
  }
};

participantes.edit = async (req, res) => {
  try {
    if (isEmpty(req.body.duiEdit)) throw new Error("Empty");
    const data = [
      req.body.duiNew, 
      req.body.nameEdit, 
      req.body.emailEdit, 
      req.body.telEdit, 
      req.body.correlativo_planilla, 
      req.body.isss_edit, 
      req.body.cargo_edit,
      req.body.genero_edit, 
      req.body.duiEdit, 
    ];
    const statment =
      "UPDATE tb_participante SET dui = ? , Nombre = ? , Email = ?, Telefono = ?, correlativo_planilla = ?, ISSS = ?, Cargo = ?, Genero = ? WHERE DUI= ?";
    const query = await pool.query(statment, data);
    return res.json(query);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

participantes.getByDUI = async (req, res) => {
  const { dui } = req.params;
  if (!dui) return res.status(400).json({ status: false, error: "EMPTY_DUI" });
  try {
    const query = await pool.query(
      "SELECT * FROM tb_participante WHERE DUI= ? ",
      dui
    );
    if (query.length) {
      return res.status(200).json({ status: true, data: query });
    }
    return res.status(404).json({ status: "NOT_EXIST" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = participantes;
