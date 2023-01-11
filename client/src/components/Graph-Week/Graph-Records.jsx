import React from "react";
import { useSelector } from "react-redux";
import { Bar, CartesianGrid, Legend, XAxis, YAxis, Tooltip, BarChart } from "recharts";


export default function GraphRecord(){
    let records = useSelector((state) => state?.record.recordsRange) 


console.log(records);



const data = [
    ...records.map((d) => {
        
      
      return {
        Dia: d.dateMeal,
        Cafe: d.coffee,
        Ejercicio: d.timeActivity,
        Alcohol: d.drinks,
        Hora: d.timeMeal
      };
    }),
  ];





console.log(data);

   
   
   


    return(


<BarChart width={730} height={250} data={data} >
  <XAxis dataKey="Dia" />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Bar type="monotone" dataKey="Ejercicio" fill="#8884d8" stroke="#8884d8" />
  <Bar type="monotone" dataKey="Alcohol" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="Cafe" barSize={20} fill="#413ea0" />
  <Bar type="monotone" dataKey="Alcohol" stroke="#ff7300" />
</BarChart>
    )
}

