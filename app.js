// Utilizar funcionalidades del Ecmascript 6



// Cargamos los módulos de express y body-parser, morgan, cors
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
// Llamamos a express para poder crear el servidor
const app = express();
// Llamamos helmet
// app.use(helmet());
// Llamamos morgan en dev
app.use(morgan("dev"));
// Llamamos cors
app.use(cors());
// Seteamos ejs como motor de vistas
app.set("view engine", "ejs");
// Seteamos carpeta de archivos estaticos
app.use("/static", express.static(`${__dirname  }/public`));
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

const fileUpload = require("express-fileupload");
const { upload } = require("./utils/s3");





app.post("/prueba", fileUpload(), async (req, res) => {
    try {
        const curso = "Curso_De_Prueba";
        if(!req.files.file) return res.json({status: false, error:"FILE_NOT_EXIST"})
        const ext = req.files.file.name.split(".")[1];
        const fileContent = Buffer.from(req.files.file.data, "binary");
        const data = await upload(fileContent, curso, ext);
        // let data = await Promise.all([data1,data2,data3,data4]);
        res.json(data);      
    } catch (error) {
        res.json({status: false, error})
        console.log(error);
    }

});

// exportamos este módulo para poder usar la constiable app fuera de este archivo
module.exports = app;
