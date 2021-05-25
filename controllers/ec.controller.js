// declarar variable a exportar
const ec = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
const { getUserDataByToken } = require("../middlewares/auth");
const { Polly } = require("aws-sdk");

ec.main = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("ec/formulario", usuario);
};

ec.administrador = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    const carreras = pool.query("SELECT * FROM tb_ec_carrera"),
      grupos = pool.query(
        "SELECT tb_ec_grupo.id , tb_ec_carrera.Nombre AS carrera ,tb_ec_grupo.Nombre FROM tb_ec_grupo INNER JOIN tb_ec_carrera ON tb_ec_carrera.id = tb_ec_grupo.id_carrera"
      );
    const query = await Promise.all([carreras, grupos]);
    res.render("ec/administrador", {
      data: usuario.data,
      carreras: query[0],
      grupos: query[1],
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

ec.carreras = async (req, res) => {
  try {
    const carrera = await pool.query("SELECT * FROM tb_ec_carrera");
    res.json(carrera).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

ec.grupos = async (req, res) => {
  try {
    const { carrera } = req.params;
    const grupos = await pool.query(
      "SELECT * FROM tb_ec_grupo WHERE id_carrera = ?",
      [carrera]
    );
    res.json(grupos).status(200);
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

ec.form = async (req, res) => {
  try {
    const {
      carnet,
      grupo,
      global_json1,
      global_json2,
      global_json3,
      Nombres,
      Apellidos,
    } = req.body;

    const statment = `INSERT INTO tb_ec_alumno( carnet, Nombres, Apellidos ,id_grupo, json1, json2, json3) VALUES(  ' ${carnet} ', '${Nombres}' ,'${Apellidos}' ,${grupo}, '${JSON.stringify(
      global_json1
    )} ' , '${JSON.stringify(global_json2)} ' , ' ${JSON.stringify(
      global_json3
    )} ')    `;

    await pool.query(statment);

    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.addCarrera = async (req, res) => {
  const { nombrecarrera } = req.body;
  try {
    await pool.query("INSERT INTO tb_ec_carrera(Nombre) VALUES (?)", [
      nombrecarrera,
    ]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.addGrupo = async (req, res) => {
  const { nombregrupo, id_carrera } = req.body;
  try {
    await pool.query(
      "INSERT INTO tb_ec_grupo(Nombre , id_carrera) VALUES (?, ? )",
      [nombregrupo, id_carrera]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.tabla = async (req, res) => {
  const { idgrupo } = req.params;
  const data = await pool.query(
    `SELECT carnet ,  JSON_UNQUOTE( JSON_EXTRACT ( json1 , "$.Nombres" ) ) AS Nombres , JSON_UNQUOTE( JSON_EXTRACT ( json1 , "$.Apellidos" ) ) AS Apellidos, JSON_UNQUOTE( JSON_EXTRACT ( json1 , "$.Sexo" ) ) AS Sexo    FROM tb_ec_alumno WHERE id_grupo = ?`,
    [idgrupo]
  );
  res.json({ data });
};

ec.administradorModelo = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const { idCarrera } = req.params;
  try {
    let carrera = pool.query(
      "SELECT Nombre FROM tb_ec_carrera WHERE id = ?",
      idCarrera
    );
    let modulos = pool.query(
      "SELECT id , Nombre, fechaInicio, fechaFin FROM tb_ec_modulos WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo FROM tb_ec_unidades WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    const query = await Promise.all([carrera, modulos, unidades]);
    const getMonth = (number) => {
      if (number == "01") return "Enero";
      if (number == "02") return "Febrero";
      if (number == "03") return "Marzo";
      if (number == "04") return "Abril";
      if (number == "05") return "Mayo";
      if (number == "06") return "Junio";
      if (number == "07") return "Julio";
      if (number == "08") return "Agosto";
      if (number == "09") return "Septiembre";
      if (number == "10") return "Octubre";
      if (number == "11") return "Noviembre";
      if (number == "12") return "Diciembre";
    };
    carrera = query[0][0].Nombre;
    modulos = query[1];
    unidades = query[2];
    const datosModeloOrdenado = [];
    modulos.forEach((element, id) => {
      const arrModelo = [];
      const obj = {};
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          arrModelo.push(unidad.Nombre);
        }
      });
      obj["modelo"] = element.Nombre;
      obj["unidades"] = arrModelo;
      obj["idModelo"] = element.id;
      obj["fechaInicio"] = getMonth(element.fechaInicio);
      obj["fechaFin"] = getMonth(element.fechaFin);
      datosModeloOrdenado[id] = obj;
    });
    res.render("ec/ModeloCurso", {
      data: usuario.data,
      datos: datosModeloOrdenado,
      carrera,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};
module.exports = ec;
