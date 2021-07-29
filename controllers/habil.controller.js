const pool = require("../models/db");

// declarar variable a exportar
const habil = {};

// Requerimos pool de base de datos si es necesario
// const pool = require('../models/db')

// const mailer = require ('../utils/mailer');


habil.main = (req, res) => {
    res.render('habil/formulario');
};

habil.form = async (req, res) => {
    try {
        const { global_json1, global_json2, global_json3, codigoCurso } = req.body;
        const { dui, nombres, telMovil, email, sexo } = global_json1;
        const { [0]: { cantidad } } = await pool.query("SELECT COUNT(*) AS cantidad FROM tb_participante WHERE DUI = ?", [dui]);
        if (!cantidad) await pool.query("INSERT INTO tb_participante(DUI, Nombre, Telefono , Email, Genero) VALUES(? ,? , ? ,? ,? )", [dui, nombres, telMovil, email, sexo]);
        const statment = `INSERT INTO tb_habil_solicitudes( DUI, Codigo_curso , json1, json2, json3) VALUES(  '${dui} ', '${codigoCurso}',  '${JSON.stringify(global_json1)} ' , '${JSON.stringify(global_json2)} ' , '${JSON.stringify(global_json3)}')`;
        const {insertId} = await pool.query(statment);
        res.json({ status: true  , idSolicitud : insertId});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = habil;