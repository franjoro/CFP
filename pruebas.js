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
  <br><br><br><br><br><br><br>
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
      <p><b>NOMBRE DE LA EMPRESA: </b> &nbsp; Almacenes SIMAN S.A. de CV.</p>
      <p><b>NIT DE LA EMPRESA: </b> &nbsp; &nbsp; 0614 - 180898 - 164-8</p>
      <p><b>TELEFONO: </b> &nbsp; &nbsp; +503 2278-0457</p>
      <p><b>APORTACIÓN MENSUAL AL INSAFORP:</b> &nbsp; &nbsp; +503 2278-0457 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
      <b>NUMERO PATRONAL:</b> 0567687   </p>
      <p><b>NUMERO DE EMPLEADOS</b> &nbsp; 10</p>        


      

      <br>
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
