import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ComposedChart } from "recharts";


export default function GraphRecord() {
  const records = useSelector((state) => state?.record.recordsRange)


  console.log('records antes', records);

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
    } else {
      auxRecords.push(auxRecord);
      auxRecord = records[i];
    }
  }

  auxRecords.push(auxRecord);

  console.log("records", records);
  console.log("AAAUUXXXrecords", auxRecords);

  const data = [
    ...auxRecords.map((d) => {
      return {
        Dia: d?.dateMeal,
        Café: d?.coffee,
        Ejercicio: d?.timeActivity,
        Alcohol: d?.drinks,
        Merienda: d?.timeMeal.replace(':', '.').slice(0,-3)
      };
    }),
  ];
  console.log("data", data);
  
    const [windowWidth, setwindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setwindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

return (
  <Card
  variant="outlined"
>
  <CardContent>
  <ComposedChart width={windowWidth - 150} height={250} data={data} >
    <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Dia"  />
  <YAxis yAxisId='left'   />
  <YAxis yAxisId='right' orientation="right" />
  <Tooltip />
  <Legend />
  <Bar
        yAxisId="right"
        type="monotone"
        dataKey="Ejercicio"
        fill="#f06292"
        minPointSize={2}
        unit=' min'
      />
   <Bar type="monotone" dataKey="Merienda" fill='#ab47bc' stroke="#ab47bc" yAxisId='right' unit=' Hrs' />
   <Bar
        yAxisId="left"
        type="monotone"
        dataKey="Alcohol"
        barSize={20}
        fill="#42a5f5"
        minPointSize={2}
        unit=' copas'
      />
  <Bar
        yAxisId="left"
        type="monotone"
        dataKey="Café"
        barSize={20}
        fill="#ffca28"
        minPointSize={2}
        unit= ' tazas'
      />
 
</ComposedChart>
</CardContent>
</Card>
      
    )
}