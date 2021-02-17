const html_to_pdf = require("html-pdf-node");
imgSrc =
  "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const GenerarPdf = (data) => {
  return new Promise((resolver, rechazar) => {
    tmpName = "archivo_random.pdf";
    let empresa = data.data[0][0];
    let nit = data.data[0][0].NIT.split("-");
    const d = new Date();
    let nombres = "",
      horarios = "";
    data.data.forEach((element, index) => {
      if (index > 0) {
        horarios += ` ${element[0].Horario} `;
        nombres += `  ${element[0].Nombre} `;
      }
    });

    const options = { format: "A4", path: `./public/files/${tmpName}` };
    const file = {
      content:
        `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />
                <title>Hello, world!</title>
            </head>
            
            <body>
                <style>
                    .encabezado {
                        display: flex;
                        justify-content: space-between;
                    }
            
                    .complete {
                        width: 75%;
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
                </style><br />
                <div class="container-fluid"><img src="${imgSrc}" alt="" style="width:250px; margin-left:-120px; margin-right:50px"
                        class="img-fluid float-right" />
                    <div class="text-center">
                        <h5><b>SOLICITUD DE CAPACITACIÓN </b></h5>
                        <h5><b>PROGRAMA NACIONAL DE FORMACION CONTINUA OFIMÁTICA </b></h5>
                    </div>
                    <div class="container">
                        <p><b>ANEXO 6</b></p>
                        <p><b>FECHA :</b> ${d.getDate()} - ${
          d.getMonth() + 1
        } - ${d.getFullYear()}</p>
                        <p><b>NOMBRE DE LA EMPRESA:</b>&nbsp; <input type="text" class="complete" value="${
                          empresa.Nombre
                        }" /></p>
                        <p><b>NIT DE LA EMPRESA:</b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="text" style="width:7%;"
                                value="${
                                  nit[0]
                                }" />- <input type="text" value="${
          nit[1]
        }" style="width:20%;" />- <input type="text"
                                value="${
                                  nit[2]
                                }" style="width:7%;" />- <input type="text" value="${
          nit[3]
        }" style="width:4%;" /></p>
                        <p><b>TELEFONO:</b>&nbsp; &nbsp; <input type="text" class="" value="${
                          empresa.Tel
                        }" />&nbsp; &nbsp; &nbsp;
                            &nbsp; <b>Ext:</b><input type="text" class="" value="" /></p>
                        <p><b>APORTACIÓN MENSUAL AL INSAFORP:</b>&nbsp; <input type="text" value="${
                          empresa.Aportacion_insaforp
                        }"
                                style="width:15%;" /><span style="font-size:10px;">(Según Ultimo recibo ISSS) </span>&nbsp; &nbsp;
                            &nbsp; <b>NUMERO PATRONAL:</b><input type="text" value="${
                              empresa.Num_Patronal
                            }" style="width:15%;" /></p>
                        <p style="float:right; margin-right:50px"><b>NUMERO DE EMPLEADOS:</b>&nbsp; <br /><input type="text"
                                value="${
                                  empresa.Num_Empleados
                                }" /></p><br /><br />
                        <p><b>ACTIVIDAD ECONÓMICA:(De acuerdo a Clasificacion ISSS)</b>&nbsp; </p><input class="complete"
                            type="text" value="${
                              empresa.Actividad
                            }" /><br /><br />
                        <p style="float:left"><b>NOMBRE DEL RESPONSABLE DE <br />CAPACITACION EN LA EMPRESA:</b></p><input
                            type="text" style="float:right; width:70%; margin-top:10px" value="" /><br /><br /><br />
                        <p style="float:left"><b>CORREO ELECTRÓNICO:</b></p><input type="text"
                            style="float:right; width:70%; margin-top:10px" value="" /><br /><br />
                        <p><b>NOMBRE DE LA CAPACITACION:</b></p><input type="text" style="width:100%"
                            value="${nombres}" /><br /><br />
                        <div class="encabezado">
                            <p><b>RAZON SOCIAL DEL ORGANIZADOR :</b></p>
                            <p><b>COSTE POR PERSONA :</b></p>
                            <p><b>LUGAR DE EJECUCIÓN:</b></p>
                        </div>
                        <div class="encabezado"><input type="text" value="Asociación Institución Salesiana/ITR"
                                style="width:27%" /><input type="text" value="42.47" /><input type="text" value="ONLINE" /></div>
                        <p><b>DEPARTAMENTO Y MUNICIPIO DE EJECUCIÓN:</b></p><input type="text" style="width:100%"
                            value="San Salvador, San Salvador" />
                        <div class="encabezado">
                            <p style="width:15%"><b>No. HORAS :</b></p>
                            <p ><b>DETALLE DE FECHAS DE EJECUCION - HORARIO (S):</b></p>
                        </div>
                        <div class="encabezado">
                        <input type="text" style="width:8%" value="20 Horas"/>
                        <input type="text" style="width:90%" value="${horarios} " /></div>
                    </div><br />
                    <div class="container">
                        <p><b>NOMBRE DE LOS PARTICIPANTES PROPUESTOS:</b></p>
                        <table>
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
                                <tr>
                                    <td>1</td>
                                    <td>Franklin Alejandro López Ramírez</td>
                                    <td>IT</td>
                                    <td>123456789</td>
                                    <td>05756113-8</td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" checked /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div><br><br>
                    <div class="container">
                        <p><b>NOMBRE DEL GERENTE GENERAL O RESPONSABLE DE CAPACITACIÓN</b></p>
                        <div class="row">
                            <div class="col-10">
                                <div class="encabezado">
                                    <div class="group" style="width:25%"><input style="width:100%" type="text" /><label>1er.
                                            apellido</label><br /></div>
                                    <div class="group" style="width:25%"><input style="width:100%" type="text" /><label>2do.
                                            Apellido</label><br /></div>
                                    <div class="group" style="width:50%"><input style="width:100%"
                                            type="text" /><label>Nombres</label><br /></div>
                                </div>
                            </div>
                            <div class="col-2"><label>________________________ <br />SELLO DE LA EMPRESA</label></div>
                        </div>
                        <div class="row">
                            <div class="col-10">
                                <div class="encabezado">
                                    <div class="group" style="width:50%"><input style="width:90%"
                                            type="text" /><label>Cargo</label><br /></div>
                                    <div class="group" style="width:50%"><input style="width:100%"
                                            type="text" /><label>Firma</label><br /></div>
                                </div>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>




`,
    };
    // or //
    // let file = { url: "http://localhost:8080/public/form/29" };

    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      resolver(tmpName);
    });
  });
};

module.exports = { GenerarPdf };
