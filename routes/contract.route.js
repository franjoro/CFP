// name: contract.route.js
// description: routes for contract module
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 01/03/2022 for Osmaro Bonilla
// last update: 01/03/2022 for Osmaro Bonilla

// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const create = require('../controllers/contract/create.controller');
// const remove = require('../controllers/configuration_courses/delete.controller');
// const update = require('../controllers/configuration_courses/update.controller');
const read = require('../controllers/contract/read.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
// Genera la vista

// route 'contratos/menu'
// router.get('/menu', authcheck, )
// route '/contratos/read'
router.get('/read', authcheck, read.read);
// route 'contratos/read-courses'
router.post('/read-courses', authcheck, read.readCourses);
// route 'contratos/read-presbyter'
router.post('/read-presbyter', authcheck, read.readPresbyter);
// route 'contratos/menu'
router.get('/menu', authcheck, read.renderMenu);
// route 'contratos/add'
router.post('/add', authcheck, create.add);
// export module
module.exports = router;
