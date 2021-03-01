// Utilizar funcionalidades del Ecmascript 6

// Cargamos los módulos de express y body-parser, morgan, cors
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
// Llamamos a express para poder crear el servidor
const app = express();

var cookieParser = require("cookie-parser");
app.use(cookieParser());

// Llamamos helmet
// app.use(helmet());
// Llamamos morgan en dev
app.use(morgan("dev"));
// Llamamos cors
app.use(cors());
// Seteamos ejs como motor de vistas
app.set("view engine", "ejs");
// Seteamos carpeta de archivos estaticos
app.use("/static", express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cargamos las rutas

// Router principal de admin y sus controladores
app.use("/admin", require("./routes/admin.router"));
app.use("/admin/programa", require("./routes/programa.router"));
app.use("/admin/usuarios", require("./routes/usuarios.router"));
app.use("/admin/empresas", require("./routes/empresas.router"));
app.use("/admin/instructor", require("./routes/instructor.router"));
app.use("/admin/participantes", require("./routes/participantes.router"));
app.use("/admin/cursos", require("./routes/cursos.router"));

// Router de login
app.use("/", require("./routes/login.router"));

// Router public
app.use("/public", require("./routes/public.router"));

// Router Formulario de Habil
app.use("/habil", require("./routes/habil.router"));

app.get("/prueba", (req, res) => {
  res.render("public_empresas/prueba");
});

//Mailer
app.post("/sendMail", async (req, res) => {
  const { sendEmail } = require("./utils/mailer");
  const to = req.body.email,
    text = req.body.text,
    enlace = req.body.enlace,
    asunto = `EDICIÓN DE ARCHIVOS`;
  let html = `<h5>Reciba un cordial saludo de parte del Centro de Formación Profesional Don Pedro Ricaldone<h5> <p> por este medio solicitamos la verificación de archivos para la continuación satisfactoria de la solicitud </p><br>
  <b>Puede editar los archivos adjuntos en el siguiente enlace:</b>
  <a href="${enlace}">${enlace}</a> <br>
  <p>Mensaje adjunto: ${text}</p>
  `;
  try {
    await sendEmail(to, asunto, html);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, error });
  }
});

// exportamos este módulo para poder usar la constiable app fuera de este archivo
module.exports = app;
