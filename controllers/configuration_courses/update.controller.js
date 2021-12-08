// name: configuration_courses.js
// description: routes for configuration courses
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 12/08/2021 for Osmaro Bonilla
// last update: 12/08/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const update = {};


update.changeMonthDocumentation = (req,res)=>{
    try {
        const {idProgram, monthDocumentation} = req.body;
        console.log(idProgram);
        console.log(monthDocumentation);
        pool.query("UPDATE tb_course_configuration SET month_documentation = ? WHERE id_program = ?",[monthDocumentation, idProgram]).
        then((response)=>{
            return(res.json({"status":"true"}));
        }).catch((error)=>{
            res.send(error)
        })
    } catch (error) {
        res.send(error);
    }
};


module.exports = update;