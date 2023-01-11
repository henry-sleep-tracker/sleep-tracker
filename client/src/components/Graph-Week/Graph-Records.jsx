import React from "react";
import { useSelector } from "react-redux";
import { Bar, CartesianGrid, Legend, XAxis, YAxis, Tooltip,  Line, ComposedChart } from "recharts";


export default function GraphRecord(){
    const records = useSelector((state) => state?.record.recordsRange) 


console.log('records antes',records);

let auxRecords = []
let auxRecord = records[0]



for (let i = 1; i < records.length; i++) {
  if (auxRecord.dateMeal === records[i].dateMeal) {
    auxRecord = {
      ...auxRecord,
      coffee: auxRecord.coffee + records[i].coffee,
      drinks: auxRecord.drinks + records[i].drinks,
      timeActivity: auxRecord.timeActivity + records[i].timeActivity,
    };
  }
  else {
    auxRecords.push(auxRecord)
    auxRecord = records[i]
  }
}

auxRecords.push(auxRecord)

console.log('records',records);
console.log('AAAUUXXXrecords',auxRecords);


const data = [
    ...auxRecords.map((d) => {
        
      
      return {
        Dia: d.dateMeal,
        Cafe: d.coffee,
        Ejercicio: d.timeActivity,
        Alcohol: d.drinks,
        Hora: d.timeMeal
      };
    }),
  ];


    return(


<ComposedChart width={730} height={250} data={data} >
  <XAxis dataKey="Dia"  />
  <YAxis yAxisId='derecha' />
  <YAxis yAxisId='izquierda' />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="Ejercicio" fill="#8884d8" stroke="#8884d8" yAxisId='izquierda' />
  <Bar type="monotone" dataKey="Alcohol" fill="#8884d8" stroke="#8884d8"  yAxisId='derecha' />
  <Bar dataKey="Cafe" barSize={20} fill="#413ea0" yAxisId='derecha' />
  <Line type="monotone" dataKey="Hora" stroke="#ff7300" yAxisId='izquierda' />
</ComposedChart>
    )
}

