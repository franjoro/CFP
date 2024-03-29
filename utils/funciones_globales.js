const funcionesGlobales = {};

funcionesGlobales.error = (error) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        html: error,
    });
};

funcionesGlobales.calcularEdad = (fecha) =>{
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
  
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
  
    return edad;
};


funcionesGlobales.noCopyNoPaste = (id) =>{
    $(id).bind("cut")
};

module.exports = funcionesGlobales;