//import library html-pdf-node
const html_to_pdf = require("html-pdf-node");

imgSrc = "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const PrintPdf = (data) => {
  return new Promise((resolver, rechazar) => {
    const data1 = JSON.parse(data);
    tmpName = "reporte_psicologia.pdf";
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
            <div class="row">
                <div class="col-3 offset-1">
                    <br>
                    <p class="text-center">
                        <img
                        src="https://cfp.ricaldone.edu.sv/static/img/logoi.png"
                        alt=""
                        style="width: 250px; display:block; margin:auto;"
                        class="img-fluid float-right img-size"
                    />
                    </p>
                </div>
                <div class="col-3">
                    <br>
                    <p class="text-center">
                        <img
                        src="https://cfp.ricaldone.edu.sv/static/img/logo.png"
                        alt=""
                        style="width: 250px; display:block; margin:auto;"
                        class="img-fluid float-right img-size-cuadre"
                    />
                    </p>
                </div>
                <div class="col-3">
                    <br>
                    <p class="text-center">
                        <img
                        src="https://avcfp.ricaldone.edu.sv/pluginfile.php/29995/coursecat/description/Sin%20t%C3%ADtulo-1.png"
                        alt=""
                        style="width: 250px; display:block; margin:auto;"
                        class="img-fluid float-right img-size-cuadre"
                    />
                    </p>
                </div>
            </div>
          </div>
          <div class="container-fluid topheader">
            <div class="text-center">
              <h5><b>INSTITUTO SALVADOREÑO DE FORMACIÓN PROFESIONAL</b></h5>
              <P>GERENCIA DE FORMACIÓN INICIAL, PROGRAMA EMPRESA-CENTRO</P>
            </div>
            <div class="container ">
                <div class="row">
                    <div class="col-12 bg-info block-height">
                        <h6 class=" text-aling-top-center"><b>
                             INFORME DE ATENCIÓN PSICOLÓGICA
                        </b></h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
              <div class="row">
                  <div class="col-12 block-height bg-info" >
                      <h6 class=" text-aling-top-left">
                          I. IDENTIFICACIÓN
                      </h6>
                  </div>
              </div>
          </div>
          <br>
            <div class="container">
                <dic class="row">
                    <div class="col-12">
                        <table class="table-sm">
                            <thead>
                              <tr>
                                <th width='20%'>Nombre:</th>
                                <th>${data1.name}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                  <td>Edad</td>
                                  <td>${data1.yearOld}</td>
                              </tr>
                              <tr>
                                  <td>Fecha Nacimiento</td>
                                  <td>${data1.date}</td>
                              </tr>
                              <tr>
                                  <td>Estado civil</td>
                                  <td>${data1.state}</td>
                              </tr>
                              <tr>
                                  <td>Escolaridad</td>
                                  <td>${data1.scholarship}</td>
                              </tr>
                              <tr>
                                  <td>Domicilio</td>
                                  <td>${data1.address}</td>
                              </tr>
                              <tr>
                                  <td>Personas con quienes vive</td>
                                  <td>${data1.persons}</td>
                              </tr>
                              <tr>
                                  <td>Número telefónico/:</td>
                                  <td>${data1.tel}</td>
                              </tr>
                              <tr>
                                  <td>Programa</td>
                                  <td>Empresa centro</td>
                              </tr>
                              <tr>
                                  <td>Personas responsable: </td>
                                  <td>${data1.responsable_person}</td>
                              </tr>
                              <tr>
                                  <td>Fecha de referencia:</td>
                                  <td>${data1.refer_date}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </dic>    
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 bg-info block-height">
                        <h6 class=" text-aling-top-left">
                             II. MOTIVO DE ATENCIÓN
                        </h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="container ">
                    <div class="row">
                        <div class="col-12 block-height">
                            <p class=" text-aling-top-left" style="text-align: justify !important;">
                                ${data1.reason}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 block-height bg-info" >
                        <h6 class=" text-aling-top-left">
                             III. DESCRIPCIÓN DEL CASO
                        </h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 block-height">
                        <p class=" text-aling-top-left" style="text-align: justify !important;">
                             ${data1.description}
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 bg-info block-height">
                        <h6 class=" text-aling-top-left">
                             IV. ABORDAJE
                        </h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 block-height">
                        <p class=" text-aling-top-left" style="text-align: justify !important;">
                             ${data1.approach}
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 bg-info block-height">
                        <h6 class=" text-aling-top-left">
                             V. RECOMENDACIONES
                        </h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 block-height">
                        <p class=" text-aling-top-left" style="text-align: justify !important;">
                             ${data1.recommendations}
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 bg-info block-height">
                        <h6 class=" text-aling-top-left">
                             VI. SEGUIMIENTO
                        </h6>
                    </div>
                </div>
            </div>
            <br>
            <div class="container ">
                <div class="row">
                    <div class="col-12 block-height">
                        <p class=" text-aling-top-left" style="text-align: justify !important;">
                             ${data1.follow_up}
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12">
                    <p class="text-center"><b>${data1.nowDate}</b></p>
                </div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <div class="col-12">
                    <p class="text-center">
                        <label class="text-center">F.________________________ 
                            <br/><b>${data1.namePsychology}</b> <br />
                        Licenciada en psicología</label>
                    </p>
                </div>
              </div>
              <br />
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