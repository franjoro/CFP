// call dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();
const helmet = require("helmet");
const { directives } = require("./SecurityDirectives");
const cookieParser = require("cookie-parser");
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: directives,
    },
  })
);
// const setCache = require("./middlewares/cache");
app.use(cookieParser());
app.use(compression());
// call cors
app.use(cors());
// use ejs for views motor
app.set("view engine", "ejs");
// use "/static" for public views and js
app.use("/static", express.static(`${__dirname}/public`));
// accept json un app
app.use(express.json());
// accept urlencoded
app.use(express.urlencoded({ extended: true }));

// charging all routes

// Router principal de admin y sus controladores
app.use("/admin", require("./routes/admin.router"));
app.use("/admin/programa", require("./routes/programa.router"));
app.use("/admin/usuarios", require("./routes/usuarios.router"));
app.use("/admin/empresas", require("./routes/empresas.router"));
app.use("/admin/instructor", require("./routes/instructor.router"));
app.use("/admin/participantes", require("./routes/participantes.router"));
app.use("/admin/cursos", require("./routes/cursos.router"));
app.use("/admin/ec", require("./routes/ec.router"));
app.use("/admin/habil", require("./routes/habil.router"));
//ROUTER DE LANDING PAGE
app.use("/landing", require("./src/components/landing/routes/landing.router"));
// Router de login
app.use("/", require("./routes/login.router"));
// Router public
app.use("/public", require("./routes/public.router"));
// Router Formulario de Habil
app.use("/habil", require("./routes/habil.router"));
app.use("/pruebas", require("./routes/pruebas.router"));
// Router Formulario de Habil
app.use("/reportes", require("./routes/reportes.router"));
// router module psychology
app.use("/admin/psicologia", require("./src/components/psychology/dashboard/routes/dashboard.router"))
// router module employment relationship
app.use("/admin/vinculacion-laboral", require("./routes/employment_relationship.router"));
// router module configuration courses
app.use('/configuration-courses', require('./routes/configuration_courses.router'));
// router for module frequent questions
app.use('/frequent-questions', require('./routes/frequent_questions.router'));
// router for module problem cases
app.use('/problem-cases', require('./routes/problem_cases.router'));

app.get("/terms", (req, res) => {
  res.render("terms");
});

// Mailer
app.post("/sendMail", async (req, res) => {
  const { sendEmail } = require("./utils/mailer");
  const to = req.body.email;
  const { text } = req.body;
  const { enlace } = req.body;
  const asunto = `EDICIÓN DE ARCHIVOS`;
  const html = `<h5>Reciba un cordial saludo de parte del Centro de Formación Profesional Don Pedro Ricaldone<h5> <p> por este medio solicitamos la verificación de archivos para la continuación satisfactoria de la solicitud </p><br>
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

app.get("*", (req, res) => {
  res.status(200).send("Page Not Found");
});



// export app for use in other files
module.exports = app;
