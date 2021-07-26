// API DE REPORTES CFP
// FORMATOS PARA UTILS EXCEL TITULOS: const titulos = ["String", "String", "String"];
// FORMATOS PARA UTILS EXCEL DATOS:const datos = [{key: 'value' } , {key: 'value' }  ]

// declarar variable a exportar
const reportes = {};
// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
// Llamamos al creador de excel que admite dos parametros para titulos y datos
const { CreateNewExcel } = require("../utils/excel");
//Llamamos otra ruta para poder crear excel
const { createNewExcelContenidos } = require("../utils/excel/notas_contenidos");
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

reportes.directorioEmpresas = async (req, res) => {
  const statment = `SELECT Nombre, Direccion , Tel , email FROM tb_empresa`;
  try {
    const datos = await pool.query(statment);
    const titulos = [
      "Nombre",
      "Dirección",
      "Tel",
      "Email"
    ];
    await CreateNewExcel(titulos,datos);
    res.status(200).json({status:true, path:"/reportes/download"});
  } catch (error) {
    res.send("ERROR API: " + error);
  }
};

reportes.ec = async (req, res) => {
  try {
    const query = await pool.query("SELECT carnet, json1 , json2, json3 FROM tb_ec_alumno WHERE carnet = 'ATEI01821'");
    res.json(query);
    console.log(JSON.parse(query[0].json1));
  } catch (error) {
    res.send("ERROR API: " + error);
  }
};

reportes.NotasContenidoss = async (req, res) =>{
  try {
    const excel = await createNewExcelContenidos();
    console.log(excel);
    if(excel.status == true) return res.json({status : true});
    res.json({status : false});
  } catch (error) {
      res.send("ERROR API: " + error);
  }
}

module.exports = reportes;
