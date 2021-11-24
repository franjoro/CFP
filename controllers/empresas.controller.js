/* eslint-disable no-console */
// declarar variable a exportar
const empresas = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

const { getUserDataByToken } = require("../middlewares/auth");
const { sendEmail } = require("../utils/mailer");
const encriptador = require("../utils/decrypt");

// agregar nueva empresa
empresas.add = async (req, res) => {
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
    return res.json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

empresas.addAll = async (req,res) =>{
  // if(!res.body.name)
  //   return res.status(400).json({ status: false, error: "empty_name" });
  if(!req.body.address)
    return res.status(400).json({ status: false, error: "empty_address" });
  if(!req.body.economicAct)
  return res.status(400).json({ status: false, error: "empty_economic_activity" });
  if(!req.body.phone)
  return res.status(400).json({ status: false, error: "empty_phone" });
  if(!req.body.nit)
  return res.status(400).json({ status: false, error: "empty_nit" });
  if(!req.body.insaforp)
  return res.status(400).json({ status: false, error: "empty_insaforp" });
  if(!req.body.numberP)
  return res.status(400).json({ status: false, error: "empty_employer_number" });
  if(!req.body.numEmp)
  return res.status(400).json({ status: false, error: "empty_number_of_employees" });
  if(!req.body.email)
  return res.status(400).json({ status: false, error: "empty_email" });
  try {
    const data = [
      req.body.name,
      req.body.address,
      req.body.economicAct,
      req.body.phone,
      req.body.nit,
      req.body.insaforp,
      req.body.numP,
      req.body.numEmp,
      req.body.email,
    ];
    await pool.query(
      `INSERT INTO tb_empresa(Nombre, Direccion, Actividad_eco, Tel, NIT, Aportacion_insaforp, Num_Patronal, Num_Empleados, email, Estado) 
      VALUES (?,?,?,?,?,?,?,?,?,1)`,data
    );
    return(res.json({
      status: true
    }))
  } catch (error) {
    return res.status(400).json({ status: false, error });
    
  }
};

empresas.add2 = async (req,res) =>{
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
      `
      INSERT INTO tb_empresa(Nombre, Direccion, Actividad_eco, Tel, NIT, Aportacion_insaforp, Num_Patronal, Num_Empleados, email, Estado) 
      VALUES (?,?,?,?,?,?,?,?,?,1)
      `,
      data
    );
    return res.json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

// Editar empresa
empresas.editar_empresa = async (req, res) => {
  if (!req.body.name_edit)
    return res.status(400).json({ status: false, error: "empty_name" });
    const {nit_actual, nit_editar} = req.body;
  const data = [
    req.body.nit_editar,
    req.body.name_edit,
    req.body.actividad_edit,
    req.body.tel_edit,
    req.body.email_edit,
    req.body.nempleado_edit,
    req.body.aportacion_edit,
    req.body.direccion_edit,
    req.body.id_empresa,
  ];
  try {
    await pool.query(
      "UPDATE tb_empresa SET  NIT = ?  , Nombre = ? , Actividad_eco= ? , Tel = ?  , email = ? , Num_Empleados = ? , Aportacion_insaforp = ? , Direccion = ? WHERE id_empresa = ?",
      data
    );
    await pool.query("UPDATE tb_usuarios SET id_usuario =? WHERE id_usuario = ?" , [nit_editar, nit_actual]);
    return res.json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

// Cargar tabla
empresas.table = async (req, res) => {
  const status = req.params.estado;
  // validamos que venga un estado de empresas activo o inactivos
  if (!status) return res.status(400).json({ error: "Not_status" });
  // Hacemos consulta y devolvemos data
  try {
    const data = await pool.query(
      "SELECT * FROM tb_empresa WHERE Estado = ? ",
      [status]
    );
    return res.json({ data });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Cambiar estado de activo a inactivo
empresas.putEstado = async (req, res) => {
  // validar codigo y estado
  let estadoCambio = 1;
  if (req.body.estado == 1) estadoCambio = 0;
  const data = [estadoCambio, req.body.id];
  try {
    await pool.query(
      "UPDATE tb_empresa SET Estado= ? WHERE id_empresa = ? ",
      data
    );
    return res.json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

// Cargar y mandar informacion de contacto de cada empresa
empresas.renderContacto = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const EmpresaID = req.params.empresa;
  if (!EmpresaID) return res.status(400).json({ error: "EMPRESA_NOT_EXIST" });
  try {
    const query = await pool.query(
      `SELECT * FROM tb_empresa_contact WHERE id_empresa  = ?; SELECT Nombre,id_empresa AS id FROM tb_empresa WHERE id_empresa = ${EmpresaID}`,
      [EmpresaID]
    );
    const data = {
      empresa: query[1][0],
      contactos: query[0],
      data: usuario.data,
    };
    return res.render("admin/union_empresa_contacto", data);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Desvincular contacto y empresa
empresas.deleteContacto = async (req, res) => {
  const data = [req.body.contacto, req.body.empresa];
  try {
    await pool.query(
      "DELETE FROM tb_empresa_contact WHERE id_contacto  = ? AND id_empresa  = ?",
      data
    );
    return res.status(200);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Agregar contacto
empresas.contactoAdd = async (req, res) => {
  try {
    // Formatear data
    const data = [
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
    const data = [
      req.body.name_editar,
      req.body.tel_editar,
      req.body.cel_editar,
      req.body.puesto_editar,
      req.body.email_editar,
      req.body.id_contacto,
    ];

    // Ingresar si no existe
    await pool.query(
      "UPDATE tb_empresa_contact SET Nombre = ?, Telefono = ?, Celular = ?, Puesto = ? , Email = ? WHERE id_contacto = ?",
      data
    );
    return res.redirect(`/admin/empresas/contacto/${req.body.id_empresa}`);
  } catch (error) {
    console.log(error);
    // Error si no encuentra programa
    return res.status(400).send(error);
  }
};

empresas.actividades = async (req, res) => {
  const PostData = req.body.searchTerm;
  let query = `SELECT id , Nombre AS text FROM tb_actividad_economica order By Nombre LIMIT 25`;
  if (PostData)
    query = `SELECT id , Nombre AS text FROM tb_actividad_economica WHERE Nombre like '%${PostData}%' order By Nombre LIMIT 25`;
  try {
    const data = await pool.query(query);
    return res.json({ results: data });
  } catch (error) {
    return res.status(400).json({ error });
  }
};


empresas.ChangePassword = async (req, res) => {
  const {pass_new, nit_change} = req.body;
  const newPassword = await encriptador.encriptar(pass_new);
  try {
    const data = await pool.query("UPDATE tb_usuarios SET Password=? WHERE id_usuario = ? " , [newPassword, nit_change]);
    return res.status(200).json({ status: true, results: data });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

empresas.solicitudes = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    const query = await pool.query("SELECT * FROM tb_empresa WHERE Estado=3");
    return res.render("admin/solicitudes", { query, data: usuario.data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

empresas.Aprobarsolicitudes = async (req, res) => {
  const { id, nit, email } = req.body;
  if (!id || !nit)
    return res.status(400).json({ status: false, error: "PARAMS_NOT_VALID" });
  try {
    pool.query(
      "UPDATE tb_empresa SET Estado=1 WHERE id_empresa=?; UPDATE tb_usuarios SET Role=4 WHERE id_usuario=? ",
      [id, nit]
    );
    const html = `<h3>EMPRESA APROBADA</h3> <p>Hemos revisado tu información y se ha aprobado la solicitud de ingreso, ya puedes registrar tus cursos con las credenciales de acceso enviadas anteriormente. </p>
    <p>Puedes solicitar ayuda respondiendo este correo.</p>
    `;
    sendEmail(email, "SOLICITUD DE EMPRESA APROBADA", html);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = empresas;
