// declarar variable a exportar
const empresas = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

// agregar nueva empresa
empresas.add = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ status: false, error: "empty_name" });
  const data = [
    req.body.name,
    req.body.direccion,
    req.body.actividad,
    req.body.tel,
  ];
  try {
    await pool.query(
      "INSERT INTO tb_empresa(Nombre,Direccion,Actividad_eco,Tel,Estado) VALUES(?,?,?,?,1)",
      data
    );
    res.json({ status: true });
  } catch (error) {
    if (!req.body.name) return res.status(400).json({ status: false, error });
  }
};

// Editar empresa
empresas.editar_empresa = async (req, res, next) => {
  if (!req.body.name_edit)
    return res.status(400).json({ status: false, error: "empty_name" });
  const data = [
    req.body.name_edit,
    req.body.direccion_edit,
    req.body.actividad_edit,
    req.body.tel_edit,
    req.body.id_empresa,
  ];
  try {
    await pool.query(
      "UPDATE tb_empresa SET Nombre = ?, Direccion = ? , Actividad_eco= ? , Tel = ? WHERE id_empresa = ?",
      data
    );
    res.json({ status: true });
  } catch (error) {
    if (!req.body.name) return res.status(400).json({ status: false, error });
  }
};

// Cargar tabla
empresas.table = async (req, res) => {
  const status = req.params.estado;
  // validamos que venga un estado de empresas activo o inactivos
  if (!status) return res.status(400).json({ error: "Not_status" });
  // Hacemos consulta y devolvemos data
  try {
    const data = await pool.query("SELECT Nombre, Direccion, Tel, Estado, id_empresa FROM tb_empresa WHERE Estado = ? ", [
      status,
    ]);
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Cambiar estado de activo a inactivo
empresas.putEstado = async (req, res) => {
  // validar codigo y estado
  let estadoCambio = 1;
  if (req.body.estado == 1) estadoCambio = 0;
  const data = [estadoCambio, req.body.id];
  try {
    const query = await pool.query(
      "UPDATE tb_empresa SET Estado= ? WHERE id_empresa = ? ",
      data
    );
    res.json({ status: true });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
};

// Cargar y mandar informacion de contacto de cada empresa
empresas.renderContacto = async (req, res) => {
  const { getUserDataByToken } = require("../middlewares/auth"); 
  const usuario = getUserDataByToken(req.cookies.token);
  const empresa_id = req.params.empresa;
  if (!empresa_id) return res.status(400).json({ error: "EMPRESA_NOT_EXIST" });
  try {
    const query = await pool.query(
      `SELECT * FROM tb_empresa_contact WHERE id_empresa  = ?; SELECT Nombre,id_empresa AS id FROM tb_empresa WHERE id_empresa = ${empresa_id}`,
      [empresa_id]
    );
    const data = { empresa: query[1][0], contactos: query[0]    ,  data: usuario.data };
    res.render("admin/union_empresa_contacto", data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Desvincular contacto y empresa
empresas.deleteContacto = async (req, res) => {
  data = [req.body.contacto, req.body.empresa];
  try {
    await pool.query(
      "DELETE FROM tb_empresa_contact WHERE id_contacto  = ? AND id_empresa  = ?",
      data
    );
    res.status(200);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Agregar contacto
empresas.contactoAdd = async (req, res) => {
  try {
    // Formatear data
    data = [
      req.body.name,
      req.body.tel,
      req.body.cel,
      req.body.puesto,
      req.body.email,
      req.body.id_empresa,
    ];

    // Ingresar si no existe
    await pool.query(
      "INSERT INTO tb_empresa_contact(Nombre,Telefono,Celular,Puesto,Email,id_empresa) VALUES(?,?,?,?,?,?)",
      data
    );
    // Retornar
    return res.redirect(`/admin/empresas/contacto/${req.body.id_empresa}`);
  } catch (error) {
    console.log(error);
    // Error si no encuentra programa
    return res.status(400).send(error);
  }
};

// Editar información de contacto
empresas.contactoEditar = async (req, res) => {
  try {
    // Formatear data
    data = [
      req.body.name_editar,
      req.body.tel_editar,
      req.body.cel_editar,
      req.body.puesto_editar,
      req.body.email_editar,
      req.body.id_contacto,
    ];

    // Ingresar si no existe
    const querry = await pool.query(
      "UPDATE tb_empresa_contact SET Nombre = ?, Telefono = ?, Celular = ?, Puesto = ? , Email = ? WHERE id_contacto = ?",
      data
    );
    // Retornar

    return res.redirect(`/admin/empresas/contacto/${req.body.id_empresa}`);
  } catch (error) {
    console.log(error);
    // Error si no encuentra programa
    return res.status(400).send(error);
  }
};


empresas.actividades = async (req,res ) =>{
  const post_var = req.body.searchTerm;
    let query = `SELECT id , Nombre AS text FROM tb_actividad_economica order By Nombre LIMIT 25`;
  if (post_var)
    query = `SELECT id , Nombre AS text FROM tb_actividad_economica WHERE Nombre like '%${post_var}%' order By Nombre LIMIT 25`;
  try {
    data = await pool.query(query);
    res.json({ results: data });
  } catch (error) {
    res.status(400).json({ error });
  }
}


module.exports = empresas;
