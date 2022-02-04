//import library html-pdf-node
const html_to_pdf = require("html-pdf-node");

imgSrc = "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const PrintPdf = () => {
    console.log("hello");
  return new Promise((resolver, rechazar) => {
    // const data1 = JSON.parse();
    tmpName = "boleta_inscripcion.pdf";
    const options = {
      format: "Letter",
      path: `./public/files/tmp/${tmpName}`
    };
    const file = {
      content: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossorigin="anonymous"
          />
          <title>Hello, world!</title>
        </head>
        <body style="font-size: 15px; font-family: Arial">
          <style>
            html { -webkit-print-color-adjust: exact; }
            .block-height{
                height: auto !important;
            }
            .img-size{
                height: 60px !important;
                width: 160px !important;
            }
            .img-size-cuadre{
                height: 80px !important;
                width: 160px !important;
            }
            .text-aling-top-center{
                vertical-align: text-top !important;
                text-align: center !important;
            }
            .text-aling-top-left{
                vertical-align: text-top !important;
                text-align: left !important;
            }
            .bg-info{
                background: #83b3f2 !important;
            }
            .encabezado {
              margin-top: 20px;
              display: flex;
              justify-content: space-between;
            }
      
            .cuerpo {
              margin-top: -18px;
              display: flex;
              justify-content: space-between;
            }
      
            .complete {
              width: 60%;
            }
      
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
      
            td,
            th {
              border: 1px solid #dddddd;
              text-align: left;
            }
      
            .date {
              width: 4%;
            }
      
            .divisor {
              padding-top: 5px;
              padding-bottom: 5px;
            }
            table,
            th,
            td {
              border: 2px solid black;
            }
            .topheader{
              padding-top:20px
            }
          </style>
          
        <div class="container">
            <div class="row mt-5">
                <div class="col-3">
                    <img src="" alt="imagen">
                </div>
                <div 
                    class="col-5"
                    style="border-radius: 8px; height: 50px; border-top: solid; border-left: solid; border-right: solid;"
                    >
                    <p class="text-center">
                        PROGRAMA: FORMACIÓN EN EL IDIOMA INGLÉS
                    </p>
                </div>
                <div class="col-3 offset-1">
                    <div class="row">
                        <div class="col-10 offset-2" style="border-radius: 8px; border-style: solid; height: 50px;">
                            <p class="text-center">
                                Formulario de inscripción/Matricula
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-9 " style="border-radius: 8px; border-style: solid; ">
                    <div class="row">
                        <div class="col-12">
                            <p class="text-center">
                                Nombre de Centro De Formación
                            </p>
                        </div>
                        <div class="col-12">
                            <p class="text-center">
                                CENTRO DE FORMACIÓN PROFESIONAL DON PEDRO RICALDONE
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-2 offset-1">
                    <div class="row">
                        <div class="col-10">
                            <div class="row">
                                <div class="col-12" style="border-left: solid thin; border-right: solid thin; border-bottom: solid thin;">
                                    <span style="font-size: 12px;"><b>N° de Formulario</b></span>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-3" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; height: 30px;"></div>
                                        <div class="col-3" style="border-bottom: solid thin; border-right: solid thin; height: 30px;"></div>
                                        <div class="col-3" style="border-bottom: solid thin; border-right: solid thin; height: 30px;"></div>
                                        <div class="col-3" style="border-bottom: solid thin; border-right: solid thin; height: 30px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-9" style="border-radius: 10px; border-bottom: solid; border-left: solid; border-right: solid;">
                    <div class="row mt-2">
                        <div class="col-12 mt-2">
                            <p class="text-left"><b>Nombre del Curso de interés:</b> Inglés Principiante Modulo 4</p>
                        </div>
                        <div class="col-6">
                            <p class="text-left"><b>Horario:</b> 2:00 - 4:00 PM</p>
                        </div>
                        <div class="col-6">
                            <p class="text-left"><b>Lugar:</b> En Linea</p>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-10 offset-2">
                            <div class="row">
                                <div class="col-12">
                                    <span class="text-center" style="font-size: 10px;">(EXCLUSIVO USO INTERNO)</span>
                                </div>
                            </div>
                            <div class="row text-center" style="border-style: solid;">
                                <div class="col-12" style="border-bottom: solid black">Fecha de inscripción</div>
                                <div class="col-4" style="border-right: solid black;">22</div>
                                <div class="col-4" style="border-right: solid black;">05</div>
                                <div class="col-4">2021</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black; border-right: solid black;">(Día)</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black; border-right: solid black;">(Mes)</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black;">(Año)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row mt-1" 
                style="background-color: #ffcc00; border: solid; border-width: thin;">
                <div class="col-12">
                    <h6 class="text-center mt-1"><b>SECCIÓN 1. DATOS DE IDENTIFICACIÓN</b></h6>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-1 align-middle" style="border: solid thin; background-color: #d9d9d9;">
                    <b><p class="mt-4"><span style="font-size: 12px;">1.Nombre</span></p></b>
                </div>
                <div class="col-11">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-top: solid thin;">
                                    OSMARO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid dotted; border-top-width: thin; border-right: solid; border-right-width: thin;">
                                        <span style="font-size: 10px;">1°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid; border-right-width: thin;">
                                    ALFONSO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin; border-right: solid; border-right-width: thin;">
                                        <span style="font-size: 10px;">2°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12">
                                    -
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin;">
                                        <span style="font-size: 10px;">3°Nombre</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid; border-right-width: thin; border-top: solid; border-top-width: thin;">
                                    BONILLA
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin; border-right: solid; border-right-width: thin;">
                                        <span style="font-size: 10px;">1°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid; border-right-width: thin; border-top: solid; border-top-width: thin;">
                                    MESTIZO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin; border-right: solid; border-right-width: thin;">
                                        <span style="font-size: 10px;">2°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-top: solid; border-top-width: thin;">
                                    -
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin;">
                                        <span style="font-size: 10px;">Apellido de Casada</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </body>
      </html>                        
   `,
    };
    html_to_pdf.generatePdf(file, options,'D').then((pdfBuffer) => {
      resolver(tmpName);
    });
  });
};

module.exports = {
  PrintPdf
};