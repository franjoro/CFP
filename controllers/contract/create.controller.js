// name: create_controller.js
// description: functions for create contracts
// dependencies: pool
// create-date: 12/08/2021 for Osmaro Bonilla
// last update: 12/08/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const create = {};


create.add = (req,res)=>{
    try {
        let errors=[];
        const {
            name,
            date_issue,
            way_pay,
            days,
            start_date,
            finish_date,
            id_presbyters,
            id_course
        } = req.body;
        // validate
        if(!name || name == '')
            errors.push("Debe de ingresar el campo nombre de manera correcta");
        if(!date_issue || date_issue == '')
            errors.push("Debe de ingresar el campo fecha de emisión de manera correcta");
        if(!way_pay || way_pay == '')
            errors.push("Debe de ingresar el campo metodo de pago de manera correcta");
        if(!days || days == '')
            errors.push("Debe de ingresar el campo dias de manera correcta");
        if(!start_date || start_date == '')
            errors.push("Debe de ingresar el campo fecha de inicio de manera correcta");
        if(!finish_date || finish_date == '')
            errors.push("Debe de ingresar el campo fecha de finalización de manera correcta");
        if(!id_presbyters || id_presbyters == '')
            errors.push("Debe seleccionar un presbitero");
        if(!id_course || id_course == '')
            errors.push("Debe seleccionar un curso");
        if(days <=0)
            errors.push("La cantidad de días del contrato tienen que ser mayor a 0");
        // return errors if exist
        if(errors.length > 0)
            return (res.json({errors: errors, status:'error'}));
        // sql insert tb_contracts
        const sql = `
        INSERT INTO tb_contracts (name, date_issue, way_pay, days, start_date, finish_date, id_presbyters, id_course) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        // create parameters
        const parameters = [name, date_issue, way_pay, days, start_date, finish_date, id_presbyters, id_course];
        // excecute query
        pool.query(sql,parameters).then((response)=>{
                res.json({data:response, status: 'success'});
            }
        )
    } catch (error) {
        // return error
        return(res.json({errors:error, status:'error'}));
    }

};

module.exports = create;

