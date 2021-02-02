//declarar variable a exportar
const public = {};
const pool = require("../models/db");

//Requerimos pool de base de datos si es necesario

public.main = async (req, res) => {
  let programa = req.params.id;
  //Aqui redireccionar a selector de programas
  if (!programa) return res.redirect("/public/");
  data = await pool.query(
    "SELECT COUNT(*) AS cantidad, Nombre, ImgPortada  FROM tb_programa WHERE id_programa= ? ",
    req.params.id
  );
  if (!data[0].cantidad) return res.redirect("/public/");
  console.log(data[0].ImgPortada);
  res.render("./public_empresas/empresa", data[0]);
};

public.getEmpresas = async (req, res) => {
  let post_var = req.body.searchTerm,
    query = `SELECT id_empresa AS id, Nombre AS text FROM tb_empresa order By Nombre LIMIT 5`;
  if (post_var)
    query = `SELECT id_empresa AS id, Nombre AS text  FROM tb_empresa WHERE Nombre like '%${post_var}%' order By Nombre LIMIT 5`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = public;
