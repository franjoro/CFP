const html_to_pdf = require("html-pdf-node");
imgSrc =
  "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const GenerarPdf = (data) => {
  return new Promise((resolver, rechazar) => {
    tmpName = "ficha.pdf";
    let empresa = data.data[0][0];
    let nit = data.data[0][0].NIT.split("-");
    const d = new Date();
    const { firmante } = data;

    const { Horario, Nombre, programa, Fechas, horas, CostoAlumno } = data.data[1][0];
    const { NombreContacto, EmailContacto } = data.data[2][0];
    itineracion = "";
    console.log(data.alumnos);
    data.alumnos.forEach((element, index) => {
      let h = "", m = "";
      if (element[8] === 'Hombre') {
        h = "checked";
      }
      if (element[8] === 'Mujer') {
        m = "checked";

      }
      itineracion +=
        `
          <tr>
            <td>${index + 1}</td>
            <td>${element[1]}</td>
            <td>${element[4]}</td>
            <td>${element[3]}</td>
            <td>${element[9]}</td>
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
              padding-top:50px
            }
          </style>
          <div class="container-fluid topheader">
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
                <p class="d-inline">FECHA :</p>
                <br />
                <input type="text" class="date d-inline" value="${d.getDate()} " /> -
                <input
                  type="text"
                  class="date d-inline"
                  value="${d.getMonth() + 1}"
                />-
                <input
                  type="text"
                  class="d-inline"
                  value=" ${d.getFullYear()}"
                  style="width: 6%"
                />
                <br>
                  <p class="mx-2 d-inline">DÍA</p> 
                  <p class="mx-2 d-inline">MES</p>  
                  <p class="mx-2 d-inline">AÑO</p>
              </div>
              <div class="divisor">
                <p class="d-inline" style="margin-bottom: -10px">
                  NOMBRE DE LA EMPRESA:
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
                <p class="d-inline">NIT DE LA EMPRESA:</p>
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
                <p class="d-inline">TELEFONO:</p>
                <input
                  type="text"
                  class="d-inline"
                  value="${empresa.Tel}"
                  style="margin-left: 50px"
                />
                Ext:
                <input type="text" style="margin-left: 30px" />
              </div>
      
              <div class="encabezado">
                <p>APORTACIÓN MENSUAL AL INSAFORP:</p>
                <p style="margin-right: 200px">NUMERO PATRONAL:</p>
              </div>
      
              <div class="cuerpo" style="margin-top: -10px">
                <div class="col">
                  <input
                    type="text"
                    value="${empresa.Aportacion_insaforp}"
                    style="width: 50%"
                  />
                  <small><b> (Según Ultimo recibo ISSS) </b> </small>
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
                NUMERO DE EMPLEADOS:&nbsp; <br /><input
                  type="text"
                  value="${empresa.Num_Empleados}"
                />
              </p>
              <br /><br />
              <p>
                ACTIVIDAD ECONÓMICA: <b>(De acuerdo a Clasificacion ISSS)</b>&nbsp;
              </p>
              <input
                class="complete"
                type="text"
                value="${empresa.Actividad_eco}"
              /><br /><br />
      
              <div class="row mb-3">
                <div class="col-3 text-justify">
                  NOMBRE DEL RESPONSABLE DE CAPACITACION EN LA EMPRESA:
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
                  <p>CORREO ELECTRÓNICO:</p>
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
                <p style="margin-bottom: 0px">NOMBRE DE LA CAPACITACION:</p>
                <input
                  type="text"
                  style="width: 100%; margin-top: -50px"
                  value="${Nombre}"
                />
              </div>
      
              <div class="encabezado">
                <p>RAZON SOCIAL DEL ORGANIZADOR :</p>
                <p>COSTO POR PERSONA :</p>
                <p>LUGAR DE EJECUCIÓN:</p>
              </div>
              <div class="cuerpo">
                <input
                  type="text"
                  value="Asociación Institución Salesiana/ITR"
                  style="width: 30%"
                /><input type="text" value="${CostoAlumno}" /><input
                  type="text"
                  value="ONLINE"
                />
              </div>
              <p style="margin-bottom: 0px">DEPARTAMENTO Y MUNICIPIO DE EJECUCIÓN:</p>
              <input
                type="text"
                style="width: 100%"
                value="San Salvador, San Salvador"
              />
              <div class="encabezado">
                <p style="width: 13%">No. HORAS :</p>
                <p style="margin-left: -420px;">DETALLE DE FECHAS DE EJECUCION</p>
                <p style="margin-left: -20px;">HORARIO (S):</p>
              </div>
              <div class="cuerpo">
                <input type="text" style="width: 8%" value="${horas} Horas" />
                <input type="text" style="width: 60%" value="${Fechas} " />
                <input type="text" style="width: 20%" value="${Horario} " />
              </div>
            </div>
            <br />
            <div class="container">
              <p>NOMBRE DE LOS PARTICIPANTES PROPUESTOS:</p>
              <table class="table-sm">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>N° ISSS</th>
                    <th>N° CORRELATIVO ISSS</th>
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
            <br />
            <div class="container">
              <div class="row">
                <div class="col-10">
                  <p style="margin-bottom: -10px">
                    NOMBRE DEL GERENTE GENERAL O RESPONSABLE DE CAPACITACIÓN
                  </p>
                  <div class="encabezado">
                    <div class="group" style="width: 25%">
                      <input style="width: 100%" type="text" value="${firmante.primera}" /><label
                        >1er. apellido</label
                      ><br />
                    </div>
                    <div class="group" style="width: 25%">
                      <input style="width: 100%" type="text" value="${firmante.segundoa}" /><label
                        >2do. Apellido</label
                      ><br />
                    </div>
                    <div class="group" style="width: 50%">
                      <input style="width: 100%" type="text" value="${firmante.nombres}" /><label>Nombres</label
                      ><br />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10">
                  <div class="cuerpo" style="margin-top: 3px">
                    <div class="group" style="width: 50%">
                      <label>Cargo</label>
                      <input style="width: 90%" type="text" value="${firmante.cargo}" />
                      <br />
                    </div>
                    <div class="group" style="width: 50%">
                      <label>Firma</label>
                      <input style="width: 100%" type="text" />
                      <br />
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
              <br />
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