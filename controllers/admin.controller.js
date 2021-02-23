// declarar variable a exportar
const admin = {};
// const mailer = require ('../utils/mailer');
const { getUserDataByToken } = require("../middlewares/auth");

admin.main = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  console.log(usuario);
  res.render("./admin/main", usuario);
};

// Render programa
admin.renderPrograma = (req, res, next) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("./admin/programa", usuario);
};
// Render Usuarios
admin.rendeUsuarios = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("./admin/usuarios", usuario);
};

admin.renderEmpresas = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("./admin/empresas", usuario);
};
admin.renderParticipantes = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("./admin/participantes", usuario);
};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
admin.renderInstructor = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const query = await pool.query("SELECT * FROM tb_categoria_instructores");
  res.render("./admin/instructor", { query, data: usuario.data });
};

// Renderizar selector de programa por cursos
admin.renderCursos = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
 

    let query ;
    if (usuario.data.Role != 1) {
      let text = `SELECT  tb_programa.id_programa AS id, tb_programa.Nombre , tb_programa.ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa INNER JOIN union_programa_usuario ON tb_programa.id_programa = union_programa_usuario.id_programa WHERE tb_programa.Estado = 1 AND union_programa_usuario.id_usuario = ?`;
      query = await pool.query(text, [usuario.data.usuario]);
    }else{
      let text = `SELECT  tb_programa.id_programa AS id, tb_programa.Nombre , tb_programa.ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa WHERE tb_programa.Estado = 1 `
      query = await pool.query(text);
    }
    res.render("./admin/programas.cursos.ejs", { query, data: usuario.data });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};

module.exports = admin;
