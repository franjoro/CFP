// declarar variable a exportar
const ec = {};
// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");
const { getUserDataByToken } = require("../middlewares/auth");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

ec.main = (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  res.render("ec/formulario", usuario);
};
ec.administrador = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  try {
    const carreras = pool.query("SELECT * FROM tb_ec_carrera"),
      grupos = pool.query(
        "SELECT * FROM tb_ec_grupo WHERE Estado = 1"
      ),
      instructores = pool.query("SELECT  id_usuario, Nombre FROM tb_usuarios WHERE Role = 2");
    const query = await Promise.all([carreras, grupos, instructores]);
    res.render("ec/administrador", {
      data: usuario.data,
      carreras: query[0],
      grupos: query[1],
      instructores: query[2],
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error }).status(400);
  }
};

ec.changeEstadoGrupo = async (req, res) => {
  const { idGrupo } = req.body;
  try {
    const grupo = pool.query("UPDATE tb_ec_grupo SET Estado = 0 WHERE id = ?", [idGrupo]);
    const modulos = pool.query("UPDATE tb_ec_modulos SET Estado = 0 WHERE idGrupo = ?", [idGrupo]);
    const unidades = pool.query("UPDATE tb_ec_unidades SET Estado = 0  WHERE idGrupo = ?", [idGrupo]);
    await Promise.all([grupo, modulos, unidades]);
    res.json({ status: true }).status(200);
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
      "SELECT * FROM tb_ec_grupo WHERE id_carrera = ? AND Estado = 1",
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
  const { Alter, Basica, Id, Nombre, Total } = req.body;
  try {
    if (!Alter || !Basica || !Id || !Nombre || !Total) throw "PARAMS_NOT_COMPLETED";
    await pool.query(
      "INSERT INTO tb_ec_carrera(id , Nombre, horasTotales, horasBasica, horasAlter) VALUES (?,?,?,?,?)",
      [Id.trim(), Nombre, Total, Basica, Alter]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.editcarrera = async (req, res) => {
  const { Alter, Basica, Id, Nombre, Total, IdActual } = req.body;
  try {
    if (!Alter || !Basica || !Id || !Nombre || !Total) throw "PARAMS_NOT_COMPLETED";
    await pool.query("UPDATE tb_ec_carrera SET id=?, Nombre= ? , horasTotales = ? , horasBasica = ? , horasAlter = ? WHERE id=?", [Id, Nombre, Total, Basica, Alter, IdActual]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.editgrupo = async (req, res) => {
  const { id, Nombre, Instructor, Contrato, Oferta, Garantia, Inicio, Fin, InicioG, FinG, oldId } = req.body;
  try {
    if (!id || !oldId) throw "PARAMS_NOT_COMPLETED";
    await pool.query("UPDATE tb_ec_grupo SET  id = ?, Nombre = ? , Contrato = ? , Oferta = ? , dateInicio = ? , dateFin = ? , id_instructor = ? , Garantia = ? , dateGInicio = ?, dateGFin = ?  WHERE id = ? ", [id, Nombre, Contrato, Oferta, Inicio, Fin, Instructor, Garantia, InicioG, FinG, oldId]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.addGrupo = async (req, res) => {
  const { id, Nombre, Carrera, Instructor, Contrato, Oferta, Garantia, Inicio, Fin, InicioG, FinG } = req.body;
  const id_carrera = Carrera;
  const year = new Date().getFullYear();
  const lastday = function (m, n) {
    return `${new Date(year, m, 0).getDate()}/${m}/${year + n}`;
  };
  const insertId = id;
  try {
    await pool.query(
      "INSERT INTO tb_ec_grupo(id, Nombre, Contrato, Oferta, dateInicio, dateFin, id_instructor, Garantia, dateGInicio , dateGFin, Estado, id_carrera ) VALUES (?, ? , ? , ? , ? , ? , ? ,? ,? ,? ,1 , ?)",
      [
        id,
        Nombre,
        Contrato,
        Oferta,
        Inicio,
        Fin,
        Instructor,
        Garantia,
        InicioG,
        FinG,
        Carrera
      ]
    );
    let modulos = pool.query(
      "SELECT id , Nombre, fechaInicio, fechaFin , horas FROM tb_ec_modulos WHERE isModel = 1 AND  idCarrera = ?",
      id_carrera
    );
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo , horas FROM tb_ec_unidades WHERE isModel = 1 AND  idCarrera = ?",
      id_carrera
    );
    let subUnidades = pool.query(
      "SELECT id , Nombre, idUnidad , horas FROM tb_ec_subunidades WHERE isModel = 1 AND  idCarrera = ?",
      id_carrera
    );
    const query = await Promise.all([modulos, unidades, subUnidades]);
    modulos = query[0];
    unidades = query[1];
    subUnidades = query[2];
    const datosModeloOrdenado = [];
    modulos.forEach((element, id) => {
      const arrModelo = [];
      unidades.forEach((unidad) => {
        arrSubunidades = [];
        if (unidad.idModulo == element.id) {
          subUnidades.forEach((subunidad) => {
            if (unidad.id == subunidad.idUnidad) {
              arrSubunidades.push(subunidad);
            }
          });
          let obj = {
            UnidadName: unidad.Nombre,
            idUnidad: unidad.id,
            subUnidades: arrSubunidades,
            Inicio: unidad.fechaInicio,
            Fin: unidad.fechaFin,
            horas: unidad.horas
          };
          arrModelo.push(obj);
        }
      });
      const obj = {
        modelo: element.Nombre,
        unidades: arrModelo,
        idModelo: element.id,
        fechaInicio: element.fechaInicio,
        fechaFin: element.fechaFin,
        horas: element.horas
      };
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
        "INSERT INTO tb_ec_modulos(Nombre,fechaInicio,fechaFin,horas,Estado,isModel,idCarrera,idGrupo) VALUES(?,?,?,?,1,0,?,?)",
        [
          element.modelo,
          FechaInicio,
          FechaFin,
          element.horas,
          id_carrera,
          insertId,
        ]
      );
      element.unidades.forEach(async (e) => {
        const { insertId: newidUnidad } = await pool.query(
          "INSERT INTO tb_ec_unidades(Nombre, horas, isModel, idModulo, idCarrera, idGrupo)  VALUES(?,?,0,?,?,?)",
          [e.UnidadName, e.horas, idM.insertId, id_carrera, insertId]
        );
        e.subUnidades.forEach(sub => {
          const statment = `INSERT INTO tb_ec_subunidades(Nombre, isModel, horas, idUnidad, idCarrera, idGrupo) VALUES('${sub.Nombre}' , 0 , ${sub.horas} , ${newidUnidad} , '${id_carrera}' , '${insertId}')`;
          promesasUnidades.push(pool.query(statment));
        });
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
  const { Nombre, idModulo, idCarrera, horas } = req.body;
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
ec.addSubUnidad = async (req, res) => {
  const { Nombre, idUnidad, horas, idCarrera } = req.body;
  console.log(req.body);
  try {
    await pool.query(
      "INSERT INTO tb_ec_subunidades(Nombre, isModel, horas , idUnidad, idCarrera) VALUES (?, 1 ,? ,? , ?)",
      [Nombre, horas, idUnidad, idCarrera]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addNewContenido = async (req, res) => {
  const { Nombre, idUnidad, idCarrera } = req.body;
  try {
    await pool.query(
      "INSERT INTO tb_ec_contenidos(Nombre, isModel, idUnidad, idCarrera) VALUES (?, 1 ,? , ?)",
      [Nombre, idUnidad, idCarrera]
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
ec.deleteSubUnidad = async (req, res) => {
  const { idSubUnidad } = req.body;
  try {
    await pool.query("DELETE FROM tb_ec_subunidades WHERE id = ? ", [idSubUnidad]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.deleteContenido = async (req, res) => {
  const { idContenido } = req.body;
  try {
    await pool.query("DELETE FROM tb_ec_contenidos WHERE id = ? ", [idContenido]);
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.editUnidad = async (req, res) => {
  const { idUnidad, unidad, horas } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_unidades SET Nombre=? , horas=? WHERE id=?  ",
      [unidad, horas, idUnidad]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.editSubUnidad = async (req, res) => {
  const { idSubUnidad, unidad, horas } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_subunidades SET Nombre = ? , horas = ? WHERE id = ?  ",
      [unidad, horas, idSubUnidad]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.editContenido = async (req, res) => {
  const { idContenido, Nombre } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_contenidos SET Nombre = ? WHERE id = ?  ",
      [Nombre, idContenido]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.editModulo = async (req, res) => {
  const { idModulo, Nombre, Inicio, Fin, horas } = req.body;
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

ec.administradorModelo = async (req, res) => {
  const usuario = getUserDataByToken(req.cookies.token);
  const { idCarrera } = req.params;
  try {
    let carrera = pool.query(
      "SELECT Nombre , horasTotales, horasBasica, horasAlter FROM tb_ec_carrera WHERE id = ?",
      idCarrera
    );
    let modulos = pool.query("SELECT id , Nombre, fechaInicio, fechaFin, horas , CAST(SUBSTRING_INDEX(Nombre , '.', 1 ) AS INT)  AS orden FROM tb_ec_modulos WHERE isModel = 1 AND  idCarrera = ?  ORDER BY orden ASC ", idCarrera);
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo , horas FROM tb_ec_unidades WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    let subunidades = pool.query(
      "SELECT id , Nombre, idUnidad , horas FROM tb_ec_subunidades WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    let contenidos = pool.query(
      "SELECT id , Nombre, idUnidad  FROM tb_ec_contenidos WHERE isModel = 1 AND  idCarrera = ?",
      idCarrera
    );
    const query = await Promise.all([carrera, modulos, unidades, subunidades, contenidos]);
    carrera = query[0][0];
    modulos = query[1];
    unidades = query[2];
    subunidades = query[3];
    contenidos = query[4];
    const datosModeloOrdenado = [];
    let horasTodosModulos = 0;
    modulos.forEach((element, id) => {
      const arrModelo = [];
      let totalHorasUnidades = 0;
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          const arrSubUni = [];
          const arrContenidos = [];
          let hasSubUnidades = false;
          let horasSubUnidades = 0;

          subunidades.forEach(subUni => {
            if (subUni.idUnidad == unidad.id) {
              arrSubUni.push({
                id: subUni.id,
                Nombre: subUni.Nombre,
                horas: subUni.horas,
              });
              hasSubUnidades = true;
              horasSubUnidades = horasSubUnidades + Number(subUni.horas);
            }
          });
          contenidos.forEach(contenido => {
            if (contenido.idUnidad == unidad.id) {
              arrContenidos.push({
                id: contenido.id,
                Nombre: contenido.Nombre,
              });
            }
          });
          arrModelo.push({
            UnidadName: unidad.Nombre,
            UnidaId: unidad.id,
            horas: unidad.horas,
            subunidades: arrSubUni,
            contenidos: arrContenidos,
            hasSubUnidades,
            horasSubUnidades
          });
          totalHorasUnidades = totalHorasUnidades + Number(unidad.horas);
        }
      });
      datosModeloOrdenado[id] = {
        modelo: element.Nombre,
        unidades: arrModelo,
        idModelo: element.id,
        fechaInicio: getMonth(element.fechaInicio),
        fechaFin: getMonth(element.fechaFin),
        horas: element.horas,
        totalHorasUnidades
      };
      horasTodosModulos = horasTodosModulos + Number(element.horas);
    });
    res.render("ec/ModeloCurso", {
      data: usuario.data,
      datos: datosModeloOrdenado,
      carrera,
      carreraID: idCarrera,
      horasTodosModulos
    });
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
      "SELECT id , Nombre, fechaInicio, fechaFin, horas FROM tb_ec_modulos WHERE isModel = 0 AND  idGrupo = ?  ORDER BY Nombre ASC",
      idGrupo
    );
    let unidades = pool.query(
      "SELECT id , Nombre, idModulo , fechaInicio, fechaFin, Estado , (SELECT Nombre FROM tb_usuarios WHERE id_usuario = tb_ec_unidades.id_usuario) AS Usuario , horas FROM tb_ec_unidades WHERE isModel = 0 AND  idGrupo = ?",
      idGrupo
    );
    let subUnidades = pool.query(
      "SELECT id , Nombre, idUnidad , horas FROM tb_ec_subunidades WHERE isModel = 0 AND  idGrupo = ?",
      idGrupo
    );
    let profesores = pool.query(
      "SELECT id_usuario, Nombre FROM tb_usuarios WHERE Role = 2"
    );
    let grupo;
    const query = await Promise.all([carrera, modulos, unidades, profesores, subUnidades]);
    carrera = query[0][0].Carrera;
    grupo = query[0][0].Grupo;
    modulos = query[1];
    unidades = query[2];
    profesores = query[3];
    subUnidades = query[4];
    const datosModeloOrdenado = [];
    modulos.forEach((element, id) => {
      const arrModelo = [];
      let horasTotalesUnidades = 0;
      unidades.forEach((unidad) => {
        if (unidad.idModulo == element.id) {
          const arrSubUni = [];
          let totalSubUnidad = 0;
          subUnidades.forEach(sub => {
            if (sub.idUnidad == unidad.id) {
              arrSubUni.push(sub);
              totalSubUnidad = totalSubUnidad + Number(sub.horas);
            }
          });
          let obj = {
            UnidadName: unidad.Nombre,
            idUnidad: unidad.id,
            Inicio: unidad.fechaInicio,
            Fin: unidad.fechaFin,
            Estado: unidad.Estado,
            Usuario: unidad.Usuario,
            horas: unidad.horas,
            subUnidades: arrSubUni,
            totalSubUnidad
          };
          arrModelo.push(obj);
          horasTotalesUnidades = horasTotalesUnidades + Number(unidad.horas);
        }
      });
      const obj = {};
      obj.modelo = element.Nombre;
      obj.unidades = arrModelo;
      obj.idModelo = element.id;
      obj.fechaInicio = element.fechaInicio;
      obj.fechaFin = element.fechaFin;
      obj.horas = element.horas;
      obj.horasUnidad = horasTotalesUnidades;
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
  const { idUnidad, unidad, inicio, fin, profesor, horas } = req.body;
  try {
    await pool.query(
      "UPDATE tb_ec_unidades SET Nombre=?, fechaInicio = ?, fechaFin =? , Estado = 1  , id_usuario=? , horas = ? WHERE id=?  ",
      [unidad, inicio, fin, profesor, horas, idUnidad]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addModeloVigente = async (req, res) => {
  const { Nombre, Inicio, Fin, idGrupo, horas } = req.body;
  try {
    let idCarrera = await pool.query(
      "SELECT id_carrera FROM tb_ec_grupo WHERE id = ? ",
      [idGrupo]
    );
    idCarrera = idCarrera[0].id_carrera;
    await pool.query(
      "INSERT INTO tb_ec_modulos(Nombre, fechaInicio, fechaFin , horas, Estado, isModel, idCarrera, idGrupo) VALUES (?, ? ,? , ?, 1 , 0 , ? ,?)",
      [Nombre, Inicio, Fin, horas, idCarrera, idGrupo]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
ec.addUnidadVigente = async (req, res) => {
  const { Nombre, idModulo, profesor, inicio, fin, idGrupo, horas } = req.body;
  try {
    let idCarrera = await pool.query(
      "SELECT id_carrera FROM tb_ec_grupo WHERE id = ? ",
      [idGrupo]
    );
    idCarrera = idCarrera[0].id_carrera;
    await pool.query(
      "INSERT INTO tb_ec_unidades(Nombre, isModel, idModulo, idCarrera , fechaInicio, fechaFin, horas ,id_usuario , idGrupo, Estado) VALUES (?, 0 ,? ,?, ? , ?, ?,? ,?, 1)",
      [Nombre, idModulo, idCarrera, inicio, fin, horas, profesor, idGrupo]
    );
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.instructor = async (req, res) => {
  try {
    const usuario = getUserDataByToken(req.cookies.token),
      instructor = usuario.data.usuario,
      promesas = [],
      today = dayjs(),
      format = "DD/MM/YYYY";
    promesas.push(
      pool.query(
        "SELECT tb_ec_carrera.Nombre AS Carrera , tb_ec_unidades.idCarrera AS idCarrera, tb_ec_grupo.Nombre AS Grupo, tb_ec_grupo.id AS idGrupo    FROM `tb_ec_unidades` INNER JOIN tb_ec_carrera ON tb_ec_carrera.id = tb_ec_unidades.idCarrera INNER JOIN tb_ec_grupo ON tb_ec_grupo.id = tb_ec_unidades.idGrupo WHERE id_usuario = ?  AND tb_ec_unidades.Estado = 1  GROUP BY idGrupo ",
        [instructor]
      )
    );
    promesas.push(
      pool.query(
        "SELECT tb_ec_unidades.id , tb_ec_modulos.Nombre AS modulo , tb_ec_unidades.Nombre , tb_ec_unidades.fechaInicio , tb_ec_unidades.fechaFin  , tb_ec_unidades.idCarrera , tb_ec_unidades.idGrupo FROM `tb_ec_unidades` INNER JOIN tb_ec_modulos ON tb_ec_modulos.id = tb_ec_unidades.idModulo WHERE tb_ec_unidades.id_usuario = ? AND tb_ec_unidades.isModel = 0 AND tb_ec_unidades.Estado = 1",
        [instructor]
      )
    );
    const query = await Promise.all(promesas);
    // console.log(query)
    let unidades = query[1],
      carreras = query[0],
      unidadesValidas = [];
    unidades.forEach((element) => {
      const fechaInicio = dayjs(element.fechaInicio, format),
        fechaFin = dayjs(element.fechaFin, format);
      if (today.isBetween(fechaInicio, fechaFin.add(1, "day"), null, "[]")) {
        unidadesValidas.push(element);
      }
    });
    const dataOrdenada = [];
    carreras.forEach((carrera) => {
      let unidades = [],
        obj = {};
      unidadesValidas.forEach((unidad) => {
        if (unidad.idGrupo == carrera.idGrupo) {
          unidades.push(unidad);
        }
        obj.unidades = unidades;
        obj.Carrera = carrera.Carrera;
        obj.idCarrera = carrera.idCarrera;
        obj.grupo = carrera.Grupo;
        obj.idGrupo = carrera.idGrupo;
      });
      dataOrdenada.push(obj);
    });
    res.render("ec/instructores/carreras", {
      data: usuario.data,
      dataOrdenada,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.contenidos = async (req, res) => {
  const { unidad, grupo } = req.params;
  const usuario = getUserDataByToken(req.cookies.token);
  const { $y: year, $M: month } = dayjs();
  try {
    const evaluaciones = await pool.query(
      "SELECT id, Descripcion, Tipo  FROM tb_ec_evaluaciones WHERE idUnidad = ?  AND Month = ? AND Year  = ?  ORDER BY Tipo",
      [unidad, month, year]
    );
    res.render("ec/instructores/contenidos", {
      data: usuario.data,
      evaluaciones,
      idUnidad: unidad,
      grupo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.newEva = async (req, res) => {
  const { Nombre, Tipo, idUnidad } = req.body;
  const { $y: year, $M: month } = dayjs();
  try {
    if (!Nombre || !Tipo || !idUnidad) throw "PARAMS_NOT_COMPLETE";
    let cantidad = await pool.query("SELECT COUNT(*) as cantidad FROM  tb_ec_evaluaciones WHERE Tipo = ? AND Month = ?  AND Year = ? AND idUnidad = ? ",
      [Tipo, month, year, idUnidad]);
    cantidad = cantidad[0].cantidad;
    if (cantidad > 1) return res.status(400).json({ status: false, error: "LIMIT" });
    await pool.query(
      "INSERT INTO tb_ec_evaluaciones(Descripcion, Tipo, Month, Year, idUnidad) VALUES (? , ? , ? , ? , ?) ",
      [Nombre, Tipo, month, year, idUnidad]
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.deteleEva = async (req, res) => {
  const { idEva } = req.body;
  try {
    if (!idEva) throw "PARAMS_NOT_COMPLETE";
    await pool.query("DELETE FROM `tb_ec_evaluaciones` WHERE id  = ? ", [
      idEva,
    ]);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.notas = async (req, res) => {
  const { evaluacion, grupo } = req.params,
    usuario = getUserDataByToken(req.cookies.token),
    promesas = [];
  const { unidad } = req.query;

  try {
    promesas.push(
      pool.query(
        "SELECT id, Nombres, Apellidos FROM tb_ec_alumno WHERE id_grupo = ? ",
        [grupo]
      )
    );
    promesas.push(
      pool.query(
        "SELECT id, Nota, idAlumno, comentario FROM tb_ec_notas WHERE idEvaluacion = ? ",
        [evaluacion]
      )
    );
    const query = await Promise.all(promesas),
      alumnos = query[0],
      nota = query[1],
      dataOrdenada = [];
    alumnos.forEach((alumno, id) => {
      let notaObtenida = {};
      notaObtenida.Nota = 0;
      notaObtenida.Comentario = "";
      notaObtenida.Nombre = alumno.Nombres;
      notaObtenida.Apellidos = alumno.Apellidos;
      notaObtenida.idAlumno = alumno.id;
      notaObtenida.isExist = false;
      notaObtenida.idNota = false;
      if (nota) {
        let itnNota;
        if (
          nota.some((notaElement, it) => {
            if (notaElement.idAlumno === alumno.id) {
              itnNota = it;
              return true;
            }
            return false;
          })
        ) {
          notaObtenida.Nota = nota[itnNota].Nota;
          notaObtenida.isExist = true;
          notaObtenida.idNota = nota[itnNota].id;
          notaObtenida.Comentario = nota[itnNota].comentario;
        }
      }
      dataOrdenada.push(notaObtenida);
    });
    res.render("ec/instructores/notas", {
      data: usuario.data,
      dataOrdenada,
      evaluacion,
      grupo,
      unidad,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.notasP = async (req, res) => {
  const { notas } = req.body;
  try {
    let notasJson = JSON.parse(notas);
    const promesas = [];
    notasJson.forEach((nota) => {
      if (nota.isExist) {
        return promesas.push(
          pool.query(
            "UPDATE tb_ec_notas SET Nota = ?, comentario = ? WHERE idAlumno = ? AND id= ?",
            [nota.Nota, nota.comentario, nota.alumnoId, nota.idNota]
          )
        );
      }
      promesas.push(
        pool.query(
          "INSERT INTO tb_ec_notas(Nota, comentario , idAlumno,idEvaluacion) VALUES (?,?,?,?) ",
          [nota.Nota, nota.comentario, nota.alumnoId, nota.evaluacion]
        )
      );
    });
    await Promise.all(promesas);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

ec.notasadmin = async (req, res) => {
  const { data } = getUserDataByToken(req.cookies.token);
  try {
    const grupos = await pool.query("SELECT id, Nombre FROM `tb_ec_grupo` WHERE Estado = 1");
    res.render("./ec/administradorNotas", { data, grupos });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


ec.getActividades = async (req, res) => {
  try {
    const { year, month } = req.params;
    const data = await pool.query("SELECT ( SELECT id  FROM tb_ec_grupo WHERE id =( SELECT idGrupo FROM tb_ec_unidades WHERE id = tb_ec_evaluaciones.idUnidad ) ) AS  idGrupo , ( SELECT Nombre  FROM tb_ec_grupo WHERE id =( SELECT idGrupo FROM tb_ec_unidades WHERE id = tb_ec_evaluaciones.idUnidad ) ) AS  Grupo, ( SELECT Nombre FROM tb_ec_modulos WHERE id =( SELECT idModulo FROM tb_ec_unidades WHERE id = tb_ec_evaluaciones.idUnidad ) ) AS NombreModulo, ( SELECT Nombre FROM tb_ec_unidades WHERE id = tb_ec_evaluaciones.idUnidad ) AS NombreUnidad , Tipo, Month , Year, Descripcion , id FROM tb_ec_evaluaciones WHERE Month = ? AND Year = ? ", [month, year]);
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


ec.NotasAdmin = async (req, res) => {
  const { evaluacion, grupo } = req.params,
    usuario = getUserDataByToken(req.cookies.token),
    promesas = [];
  const { unidad } = req.query;

  try {
    promesas.push(
      pool.query(
        "SELECT id, Nombres, Apellidos FROM tb_ec_alumno WHERE id_grupo = ? ",
        [grupo]
      )
    );
    promesas.push(
      pool.query(
        "SELECT id, Nota, idAlumno, comentario FROM tb_ec_notas WHERE idEvaluacion = ? ",
        [evaluacion]
      )
    );
    const query = await Promise.all(promesas),
      alumnos = query[0],
      nota = query[1],
      dataOrdenada = [];
    alumnos.forEach((alumno, id) => {
      let notaObtenida = {};
      notaObtenida.Nota = 0;
      notaObtenida.Comentario = "";
      notaObtenida.Nombre = alumno.Nombres;
      notaObtenida.Apellidos = alumno.Apellidos;
      notaObtenida.idAlumno = alumno.id;
      notaObtenida.isExist = false;
      notaObtenida.idNota = false;
      if (nota) {
        let itnNota;
        if (
          nota.some((notaElement, it) => {
            if (notaElement.idAlumno === alumno.id) {
              itnNota = it;
              return true;
            }
            return false;
          })
        ) {
          notaObtenida.Nota = nota[itnNota].Nota;
          notaObtenida.isExist = true;
          notaObtenida.idNota = nota[itnNota].id;
          notaObtenida.Comentario = nota[itnNota].comentario;
        }
      }
      dataOrdenada.push(notaObtenida);
    });
    res.render("ec/notasAdmin", {
      data: usuario.data,
      dataOrdenada,
      evaluacion,
      grupo,
      unidad,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = ec;
