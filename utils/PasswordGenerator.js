// Requiere el paquete
const generator = require("generate-password");

// variable a exportar
const passwordGenerator = {};

// Metodo para generar contraseña
passwordGenerator.GenerarPassword = async () => {
  const data = generator.generate({
    length: 5,
    numbers: true,
  });
  return data;
};

module.exports = passwordGenerator;
