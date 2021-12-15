// name: read.js
// description: dinamic actions for module frequent questions
// dependencies: jquery
// start_date: 12/15/2021 for Osmaro Bonilla
// end_date: 12/15/2021 for Osmaro Bonilla
$(document).ready(()=>{
    disabledBlockFrFQ();
    enabledBlockTableFQ();
    enabledBtnSaveFQ();
    disabledBtnUpdateFQ();
    // btn whit id = btnCancelFQ click
    $("#btnCancelFQ").click(()=>{
        disabledBlockFrFQ();
        enabledBlockTableFQ();
    })
});


const enabledBlockFrFQ =()=>{
    $("#blockFrFQ").css("display", "block");
};
const disabledBlockFrFQ =()=>{
    $("#blockFrFQ").css("display", "none");
};
const enabledBlockTableFQ =()=>{
    $("#blockTbFQ").css("display", "block");
};
const disabledBlockTableFQ =()=>{
    $("#blockTbFQ").css("display", "none");
};
const enabledBtnSaveFQ =()=>{
    $("#btnSaveFrequentQuestion").css("display", "block");
};
const disabledBtnSaveFQ=()=>{
    $("#btnSaveFrequentQuestion").css("display", "none");
};
const enabledBtnUpdateFQ=()=>{
    $("#btnUpdateFQ").css("display", "block");
};
const disabledBtnUpdateFQ=()=>{
    $("#btnUpdateFQ").css("display", "none");
};
const clearFrFQ = ()=>{
    $("#txtAnswer").val("");
    $("#txtQuestion").val("");
};