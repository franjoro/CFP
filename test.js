const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const startDate = '01/06/2021' ;
const endDate = '30/06/2021' ;
const format = 'DD/MM/YYYY'
const daysSelected = [0,4]; // Domingo y Jueves 

const startDateObject = dayjs(startDate, format);
const EndDateObject = dayjs(endDate, format);
const daysBetween = EndDateObject.diff(startDateObject,'days',true);
// console.log(daysBetween)
let cantidadDeDias = 0;
for (let index = 0; index < daysBetween+1; index++) {
    let dayofWeek = startDateObject.add(index,'day').$W;
    if(daysSelected.includes(dayofWeek)) cantidadDeDias = cantidadDeDias+1;
}
console.log(cantidadDeDias)