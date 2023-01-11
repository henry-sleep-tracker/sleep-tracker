import React from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Scatter,
  ComposedChart,
} from "recharts";

export default function GraphRecord() {
  const records = useSelector((state) => state?.record.recordsRange);

  console.log("records antes", records);

  let auxRecords = [];
  let auxRecord = records[0];

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
        Cafe: d?.coffee,
        Ejercicio: d?.timeActivity,
        Alcohol: d?.drinks,
        Hora: d?.timeMeal,
      };
    }),
  ];
  console.log("data", data);

  return (
    <ComposedChart width={730} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Dia" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar
        yAxisId="right"
        type="monotone"
        dataKey="Ejercicio"
        fill="#ff7300"
        minPointSize={2}
      />
      {/* <Line yAxisId="left" type="monotone" dataKey="Hora" stroke="#ff7300" /> */}
      <Bar
        yAxisId="right"
        type="monotone"
        dataKey="Alcohol"
        barSize={20}
        fill="#8884d8"
        minPointSize={2}
      />
      <Bar
        yAxisId="right"
        type="monotone"
        dataKey="Cafe"
        barSize={20}
        fill="#413ea0"
        minPointSize={2}
      />
    </ComposedChart>
  );
}
