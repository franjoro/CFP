// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const public_ = require("../controllers/public.controller");
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

//descargar archivo con documentos de AWS
router.get("/archivo/:file?" ,public_.archivo)
// Carga el formulario principal con la iformación del programa
router.get("/form/:id?", public_.main);
// Carga el formulario principal con la iformación del programa
router.get("/editar/:curso/:empresa/:programa", public_.editar);
//Crea el file con la información pero no lo envia
router.post("/ficha/:empresa?/:data?", public_.FichaRegistro);
//Descargar el file
router.get("/ficha/OpenFile", public_.AbrirFile);
//Página principal publica
router.get("/", public_.home);
//Página de agradecimiento
router.get("/gracias", public_.thanks);
//Recibir documentos de AWS
router.post("/getFiles" ,public_.GetFiles)

// Obtener empresas para select
router.post("/getEmpresas", public_.getEmpresas);
// Obtener la información de una empresa para actualizar
router.post("/getDataEmpresas", public_.getDataEmpresas);
// Crear solicitud y matriculas
router.post("/CreateSolicitud", public_.CreateSolicitud);
// Actualizar la información de la empresa
router.put("/updateEmpresaData", public_.UpdateDataEmpresa);




//Enviar documentos para guardar en AWS 
const fileUpload = require("express-fileupload");
router.post("/EnviarFiles" , fileUpload() , public_.archivos);




// Exportamos la configuración
module.exports = router;
