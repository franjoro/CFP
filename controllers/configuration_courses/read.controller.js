// name: configuration_courses.js
// description: routes for configuration courses
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 12/08/2021 for Osmaro Bonilla
// last update: 12/08/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const read = {};

read.all = (req,res)=>{
    try {
        pool.query('SELECT * FROM tb_course_configuration').then((response)=>{
            res.send(response);
        });

    } catch (error) {
        res.send(error);
    }
};

read.monthForProgram = (req,res)=>{
    try {
        const {idProgram} = req.params;
        pool.query("SELECT * FROM tb_course_configuration WHERE id_program = ?", [idProgram]).then((response)=>{
            return(res.send(response));
        }).catch((error)=>{
            res.send(error);
        })
    } catch (error) {
        res.send(error);
    }
};

module.exports = read;