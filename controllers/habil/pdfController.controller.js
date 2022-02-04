/*@author: Osmaro Bonilla
  @description: Se eliminan el documento seleccionado en aws y en la base de datos
  @date: 20/08/2021*/
  const pdfController = {};
  // Requerimos pool de base de datos si es necesario
  const pool = require("../../models/db");
const  { PrintPdf } = require('../../utils/PDF/ballot_pdf');

  /*@description: Elimina el documento seleccionado con su key 
    @see: Se utiliza en cliente de habil
    @param: req, res, req.coockies.token*/
pdfController.printPDF = async (req, res) => {
    try {
       await PrintPdf();
      return res.status(200).json({ status: true});
    } catch (error) {
        res.send(error);
      //return diferents errors
      return res.status(400).json(error);
    } 
};
  
pdfController.downloadFile = (req, res) => {
    console.log('Intentando descargar');
    const path = `./public/files/tmp/boleta_inscripcion.pdf`;
    res.contentType("application/pdf");
    res.download(path);
  };
  
  module.exports = pdfController;
  