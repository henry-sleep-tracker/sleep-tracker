import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
} from "recharts";
import { Card, CardContent } from "@mui/material";

export default function GraphRecord() {
  const records = useSelector((state) => state?.record.recordsRange);

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

  const data = [
    ...auxRecords.map((d) => {
      return {
        date: d?.dateMeal,
        café: d?.coffee,
        ejercicio: d?.timeActivity,
        alcohol: d?.drinks,
        merienda: d?.timeMeal.replace(":", ".").slice(0, -3),
      };
    }),
  ];

  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setwindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <ComposedChart width={windowWidth - 150} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="right"
            type="monotone"
            dataKey="ejercicio"
            name="Ejercicio"
            fill="#3f51b5"
            minPointSize={2}
            unit=" min"
          />
          <Bar
            type="monotone"
            dataKey="merienda"
            name="Hora de cena"
            fill="#4db6ac"
            yAxisId="right"
            unit=" Hrs"
          />
          <Bar
            yAxisId="left"
            type="monotone"
            dataKey="alcohol"
            name="Alcohol"
            barSize={20}
            fill="#757de8"
            minPointSize={2}
            unit=" copas"
          />
          <Bar
            yAxisId="left"
            type="monotone"
            dataKey="café"
            name="Ejercicio"
            barSize={20}
            fill="#90caf9"
            minPointSize={2}
            unit=" tazas"
          />
        </ComposedChart>
      </CardContent>
    </Card>
  );
}
