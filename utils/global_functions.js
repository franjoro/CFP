const noCopyNoPaste = (id) =>{
    $(id).bind("cut copy paste", function (e){
        e.preventDefault();
    });
};