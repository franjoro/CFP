/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const PublicFunctions = {};
const fs = require("fs");
const pool = require("../models/db");
const { sendEmail } = require("../utils/mailer");
const { GenerarPdf } = require("../utils/htmlToPdf");
const { upload, getFiles } = require("../utils/s3");
const { encriptar } = require("../utils/decrypt");
const { getUserDataByToken } = require("../middlewares/auth");
// Requerimos pool de base de datos si es necesario
PublicFunctions.home = (req, res) => {
  const { data } = getUserDataByToken(req.cookies.token);
  res.render("./public_empresas/main", { usuario: data });
};
PublicFunctions.thanks = (req, res) => {
  res.render("./public_empresas/gracias");
};
PublicFunctions.profile = async (req, res) => {
  const { data } = getUserDataByToken(req.cookies.token);
  let perfil = await pool.query(
    "SELECT tb_empresa.Actividad_eco , tb_empresa.Direccion, tb_empresa.Aportacion_insaforp, tb_empresa.Num_Patronal, tb_empresa.Num_Empleados, tb_empresa_contact.Nombre ,  tb_empresa_contact.Email , tb_empresa_contact.Telefono FROM tb_empresa INNER JOIN tb_empresa_contact ON tb_empresa_contact.id_empresa = tb_empresa.id_empresa WHERE tb_empresa.NIT = ? LIMIT 1",
    [data.usuario]
  );
  perfil = perfil[0];
  res.render("./public_empresas/profile", { usuario: data, perfil });
};
PublicFunctions.remindSender = async (req, res) => {
  const { nit } = req.query;
  let c = await pool.query(
    "SELECT COUNT(*) AS ca FROM tb_usuarios WHERE id_usuario = ? ",
    [nit]
  );
  c = c[0].ca;

  if (!c) return res.json({ status: false, error: "USER_NOT_EXIST" });
  const data = await pool.query(
    "SELECT email, Nombre FROM tb_empresa WHERE tb_empresa.NIT = ? LIMIT 1 ; SELECT Password AS code FROM tb_usuarios WHERE id_usuario = ?",
    [nit, nit]
  );
  const { email } = data[0][0];
  const { Nombre } = data[0][0];
  const { code } = data[1][0];
  const enlace = `https://cfp.ricaldone.edu.sv/public/password?code=${code}`;
  const html = `<h1>Cambio de contraseña usuario empresarial</h1><br><p>Ha solicitado el cambio de contraseña correspondiente al usuario empresarial, por favor de click en el siguiente enlace : <a href="${enlace}" >${enlace}</a>, de no haber solicitado el cambio por favor omita este correo. Cualquier consulta o solicitud de información puede hacerla respondiendo este correo.  </p><p><b>Empresa: </b>${Nombre}</p>`;
  sendEmail(email, "CAMBIO DE CONTRASEÑA USUARIO CFP RICALDONE", html);
  res.json({ email }).status(200);
};
PublicFunctions.remindPassword = async (req, res) => {
  const { code } = req.query;
  let check = await pool.query(
    "SELECT COUNT(*) AS ca FROM tb_usuarios WHERE Password = ? ",
    [code]
  );
  check = check[0].ca;
  if (check) {
    let nit = await pool.query(
      "SELECT id_usuario AS user FROM tb_usuarios WHERE Password = ? ",
      [code]
    );
    nit = nit[0].user;
    res.render("./public_empresas/restarpassword", { nit, code });
  } else {
    res
      .send(
        "Error: código no valido por favor comuniquese con el Centro de Formación"
      )
      .status(404);
  }
};
PublicFunctions.ChangePasswordwithReminder = async (req, res) => {
  const { nit, code, newpass } = req.body;
  const encrip = await encriptar(newpass);
  try {
    await pool.query(
      "UPDATE tb_usuarios SET Password = ? WHERE id_usuario = ? AND Password = ? ",
      [encrip, nit, code]
    );
    const data = await pool.query(
      "SELECT email FROM tb_empresa WHERE NIT = ? LIMIT 1 ;",
      [nit]
    );
    console.log(data);
    const { email } = data[0];
    const html = `<h1>Cambio de contraseña usuario realizado</h1> <p>Se ha actualizado la contraseña del usuario empresarial , puede ingresar a la plataforma en el siguiente enlace : <a href="https://cfp.ricaldone.edu.sv">https:cfp.ricaldone.edu.sv</a> </p> <br> <p>Si usted no ha hecho este cambio por favor comuniquese respondiendo este correo. </p>`;
    sendEmail(email, "CAMBIO DE CONTRASEÑA HECHO", html);
    res.json({ status: true }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

PublicFunctions.changepassword = async (req, res) => {
  const { data } = getUserDataByToken(req.cookies.token);

  res.render("./public_empresas/profile", { usuario: data, perfil });
};

const moment = require("moment");
moment().format();

PublicFunctions.main = async (req, res) => {
  const programa = req.params.id;
  const { data } = getUserDataByToken(req.cookies.token);
  if (!programa) return res.redirect("/public/");
  try {
    const datos = await pool.query(
      `SELECT  tb_programa.Nombre, tb_programa.ImgPortada , tb_programa.id_programa  FROM tb_programa WHERE id_programa= ? ;  
     SELECT Codigo_curso, Nombre, Horario, Date_inicio	 FROM tb_cursos WHERE id_programa = ? AND Estado= 5;
     SELECT id_empresa, Aportacion_insaforp, Num_Empleados FROM tb_empresa WHERE NIT =?
     `,
      [req.params.id, programa, data.usuario]
    );
    if (!datos.length) return res.redirect("/public/");
    const cursos = [];
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    datos[1].forEach((element) => {
      if (moment(element.Date_inicio).isSameOrAfter(today)) {
        cursos.push(element);
      }
    });
    const DatosFormat = {
      programa: datos[0][0],
      cursos: cursos,
      update: datos[2][0],
    };
    return res.render("./public_empresas/empresa", DatosFormat);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

PublicFunctions.getEmpresas = async (req, res) => {
  const { searchTerm } = req.body;
  let query;
  if (searchTerm) {
    query = `SELECT id_empresa AS id, Nombre AS text  FROM tb_empresa WHERE Nombre like '%${searchTerm}%' order By Nombre LIMIT 5`;
  } else {
    query = `SELECT id_empresa AS id, Nombre AS text FROM tb_empresa order By Nombre LIMIT 5`;
  }
  try {
    const data = await pool.query(query);
    return res.json({ results: data });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

PublicFunctions.getDataEmpresas = async (req, res) => {
  const { param } = req.body;
  try {
    if (!param)
      return res.status(400).json({ status: false, error: "PARAM_NOT_EXIST" });
    const query = await pool.query(
      "SELECT NIT, Aportacion_insaforp ,Num_Patronal, Num_Empleados FROM tb_empresa WHERE id_empresa = ? ;",
      param
    );
    return res.status(200).json({ data: query[0], cantidad: query.length });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.UpdateDataEmpresa = async (req, res) => {
  const data = [req.body.aportacion, req.body.num_empleados, req.body.id];
  try {
    pool.query(
      "UPDATE tb_empresa SET   Aportacion_insaforp = ? , Num_Empleados = ? WHERE id_empresa = ?  ",
      data
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.CreateSolicitud = async (req, res) => {
  const { empresa } = req.body;
  const cursos = JSON.parse(req.body.cursos);
  const participantes = JSON.parse(req.body.participantes);

  try {
    // VALIDAR QUE EXISTAN LOS DATOS
    if (!empresa) throw new Error("EMPRESA_NOT_EXIST");
    if (!cursos) throw new Error("CURSOS_NOT_EXIST");
    if (!participantes) throw new Error("PARTICIPANTES_NOT_EXIST");

    // VALIDAR SI EMPRESA YA TIENE SOLICITUD EN ESTA OFERTA
    // const ExisteSolicitud = [];

    // cursos.forEach((curso) => {
    //   ExisteSolicitud.push(
    //     pool.query(
    //       "SELECT COUNT(*) AS Cantidad , tb_cursos.Nombre , tb_cursos.Horario FROM union_matricula INNER JOIN tb_cursos ON tb_cursos.Codigo_curso = union_matricula.id_curso WHERE id_curso  = ? AND id_empresa = ?",
    //       [curso, empresa]
    //     )
    //   );
    // });

    // const ExisteSolicitudPromesa = await Promise.all(ExisteSolicitud);

    // ExisteSolicitudPromesa.forEach((element) => {
    //   if (element[0].Cantidad > 0) {
    //     throw `LA SOLICITUD EN EL CURSO YA EXISTE,  CURSO: ${element[0].Nombre}  HORARIO: ${element[0].Horario}`;
    //   }
    // });

    // Hacer consultas en arreglos para hacer promesas
    const EmpresaCursos = [];
    const ParticipantesCursos = [];
    const ParticipantesActualizacion = [];

    // Empresas y cursos
    cursos.forEach((curso) => {
      EmpresaCursos.push(
        pool.query(
          "INSERT INTO union_curso_empresa(id_empresa,id_curso) VALUES (?,?)",
          [empresa, curso]
        )
      );
    });

    // Matriculas
    participantes.forEach((participante) => {
      ParticipantesCursos.push(
        pool.query(
          "INSERT INTO union_matricula(id_participante,id_curso,id_empresa) VALUES( ? , ? , ?) ",
          [participante[0], participante[7], empresa]
        )
      );
    });

    // Actualización participantes
    participantes.forEach((element) => {
      ParticipantesActualizacion.push(
        pool.query(
          "UPDATE tb_participante SET Telefono = ? , Email = ? , Cargo = ? WHERE DUI = ? ",
          [element[2], element[5], element[4], element[0]]
        )
      );
    });

    const QueryEmpresas = await Promise.all(EmpresaCursos);
    const QueryMatriculas = await Promise.all(ParticipantesCursos);
    const QueryActualizacionP = await Promise.all(ParticipantesActualizacion);

    res.status(200).json({
      status: true,
      data: { QueryEmpresas, QueryMatriculas, QueryActualizacionP },
    });

    const correos = await pool.query(
      "SELECT tb_usuarios.Email FROM tb_usuarios INNER JOIN union_programa_usuario ON union_programa_usuario.id_usuario = tb_usuarios.id_usuario WHERE union_programa_usuario.id_programa=? ",
      [req.body.programa]
    );

    const CorreoEmpresa = await pool.query(
      "SELECT email FROM tb_empresa WHERE id_empresa = ?",
      [empresa]
    );

    cursos.forEach(async (curso) => {
      const data = await pool.query(
        "SELECT Nombre, Horario FROM tb_cursos WHERE Codigo_curso = ? ; SELECT Nombre FROM tb_empresa WHERE id_empresa = ? ",
        [curso, empresa]
      );
      const htmlEmpresa = `<h1>Muchas gracias por tu solicitud de curso</h1> <br> 
      <p>Notificación de solicitud: Tu curso ha sido solicitado correctamente, curso : <b>${data[0][0].Nombre}</b> <br>  </p>  
      <small>Es posible que uno de nuestros colaboradores se ponga en contacto por cualquier situación presentada, a cualquier duda o comentario puede hacerlo respondiendo este correo</small>
      `;
      sendEmail(
        CorreoEmpresa[0].email,
        `SOLICITUD REALIZADA EN CURSO: ${curso}`,
        htmlEmpresa
      );

      correos.forEach((element) => {
        const html = `<h1>Notificación automática de sistema Razón: Solicitud de empresa creada en el curso : ${data[0][0].Nombre}</h1> <p> Nombre: ${data[0][0].Nombre} </p>  <p> Horario: ${data[0][0].Horario} </p>   <p> Cantidad de participantes: ${participantes.length}   </p>  <p> Empresa: ${data[1][0].Nombre}  </p>`;
        sendEmail(
          element.Email,
          `SOLICITUD REALIZADA EN CURSO: ${curso}`,
          html
        );
      });
    });
    return 0;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.FichaRegistro = async (req, res) => {
  const cursos = req.params.data;
  const { empresa } = req.params;
  let { alumnos } = req.body;
  let { firmante } = req.body;

  if (
    !alumnos ||
    !cursos ||
    !empresa ||
    cursos === "undefined" ||
    empresa === "undefined"
  )
    return res.json({ status: false, error: "PARAMS_NOT_EXIST" });

  const queries = [];
  try {
    queries.push(
      pool.query(
        "SELECT tb_empresa.Nombre, tb_empresa.NIT, tb_empresa.Tel, tb_empresa.Aportacion_insaforp,  tb_empresa.Num_Patronal , tb_empresa.Num_Empleados , Actividad_eco  FROM tb_empresa WHERE tb_empresa.id_empresa = ? ",
        [empresa]
      )
    );

    queries.push(
      pool.query(
        "SELECT Horario, Nombre, Fechas, (SELECT Nombre FROM tb_programa WHERE id_programa = tb_cursos.id_programa ) AS programa  FROM tb_cursos WHERE Codigo_curso = ? ",
        [cursos]
      )
    );

    queries.push(
      pool.query(
        "SELECT  Nombre AS NombreContacto, Email AS EmailContacto   FROM tb_empresa_contact WHERE id_empresa = ? LIMIT 1",
        [empresa]
      )
    );

    alumnos = JSON.parse(alumnos);
    firmante = JSON.parse(firmante);
    const MainQuery = await Promise.all(queries);
    const pdf = await GenerarPdf({ data: MainQuery, alumnos, firmante });
    return res.status(200).json({ status: true, data: pdf });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.archivos = async (req, res) => {
  if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
  Object.keys(req.files);
  const CursosCrud = req.body.curso;
  const cursos = JSON.parse(CursosCrud);
  const {
    empresa,
    CantidadPlanilla,
    CantidadRecibo,
    CantidadCancelacion,
  } = req.body;
  try {
    const promesas = [];
    const inserts = [];
    let ext;
    let fileContent;
    cursos.forEach((curso, index) => {
      // SUBIR Ficha
      ext = req.files[`ficha${index}`].name.split(".")[1];
      fileContent = Buffer.from(req.files[`ficha${index}`].data, "binary");
      promesas.push(
        upload(fileContent, Date.now(), ext, empresa, `ficha${index}`)
      );

      // SUBIR Recibo
      for (let i = 0; i < CantidadRecibo[index]; i++) {
        ext = req.files[`recibo${index}${i}`].name.split(".")[1];
        fileContent = Buffer.from(
          req.files[`recibo${index}${i}`].data,
          "binary"
        );
        promesas.push(
          upload(fileContent, Date.now(), ext, empresa, `recibo${index}${i}`)
        );
      }

      // SUBIR Si existe cancelación
      for (let i = 0; i < CantidadCancelacion[index]; i++) {
        ext = req.files[`cancelacion${index}${i}`].name.split(".")[1];
        fileContent = Buffer.from(
          req.files[`cancelacion${index}${i}`].data,
          "binary"
        );
        promesas.push(
          upload(
            fileContent,
            Date.now(),
            ext,
            empresa,
            `cancelacion${index}${i}`
          )
        );
      }

      // SUBIR Archivos de planilla
      for (let i = 0; i < CantidadPlanilla[index]; i++) {
        ext = req.files[`planilla${index}${i}`].name.split(".")[1];
        fileContent = Buffer.from(
          req.files[`planilla${index}${i}`].data,
          "binary"
        );
        promesas.push(
          upload(fileContent, Date.now(), ext, empresa, `planilla${index}${i}`)
        );
      }
    });
    const datos = await Promise.all(promesas);

    cursos.forEach((curso, index) => {
      let key;
      datos.forEach((element) => {
        if (element.posicion == `ficha${index}`) {
          key = element.key;
          inserts.push(
            pool.query(
              "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
              [key, 1, empresa, curso]
            )
          );
        }

        for (let i = 0; i < CantidadRecibo[index]; i++) {
          if (element.posicion == `recibo${index}${i}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, `2${i}`, empresa, curso]
              )
            );
          }
        }
        for (let i = 0; i < CantidadCancelacion[index]; i++) {
          if (element.posicion == `cancelacion${index}${i}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, `3${i}`, empresa, curso]
              )
            );
          }
        }

        for (let i = 0; i < CantidadPlanilla[index]; i++) {
          if (element.posicion == `planilla${index}${i}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, `4${i}`, empresa, curso]
              )
            );
          }
        }
      });
    });
    await Promise.all(inserts);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
};

PublicFunctions.GetFiles = async (req, res) => {
  if (!req.body.key) return res.json({ status: false, error: "KEY_NOT_EXIST" });
  const key = req.body.key;
  try {
    const get = await getFiles(key);
    const path = `static/files/tmp/tmpfile.${get}`;
    return res.status(200).json({ status: true, path, ext: get });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
};

PublicFunctions.AbrirFile = (req, res) => {
  const file = fs.readFileSync("./public/files/tmp/ficha.pdf");
  res.contentType("application/pdf");
  res.send(file);
};

PublicFunctions.archivo = (req, res) => {
  const { Name } = req.query;
  const path = `./public/files/tmp/tmpfile.${req.params.file}`;
  res.contentType("application/pdf");
  res.download(path, `${Name}.${req.params.file}`);
};

PublicFunctions.SeeFile = (req, res) => {
  const file = fs.readFileSync(`./public/files/tmp/tmpfile.${req.params.file}`);
  if (req.params.file == "png") res.contentType("image/png");
  if (req.params.file == "pdf") res.contentType("application/pdf");
  if (req.params.file == "jpeg") res.contentType("image/jpeg");
  res.send(file);
};

PublicFunctions.editar = async (req, res) => {
  const { curso, empresa, programa } = req.params;

  if (!empresa || !curso)
    return res
      .status(400)
      .json({ status: false, error: "PARAMS_NOT_COMPLETE" });
  try {
    const queries = [];
    queries.push(
      pool.query(
        "SELECT Nombre ,id_empresa AS id FROM tb_empresa WHERE id_empresa= ?",
        [empresa]
      )
    );
    queries.push(
      pool.query(
        "SELECT CONCAT(Nombre,' - ' ,Horario) AS curso , Codigo_curso AS id FROM  tb_cursos WHERE Codigo_curso  = ? ",
        [curso]
      )
    );
    queries.push(
      pool.query(
        "SELECT id, s3key, Role  FROM archivo_empresa_curso WHERE id_curso = ? AND id_empresa  = ? AND isEditable = 1  ",
        [curso, empresa]
      )
    );
    const query = await Promise.all(queries);
    return res.render("./public_empresas/editar", {
      curso: query[1][0],
      empresa: query[0][0],
      archivos: query[2],
      programa,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.register = (req, res) => {
  res.render("./public_empresas/registro");
};

PublicFunctions.RegisterPost = async (req, res) => {
  const {
    Nombre,
    Direccion,
    Actividad,
    Tel,
    Nit,
    Aportacion,
    Patronal,
    Empleados,
    Email,
    Responsable,
    EmailR,
    TelR,
    password,
  } = req.body;
  try {
    const {
      insertId,
    } = await pool.query(
      "INSERT INTO tb_empresa(Nombre,Direccion, Actividad_eco , Tel, NIT, Aportacion_insaforp, Num_Patronal, Num_Empleados,email, Estado  )   VALUES(?,?,?,?,?,?,?,?,?, 3) ",
      [
        Nombre,
        Direccion,
        Actividad,
        Tel,
        Nit,
        Aportacion,
        Patronal,
        Empleados,
        Email,
      ]
    );
    const FirstPromesas = [];
    FirstPromesas.push(
      pool.query(
        "INSERT INTO tb_empresa_contact(Nombre, Telefono, Email , id_empresa  ) VALUES (?,?,?, ?) ",
        [Responsable, TelR, EmailR, insertId]
      )
    );
    const ext = req.files.file.name.split(".")[1];
    fileContent = Buffer.from(req.files.file.data, "binary");
    FirstPromesas.push(upload(fileContent, Date.now(), ext, insertId, "nit"));
    const QueryResults = await Promise.all(FirstPromesas);
    const { key } = QueryResults[1];

    // const plainPassword = await GenerarPassword();
    const encripted = await encriptar(password);
    const PromesasSecondary = [];
    PromesasSecondary.push(
      pool.query("UPDATE tb_empresa SET nitkey= ? WHERE id_empresa = ? ", [
        key,
        insertId,
      ])
    );

    PromesasSecondary.push(
      pool.query(
        "INSERT INTO tb_usuarios(id_usuario, Nombre,Email,Password, Role, Estado ) VALUES(?,?,?,?,?, 1) ",
        [Nit, Nombre, Email, encripted, "3"]
      )
    );

    const html = `<h3>Creación de usuario para empresas</h3>  Empresa: ${Nombre}, <p>Por favor espera la confirmación para poder hacer las solicitudes de tu curso.</p>  <br> <p>Por este medio informamos las credenciales de acceso,   <b> Usuario: <b/> ${Nit}  <br> <b>Contraseña: </b> ${password}</p> <p>Gracias por rellenar la información empresarial, uno de nuestros colaboradores revisara la información adjunta. </p> `;

    sendEmail(
      Email,
      "CREACIÓN DE USUARIO EN CENTRO DE FORMACIÓN PROFESIONAL",
      html
    );
    sendEmail(
      "soporte_cfp@ricaldone.edu.sv",
      "CREACIÓN DE USUARIO EN CENTRO DE FORMACIÓN PROFESIONAL",
      html
    );
    await Promise.all(PromesasSecondary);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error });
  }
};

PublicFunctions.rechazado = (req, res) => {
  res.render("./public_empresas/rechazado");
};

module.exports = PublicFunctions;
