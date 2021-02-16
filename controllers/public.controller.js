//declarar variable a exportar
const public = {};
const pool = require("../models/db");

//Requerimos pool de base de datos si es necesario

public.main = async (req, res) => {
  let programa = req.params.id;
  //Aqui redireccionar a selector de programas
  if (!programa) return res.redirect("/public/");
  try {
    data = await pool.query(
      `SELECT  tb_programa.Nombre, tb_programa.ImgPortada FROM tb_programa WHERE id_programa= ? ;  
     SELECT Codigo_curso, Nombre, Horario FROM tb_cursos WHERE id_programa = ? AND Estado= 1 `,
      [req.params.id, programa]
    );
    if (!data.length) return res.redirect("/public/");
    data_format = { programa: data[0][0], cursos: data[1] };
    res.render("./public_empresas/empresa", data_format);
  } catch (error) {
    res.status(400).json({ error });
  }
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

public.getDataEmpresas = async (req, res) => {
  let param = req.body.param;
  if (!param)
    return res.status(400).json({ status: false, error: "PARAM_NOT_EXIST" });
  let query = await pool.query(
    "SELECT NIT, Aportacion_insaforp ,Num_Patronal, Num_Empleados FROM tb_empresa WHERE id_empresa = ? ;",
    param
  );
  res.status(200).json({ data: query[0], cantidad: query.length });
  try {
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

public.UpdateDataEmpresa = async (req, res) => {
  data = [
    req.body.nit,
    req.body.aportacion,
    req.body.patronal,
    req.body.num_empleados,
    req.body.id,
  ];
  try {
    pool.query(
      "UPDATE tb_empresa SET  NIT= ? , Aportacion_insaforp = ? , Num_Patronal = ?, Num_Empleados = ? WHERE id_empresa = ?  ",
      data
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};


public.CreateSolicitud  = async (req,res)=>{

}

module.exports = public;
