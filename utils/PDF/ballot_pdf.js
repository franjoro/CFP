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
            <title>Document</title>
        </head>
        <body style="font-size: 15px; font-family: Arial">
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
                                    <div class="col-12" style="border-left: solid; border-right: solid; border-bottom: solid;">
                                        <span style="font-size: 14px;">N° de Formulario</span>
                                    </div>
                                    <div class="col-3" style="border-bottom: solid; border-left: solid; border-right: solid;"><br><br></div>
                                    <div class="col-3" style="border-bottom: solid; border-right: solid;"></div>
                                    <div class="col-3" style="border-bottom: solid; border-right: solid;"></div>
                                    <div class="col-3" style="border-bottom: solid; border-right: solid;"></div>
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
                <div class="row mt-1" 
                    style="background-color: #ffcc00; border: solid; border-width: thin;">
                    <div class="col-12">
                        <h6 class="text-center mt-1"><b>SECCIÓN 1. DATOS DE IDENTIFICACIÓN</b></h6>
                    </div>
                </div>
                <div class="row mt-1" style="border: solid; border-width: thin;">
                    <div class="col-1 align-middle" style="border-right: solid; border-right-width: thin; background-color: #d9d9d9;">
                        <b><p class="mt-4">1.Nombre</p></b>
                    </div>
                    <div class="col-11">
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-12" style="border-right: solid; border-right-width: thin;">
                                        OSMARO
                                    </div>
                                    <div class="col-12 text-center" style="background-color: #d9d9d9; border-top: solid; border-top-width: thin; border-right: solid; border-right-width: thin;">
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
                                            <span style="font-size: 10px;">3°Apellido</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                        <p><b>2.N° Docs</b></p>
                    </div>
                    <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                        <div class="row">
                            <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                                <b>2.1. DUI:</b> 059088445
                            </div>
                            <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                                <b>2.2. NIT:</b> - 
                            </div>
                            <div class="col-4" style="border-bottom: solid thin;">
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
                                <div class="mt-3"></div>
                                <b>3.1.</b><span><input type="checkbox" aria-label="Checkbox for following text input">
                                </span> Salvadoreña <b>3.2.</b><span><input type="checkbox" aria-label="Checkbox for following text input"></span> Extranjera <span style="border: solid; background-color: #ffff99; border-style: dotted;">Si responde <b>"Extranjera" responda 3.3</b></span>
                            </div>
                            <div class="col-4">
                                <div class="mt-3"></div>
                                <b>3.3 País: </b> El salvador
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                        <div class="row">
                            <div class="col-12">
                                <b>4. Lugar/fecha nacimiento</b>
                            </div>
                        </div>
                    </div>
                    <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                        <div class="row">
                            <div class="col-4" style="border-right: solid thin;">
                                <div class="mt-1"></div>
                                <div class="row">
                                    <div class="col-12">
                                        <b>4.1. Municipio:</b>
                                    </div>
                                    <div class="col-12">
                                        TONACATEPEQUE
                                    </div>
                                </div>
                            </div>
                            <div class="col-4" style="border-right: solid thin;">
                                <div class="mt-1"></div>
                                <div class="row">
                                    <div class="col-12">
                                        <b>4.2. Departamento:</b>
                                    </div>
                                    <div class="col-12">
                                        SAN SALVADOR
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mt-3"></div>
                                <b>4.3 Fecha:</b> 08/02/2002
                            </div>
                        </div>
                    </div>
                </div>

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
                            <div class="col-12">
                                    <div class="mt-2"></div>
                                    Masculino
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

                <div class="row">
                    <div class="col-2" style="border-bottom: solid thin; border-left: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                        <div class="row">
                            <div class="col-12">
                                <b>8. Estado familiar</b>
                            </div>
                        </div>
                    </div>
                    <div class="col-10" style="border-bottom: solid thin; border-right: solid thin;">
                        <div class="row">
                            <div class="col-2">
                                <b>1 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Soltero(a)</span>
                            </div>
                            <div class="col-2">
                                <b>2 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Casado(a)</span>
                            </div>
                            <div class="col-2">
                                <b>3 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Acompañado(a)</span>
                            </div>
                            <div class="col-2">
                                <b>4 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Divorciado(a)</span>
                            </div>
                            <div class="col-2">
                                <b>5 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Separado(a)</span>
                            </div>
                            <div class="col-2">
                                <b>6 </b><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Viudo(a)</span>
                            </div>
                        </div>                    
                    </div>
                </div>

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
                            <div class="col-3">
                            <b><span style="font-size: 12px;">1</span> </b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Si</span>
                            </div>
                            <div class="col-3">
                                <b><span style="font-size: 12px;">2</spans></b><span><input type="checkbox" aria-label="Checkbox for following text input"><span style="font-size: 12px;"> No</span>
                            </div>
                            <div class="col-6">
                                <b><span style="font-size: 12px;">3</span> </b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Compartida</span>
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
                <div class="row">
                    <div class="col-4" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin;">
                        <b>12.2. Municipio:</b> TONACATEPEQUE
                    </div>
                    <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                        <b>12.3. Departamento: </b> SAN SALVADOR
                    </div>
                    <div class="col-4" style="border-bottom: solid thin; border-right: solid thin;">
                        <b>12.4. Tel. Fijo:</b> 2222-2222
                    </div>
                </div>
                <div class="row">
                    <div class="col-4" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin;">
                        <b>12.5. Tel. Movil:</b> 74919648
                    </div>
                    <div class="col-8" style="border-bottom: solid thin; border-right: solid thin;">
                        <b>12.6. E-mail:</b> osma204bonillamestizo@hotmail.com
                    </div>
                </div>
                <div class="row">
                    <div class="col-6" style="border-left: solid thin; border-bottom: solid thin; border-right: solid thin; background-color: #d9d9d9;">
                        <b>13. ¿Tiene usted alguna discapacidad permanente?</b>
                    </div>
                    <div class="col-6" style="border-bottom: solid thin; border-right: solid thin;">
                        <div class="row">
                            <div class="col-2">
                                <b>1 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> Si
                            </div>
                            <div class="col-2">
                                <b>2 </b><span><input type="checkbox" aria-label="Checkbox for following text input"> No
                            </div>
                        </div>
                    </div>
                </div>
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
                <div class="row" 
                    style="background-color: #ffcc00; border: solid; border-width: thin;">
                    <div class="col-12">
                        <h6 class="text-center mt-1"><b>SECCION 2. EDUCACIÓN FORMAL Y FORMACIÓN OCUPACIONAL</b></h6>
                    </div>
                </div>
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
                <div class="row">
                    <div class="col-4" style="border-right: solid thin; border-bottom: solid thin; border-left: solid thin; background-color: #d9d9d9;">
                        <b>2. ¿Cuál es el último grado de estudio finalizado?</b>
                    </div>
                    <div class="col-8" style="border-bottom: solid thin; border-right: solid thin;">
                        <div class="row">
                            <div class="col-2">
                                <b style="font-size: 13px;">2.1. Educación Básica</b>
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
                                <b><span style="font-size: 9px;">1 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">1 año</span>

                            </div>
                            <div class="col-3">
                                <b><span style="font-size: 9px;">2 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">2-3 años</span>
                            </div>
                            <div class="col-4"
                                <b><span style="font-size: 9px;">3 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">Más de 3 años</span>
                            </div>
                            <div class="col-2">
                                <b><span style="font-size: 9px;">4 </span></b><span><input type="checkbox" aria-label="Checkbox for following text input"> <span style="font-size: 13px;">NR</span>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <div class="container" style="background-color: #ffff99; border: dotted;">
                                    (Si responde <b>"No"</b> , pase a <b>Sec.3)</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" style="border-bottom: solid thin; border-right: solid thin; border-left: solid thin;">
                        <br>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-11" style="border-top: dotted thin;">
                        <span style="font-size: 12px;"><b>INSAFORP-Gerencia de Formación Inicial. Programa Hábil Técnico Permanente.</b></span>
                    </div>
                    <div class="col-1" class="text-right" style="border-top: dotted thin;">
                        <span>1</span>
                    </div>
                    <div class="col-12">
                        <span style="font-size: 12px;"><b>Vigencia: La presente boleta entra en vigencia a partir de su aprobación febrero 2011</b></span>
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