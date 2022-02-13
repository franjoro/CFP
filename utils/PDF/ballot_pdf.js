//import library html-pdf-node
const html_to_pdf = require("html-pdf-node");
const moment = require('moment');

imgSrc = "https://globaleducation.academy/wp-content/uploads/2020/09/Insaforp-Logo.jpg";

const PrintPdf = (dataJson1, dataJson2, dataJson3, dataJson4, dataJson5) => {
    
    const data1 = JSON.parse(JSON.stringify(dataJson1));
    const data5 = JSON.parse(JSON.stringify(dataJson5));
    console.log(data5);
    const nombreCurso = data5[0].nombre_curso;
    const nombrePrograma = data5[0].nombre_programa;
    const horario = data5[0].Horario;
    var day = moment(data1[0].timestamp).format('DD');
    var month = moment(data1[0].timestamp).format('MM');
    var year = moment(data1[0].timestamp).format('YYYY');
    const dui = data1[0].dui;
    const nit = data1[0].nit;
    const nombres = ((data1[0].nombres).toUpperCase()).split(" ",3);
    const apellidos = ((data1[0].apellidos).toUpperCase()).split(" ",3);
    const sexo = data1[0].sexo;
    const cfamilia = data1[0].cfamilia;
    const estadoFamiliar = data1[0].estadoFamiliar;
    const jefeDeHogar = data1[0].jefeDeHogar;
    const nHijos = data1[0].nHijos;
    const booltrabajoantes= data1[0].booltrabajoantes;
    const profesion = data1[0].profesion;
    const depNacimiento = data1[0].depNacimiento;
    const munNacimiento = data1[0].munNacimiento;
    const fechNacimiento = (data1[0].fechNacimiento).replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    const edad =  moment().diff(data1[0].fechNacimiento, 'year');
    const depDomicilio = data1[0].depDomicilio;
    const munDomicilio = data1[0].munDomicilio;
    const direccionDom = data1[0].direccionDom;
    const telFijo = data1[0].telFijo;
    const telMovil = data1[0].telMovil;
    const email = data1[0].email;
    const discapacidadBool = data1[0].discapacidadBool;
    const discapacidad = JSON.parse((data1[0].discapacidad).replace(/ /g, ""));
    const textoDiscapacidad = data1[0].textoDiscapacidad;

    const data2 = JSON.parse(JSON.stringify(dataJson2));
    const sabeleerEscribir = data2[0].sabeleerEscribir;
    const leerEscribir = data2[0].leerEscribir;
    const soloFirma = data2[0].soloFirma;
    const gradoFinalizado = data2[0].gradoFinalizado;
    const estudiaActualmente = data2[0].estudiaActualmente;
    const tiempoestudio = data2[0].tiempoestudio;
    const cursosPasados = data2[0].cursosPasados;
    const beneficioCursos = data2[0].beneficioCursos;
    const curso1 = data2[0].curso1;
    const impartio1 = data2[0].impartio1;
    const year1 = data2[0].year1;
    const beneficio1 = data2[0].beneficio1;
    const curso2 = data2[0].curso2;
    const impartio2 = data2[0].impartio2;
    const year2 = data2[0].year2;
    const beneficio2 = data2[0].beneficio2;
    const curso3 = data2[0].curso3;
    const impartio3 = data2[0].impartio3;
    const year3 = data2[0].year3;
    const beneficio3 = data2[0].beneficio3;
    const txtTitleOr = data2[0].txtTitleOr;
    const txtOtherEduc = data2[0].txtOtherEduc;
    const txtOtro = data2[0].txtOtro;
    const cursopositivo = JSON.parse((data2[0].cursopositivo).replace(/ /g, ""));
    const nobeneficioc = data2[0].nobeneficioc;
    const actividades = JSON.parse((data2[0].actividades).replace(/ /g, ""));
    const trabajaantes = data2[0].trabajaantes;
    const tiempoSinTrabajarselect = data2[0].tiempoSinTrabajarselect;
    const tipoempleo = data2[0].tipoempleo;
    const sectorDeTrabajo = data2[0].sectorDeTrabajo;
    const recibeIngresos = data2[0].recibeIngresos;
    const txtOtherWork = data2[0].txtOtherWork;
    const sectortrabajo = data2[0].sectortrabajo;
    const ingresos = JSON.parse((data2[0].ingresos).replace(/ /g, ""));
    const espectativaLogro = JSON.parse((data2[0].espectativaLogro).replace(/ /g, ""));
    const pertinencia = data2[0].pertinencia;        

    const data3 = JSON.parse(JSON.stringify(dataJson3));
    const nombreContacto = (data3[0].nombreContacto).toUpperCase();
    const parentesco = data3[0].parentesco;
    const direccionContacto = (data3[0].direccionContacto).toUpperCase();
    const departcontact = data3[0].departcontact;
    const municipiocontacto = data3[0].municipiocontacto;
    const fijoContact = data3[0].fijoContact;
    const movilContacto = data3[0].movilContacto;
    const emailContacto = data3[0].emailContacto;

    const data4 = dataJson4;
    console.log(data4);

    // promise
    return new Promise((resolver, rechazar) => {
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
        <body style="font-size: 13px; font-family: Arial">
          <style>
            html { 
                -webkit-print-color-adjust: exact; 
                -webkit-filter: opacity(1);
                -webkit-filter: blur(0);
            }
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
                <img src="https://cfp.ricaldone.edu.sv/static/img/logo-ant-insaforp.jpg" class="img-fluid" alt="imagen" style="position: absolute; bottom: -18px; right: 5px;">
            </div>
            <div class="col-5 mb-1" style="border-radius: 8px; height: 50px; border: solid; box-shadow: 5px 5px 0 #ff5e00;">
                <p class="text-center" style="position: absolute; top: 15px; left: 50px;">
                    PROGRAMA: ${nombrePrograma}
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
                                <div class="col-12" style="border: solid thin; background-color: #d9d9d9;">
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
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-left"><b>Nombre del Curso de interés:</b> ${nombreCurso}</p>
                                </div>
                                <div class="col-8" style="border-bottom: solid thin; position: absolute; bottom: 15px; right: 50px;">
                                    <br>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-left"><b>Horario:</b> <span style="font-size: 12px;">${horario}</span></p>
                                </div>
                                <div class="col-9" style="border-bottom: solid thin; position: absolute; bottom: 15px; right: 30px;">
                                    <br>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-left"><b>Lugar:</b> Herramientas Tecnológicas.</p>
                                </div>
                                <div class="col-9" style="border-bottom: solid thin; position: absolute; bottom: 15px; right: 40px;">
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-10 offset-2">
                            <div class="row">
                                <div class="col-12">
                                    <span class="text-center" style="font-size: 10px; position: relative; left: 30px;">(EXCLUSIVO USO INTERNO)</span>
                                </div>
                            </div>
                            <div class="row text-center" style="border-style: solid;">
                                <div class="col-12" style="border-bottom: solid black; background-color: #d9d9d9;">Fecha de inscripción</div>
                                <div class="col-4" style="border-right: solid black;">${day}</div>
                                <div class="col-4" style="border-right: solid black;">${month}</div>
                                <div class="col-4">${year}</div>
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
                                    ${nombres[0]}
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid thin; border-top-style: dotted;  border-right: solid thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">1°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    ${(nombres[1] == undefined || nombres[1] == '') ? '-' : nombres[1] }
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid thin; border-top-style: dotted; border-right: thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">2°Nombre</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin;">
                                    ${(nombres[2] == undefined || nombres[2] == '') ? '-' : nombres[2]}
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
                                    ${apellidos[0]}
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-bottom: solid thin; border-top: solid thin; border-top-style: dotted;  border-right: solid thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">1°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin; border-right-style: dotted;">
                                    ${(apellidos[1] == undefined || apellidos[1] == '') ? '-' : apellidos[1]}
                                </div>
                                <div class="col-12 text-center" style="background-color: #d9d9d9; border-bottom: solid thin; border-top: solid thin; border-top-style: dotted; border-right: thin; border-right-style: dotted;">
                                        <span style="font-size: 10px;">2°Apellido</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12" style="border-right: solid thin;">
                                    ${(apellidos[2] == undefined || apellidos[2] == '') ? '-' : apellidos[2] }
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
                            <b>2.1. DUI:</b> ${dui}
                        </div>
                        <div class="col-3" style="border-bottom: solid thin; border-right: solid thin; font-size: 11px;">
                            <b>2.2. NIT:</b> ${nit}
                        </div>
                        <div class="col-5" style="border-bottom: solid thin;">
                            <b>2.3. Carné de menoridad: </b> -
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
                        <div class="col-8" style="border-right: solid thin; font-sixe: 11px;">
                            <div class="mt-1"></div>
                            <b>3.1.</b><span><input checked type="checkbox" aria-label="Checkbox for following text input">
                            </span> Salvadoreña <b>3.2.</b><span><input type="checkbox" aria-label="Checkbox for following text input"></span> Extranjera <span style="border: solid; background-color: #ffff99; border-style: dotted;">Si responde <b style="font-size: 11px;">"Extranjera" responda 3.3</b></span>
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
                                    <b>4.1. Municipio:</b> ${data4.munNacimiento}
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <div class="row mt-2 mb-3">
                                <div class="col-12">
                                    <b>4.2. Departamento:</b> ${data4.depNacimiento}
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                            <div class="row mt-2 mb-3">
                                <div class="col-12">
                                    <b>4.3 Fecha:</b> ${fechNacimiento}
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
                                <b>1 </b><input ${ sexo == 'Masculino' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Masculino</span>
                        </div>
                        <div class="col-6">
                                <div class="mt-2"></div>
                                <b>2 </b><input ${ sexo == 'Femenino' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Femenino</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="background-color: #d9d9d9; border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            <b style="font-size: 10px;">6. Edad:</b>
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-2"></div>
                            ${edad} (años cumplidos)
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
                            ${cfamilia}
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
                            <b>1 </b><input ${ estadoFamiliar == 'Soltero(a)' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Soltero(a)</span>
                        </div>
                        <div class="col-2">
                            <b>2 </b><input ${ estadoFamiliar == 'Casado(a)' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Casado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>3 </b><input ${ estadoFamiliar == 'Acompanado' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 9px;">Acompañado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>4 </b><input ${ estadoFamiliar == 'Divorciado(a)' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Divorciado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>5 </b><input ${ estadoFamiliar == 'Separado(a)' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Separado(a)</span>
                        </div>
                        <div class="col-2">
                            <b>6 </b><input ${ estadoFamiliar == 'Viudo(a)' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Viudo(a)</span>
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
                        <b><span style="font-size: 10px;">1</span> </b><span><input ${ jefeDeHogar == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 10px;">Si</span>
                        </div>
                        <div class="col-4">
                            <b><span style="font-size: 10px;">2</spans></b><span><input ${ jefeDeHogar == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 10px;"> No</span>
                        </div>
                        <div class="col-4">
                            <b><span style="font-size: 10px;">3</span> </b><span><input ${ jefeDeHogar == 'Compartida' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 9px;">Compartida</span>
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
                            <b>1 </b><span><input ${ nHijos > 0 ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6">
                            <b>2 </b><span><input ${ nHijos == 0 ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <b>10.1</b> N° de hijos: ${ nHijos }
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
                            <b>1 </b><span><input ${booltrabajoantes == 'si' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6 mt-2">
                            <b>2 </b><span><input ${booltrabajoantes == 'no' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> No
                        </div>
                    </div>
                </div>
                <div class="col-7" style="border-bottom: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                    <div class="row">
                        <div class="col-6 mt-2">
                            <b>11.1 ¿A que Profesión u oficio se dedica?</b>
                        </div>
                        <div class="col-6 mt-1">
                            <input type="text" class="form-control" value="${ profesion }">
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
                            <b>12.1. Dirección:</b> ${ direccionDom }
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
                            <b>12.2. Municipio:</b> ${data4.munDomicilio}
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.3. Departamento: </b> ${data4.depDomicilio}
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.4. Tel. Fijo:</b> ${ telFijo }
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin;">
                    <b>12.5. Tel. Movil:</b> ${ telMovil }
                </div>
                <div class="col-8" style="border-bottom: solid thin; border-right: solid thin;">
                    <b>12.6. E-mail:</b> ${ email }
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
                            <b>1 </b><span><input ${ discapacidadBool == 'si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-2">
                            <b>2 </b><span><input ${ discapacidadBool == 'no' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
                                    <b>1 </b><span><input ${ discapacidad.moverseCaminar == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Moverse o caminar
                                </div>
                                <div class="col-12">
                                    <b>2 </b><span><input ${ discapacidad.usarBrazosPiernas  == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Usar sus brazos o manos
                                </div>
                                <div class="col-12">
                                    <b>3 </b><span><input ${ discapacidad.verLentes == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Ver, aun usando lentes
                                </div>
                                <div class="col-12">
                                    <b>4 </b><span><input ${ discapacidad.oirAparatos == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Oír, aun usando aparatos especiales
                                </div>
                            </div>
                        </div>
                        <div class="col-8 mt-2">
                            <div class="row">
                                <div class="col-12">
                                    <b>5 </b><span><input ${ discapacidad.hablar == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Hablar
                                </div>
                                <div class="col-12">
                                    <b>6 </b><span><input ${ discapacidad.retrasoMental == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Tiene algún retraso o deficiencia mental 
                                </div>
                                <div class="col-12">
                                    <b>7 </b><span><input ${ discapacidad.vestirseAlimentarse == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Bañarse, vestirse, alimentarse por si mismo
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 mt-2">
                                            <b>8 </b><span><input ${ discapacidad.otro == 'true' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input">  Otra limitación permanente. Explique:
                                        </div>
                                        <div class="col-7 mb-1">
                                            <input type="text" class="form-control" value="${ (textoDiscapacidad == 'null' || textoDiscapacidad == null) ? '': textoDiscapacidad }">
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
                            <b>1 </b><span><input ${ sabeleerEscribir == 1 ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
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
                                    <b>1 </b><span><input ${ leerEscribir == 'Leer' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input ${ leerEscribir != 'Leer' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
                                    <b>1 </b><span><input ${ leerEscribir == 'Escribir' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input ${ leerEscribir != 'Escribir' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
                                    <b>1 </b><span><input ${ (leerEscribir == 'soloFirma' || leerEscribir == 'Ninguno') ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-4">
                                    <b>2 </b><span><input ${ (leerEscribir != 'soloFirma' && leerEscribir != 'Ninguno') ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
                                    <b>1 </b><span><input ${ gradoFinalizado == 'Ninguno' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Ninguno
                                </div>
                                <div class="col-12">
                                    <b>6 </b><span><input ${ gradoFinalizado == '5' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 5° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>2 </b><span><input ${ gradoFinalizado == '1' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 1er. Gdo.
                                </div>
                                <div class="col-12">
                                    <b>7 </b><span><input ${ gradoFinalizado == '6' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 6° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>3 </b><span><input ${ gradoFinalizado == '2' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 2° Gdo
                                </div>
                                <div class="col-12">
                                    <b>8 </b><span><input ${ gradoFinalizado == '7' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 7° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>4 </b><span><input ${ gradoFinalizado == '3' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 3er. Gdo.
                                </div>
                                <div class="col-12">
                                    <b>9 </b><span><input ${ gradoFinalizado == '8' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 8° Gdo.
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row mt-1">
                                <div class="col-12">
                                    <b>5 </b><span><input ${ gradoFinalizado == '4' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 4° Gdo.
                                </div>
                                <div class="col-12">
                                    <b>10 </b><span><input ${ gradoFinalizado == '9' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> 9° Gdo.
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
                            <b>2.2.</b> <span><input ${ (gradoFinalizado == 'BachInc' || gradoFinalizado == 'BachCom') ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Bachillerato
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input ${ gradoFinalizado == 'BachInc' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Incompleto
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input ${ gradoFinalizado == 'BachCom' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Completo
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-right: solid thin; border-bottom: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>2.3.</b> <span><input ${ (gradoFinalizado == 'TecCom' || gradoFinalizado == 'TecInc') ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Tecnológica
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input ${ gradoFinalizado == 'TecInc' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Incompleta
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input ${ gradoFinalizado == 'TecInc' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Completa
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-right: solid thin; border-bottom: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <b>2.4.</b> <span><input ${ (gradoFinalizado == 'UniInc' || gradoFinalizado == 'UniCom') ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Universitaria
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">1</span> <span><input ${ gradoFinalizado == 'UniInc' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Incompleta
                        </div>
                        <div class="col-10 offset-2">
                            <span style="font-size: 12px;">2</span> <span><input ${ gradoFinalizado == 'UniCom' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Completa
                        </div>
                    </div>
                </div>
                <div class="col-2" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12" style="border-bottom: dashed thin;">
                            <b>2.5.</b><span><input ${ txtOtherEduc != ''? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> Otra edicación formal:
                        </div>
                        <div class="col-12" style="font-size: 12px">
                            ${txtOtherEduc}
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                    <div class="row mt-2">
                        <div class="col-12" style="border-bottom: dashed thin; height: 38px;">
                            <b>2.6.</b><span><input ${ txtTitleOr != ''? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input">  Título o certificado obtenido: 
                        </div>
                        <div class="col-12" style="font-size: 12px">
                            ${txtTitleOr}
                        </div>
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
                                    <b>1 </b><span><input ${ estudiaActualmente == '1' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <b>2 </b><span><input ${ estudiaActualmente == '0' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
                            <b><span style="font-size: 9px;">1 </span></b><span><input ${ tiempoestudio == '1y' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">1 año</span>

                        </div>
                        <div class="col-3">
                            <b><span style="font-size: 9px;">2 </span></b><span><input ${ tiempoestudio == '2-3y' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">2-3 años</span>
                        </div>
                        <div class="col-4"
                            <b><span style="font-size: 9px;">3 </span></b><span><input ${ tiempoestudio == '3y' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 11px;">Más de 3 años</span>
                        </div>
                        <div class="col-2">
                            <b><span style="font-size: 9px;">4 </span></b><span><input ${ tiempoestudio == 'No recuerda' ? 'checked': '' } type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 9px;">NR</span>
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
                                    <b>1 </b><span><input ${cursosPasados == '1' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-4">
                                    <b>2 </b><span><input ${cursosPasados == '0' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> No
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
        <br /><br />
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
                                <div class="col-11">
                                    <span style="border: solid; border-style: dotted; background-color: #ffff99; font-size: 10px;">Si responde <b>Si</b>, conteste pregunta <b>6</b></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-1">
                            <div class="row">
                                <div class="col-11">
                                    <span style="border: solid; border-style: dotted; background-color: #ffff99; font-size: 10px;">Si responde <b>No</b>, conteste pregunta <b>7</b></span>
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
                            <span>1)</span> ${curso1}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input ${impartio1 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input ${impartio1 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 8px;">3</span> <span><input ${impartio1 == 'NoSe' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            ${year1}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input ${beneficio1 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input ${beneficio1 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input ${beneficio1 == 'NR' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
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
                            <span>2)</span> ${curso2}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input ${impartio2 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input ${impartio2 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 10px;">3</span> <span><input ${impartio2 == 'NoSe' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            ${year2}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input ${beneficio2 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input ${beneficio2 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input ${beneficio2 == 'NR' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
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
                            <span>3)</span> ${curso3}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-3">
                            <span style="font-size: 10px;">1</span> <span><input ${impartio3 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-3">
                            <span style="font-size: 10px;">2</span> <span><input ${impartio3 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 11px;"> No</span>
                        </div>
                        <div class="col-6">
                            <span style="font-size: 10px;">3</span> <span><input ${impartio3 == 'NoSe' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No sabe</span>
                        </div>
                    </div>
                </div>
                <div class="col-1" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            ${year3}
                        </div>
                    </div>
                </div>
                <div class="col-3" style="border-bottom: solid thin; border-top: solid thin; border-right: solid thin;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size: 10px;">1</span> <span><input ${beneficio3 == 'Si' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> Si</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">2</span> <span><input ${beneficio3 == 'No' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size: 10px;">3</span> <span><input ${beneficio3 == 'NR' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> NR</span>
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
                            <span style="font-size: 12px;">1</span> <span><input ${ cursopositivo.obtenerEmpleo == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Para obtener un empleo
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input ${ cursopositivo.trabajarPropio == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Para trabajar por cuenta propia 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input ${ cursopositivo.oportunidadProm == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Obtener oportunidades de promoción en mi empleo actual 
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input ${ cursopositivo.cambiarEmpleo == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Cambiar a un empleo relacionado con la capacitación recibida
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input ${ cursopositivo.otrosIngresos == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Obtener otros ingresos por trabajos extras 
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
                    <p>${ nobeneficioc }</p>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center" style="border: solid thin; background-color: #ffcc00;">
                    <p class="text-center"><b class="text-center">SECCION 3. INFORMACIÓN SOBRE SU SITUACIÓN LABORAL</b><p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin; background-color: #ffcc00;">
                    <div class="row">
                        <div class="col-12 mt-1 mb-1">
                            <b>SECCION 3.1. INFORMACIÓN SOBRE LA OCUPACIÓN ACTUAL </b><span style="border: solid thin; border-style: dotted; background-color: #ffff99;">Puede marcar más de 1 casilla)</span>
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
                            <span style="font-size: 12px;">1</span> <span><input ${ actividades.estudia == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Estudia 

                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-4">
                                    <span style="font-size: 12px;">2</span> <span><input ${ actividades.oficiosHogar == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Oficios del hogar
                                </div>
                                <div class="col-8">
                                    <span style="font-size: 12px;">3</span> <span><input ${ actividades.trabaja == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Trabaja
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input ${ actividades.buscaTrabajo == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Busca trabajo
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input ${ actividades.otro == 'true' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Otra: ${txtOtro}
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
                            <span style="font-size: 12px;">1</span> <span><input ${ tipoempleo == 'tmpcompleto' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Empleo a tiempo completo 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input ${ tipoempleo == 'tmpparcial' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Empleo a tiempo parcial 

                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input ${ tipoempleo == 'temporal' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input">  Empleo temporal
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input ${ tipoempleo == 'negocio' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Negocio familiar 

                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input ${ tipoempleo == 'inde' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Independiente o cuenta propia 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">6</span> <span><input ${ tipoempleo == 'informal' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Trabajo informal
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">7</span> <span><input ${ tipoempleo == 'otro' ? 'checked' : '' } type="checkbox" aria-label="Checkbox for following text input"> Otro: ${txtOtherWork}
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
                            <span style="font-size: 12px;">1</span> <span><input ${sectortrabajo == 'privado' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Sector Privado 
                        </div>
                        <div class="col-3 mt-1 mb-1">
                            <span style="font-size: 12px;">2</span> <span><input ${sectortrabajo == 'publico' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Sector Público 
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
                            <span style="font-size: 12px;">1</span> <span><input ${trabajaantes == '1' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Si
                        </div>
                        <div class="col-6 mt-3">
                            <span style="font-size: 12px;">2</span> <span><input ${trabajaantes == '0' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> No
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
                                <span style="font-size: 12px;">1</span> <span><input ${tiempoSinTrabajarselect == '1y-' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> 1 año o menos
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">2</span> <span><input ${tiempoSinTrabajarselect == '2y' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> 2 años
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">3</span> <span><input ${tiempoSinTrabajarselect == '3y' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> 3 años
                            </div>
                            <div class="col-3 mt-2">
                                <span style="font-size: 12px;">4</span> <span><input ${tiempoSinTrabajarselect == '3y+' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Más de 3 años
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
                                    <span style="font-size: 12px;">1</span> <span><input ${recibeIngresos == '1' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> Si
                                </div>
                                <div class="col-6">
                                    <span style="font-size: 12px;">2</span> <span><input ${recibeIngresos == '0' ? 'checked' : ''} type="checkbox" aria-label="Checkbox for following text input"> No
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
                                    <span style="font-size: 12px;">1</span> <span><input ${ingresos.trabajo == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> Trabajo
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">2</span> <span><input ${ingresos.ayudaFamiliar == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> Ayuda familiar
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">3</span> <span><input ${ingresos.remesa == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> Remesa
                                </div>
                            </div>
                        </div>
                        <div class="col-6" style="border: solid thin;">
                            <div class="row mt-3">
                                <div class="col-12">
                                    <span style="font-size: 12px;">4</span> <span><input ${ingresos.pension == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> Pensión
                                </div>
                                <div class="col-12">
                                    <span style="font-size: 12px;">5</span> <span><input ${ingresos.otros == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> Otra: ${ingresos.otrosIngresos}
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
                            <span style="font-size: 12px;">1</span> <span><input ${espectativaLogro.oportunidadProm == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Obtener oportunidades de promoción en mi empleo actual 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input ${espectativaLogro.cambEmpleo == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Cambiar a un empleo relacionado con la capacitación recibida
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">3</span> <span><input ${espectativaLogro.obtenerEmpleo == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">   Obtener un empleo formal
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">4</span> <span><input ${espectativaLogro.trabajarPropio == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Trabajar por cuenta propia 
                        </div>
                    </div>
                </div>
                <div class="col-6" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12">
                            <span style="font-size: 12px;">5</span> <span><input ${espectativaLogro.ingresosExtra == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Obtener ingresos extras 
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">6</span> <span><input ${espectativaLogro.otro == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Otro: ${espectativaLogro.otrosexpectativas}
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">7</span> <span><input ${espectativaLogro.ninguno == 'true' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input">  Ninguno
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
                            <span style="font-size: 12px;">1</span> <span><input ${pertinencia == 'trabajoactual' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> El curso esta relacionado con su trabajo actual
                        </div>
                        <div class="col-12">
                            <span style="font-size: 12px;">2</span> <span><input ${pertinencia == 'nuevotrabajo' ? 'checked': ''} type="checkbox" aria-label="Checkbox for following text input"> El curso esta relacionado con un nuevo trabajo
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
                            ${nombreContacto}
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border: solid thin;">
                    <div class="row">
                        <div class="col-12 mt-1">
                            <span style="border: solid; border-style: dotted; background-color: #ffff99;">(Si no hay parentesco escribir: Amigo(a))</span>
                        </div>
                        <div class="col-12">
                            1.1 Parentesco: ${parentesco}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12" style="border: solid thin;">
                    <b>1.2. Dirección:</b> ${direccionContacto}
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6" style="border: solid thin;">
                    <b>1.3. Municipio:</b> ${data4.departcontact}
                </div>
                <div class="col-6" style="border: solid thin;">
                    <b>1.4. Departamento:</b> ${data4.municipiocontacto}
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-4" style="border: solid thin;">
                    <b>1.5. Tel. Fijo:</b> ${fijoContact}
                </div>
                <div class="col-4" style="border: solid thin;">
                    <b>1.6. Tel. Movil:</b> ${movilContacto}
                </div>
                <div class="col-4" style="border: solid thin;">
                    <b>1.7. E-mail:</b> <span style="font-size: 12px;">${emailContacto}</span>
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