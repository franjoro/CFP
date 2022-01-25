/*
name: render.controller
description: render controller for employment relationship
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 03/11/2021 for OsmaroBonilla
last-update: 03/11/2021 for OsmaroBonilla
*/
  const pool = require("../../models/db");
  const { getUserDataByToken } = require("../../middlewares/auth");
  const renderController = {};
  
 //#region 
 renderController.menu = async (req, res) => {
    //  use for permissions management 
    const usuario = getUserDataByToken(req.cookies.token);
      try {
        //   response
        return res.render("./employment_relationship/menu", {
            data: usuario.data,

        });
      } catch (error) {
          return res.status(400).json(error);
      }
  };

renderController.documentation = async (req,res) =>{
  // use for mermissions menagemente
  const {idStudent} = req.params;
  const usuario = getUserDataByToken(req.cookies.token);
  try {

    //Writte sql query
    const sql = `SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera,
                REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
                REPLACE(JSON_EXTRACT(json1, '$.Escolaridad'), '"','' ) as nivel_academico, 
                REPLACE(JSON_EXTRACT(json1, '$.EstadoF'), '"','' ) as estado_civil, 
                REPLACE(JSON_EXTRACT(json1, '$.TelMovilPropio'), '"','' ) as telefono_movil, 
                REPLACE(JSON_EXTRACT(json1, '$.Correo'), '"','' ) as correo, 
                REPLACE(JSON_EXTRACT(json1, '$.direccion'), '"','' ) as direccion, 
                REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id 
                FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) WHERE A.id = ?`;
    //We collect params 
    const params = [idStudent];
    //we execute pool query
    const StudentData = await pool.query(sql, params);
    const studentDato = {
      carnet: StudentData[0].carnet,
      nombres: StudentData[0].Nombres,
      apellidos: StudentData[0].Apellidos,
      carrera: StudentData[0].nombreCarrera,
      genero: StudentData[0].genero,
      nivel_academico: StudentData[0].nivel_academico,
      estado_civil: StudentData[0].estado_civil,
      telefono_movil: StudentData[0].telefono_movil,
      correo: StudentData[0].correo,
      direccion: StudentData[0].direccion,
      fechaNac: StudentData[0].fechaNac,
  };
    return res.render("./employment_relationship/documentation",{
      data: usuario.data,
      idStudent: idStudent,
      studentDato: studentDato,
    });
  } catch (error) {
    // return error
    return res.status(400).json(error);
  }
};

renderController.detail = async(req, res) =>{
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    const {idStudent} = req.params;
    return res.render("./employment_relationship/details",{
      data: usuario.data,
      idStudent: idStudent
    });
  } catch (error) {
      return res.status(400).json(error);
  }
};
  
  module.exports = renderController;