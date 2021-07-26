// Require library
const xl = require('excel4node');
// Create a new instance of a Workbook class
const wb = new xl.Workbook();

const option = {
    'margins': { 
        'bottom': 0,
        'footer': 0,
        'header': 0,
        'left': 0,
        'right': 0,
        'top': 0
    },
    'pageSetup': {
      'fitToHeight': 1 ,
      'fitToWidth': 1 
    }
};


// Add Worksheets to the workbook
const ws = wb.addWorksheet('Sheet 1',option);

ws.addImage({
  path: './public/img/logoi.png',
  type: 'picture',
  position: {
    type: 'twoCellAnchor',
    from: {
      col: 1,
      colOff: 0,
      row: 1,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 4,
      rowOff: 0,
    },
  },
});

  ws.addImage({
    path: './public/img/logo.png',
    type: 'picture',
    position: {
      type: 'twoCellAnchor',
      from: {
        col: 13,
        colOff: 0,
        row: 1,
        rowOff: 0,
      },
      to: {
        col: 15,
        colOff: 0,
        row: 4,
        rowOff: 0,
      },
    },
  });

const borders = {
  left: {
    style: 'medium',
    color: 'black'
  },
  right: {
    style: 'medium',
    color: 'black'
  },
  top: {
    style: 'medium',
    color: 'black'
  },
  bottom: {
    style: 'medium',
    color: 'black'
  },
};

const styleHeaderEstaticoColor = wb.createStyle({
  font: {
    bold: true,
  },
  border : borders,
  alignment: {
    horizontal: 'center',
    wrapText: true,
    vertical: 'center'
  },
});



const styleHeaderEstatico = wb.createStyle({
  font: {
    bold: true,
  },
  border : borders,
  alignment: {
    horizontal: 'center',
    wrapText: true,
    vertical: 'center'
  },
});

const styleHeaderEstaticoSmall = wb.createStyle({
  font: {
    bold: true,
    size: 10
  },
  border : borders,
  alignment: {
    vertical: 'center',
    horizontal: 'center',
    wrapText: true
  },
});

const styleHeaderEstaticoSmallNoBorders = wb.createStyle({
    font: {
      bold: true,
      size: 10
    },
    alignment: {
      vertical: 'center',
      horizontal: 'center',
      wrapText: true
    },
  });

const styleActividades = wb.createStyle({
  font: {
    bold: true,
    size: 10,
  },
  border : borders,
  alignment: {
    horizontal: 'center',
    wrapText: true,
    vertical: 'center'
  }
});

const styleNumbers = wb.createStyle({
  font: {
    size: 10
  },
  border : borders,
  alignment: {
    horizontal: 'center',
    wrapText: true,
    vertical: 'center'
  }
});

const styleHeaderHorizontalLeftSmall = wb.createStyle({
    font: {
      bold: true,
      size: 10,
    },
    alignment: {
      horizontal: 'left',
      wrapText: true,
      vertical: 'center'
    },
  });

const styleHeaderHorizontalRightSmallBorders = wb.createStyle({
    font: {
      bold: true,
      size: 10,
    },
    border : borders,
    alignment: {
      horizontal: 'right',
      wrapText: true,
      vertical: 'center'
    },
});

const styleHeaderHorizontalLeftSmallBorders = wb.createStyle({
    font: {
      bold: true,
      size: 10,
    },
    border : borders,
    alignment: {
      horizontal: 'left',
      wrapText: true,
      vertical: 'center'
    },
});
  

// HEADER ESTATICO
ws.cell(1, 1, 3, 3, true).string('').style(styleHeaderEstaticoSmallNoBorders);
ws.cell(1, 13, 3, 14, true).string('').style(styleHeaderEstaticoSmallNoBorders);
ws.cell(1, 4, 3, 12, true).string('CONSOLIDADO DE RENDIMIENTO EVALUATIVO MENSUAL').style(styleHeaderEstaticoSmallNoBorders);
ws.cell(4, 1, 4, 14, true).string('CARRERA: ADMINISTRADOR TECNICO DE EMPRESAS INDUSTRIALES GRUPO 1 N°1 INCREMENTO, OFERTA N°89 ITEM 5 CONTRATO 24851').style(styleHeaderHorizontalLeftSmall);
ws.cell(5, 1, 5, 11, true).string('MODALIDAD: EMPRESA CENTRO').style(styleHeaderHorizontalLeftSmall);
ws.cell(6, 1, 6, 11, true).string('HORARIO: LUNES A VIERNES DE 7:00 A.M. A 4:00 P.M.').style(styleHeaderHorizontalLeftSmall);
ws.cell(7, 1, 7, 11, true).string('CODIGO:03ADTP01').style(styleHeaderHorizontalLeftSmall);


ws.cell(5, 12, 5, 14, true).string('MES REPORTADO: MAYO 2021').style(styleHeaderHorizontalLeftSmall);
ws.cell(6, 12, 6, 14, true).string('INSTRUCTOR PRINCIPAL: ING. REINA CABRERA').style(styleHeaderHorizontalLeftSmall);



