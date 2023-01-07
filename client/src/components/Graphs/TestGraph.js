import { Card, CardContent } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function Graph() {
  const stages = useSelector((state) => state.date);
  console.log("stages", stages);

  stages.forEach((s) => {
    if (s.level === "wake") {
      s.level = 1;
    }
    if (s.level === "light") {
      s.level = 2;
    }
    if (s.level === "deep") {
      s.level = 3;
    }
    if (s.level === "rem") {
      s.level = 4;
    }
  });

  const data = [
    ["x", "stage"],
    ...stages.map((d) => {
      return [
        [d.time.split(":")[0], d.time.split(":")[1], d.time.split(":")[2]],
        d.level,
      ];
    }),
  ];


  const options = {
    title: `Esta es tu grafica de sueño de la noche ${stages[0]?.date}`,

    hAxis: {
      title: "Hour",
      gridlines: {
        count: 12,
        units: {
          hours: { format: ["HH:00"] },
        },
      },
    },
    vAxis: {
      title: "Sleep Stage",
      ticks: [
        { v: 0.5, f: "" },
        { v: 1, f: "awake 🟠 " },
        { v: 2, f: "light 🟡 " },
        { v: 3, f: "deep 🟣 " },
        { v: 4, f: "rem 🟢 " },
      ],
    },
    series: {
      1: { curveType: "function" },
    },

    colors: ["#4fc3f7"],
  };

  return (
    <Card
    variant='outlined'>
      <CardContent>
        <Chart
          chartType="AreaChart"
          data={data}
          options={options}
          height="380px"
        />
      </CardContent>
    </Card>
  );
}
