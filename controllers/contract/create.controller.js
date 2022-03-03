// name: create.controller.js (In module contract)
// description: routes for contract
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 01/03/2022 for Osmaro Bonilla
// last update: 01/03/2022 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const create = {};


create.add = (req,res)=>{
    // try {
    //     const {idProgram, monthDocumentation} = req.body;
    //     if(!idProgram){
    //         return(res.status(400).json({'error': "empty_program"}));
    //     }
    //     pool.query('INSERT INTO tb_course_configuration(id_program, month_documentation) VALUES (?,?)',[idProgram, monthDocumentation]).then(
    //         (response)=>{
    //             res.send(response)
    //         }
    //     )
    // } catch (error) {
    //     return(res.send(error));
    // }

};

module.exports = create;

