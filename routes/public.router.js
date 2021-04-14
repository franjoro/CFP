// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const public_ = require("../controllers/public.controller");
// Llamamos al router
const router = express.Router();
const fileUpload = require("express-fileupload");
const { authcheckEmpresas, CloseSession } = require("../middlewares/auth");

//============================= USO PÚBLICO
//Recibir documentos de AWS
router.post("/getFiles", public_.GetFiles);
//descargar archivo con documentos de AWS
router.get("/archivo/:file?", public_.archivo);
//Ver archivo para visualizador
router.get("/seefile/:file?", public_.SeeFile);
// Carga el formulario principal con la información del programa
router.get("/editar/:curso/:empresa/:programa", public_.editar);

//Reenviar contraseña al correo
router.get("/passwordSender",  public_.remindSender);
//Cambio de contraseña get
router.get("/password",  public_.remindPassword);
router.post("/passwordChange",  public_.ChangePasswordwithReminder);


//Crea el file con la información pero no lo envia
router.post("/ficha/:empresa?/:data?", public_.FichaRegistro);
//Descargar el file
router.get("/ficha/OpenFile", public_.AbrirFile);
// Obtener empresas para select
router.post("/getEmpresas", public_.getEmpresas);
// Obtener la información de una empresa para actualizar
router.post("/getDataEmpresas", public_.getDataEmpresas);







//=================================== REGISTRO DE EMPRESAS
router.get("/register", public_.register);
router.post("/register", fileUpload(), public_.RegisterPost);




//=================================== EMPRESAS NO APROBADAS
//Empresa sin permisos de entrar
router.get("/rechazado", CloseSession, public_.rechazado);





// =================================== EMPRESAS APROBADAS
//Main Page empresa aprobada
router.get("/", authcheckEmpresas, public_.home);
// Carga el formulario principal con la iformación del programa
router.get("/form/:id?", authcheckEmpresas, public_.main);
//Página de agradecimiento
router.get("/gracias", CloseSession, public_.thanks);
//Perfil empresarial
router.get("/profile", authcheckEmpresas, public_.profile);
//Ofertas inscritas
router.get("/inscritos", authcheckEmpresas, public_.thanks);
router.put("/changepassword", authcheckEmpresas , public_.changepassword);


// Actualizar la información de la empresa
router.put("/updateEmpresaData",authcheckEmpresas ,public_.UpdateDataEmpresa);
// Crear solicitud y matriculas
router.post("/CreateSolicitud", authcheckEmpresas, public_.CreateSolicitud);
//Enviar documentos para guardar en AWS
router.post("/EnviarFiles",authcheckEmpresas, fileUpload(), public_.archivos);



// Exportamos la configuración
module.exports = router;
