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
      row: 3,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 7,
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
        row: 3,
        rowOff: 0,
      },
      to: {
        col: 15,
        colOff: 0,
        row: 7,
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


// HEADER ESTATICO
ws.cell(1, 1, 2, 14, true).string('CENTRO DE FORMACIÓN PROFESIONAL RICALDONE').style(styleHeaderEstaticoSmall );
ws.cell(3, 4, 3, 12, true).string('PROGRAMA DE FORMACIÓN INICIAL').style(styleHeaderEstaticoSmall);
ws.cell(4, 4, 4, 12, true).string('MODALIDAD EMPRESA-CENTRO').style(styleHeaderEstaticoSmall);
ws.cell(5, 4, 6, 12, true).string('CUADRO CONTROL DE ACTIVIDADES EVAUADAS').style(styleHeaderEstatico);
ws.cell(7, 1, 7, 14, true).string('CARRERA : Administrador técnico de empresas industriales').style(styleHeaderEstaticoSmall);
ws.cell(8, 1, 8, 5, true).string('Contrato: 24851').style(styleHeaderEstaticoSmall);
ws.cell(8, 6, 8, 14, true).string('COORDINADOR/A : Karla Patricia Campos Portillo').style(styleHeaderEstaticoSmall);
ws.cell(9, 1, 9, 5, true).string('Fecha de inicio 26/04/2021').style(styleHeaderEstaticoSmall);
ws.cell(9, 6, 9, 14, true).string('OFERTA DE COMPRA BOLPROS ITEM:05').style(styleHeaderEstaticoSmall);

ws.cell(3, 1, 6, 3, true).string('').style(styleHeaderEstaticoSmall);
ws.cell(3, 13, 6, 14, true).string('').style(styleHeaderEstaticoSmall);




ws.cell(10, 1, 11, 2, true).string('MÓDULO').style(styleHeaderEstaticoColor);
ws.cell(10, 3, 11, 6, true).string('UNIDAD').style(styleHeaderEstaticoColor);
ws.cell(10, 7, 11, 10, true).string('INSTRUCTOR(A)').style(styleHeaderEstaticoColor);
ws.cell(10, 11, 11, 12, true).string('MES').style(styleHeaderEstaticoColor);
ws.cell(10, 13, 11, 14, true).string('AÑO').style(styleHeaderEstaticoColor);
// HEADER DINAMICO
ws.cell(12, 1, 13, 2, true).string('Inducción y Nivelación').style(styleHeaderEstaticoSmall);
ws.cell(12, 3, 13, 6, true).string('Redacción de informes técnicos, liderazgo y relaciones humanas').style(styleHeaderEstaticoSmall);
ws.cell(12, 7, 13, 10, true).string('Ernesto Flores').style(styleHeaderEstaticoSmall);
ws.cell(12, 11, 13, 12, true).string('05').style(styleHeaderEstaticoSmall);
ws.cell(12, 13, 13, 14, true).string('2021').style(styleHeaderEstaticoSmall);

// ACTIVIDADES ESTATICO
ws.cell(14, 1, 18, 1, true).string('No.').style(styleActividades);
ws.cell(14, 2, 18, 5, true).string('PARTICIPANTES').style(styleActividades);
ws.cell(14, 6, 14, 14, true).string('Actividades evaluadas').style(styleActividades);
ws.cell(15, 6, 15, 9, true).string('Evaluaciones teóricas (20%)').style(styleActividades);
ws.cell(15, 10, 15, 13, true).string('Evaluaciones prácticas (80%)').style(styleActividades);
ws.cell(15, 14, 18, 14, true).string('NOTA FINAL').style(styleActividades);


// ACTIVIDADES DINAMICO

ws.cell(16, 6, 18, 6, true).string('Liderazgo').style(styleHeaderEstaticoSmall);
ws.cell(16, 7, 18, 7, true).string('Relaciones humanas').style(styleHeaderEstaticoSmall);
ws.cell(16, 8, 18, 8, true).string('Promedio').style(styleHeaderEstatico);
ws.cell(16, 9, 18, 9, true).string('20%').style(styleHeaderEstatico);

ws.cell(16, 10, 18, 10, true).string('Redacción de informes técnicos').style(styleHeaderEstaticoSmall);
ws.cell(16, 11, 18, 11, true).string('Liderazgo').style(styleHeaderEstaticoSmall);
ws.cell(16, 12, 18, 12, true).string('Promedio').style(styleHeaderEstatico);
ws.cell(16, 13, 18, 13, true).string('80%').style(styleHeaderEstatico);
// // Alumnos y notas

let column = 18;

const getRandomNumber = (max) =>{
    return Math.floor(Math.random() * max) + 1;
};

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
} 
wb.write('Excel.xlsx');