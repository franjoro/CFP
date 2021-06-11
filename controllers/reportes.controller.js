// API DE REPORTES CFP
// FORMATOS PARA UTILS EXCEL TITULOS: const titulos = ["String", "String", "String"];
// FORMATOS PARA UTILS EXCEL DATOS:const datos = [{key: 'value' } , {key: 'value' }  ]

// declarar variable a exportar
const reportes = {};
// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
// Llamamos al creador de excel que admite dos parametros para titulos y datos
const { CreateNewExcel } = require("../utils/excel");
const cursos = require("./cursos.controller");

reportes.main = (req, res) => {
  res.send("WELCOME_TO_API_REPORTS");
};

reportes.descargar = (req, res) => {
  const path = `./public/files/tmp/excel.xlsx`;
  res.contentType("application/vnd.ms-excel ");
  res.download(path, `Reporte.xlsx`);
};

reportes.ParticipantesEnCursos = async (req, res) => {
  const { curso } = req.params;
  const statment = `SELECT union_matricula.id_curso, tb_empresa.Nombre AS Empresa, tb_participante.DUI, tb_participante.Nombre, tb_participante.Telefono , tb_participante.Email, tb_participante.Genero, tb_participante.ISSS , tb_participante.Cargo FROM union_matricula INNER JOIN tb_participante ON union_matricula.id_participante = tb_participante.DUI INNER JOIN tb_empresa ON union_matricula.id_empresa = tb_empresa.id_empresa WHERE union_matricula.id_curso  = ?   `;
  try {
    const datos = await pool.query(statment, [curso]);
    const titulos = [
      "Curso",
      "Empresa",
      "DUI",
      "Nombre",
      "Tél.",
      "Email",
      "Genero",
      "ISSS",
      "Cargo",
    ];
    await CreateNewExcel(titulos,datos);
    res.status(200).json({status:true, path:"/reportes/download"});

  } catch (error) {
    res.send("ERROR API: " + error);
  }
};

module.exports = reportes;
