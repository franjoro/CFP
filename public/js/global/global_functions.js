const noCopyNoPaste = (id) =>{
    $(id).bind("cut copy paste", function (e){
        e.preventDefault();
    });
};


const startWhitoutNumber = (text) =>{
    let er = /[0-9]\w+/g;
};