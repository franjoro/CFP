// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const admin = require("../controllers/admin.controller");
const { authcheck } = require("../middlewares/auth");
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/", authcheck, admin.main);
router.get("/programa", authcheck, admin.renderPrograma);
router.get("/usuarios", authcheck, admin.rendeUsuarios);
router.get("/empresas", authcheck, admin.renderEmpresas);
router.get("/instructor", authcheck, admin.renderInstructor);
router.get("/cursos", authcheck, admin.renderCursos);
router.get("/participantes" , authcheck, admin.renderParticipantes);
router.get("/ec" , authcheck, admin.ec);



// Exportamos la configuración
module.exports = router;