// ACTIVIDADES ESTATICO
ws.cell(9, 1, 13, 1, true).string('No.').style(styleActividades);
ws.cell(9, 2, 13, 5, true).string('APELLIDOS NOMBRES').style(styleActividades);
ws.cell(9, 6, 13, 6, true).string('INDUCCIÓN Y NIVELACIÓN').style(styleActividades);
ws.cell(9, 7, 13, 7, true).string('INFORMATICA BÁSICA').style(styleActividades);
ws.cell(9, 8, 13, 8, true).string('INGLES BÁSICO').style(styleActividades);
ws.cell(9, 9, 13, 9, true).string('PROMEDIO DE MODULO DE NIVELACIÓN').style(styleActividades);
ws.cell(9, 10, 13, 10, true).string('MODULO AVANZADO').style(styleActividades);
ws.cell(9, 11, 13, 11, true).string('INDUCCIÓN A IT').style(styleActividades);
ws.cell(9, 12, 13, 12, true).string('MAQUINARIA').style(styleActividades);
ws.cell(9, 13, 13, 13, true).string('INGLES INTERMEDIO').style(styleActividades);
ws.cell(9, 14, 13, 14, true).string('PROMEDIO').style(styleActividades);


// // Alumnos y notas

let column = 13;

const getRandomNumber = (max) =>{
    return Math.floor(Math.random() * max) + 1;
};

let nStudents = 0;
for (let index = 1; index <= 20; index++) {
    let nota1 = getRandomNumber(10);
    let nota2 = getRandomNumber(10);
    let nota3 = getRandomNumber(10);
    let nota4 = getRandomNumber(10);
    let promedio1 = (nota1 + nota2)/2;
    let promedio2 = (nota3 + nota4)/2;
    let procentaje1 = (promedio1*0.20);
    let procentaje2 = (promedio2*0.80);
    let total = procentaje1+ procentaje2;
    ws.cell(column+1, 1 ).number(index).style(styleNumbers);
    ws.cell(column+1, 2, column+1, 5, true).string('Nombre alumno').style(styleHeaderEstaticoSmall);
    ws.cell(column+1, 6 ).number( nota1 ).style(styleNumbers);
    ws.cell(column+1, 7 ).number( nota2 ).style(styleNumbers);
    ws.cell(column+1, 8 ).number( promedio1 ).style(styleNumbers);
    ws.cell(column+1, 9 ).number( procentaje1 ).style(styleNumbers);
    ws.cell(column+1, 10 ).number( nota3 ).style(styleNumbers);
    ws.cell(column+1, 11).number( nota4 ).style(styleNumbers);
    ws.cell(column+1, 12 ).number( promedio2 ).style(styleNumbers);
    ws.cell(column+1, 13 ).number( procentaje2 ).style(styleNumbers);
    ws.cell(column+1, 14 ).number( total ).style(styleNumbers);
    column = column+1;
    nStudents = index;
} 

//Footer average for the students
ws.cell((column+1), 1, (column+1), 13, true).string('PROMEDIO').style(styleHeaderHorizontalRightSmallBorders);
ws.cell((column+1),14,(column+1),14,true).string('9.0').style(styleNumbers);

//Header suplentes
column = column+1
ws.cell((column+1),1,(column+1),14,true).string('SUPLENTES').style(styleNumbers);
column = column+1;
for (let index = 1; index <= 8; index++) {
    let nota1 = getRandomNumber(10);
    let nota2 = getRandomNumber(10);
    let nota3 = getRandomNumber(10);
    let nota4 = getRandomNumber(10);
    let promedio1 = (nota1 + nota2)/2;
    let promedio2 = (nota3 + nota4)/2;
    let procentaje1 = (promedio1*0.20);
    let procentaje2 = (promedio2*0.80);
    let total = procentaje1+ procentaje2;
    ws.cell(column+1, 1 ).number(nStudents+index).style(styleNumbers);
    ws.cell(column+1, 2, column+1, 5, true).string('Nombre alumno').style(styleHeaderEstaticoSmall);
    ws.cell(column+1, 6 ).number( nota1 ).style(styleNumbers);
    ws.cell(column+1, 7 ).number( nota2 ).style(styleNumbers);
    ws.cell(column+1, 8 ).number( promedio1 ).style(styleNumbers);
    ws.cell(column+1, 9 ).number( procentaje1 ).style(styleNumbers);
    ws.cell(column+1, 10 ).number( nota3 ).style(styleNumbers);
    ws.cell(column+1, 11).number( nota4 ).style(styleNumbers);
    ws.cell(column+1, 12 ).number( promedio2 ).style(styleNumbers);
    ws.cell(column+1, 13 ).number( procentaje2 ).style(styleNumbers);
    ws.cell(column+1, 14 ).number( total ).style(styleNumbers);
    column = column+1;
} 
ws.cell((column+1),1,(column+3),14,true).string('NOTAS ACLARATORIAS: \n La participante Andrea Alejandra no se presento').style(styleHeaderHorizontalLeftSmallBorders);
ws.cell((column+5),8,(column+5),14,true).string('FIRMA: ______________________________________________________________________________________________').style(styleHeaderHorizontalLeftSmall);
ws.cell((column+6),10,(column+8),12,true).string('Licda: Karla Patricia Campos. \n Coordinadora programa Empresa Centro. \n Centro de formacional Ricaldone.').style(styleHeaderEstaticoSmallNoBorders);

wb.write('Consolidado de rendimiento evaluativo mensual.xlsx');