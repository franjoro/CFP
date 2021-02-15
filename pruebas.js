var html_to_pdf = require("html-pdf-node");
let options = { format: "A4", path:'ejemplo.pdf' };
imgSrc = "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";
let file = { content: `
<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

  <title>Hello, world!</title>
</head>

<body>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>
  <br><br><br><br>
  <div class="container-fluid">
    <img src="${imgSrc}" alt="" style="width: 250px; margin-left:-120px; margin-right: 50px"
      class="img-fluid float-right ">
    <div class="text-center">
      <h5><b>SOLICITUD DE CAPACITACIÓN </b></h5>
      <h5><b>PROGRAMA NACIONAL DE FORMACION CONTINUA OFIMÁTICA </b></h5>
    </div>
    <br>
    <div class="container">
      <p><b>ANEXO 6</b></p>
      <p><b>FECHA : </b> 10 - 10 - 2021</p>
      <p><b>NOMBRE DE LA EMPRESA: </b> &nbsp; Almacenes SIMAN S.A. de CV.  &nbsp; &nbsp; 
      <b>NIT DE LA EMPRESA: </b> &nbsp; &nbsp; 0614 - 180898 - 164-8</p>
      <p><b>TELEFONO: </b> &nbsp; &nbsp; +503 2278-0457</p>
      <p><b>APORTACIÓN MENSUAL AL INSAFORP:</b> &nbsp; &nbsp; $1250.00 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
      <b>NUMERO PATRONAL:</b> 0567687   </p>
      <p><b>NUMERO DE EMPLEADOS:</b> &nbsp; 10</p>        
      <br>
      <p><b>ACTIVIDAD ECONÓMICA:</b> &nbsp; AGRICULTURA, GANADERÍA, SILVICULTURA Y PESCA </p>
      <p><b>NOMBRE DEL RESPONSABLE DE <br> CAPACITACION EN LA EMPRESA: </b> &nbsp; __________________________________________________________________________________________________</p>   
      <p><b>CORREO ELECTRÓNICO:</b> &nbsp; _____________________________________________________________________________________________________________</p>  
      <br>
      <p><b>NOMBRE DE LA CAPACITACION:</b> Microsoft Excel Básico Online</p>  
      <br>
      <p><b>RAZON SOCIAL DEL ORGANIZADOR :</b> Asociación Institución Salesiana/ITR &nbsp; &nbsp;     <b>COSTE POR PERSONA :</b> $42.47  </p>
      <p><b>LUGAR DE EJECUCIÓN:</b> ONLINE  &nbsp; &nbsp;    <b>DEPARTAMENTO Y MUNICIPIO DE EJECUCION: </b> San Salvador, San Salvador   </p>  
      <p><b>No. HORAS : </b> 20 &nbsp; &nbsp;    <b>DETALLE DE FECHAS DE EJECUCION: </b> Sabado 16, 23 , 30 de enero , 6 y 13 de febrero de 2021  </p>  
      <p><b>Horarios : </b> 8:00 am a 12:00 md   </p>  
    </div>
    <div class="container">
    <table>
    <thead>
        <tr>
            <th>N°</th>
            <th>Nombre</th>
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
            <td>123456789</td>
            <td>05756113-8</td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
        </tr>
    </tbody>
</table>
    </div>
  </div>

</body>

</html>
`  };
// or //
//let file = { url: "http://localhost:8080/public/form/29" };

html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
  console.log("PDF Buffer:-", pdfBuffer);

});
