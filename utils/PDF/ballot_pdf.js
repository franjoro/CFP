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
      path: `./public/files/tmp/${tmpName}`,
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate:
        `
        <style>
           .contenedor{ width:80% !important;font-size:7px !important; text-align: left; border-top: solid thin; border-top-style: dotted; margin-left: 60px;}
           .margen{margin-top: 10px;}
           .aling-right{ text-align: right !important; float: right;}
        </style>
        <div class="contenedor">
            <span class="margen">
            <br>
                <b><i>INSAFORP-Gerencia de Formación Inicial. Programa Hábil Técnico Permanente.</i>\n</b>
            </span>
            <br>
            <span>
                <b><i>Vigencia: La presente boleta entra en vigencia a partir de su aprobación febrero 2011</i>  <b>          
            </span>
            <span class="pageNumber aling-right"></span>
        </div>
        `,
      margin: {
        top: "0px",
        bottom: "100px",
        right: "0px",
        left: "0px",
      },
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
                    <img src="/static/img/nit-front.jpg" alt="imagen">
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
                                <div class="col-12" style="border-left: solid thin; border-right: solid thin; border-bottom: solid thin; background-color: #d9d9d9;">
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
                                <div class="col-12" style="border-bottom: solid black; background-color: #d9d9d9;">Fecha de inscripción</div>
                                <div class="col-4" style="border-right: solid black;">22</div>
                                <div class="col-4" style="border-right: solid black;">05</div>
                                <div class="col-4">2021</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black; border-right: solid black; background-color: #FFCC99;">(Día)</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black; border-right: solid black; background-color: #FFFF99;">(Mes)</div>
                                <div class="col-4" style="font-size: 10px; border-top: solid black; background-color: #99CCFF;">(Año)</div>
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
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    OSMARO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid thin; border-top-style: dotted;  border-right: solid thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">1°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    ALFONSO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid thin; border-top-style: dotted; border-right: thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">2°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin;">
                                    -
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid thin; border-top-style: dotted; border-right: solid thin;">
                                        <span style="font-size: 10px;">3°Nombre</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    BONILLA
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-bottom: solid thin; border-top: solid thin; border-top-style: dotted;  border-right: solid thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">1°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    MESTIZO
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-bottom: solid thin; border-top: solid thin; border-top-style: dotted; border-right: thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">2°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin;">
                                    -
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-bottom: solid thin; border-top: solid thin; border-top-style: dotted; border-right: solid thin;">
                                        <span style="font-size: 10px;">3°Apellido</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="font-size: 13px; font-family: Arial">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <p><b>2.N° Docs</b></p>
                </div>
                <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <b>2.1. DUI:</b> 059088445
                        </div>
                        <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                            <b>2.2. NIT:</b> 0614-290209-000-0
                        </div>
                        <div class="col-5" style="border-bottom: solid thin;">
                            <b>2.3. Carné de menoridad: </b> AMP-TN-0643/2012
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4" style="border-right: solid thin;">
                            <b>2.4. ISSS:</b> -
                        </div>
                        <div class="col-4" style="border-right: solid thin;">
                            <b>2.5. Pasaporte:</b> - 
                        </div>
                        <div class="col-4">
                            <b>2.6. Otro: </b> -
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="font-size: 13px; font-family: Arial">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>3.Nacionalidad</b>
                        </div>
                    </div>
                </div>
                <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-8" style="border-right: solid thin;">
                            <div class="mt-1"></div>
                            <b>3.1.</b><span><input type="checkbox" aria-label="Checkbox for following text input">
                            </span> Salvadoreña <b>3.2.</b><span><input type="checkbox" aria-label="Checkbox for following text input"></span> Extranjera <span style="border: solid; background-color: #ffff99; border-style: dotted;">Si responde <b>"Extranjera" responda 3.3</b></span>
                        </div>
                        <div class="col-4">
                            <div class="mt-1"></div>
                            <b>3.3 País: </b> -
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>4. Lugar/fecha nacimiento</b>
                        </div>
                    </div>
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <div class="row mt-2 mb-3">
                                <div class="col-12">
                                    <b>4.1. Municipio:</b> TONACATEPEQUE
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <div class="row mt-2 mb-3">
                                <div class="col-12">
                                    <b>4.2. Departamento:</b> SAN SALVADOR
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <div class="row mt-2 mb-3">
                                <div class="col-12">
                                    <b>4.3 Fecha:</b> 08/02/2002
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            <b>5. Sexo:</b>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-6">
                                <div class="mt-2"></div>
                                <b>1 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Masculino</span>
                        </div>
                        <div class="col-6">
                                <div class="mt-2"></div>
                                <b>2 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Femenino</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="background-color: #d9d9d9; border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            <b>6. Edad:</b>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            19 (años cumplidos)
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>7. Cuantas personas integran su grupo familiar:</b>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            4
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>8. Estado familiar</b>
                        </div>
                    </div>
                </div>
                <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-1" >
                        <div class="col-2">
                            <b>1 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Soltero(a)</span>
                        </div>
                        <div class="col-2">
                            <b>2 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Casado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>3 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Acompañado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>4 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Divorciado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>5 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Separado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>6 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Viudo(a)</span>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row mt-2">
                        <div class="col-12">
                            <b>9. Jefe(a) de hogar</b>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-2">
                        <div class="col-4">
                        <b><span style="font-size: 10px;">1</span> </b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 10px;">Si</span>
                        </div>
                        <div class="col-4">
                            <b><span style="font-size: 10px;">2</spans></b><span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 10px;"> No</span>
                        </div>
                        <div class="col-4">
                            <b><span style="font-size: 10px;">3</span> </b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 10px;">Compartida</span>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>10. Tiene hijos</b>
                        </div>
                        <div class="col-12">
                            <span style="border: solid; background-color: #ffff99; border-style: dotted;">Si responde <b>"Si"</b> pase a <b>10.1.</b></span>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-2">
                        <div class="col-6">
                            <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6">
                            <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <b>10.1</b> N° de hijos: 0
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-3" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>11. Se dedica a alguna Profesión u Oficio:</b>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-6 mt-2">
                            <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6 mt-2">
                            <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
                <div class="col-7" style="border-bottom: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-6 mt-2">
                            <b>11.1 ¿A que Profesión u oficio se dedica?</b>
                        </div>
                        <div class="col-6 mt-1">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12">
                            <b>12. Domicilio</b>
                        </div>
                    </div>
                </div>
                <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="border: solid; background-color: #ffff99; border-style: dotted;">(Colonia, caserío, asentamiento o comunidad, seguido del nombre de la calle o pasaje, y por último el número de casa o lote)</span>
                        </div>
                        <div class="col-12">
                            <b>12.1. Dirección:</b> URB. CUMBRES DE SAN BORTOLO SENDA 7, POL 45, CASA 62
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>12.2. Municipio:</b> TONACATEPEQUE
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.3. Departamento: </b> SAN SALVADOR
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.4. Tel. Fijo:</b> 2222-2222
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin;">
                    <b>12.5. Tel. Movil:</b> 74919648
                </div>
                <div class="col-8" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.6. E-mail:</b> osma204bonillamestizo@hotmail.com
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row mt-2 mb-2">
                        <div class="col-12">
                            <b>13. ¿Tiene usted alguna discapacidad permanente?</b>                    
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-2 mb-2">
                        <div class="col-2">
                            <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-2">
                            <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin;">
                <div class="col-12 mt-2">
                    <b>13.1. ¿Cuál discapacidad tiene?</b> <span style="border: solid; background-color: #ffff99; border-style: dotted;">(Conteste en la casilla que corresponda, sólo si tiene alguna o varias dificultades para realizar actividades de la vida diaria)</span>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-4 mt-2" style="border-right: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Moverse o caminar
                                </div>
                                <div class="col-12">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Usar sus brazos o manos
                                </div>
                                <div class="col-12">
                                    <b>3 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Ver, aun usando lentes
                                </div>
                                <div class="col-12">
                                    <b>4 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Oír, aun usando aparatos especiales
                                </div>
                            </div>
                        </div>
                        <div class="col-8 mt-2">
                            <div class="row">
                                <div class="col-12">
                                    <b>5 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Hablar
                                </div>
                                <div class="col-12">
                                    <b>6 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Tiene algún retraso o deficiencia mental 
                                </div>
                                <div class="col-12">
                                    <b>7 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Bañarse, vestirse, alimentarse por si mismo
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 mt-2">
                                            <b>8 </b><span><input type="checkbox" aria-label="Checkbox for following text input">  Otra limitación permanente. Explique:
                                        </div>
                                        <div class="col-7 mb-1">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row" 
                style="background-color: #ffcc00; border: solid; border-width: thin;">
                <div class="col-12">
                    <h6 class="text-center mt-1"><b>SECCION 2. EDUCACIÓN FORMAL Y FORMACIÓN OCUPACIONAL</b></h6>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-left: solid thin; border-right: solid thin; border-bottom: solid thin; background-color: #d9d9d9;">
                    <b>1. ¿Sabe usted leer y escribir?</b>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-3">
                        <div class="col-12">
                            <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>1.1. ¿Sólo lee?</b>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>1.2. ¿Sólo escribe?</b>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>1.3. ¿Sólo firma (firma ó huella)?</b>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-4">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-4">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="font-size: 10px; font-family: Arial">
            <div class="row">
                <div class="col-4" style="border-right: solid thin; border-bottom: solid thin; border-left: solid thin; background-color: #d9d9d9;">
                    <b style="font-size: 13px;">2. ¿Cuál es el último grado de estudio finalizado?</b>
                </div>
                <div class="col-8" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-2">
                            <b style="font-size: 10px;">2.1. Educación Básica</b>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Ninguno
                                </div>
                                <div class="col-12">
                                    <b>6 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 5° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 1er. Gdo.
                                </div>
                                <div class="col-12">
                                    <b>7 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 6° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>3 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 2° Gdo
                                </div>
                                <div class="col-12">
                                    <b>8 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 7° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>4 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 3er. Gdo.
                                </div>
                                <div class="col-12">
                                    <b>9 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 8° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>5 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 4° Gdo.
                                </div>
                                <div class="col-12">
                                    <b>10 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> 9° Gdo.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border-left: solid thin; border-right: solid thin; border-bottom: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>2.2.</b> <span><input type="checkbox" aria-label="Checkbox for following text input"> Bachillerato
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Incompleto
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Completo
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-right: solid thin; border-bottom: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>2.3.</b> <span><input type="checkbox" aria-label="Checkbox for following text input"> Tecnológica
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Incompleta
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Completa
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-right: solid thin; border-bottom: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>2.4.</b> <span><input type="checkbox" aria-label="Checkbox for following text input"> Universitaria
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Incompleta
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Completa
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12" style="border-bottom: dashed thin;">
                            <b>2.5.</b><span><input type="checkbox" aria-label="Checkbox for following text input"> Otra edicación formal:
                        </div>
                        <div class="col-12"></div>
                    </div>
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-2">
                        <div class="col-12" style="border-bottom: dashed thin; height: 38px;">
                            <b>2.6.</b><span><input type="checkbox" aria-label="Checkbox for following text input">  Título o certificado obtenido: 
                        </div>
                        <div class="col-12"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-3" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <b>3. ¿Estudia usted actualmente? </b>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-1">
                            <div class="row">
                                <div class="col-6">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <span style="background-color: #ffff99;">Si responde <b>"No"</b> conteste <b>3.1</b></span>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-right: solid thin; border-bottom: solid thin; background-color: #d9d9d9;">
                    <b>3.1. ¿Hace cuánto tiempo dejó de estudiar?</b>
                </div>
                <div class="col-5" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-3">
                        <div class="col-3">
                            <b><span style="font-size: 9px;">1 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">1 año</span>

                        </div>
                        <div class="col-3">
                            <b><span style="font-size: 9px;">2 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">2-3 años</span>
                        </div>
                        <div class="col-4"
                            <b><span style="font-size: 9px;">3 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Más de 3 años</span>
                        </div>
                        <div class="col-2">
                            <b><span style="font-size: 9px;">4 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 9px;">NR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border-right: solid thin; border-bottom: solid thin; border-left: solid thin; background-color: #d9d9d9;">
                    <b>4. ¿Ha recibido antes algún(os) curso(s) de capacitación?</b>
                </div>
                <div class="col-7" style="border-right: solid thin; border-bottom: solid thin;">
                    <div class="row mt-1 mb-1">
                        <div class="col-6">
                            <div class="row">
                                <div class="col-4">
                                    <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-4">
                                    <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-12">
                                    <div style="background-color: #ffff99; border: dotted;">
                                        (Si responde <b>"No"</b> , pase a <b>Sec.3)</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border-bottom: solid thin; border-right: solid thin; border-left: solid thin;">
                    <br>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <br>
                    <br>
                    <br>
                </div>
            </div>
        </div>
        <br /><br />
        <br /><br />
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <b>5. Si, ¿Cuál(es)? Mencione solamente las recibida los últimos 3 años</b>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <b>¿Lo impartió INSAFORP? </b>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <b>Año</b>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>¿El curso le dio beneficios?</b>
                        </div>
                        <div class="col-12 mt-1">
                            <div class="row">
                                <div class="col-10 offset-1" style="border: solid; border-style: dotted; background-color: #ffff99;">
                                    <span>Si responde <b>Si</b>, conteste pregunta <b>6</b></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-1">
                            <div class="row">
                                <div class="col-10 offset-1" style="border: solid; border-style: dotted; background-color: #ffff99;">
                                    <span>Si responde <b>No</b>, conteste pregunta <b>7</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span>1)</span> Administración de redes sociales y Social Manager
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            2021
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span>2)</span> Administración de redes sociales y Social Manager
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            2021
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span>3)</span> Administración de redes sociales y Social Manager
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            2021
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <div class="row">
                        <div class="col-6 mt-1 mb-1">
                            <span style="border: solid thin; border-style: dotted; background-color: #ffff99;">Si recibió beneficios como producto de la capacitación, <b>responda 6</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>6. ¿Para que sirvió(eron) la(s) capacitacion(es) que recibió?</b> <span style="border: solid thin; border-style: dotted; background-color: #ffff99;">(Puede marcar más de 1)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Para obtener un empleo
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Para trabajar por cuenta propia 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Obtener oportunidades de promoción en mi empleo actual 
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Cambiar a un empleo relacionado con la capacitación recibida
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Obtener otros ingresos por trabajos extras 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">6</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Otro:
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <div class="row">
                        <div class="col-7 mt-1 mb-1">
                            <span style="border: solid thin; border-style: dotted; background-color: #ffff99;">Si no recibió beneficios como producto de la capacitación, <b>responda 7</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin; background-color: #d9d9d9;">
                    <b>7. ¿Por qué cree que no recibió beneficios como producto de la/las capacitación/es?</b>
                </div>
                <div class="col-7" style="border: solid thin;">
                    <p>Lorem ipsum, dolor sit amet consec</p>
                </div>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <b class="text-center">SECCION 3. INFORMACIÓN SOBRE SU SITUACIÓN LABORAL</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>SECCION 3.1. INFORMACIÓN SOBRE LA OCUPACIÓN ACTUAL </b><span style="border: solid thin; border-style: dotted; background-color: #ffff99;">Si no recibió beneficios como producto de la capacitación, <b>responda 7</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-5" style="border: solid thin; background-color: #d9d9d9;">
                    <b>1. ¿A qué actividad se dedica usted actualmente? </b>
                </div>
                <div class="col-7" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Estudia 

                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-4">
                                    <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Oficios del hogar
                                </div>
                                <div class="col-8">
                                    <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Trabaja
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Busca trabajo
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Otra:
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>2. Si usted trabaja, ¿Qué tipo de trabajo tiene? </b><span style="border: solid thin; border-style: dotted; background-color: #ffff99;">(Marcar solo una casilla)</span> <b>(Completar sólo en caso de estar trabajando)</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Empleo a tiempo completo 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Empleo a tiempo parcial 

                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Empleo temporal
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Negocio familiar 

                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Independiente o cuenta propia 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">6</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Trabajo informal
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">7</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Otro:
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>3. ¿En que Sector trabaja? </b><span style="border: solid thin; border-style: dotted; background-color: #ffff99;">(Marcar solo una casilla, completar sólo en caso de tener un empleo formal)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <div class="row">
                        <div class="col-2 mt-1 mb-1">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Sector Privado 
                        </div>
                        <div class="col-3 mt-1 mb-1">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Sector Público 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 3.2. EMPLEO FORMAL ANTERIOR. (Completar sólo en caso de NO estar trabajando)</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border: solid thin; background-color: #d9d9d9;">
                    <b>1. ¿Ha trabajado antes?</b> 
                </div>
                <div class="col-2" style="border: solid thin; border-right: none;">
                    <div class="row">
                        <div class="col-6 mt-3">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6 mt-3">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
                <div class="col-8" style="border: solid thin; border-left: none;">
                    <div class="row">
                        <div class="col-6 mt-3 mb-1">
                            <span style="border: solid thin; border-style: dotted; background-color: #ffff99;">
                                (Si responde <b>“No”</b>, pase a <b>Sección 4</b> )
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                    <div class="col-3" style="border: solid thin; background-color: #d9d9d9;">
                        <div class="row">
                            <div class="col-12">
                                <b>2. ¿Cuánto tiempo hace que no trabaja? </b>
                            </div>
                        </div>
                    </div>
                    <div class="col-9" style="border: solid thin;">
                        <div class="row">
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> 1 año o menos
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> 2 años
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> 3 años
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Más de 3 años
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 4. INFORMACIÓN SOBRE LOS INGRESOS</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-3" style="border: solid thin; background-color: #d9d9d9;">
                    <b>1. ¿Usted recibe ingresos? </b>
                </div>
                <div class="col-9" style="border: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col-4">
                                    <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> No
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-3" style="border: solid thin; background-color: #d9d9d9;">
                    <b>2. ¿Cuánto tiempo hace que no trabaja? </b>
                </div>
                <div class="col-9">
                    <div class="row">
                        <div class="col-6" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Trabajo
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Ayuda familiar
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Remesa
                                </div>
                            </div>
                        </div>
                        <div class="col-6" style="border: solid thin;">
                            <div class="row mt-3">
                                <div class="col-12">
                                    <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Pensión
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">5</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> Otra:
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br />
        <br />
        <br />
        <div class="container">
            <div class="row">
                <div class="col-12 text-center" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 5. EXPECTATIVA Y PERTINENCIA DE LA FORMACIÓN</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 5.1 EXPECTATIVAS RESPECTO A LA FORMACIÓN</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>1. ¿Qué espera lograr con la capacitación a recibir?</b> <span style="border: solid; border-style: dotted; background-color: #ffff99;">(Puede marcar varios)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Obtener oportunidades de promoción en mi empleo actual 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Cambiar a un empleo relacionado con la capacitación recibida
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input type="checkbox" aria-label="Checkbox for following text input">   Obtener un empleo formal
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Trabajar por cuenta propia 
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Obtener ingresos extras 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">6</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Otro:
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">7</span> <span><input type="checkbox" aria-label="Checkbox for following text input">  Ninguno
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 5.2 PERTINENCIA DE LA FORMACIÓN PROFESIONAL</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>1. Pertinencia del curso que está solicitando con su ocupación actual</b> <span style="border: solid; border-style: dotted; background-color: #ffff99;">(Marcar solo uno)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">1</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> El curso esta relacionado con su trabajo actual
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input type="checkbox" aria-label="Checkbox for following text input"> El curso esta relacionado con un nuevo trabajo
                        </div>
                        <div class="col-12">
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center" style="border: solid thin; background-color: #ffcc00;">
                    <b>SECCION 6. SEGUIMIENTO</b>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <div class="row">
                        <div class="col-12 mt-2 mb-2" style="font-size: 12px;">
                            <b>IMPORTANTE:</b> Por favor brinde información de 1 persona, en caso que el INSAFORP necesite ponerse en contacto con usted para un seguimiento de la capacitación.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-2" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <b>1. Nombre:</b>
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-4">
                            Ana Silvia Mestizo de Bonilla
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-1">
                            <span style="border: solid; border-style: dotted; background-color: #ffff99;">(Si no hay parentesco escribir: Amigo(a))</span>
                        </div>
                        <div class="col-12">
                            1.1 Parentesco: Abuela
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <b>1.2. Dirección:</b> Res. La gloria psje Ramos Lit 2A
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border: solid thin;">
                    <b>1.3. Municipio:</b> MEJICANOS
                </div>
                <div class="col-6" style="border: solid thin;">
                    <b>1.4. Departamento:</b> SAN SALVADOR
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border: solid thin;">
                    <b>1.5. Tel. Fijo:</b> 2277-5588
                </div>
                <div class="col-4" style="border: solid thin;">
                    <b>1.6. Tel. Movil:</b> 7775-2577
                </div>
                <div class="col-4" style="border: solid thin;">
                    <b>1.7. E-mail:</b> <span style="font-size: 12px;">osma204bonillamestizo@hotmail.com</span>
                </div>
            </div>
        </div>
        <br />
        <div class="container">
            <div class="row">
                <div class="col-12 ml-3">
                    <b>Por favor, ocupe este espacio para observaciones o sugerencias que considere útiles:</b>
                </div>
                <div class="col-12">
                    <span class="mr-3" style="float: right !important;">Gracias por su colaboración</span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row" style="border: solid thin;">
                <div class="col-12" style="border-bottom: solid; border-bottom-style: dotted;">
                    <br>
                </div>
                <div class="col-12" style="border-bottom: solid; border-bottom-style: dotted;">
                    <br>
                </div>
                <div class="col-12" style="border-bottom: solid; border-bottom-style: dotted;">
                    <br>
                </div>
                <div class="col-12">
                    <br>
                </div>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-10 offset-1">
                    <div class="row">
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CC99FF;">
                                    <div class="text-center">Lugar:</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CC99FF;">
                                    <div class="text-center">Firma interesado(a):</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CC99FF;">
                                    <div class="text-center">Fecha:</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-10 offset-1">
                    <div class="row">
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CCFFCC;">
                                    <div class="text-center">Entrevistó:</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CCFFCC;">
                                    <div class="text-center">Cargo de entrevistador(a):</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border: solid thin;">
                            <div class="row">
                                <div class="col-12">
                                    <br>
                                    <br>
                                </div>
                                <div class="col-12" style="border-top: solid thin; background-color: #CCFFCC;">
                                    <div class="text-center">Firma de entrevistador(a):</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border-bottom: solid; border-bottom-style: dotted;">
                    <br>
                </div>
                <div class="col-3 offset-4" style="border: solid; border-style: dotted;">
                    <br>
                    <br>
                    <br>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div class="text-center">
                        Nombre y Firma de Coordinador(a) del Programa en el Centro de Formación
                    </div>
                </div>
                <div class="col-3 offset-4">
                    <div class="text-center">
                        Sello
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