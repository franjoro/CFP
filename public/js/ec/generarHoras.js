const datesGenerator = (startDate, endDate , timeStart ,  timeEnd, daysSelected ) => {
    const format = "DD/MM/YYYY";     // Formato de fechas
    const formatTime = "hh:mm A"; // Formato de fecha
    const startDateObject = dayjs(startDate, format); // Obejto de inicio
    const EndDateObject = dayjs(endDate, format); // Objeto de fin 
    const daysBetween = EndDateObject.diff(startDateObject, "days", true); // Cantidad de dias entre inicio y fin 
    const minutosPorIt = dayjs(timeEnd, formatTime).diff(   // Cantidad de minutos entre hora inicio y fin 
      dayjs(timeStart, formatTime),
      "minutes", true
    );
    let cantidadMinutos = 0;
    const dias = [];
    
    for (let index = 0; index < daysBetween + 1; index++) {
      let iterableDate = startDateObject.add(index, "day");
      let dayofWeek = iterableDate.$W;
      if (daysSelected.includes(dayofWeek)) {
        let dayNumber  = iterableDate.$D;  
        if(dayNumber <10)dayNumber = `0${dayNumber}`;
        const dateStandart = `${dayNumber}/${iterableDate.$M+1}/${iterableDate.$y}`; 
        dias.push({"fecha":dateStandart, "minutos": minutosPorIt , "horas": (minutosPorIt/60).toFixed(3)});
        cantidadMinutos = cantidadMinutos + minutosPorIt;
      }
    }
    const datesValues = {values: dias, minutosTotales: cantidadMinutos , horaTotales: (cantidadMinutos/60).toFixed(2) };
    return datesValues;
};

const dates = datesGenerator('01/01/2021', '31/01/2021', '10:10 AM' , '11:10 AM' , [0]);
console.log(dates);

