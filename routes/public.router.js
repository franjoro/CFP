// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const public_ = require("../controllers/public.controller");
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Carga el formulario principal con la iformación del programa
router.get("/form/:id?", public_.main);
//Crea el file con la información pero no lo envia
router.post("/ficha/:empresa?/:data?", public_.FichaRegistro);
router.get("/ficha/OpenFile", public_.AbrirFile);
//Recibir documentos de AWS
router.get("/getFiles/:key?" ,public_.GetFiles)
//Recibir documentos de AWS
router.get("/archivo" ,public_.archivo)

// Obtener empresas para select
router.post("/getEmpresas", public_.getEmpresas);
// Obtener la información de una empresa para actualizar
router.post("/getDataEmpresas", public_.getDataEmpresas);
// Actualizar la información de la empresa
router.put("/updateEmpresaData", public_.UpdateDataEmpresa);
// Crear solicitud y matriculas
router.post("/CreateSolicitud", public_.CreateSolicitud);

//Enviar documentos para guardar en AWS 
const fileUpload = require("express-fileupload");
router.post("/EnviarFiles" , fileUpload() , public_.archivos);




// Exportamos la configuración
module.exports = router;
