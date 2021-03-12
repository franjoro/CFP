const html_to_pdf = require("html-pdf-node");
imgSrc =
  "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const GenerarPdf = (data) => {
  return new Promise((resolver, rechazar) => {
    tmpName = "ficha.pdf";
    let empresa = data.data[0][0];
    let nit = data.data[0][0].NIT.split("-");
    const d = new Date();

    const {Horario, Nombre, programa} = data.data[1][0] 
    const {NombreContacto,  EmailContacto} = data.data[2][0] 


    itineracion = "";
    data.alumnos.forEach((element, index) => {
      let h = "", m = "";
      if(element[8] === 'Hombre'){
        h = "checked";
      }
      if(element[8] === 'Mujer'){
        m = "checked";

      }
      itineracion +=
           `
          <tr>
            <td>${index + 1}</td>
            <td>${element[1]}</td>
            <td>${element[4]}</td>
            <td>${element[3]}</td>
            <td>${element[0]}</td>
            <td>
              <input type="checkbox" ${m} />
            </td>
            <td>
              <input type="checkbox" ${h} />
            </td>
          </tr>
           `;
    });

    const options = {
      format: "A4",
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
      
        <body>
          <style>
            .encabezado {
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
              padding: 8px;
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
          </style>
          <div class="container-fluid">
            <img
              src="${imgSrc}"
              alt=""
              style="width: 250px; margin-left: -120px; margin-right: 50px"
              class="img-fluid float-right"
            />
            <div class="text-center">
              <h5><b>SOLICITUD DE CAPACITACIÓN </b></h5>
              <h5><b>${programa}</b></h5>
            </div>
            <div class="container">
              <p><b>ANEXO 6</b></p>
              <div class="divisor">
                <p class="d-inline"><b>FECHA :</b></p>
                <input type="text" class="date d-inline" value="${d.getDate()} " /> -
                <input
                  type="text"
                  class="date d-inline"
                  value="${d.getMonth() + 1 }"
                />-
                <input
                  type="text"
                  class="date d-inline"
                  value=" ${d.getFullYear()}"
                />
              </div>
              <div class="divisor">
                <p class="d-inline" style="margin-bottom: -10px">
                  <b>NOMBRE DE LA EMPRESA:</b>
                </p>
                <input
                  type="text"
                  style="margin-bottom: -10px"
                  class="complete d-inline"
                  value="${empresa.Nombre}"
                />
                <br />
                <small style="margin-left: 60px">(Razón social)</small>
              </div>
      
              <div class="divisor" style="margin-top: -15px">
                <p class="d-inline">
                  <b>NIT DE LA EMPRESA:</b>
                </p>
                <input
                  type="text"
                  style="width: 7%; margin-left: 80px"
                  value="${nit[0]}"
                />-
                <input
                  type="text"
                  class="d-inline"
                  value="${nit[1]}"
                  style="width: 20%"
                />-
                <input
                  type="text"
                  class="d-inline"
                  value="${nit[2]}"
                  style="width: 7%"
                />-
                <input
                  type="text"
                  class="d-inline"
                  value="${nit[3]}"
                  style="width: 4%"
                />
              </div>
      
              <div class="divisor">
                <p class="d-inline"><b>TELEFONO:</b></p>
                <input
                  type="text"
                  class="d-inline"
                  value="${empresa.Tel}"
                  style="margin-left: 50px"
                />
                <b style="margin-left: 30px">Ext:</b>
                <input type="text" style="margin-left: 30px" />
              </div>
      
              <div class="encabezado">
                <p><b>APORTACIÓN MENSUAL AL INSAFORP:</b></p>
                <p style="margin-right: 200px"><b>NUMERO PATRONAL:</b></p>
              </div>
      
              <div class="encabezado" style="margin-top: -10px">
                <div class="col">
                  <input
                    type="text"
                    value="${empresa.Aportacion_insaforp}"
                    style="width: 65%"
                  />
                  <small>(Según Ultimo recibo ISSS) </small>
                </div>
                <div class="col">
                  <input
                    type="text"
                    value="${empresa.Num_Patronal}"
                    style="width: 80%"
                  />
                </div>
              </div>
      
              <p style="float: right; margin-right: 50px">
                <b>NUMERO DE EMPLEADOS:</b>&nbsp; <br /><input
                  type="text"
                  value="${empresa.Num_Empleados}"
                />
              </p>
              <br /><br />
              <p>
                <b>ACTIVIDAD ECONÓMICA:(De acuerdo a Clasificacion ISSS)</b>&nbsp;
              </p>
              <input
                class="complete"
                type="text"
                value="${empresa.Actividad_eco}"
              /><br /><br />
      
              <div class="row mb-3">
                <div class="col-3">
                  <b>NOMBRE DEL RESPONSABLE DE CAPACITACION EN LA EMPRESA:</b>
                </div>
                <div class="col-9">
                  <input
                    type="text"
                    style="width: 100%"
                    value="${NombreContacto.trim()}"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-3">
                  <p><b>CORREO ELECTRÓNICO:</b></p>
                </div>
                <div class="col-9">
                  <input
                    type="text"
                    style="width: 100%"
                    value="${EmailContacto.trim()}"
                  />
                </div>
              </div>
              <div>
                <p><b>NOMBRE DE LA CAPACITACION:</b></p>
                <input
                  type="text"
                  style="width: 100%; margin-top: -50px"
                  value="${Nombre}"
                />
              </div>
      
              <div class="encabezado">
                <p><b>RAZON SOCIAL DEL ORGANIZADOR :</b></p>
                <p><b>COSTO POR PERSONA :</b></p>
                <p><b>LUGAR DE EJECUCIÓN:</b></p>
              </div>
              <div class="encabezado">
                <input
                  type="text"
                  value="Asociación Institución Salesiana/ITR"
                  style="width: 30%"
                /><input type="text" value="42.47" /><input
                  type="text"
                  value="ONLINE"
                />
              </div>
              <p><b>DEPARTAMENTO Y MUNICIPIO DE EJECUCIÓN:</b></p>
              <input
                type="text"
                style="width: 100%"
                value="San Salvador, San Salvador"
              />
              <div class="encabezado">
                <p style="width: 15%"><b>No. HORAS :</b></p>
                <p style="margin-right: 500px;"><b>DETALLE DE FECHAS DE EJECUCION - HORARIO (S):</b></p>
              </div>
              <div class="encabezado">
                <input type="text" style="width: 8%" value="20 Horas" />
                <input type="text" style="width: 90%" value="${Horario} " />
              </div>
            </div>
            <br />
            <div class="container">
              <p><b>NOMBRE DE LOS PARTICIPANTES PROPUESTOS:</b></p>
              <table class="table-sm">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>N° ISSS</th>
                    <th>N° DUI</th>
                    <th>F</th>
                    <th>M</th>
                  </tr>
                </thead>
                <tbody>
                  ${itineracion}
                </tbody>
              </table>
            </div>
            <br /><br />
            <div class="container">
              <p><b>NOMBRE DEL GERENTE GENERAL O RESPONSABLE DE CAPACITACIÓN</b></p>
              <div class="row">
                <div class="col-10">
                  <div class="encabezado">
                    <div class="group" style="width: 25%">
                      <input style="width: 100%" type="text" /><label
                        >1er. apellido</label
                      ><br />
                    </div>
                    <div class="group" style="width: 25%">
                      <input style="width: 100%" type="text" /><label
                        >2do. Apellido</label
                      ><br />
                    </div>
                    <div class="group" style="width: 50%">
                      <input style="width: 100%" type="text" /><label>Nombres</label
                      ><br />
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <label class="text-center"
                    >________________________ <br />SELLO <br />
                    DE LA EMPRESA</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-10">
                  <div class="encabezado">
                    <div class="group" style="width: 50%">
                      <label>Cargo</label>
                      <input style="width: 90%" type="text" />
                      <br />
                    </div>
                    <div class="group" style="width: 50%">
                      <label>Firma</label>
                      <input style="width: 100%" type="text" />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <p>Favor anexar fotocopia de último recibo pagado del ISSS</p>
            </div>
          </div>
        </body>
      </html>    
`,
    };

    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      resolver(tmpName);
    });
  });
};

module.exports = {
  GenerarPdf
};