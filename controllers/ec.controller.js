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
  const year = new Date().getFullYear();
  const lastday = function (m, n) {
    return `${new Date(year, m, 0).getDate()}/${m}/${year + n}`;
  };
  try {
    const {
      insertId,
    } = await pool.query(
      "INSERT INTO tb_ec_grupo(Nombre , id_carrera) VALUES (?, ? )",
      [nombregrupo, id_carrera]
    );
    let modulos = pool.query(
      "SELECT id , Nombre, fechaInicio, fechaFin FROM tb_ec_modulos WHERE isModel = 1 AND  idCarrera = ?",
      id_carrera
    );
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo FROM tb_ec_unidades WHERE isModel = 1 AND  idCarrera = ?",
      id_carrera
    );
    const query = await Promise.all([modulos, unidades]);
    modulos = query[0];
    unidades = query[1];
    const datosModeloOrdenado = [];
    modulos.forEach((element, id) => {
      const arrModelo = [];
      const obj = {};
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          let obj = {};
          obj["UnidadName"] = unidad.Nombre;
          obj["idUnidad"] = unidad.id;
          obj["Inicio"] = unidad.fechaInicio;
          obj["Fin"] = unidad.fechaFin;
          arrModelo.push(obj);
        }
      });
      obj["modelo"] = element.Nombre;
      obj["unidades"] = arrModelo;
      obj["idModelo"] = element.id;
      obj["fechaInicio"] = element.fechaInicio;
      obj["fechaFin"] = element.fechaFin;
      datosModeloOrdenado[id] = obj;
    });
    const promesasUnidades = [];
    datosModeloOrdenado.forEach(async (element) => {
      let FechaFin = lastday(`${element.fechaFin}`, 0);
      if (element.fechaInicio >= element.fechaFin) {
        FechaFin = lastday(`${element.fechaFin}`, 1);
      }
      let FechaInicio = `01/${element.fechaInicio}/${year}`;
      const idM = await pool.query(
        "INSERT INTO tb_ec_modulos(Nombre,fechaInicio,fechaFin,Estado,isModel,idCarrera,idGrupo) VALUES(?,?,?,1,0,?,?)",
        [element.modelo, FechaInicio, FechaFin, id_carrera, insertId]
      );
      element.unidades.forEach((e) => {
        promesasUnidades.push(
          pool.query(
            "INSERT INTO tb_ec_unidades(Nombre, isModel, idModulo, idCarrera, idGrupo)  VALUES(?,0,?,?,?)",
            [e.UnidadName, idM.insertId, id_carrera, insertId]
          )
        );
      });
    });
    await Promise.all(promesasUnidades);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addModelo = async (req, res) => {
  const { Nombre, Inicio, Fin, idCarrera, horas } = req.body;
  try {
    await pool.query(
      "INSERT INTO tb_ec_modulos(Nombre, fechaInicio, fechaFin, horas,  Estado, isModel, idCarrera) VALUES (?, ? ,? , ?, 1 , 1 ,? )",
      [Nombre, Inicio, Fin, horas, idCarrera]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addUnidad = async (req, res) => {
  const { Nombre, idModulo, idCarrera , horas } = req.body;
  try {
    await pool.query(
      "INSERT INTO tb_ec_unidades(Nombre, horas , isModel, idModulo, idCarrera) VALUES (?, ?, 1 ,? ,?)",
      [Nombre, horas, idModulo, idCarrera]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.deleteModelo = async (req, res) => {
  const { idModelo } = req.body;
  try {
    await pool.query("DELETE FROM tb_ec_modulos WHERE id = ? ", [idModelo]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.deleteUnidad = async (req, res) => {
  const { idUnidad } = req.body;
  try {
    await pool.query("DELETE FROM tb_ec_unidades WHERE id = ? ", [idUnidad]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.editUnidad = async (req, res) => {
  const { idUnidad, unidad  , horas} = req.body;
  try {
    await pool.query("UPDATE tb_ec_unidades SET Nombre=? , horas=? WHERE id=?  ", [
      unidad,
      horas,
      idUnidad,
    ]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.editModulo = async (req, res) => {
  const { idModulo, Nombre, Inicio, Fin , horas } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_modulos SET Nombre=?  , fechaInicio=?, fechaFin = ?, horas = ?  WHERE id=?  ",
      [Nombre, Inicio, Fin, horas, idModulo]
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
    `SELECT carnet ,  Nombres , Apellidos FROM tb_ec_alumno WHERE id_grupo = ?`,
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
      "SELECT id , Nombre, fechaInicio, fechaFin, horas FROM tb_ec_modulos WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo , horas FROM tb_ec_unidades WHERE isModel = 1 AND  idCarrera = ?",
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
      let totalHorasUnidades = 0;
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          let obj = {};
          obj["UnidadName"] = unidad.Nombre;
          obj["UnidadID"] = unidad.id;
          obj["horas"] = unidad.horas;
          arrModelo.push(obj);
          totalHorasUnidades = totalHorasUnidades+unidad.horas
        }
      });
      obj["modelo"] = element.Nombre;
      obj["unidades"] = arrModelo;
      obj["idModelo"] = element.id;
      obj["fechaInicio"] = getMonth(element.fechaInicio);
      obj["fechaFin"] = getMonth(element.fechaFin);
      obj["horas"] = element.horas;
      obj["totalHorasUnidades"] = totalHorasUnidades;
      datosModeloOrdenado[id] = obj;
    });
    res.render("ec/ModeloCurso", {
      data: usuario.data,
      datos: datosModeloOrdenado,
      carrera,
      carreraID: idCarrera,
    });
    // res.json( {
    //   datos: datosModeloOrdenado,
    //   carrera,
    //   carreraID: idCarrera,
    // })
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};
ec.administradorCronogramaVigente = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const { idGrupo } = req.params;
  try {
    let carrera = pool.query(
      "SELECT tb_ec_grupo.Nombre AS Grupo , tb_ec_carrera.Nombre AS Carrera FROM tb_ec_grupo INNER JOIN tb_ec_carrera ON tb_ec_carrera.id = tb_ec_grupo.id_carrera WHERE tb_ec_grupo.id = ?",
      idGrupo
    );
    let modulos = pool.query(
      "SELECT id , Nombre, fechaInicio, fechaFin FROM tb_ec_modulos WHERE isModel = 0 AND  idGrupo = ?",
      idGrupo
    );
    let unidades = pool.query(
      "SELECT tb_ec_unidades.id , tb_ec_unidades.Nombre, tb_ec_unidades.idModulo , tb_ec_unidades.fechaInicio, tb_ec_unidades.fechaFin, tb_ec_unidades.Estado , (SELECT Nombre FROM tb_usuarios WHERE id_usuario = tb_ec_unidades.id_usuario) AS Usuario FROM tb_ec_unidades WHERE isModel = 0 AND  idGrupo = ?",
      idGrupo
    );
    let profesores = pool.query(
      "SELECT id_usuario, Nombre FROM tb_usuarios WHERE Role = 2"
    );
    let grupo;
    const query = await Promise.all([carrera, modulos, unidades, profesores]);
    carrera = query[0][0].Carrera;
    grupo = query[0][0].Grupo;
    modulos = query[1];
    unidades = query[2];
    profesores = query[3];
    const datosModeloOrdenado = [];
    modulos.forEach((element, id) => {
      const arrModelo = [];
      const obj = {};
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          let obj = {};
          obj["UnidadName"] = unidad.Nombre;
          obj["idUnidad"] = unidad.id;
          obj["Inicio"] = unidad.fechaInicio;
          obj["Fin"] = unidad.fechaFin;
          obj["Estado"] = unidad.Estado;
          obj["Usuario"] = unidad.Usuario;
          arrModelo.push(obj);
        }
      });
      obj["modelo"] = element.Nombre;
      obj["unidades"] = arrModelo;
      obj["idModelo"] = element.id;
      obj["fechaInicio"] = element.fechaInicio;
      obj["fechaFin"] = element.fechaFin;
      datosModeloOrdenado[id] = obj;
    });
    res.render("ec/cronograma", {
      data: usuario.data,
      datos: datosModeloOrdenado,
      carrera,
      grupo,
      grupoID: idGrupo,
      profesores,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};
ec.editUnidadVigente = async (req, res) => {
  const { idUnidad, unidad, inicio, fin, profesor } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_unidades SET Nombre=?, fechaInicio = ?, fechaFin =? , Estado = 1  , id_usuario=? WHERE id=?  ",
      [unidad, inicio, fin, profesor, idUnidad]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addModeloVigente = async (req, res) => {
  const { Nombre, Inicio, Fin, idGrupo } = req.body;
  try {
    let idCarrera = await pool.query(
      "SELECT id_carrera FROM tb_ec_grupo WHERE id = ? ",
      [idGrupo]
    );
    idCarrera = idCarrera[0].id_carrera;
    await pool.query(
      "INSERT INTO tb_ec_modulos(Nombre, fechaInicio, fechaFin, Estado, isModel, idCarrera, idGrupo) VALUES (?, ? ,? , 1 , 0 , ? ,?)",
      [Nombre, Inicio, Fin, idCarrera, idGrupo]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addUnidadVigente = async (req, res) => {
  const { Nombre, idModulo, profesor, inicio, fin, idGrupo } = req.body;
  try {
    let idCarrera = await pool.query(
      "SELECT id_carrera FROM tb_ec_grupo WHERE id = ? ",
      [idGrupo]
    );
    idCarrera = idCarrera[0].id_carrera;
    await pool.query(
      "INSERT INTO tb_ec_unidades(Nombre, isModel, idModulo, idCarrera , fechaInicio, fechaFin, id_usuario , idGrupo, Estado) VALUES (?, 0 ,? ,?, ? , ?, ?,?, 1)",
      [Nombre, idModulo, idCarrera, inicio, fin, profesor, idGrupo]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.instructor = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("ec/instructores/carreras", usuario);
};

module.exports = ec;