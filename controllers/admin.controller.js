/* eslint-disable no-console */
// declarar variable a exportar
const admin = {};
const { getUserDataByToken } = require("../middlewares/auth");
const pool = require("../models/db");

admin.main = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const query = await pool.query(
    "SELECT COUNT(*) AS cursos FROM tb_cursos; SELECT COUNT(*) AS participantes FROM tb_participante; SELECT COUNT(*) AS empresas FROM tb_empresa;  "
  );
  res.render("./admin/main", {
    data: usuario.data,
    cursos: query[0][0],
    participantes: query[1][0],
    empresas: query[2][0],
  });
};

// Render programa
admin.renderPrograma = (req, res) => {
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

admin.renderInstructor = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const query = await pool.query("SELECT * FROM tb_categoria_instructores");
  res.render("./admin/instructor", { query, data: usuario.data });
};

// Renderizar selector de programa por cursos
admin.renderCursos = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    let query;
    if (usuario.data.Role !== 1) {
      const text = `SELECT  tb_programa.id_programa AS id, tb_programa.Nombre , tb_programa.ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa INNER JOIN union_programa_usuario ON tb_programa.id_programa = union_programa_usuario.id_programa WHERE tb_programa.Estado = 1 AND union_programa_usuario.id_usuario = ?`;
      query = await pool.query(text, [usuario.data.usuario]);
    } else {
      const text = `SELECT  tb_programa.id_programa AS id, tb_programa.Nombre , tb_programa.ImgPortada, (SELECT COUNT(*) FROM tb_cursos WHERE id_programa = tb_programa.id_programa ) AS cantidad FROM tb_programa WHERE tb_programa.Estado = 1 `;
      query = await pool.query(text);
    }
    res.render("./admin/programas.cursos.ejs", { query, data: usuario.data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

admin.ec = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("./admin/ec", usuario);
};

module.exports = admin;
