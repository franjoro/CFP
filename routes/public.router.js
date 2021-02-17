
// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const public_ = require("../controllers/public.controller");
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Carga el formulario principal con la iformación del programa
router.get("/form/:id?", public_.main);
// Obtener empresas para select
router.post("/getEmpresas", public_.getEmpresas);
// Obtener la información de una empresa para actualizar
router.post("/getDataEmpresas", public_.getDataEmpresas);
// Actualizar la información de la empresa
router.put("/updateEmpresaData", public_.UpdateDataEmpresa);
// Crear solicitud y matriculas
router.post("/CreateSolicitud", public_.CreateSolicitud);

// Exportamos la configuración
module.exports = router;

