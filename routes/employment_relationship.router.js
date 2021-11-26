/*
nameclass: employment_relationship
description: route for wmployment relationship
dependencies: express, middlewares/auth authcheck, router express,
date: 03/11/2021 for OsmaroBonilla
lastupdate: 03/11/2021 for OsmaroBonilla
*/
const express = require('express');
const { authcheck } = require('../middlewares/auth');
const router = express.Router();
// CONTROLLERS SECTION
const renderController = require('../controllers/employment_relationship/render.controller');
const readController = require('../controllers/employment_relationship/read.controller');
const createRelationShipController = require("../controllers/employment_relationship/createRelationShipController");

// GET SECTION
router.get("/menu", authcheck, renderController.menu);
router.get("/detalle/:idStudent?", authcheck, renderController.detail)
// table subsection
router.get("/tb-students",authcheck, readController.tbStudents);
// PUT SECTION
// POST SECTION
router.post("/add-workshop", authcheck, createRelationShipController.addWorkShop);

module.exports = router;