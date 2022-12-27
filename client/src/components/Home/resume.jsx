import React from "react";
import {Chart} from "react-google-charts";
const Collection = (consumed) => {
  let { cafeina, alcohol, ejercicio, comida} = consumed.arg;
 let {tipo, tiempo } = ejercicio


  if (!cafeina) {
    cafeina = "no hay registro";
  }
  if (!alcohol) {
    alcohol = "no hay registro";
  }
  if (!comida) {
    comida = "no hay registro";
  }
  if (!ejercicio) {
    ejercicio = "no hay registro";
  }

  const dataTable = [['Registro', 'Cantidad / Hora / Tiempo', 'Medidas'],
['Consumo de cafe', `${cafeina}`, 'Tazas'], ['Consumo de Alcohol', `${alcohol}`, 'Copas'], ['Horario de merienda', `${comida}`, 'Horas'], ['Ejercicio', `${tiempo}`, `${tipo}`]]


  const optionT ={
    title:' Consumo diario:',
      allowHtml: true,
    
  }

 const formatters = [
    {
      type: "ColorFormat" ,
      
      column: 1,
      ranges: [
        [null, null, "black", 'rgba(0, 122, 244, 0.533)'],
      ],
    },
    {
      type: "ColorFormat" ,
      column: 0,
      ranges: [
        [null, null, "black", 'rgba(0, 122, 244, 0.533)'],
      ],
    },
    {
      type: "ColorFormat" ,
      column: 2,
      ranges: [
        [null, null, "black", 'rgba(0, 122, 244, 0.533)'],
      ],
    },
  ];
   
  return (
    <div className="titleresume">
      <br />
      <h4> Registro del dia: </h4>


      <Chart
     chartType='Table'
     options={optionT}
     data={dataTable}
     formatters={formatters}


      />

   
    </div>
  );
};

export default Collection;
