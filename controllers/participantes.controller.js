//declarar variable a exportar
const participantes = {};

//Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
const { isEmpty } = require("validator");

participantes.main = (req, res) => {
  res.render("./admin/participantes");
};

participantes.loadTable = async (req, res) => {
  const data = await pool.query("SELECT * FROM tb_participante");
  res.json({ data });
};

participantes.add = async (req, res) => {
  try {
    if (
      isEmpty(req.body.dui) ||
      isEmpty(req.body.name) ||
      isEmpty(req.body.email)
    )
      throw "Empty";
    const data = [
      req.body.dui,
      req.body.name,
      req.body.tel,
      req.body.email,
      req.body.genero,
      req.body.isss,
      req.body.cargo,
    ];
    statment =
      "INSERT INTO tb_participante(DUI,Nombre,Telefono,Email,Genero, ISSS, Cargo) VALUES(?,?,?,?,?,?,?)";
    query = await pool.query(statment, data);
    res.status(200).json({ status: true, data: query });
  } catch (err) {
    console.log(err)
    return res.status(400).json({ status: 400, err });
  }
};

participantes.edit = async (req, res) => {
  try {
    if (isEmpty(req.body.duiEdit)) throw "Empty";
    const data = [
      req.body.nameEdit,
      req.body.emailEdit,
      req.body.telEdit,
      req.body.duiEdit,
    ];
    statment =
      "UPDATE tb_participante SET Nombre = ? , Email = ?, Telefono = ?  WHERE DUI= ? ";
    let query = await pool.query(statment, data);
    res.json(query);
  } catch (err) {
    if (err.sqlState)
      return res.status(400).json({ error: "SQL ERROR", data: err.sqlMessage });
    res.status(400).json(err);
  }
};

participantes.getByDUI = async (req, res) => {
  const dui = req.params.dui;
  console.log(dui);
  if (!dui) return res.status(400).json({ status: false, error: "EMPTY_DUI" });
  try {
    const query = await pool.query(
      "SELECT * FROM tb_participante WHERE DUI= ? ",
      dui
    );
    if (query.length) {
      return res.status(200).json({ status: true, data: query });
    }
    {
      return res.status(404).json({ status: "NOT_EXIST" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = participantes;
