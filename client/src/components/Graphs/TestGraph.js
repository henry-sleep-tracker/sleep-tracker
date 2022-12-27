import React from "react";
import { Chart } from "react-google-charts";
import { stages } from "./FakeDB";


const newData = [];

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
  newData.push([s.dateTime.split("T")[1], s.level]);
});

export const data = [
  ["x", "stage"],
  ...newData.map((d) => {
    return [[d[0].split(":")[0], d[0].split(":")[1], d[0].split(":")[2]], d[1]];
  }),
];

export const options = {

   title:`Esta es tu grafica de sueño de la noche anterior ${stages[0].dateTime.slice(0,-13)}`,
  
  hAxis: {
    title: "Hour",
    gridlines: {
      count: 5,
      units: {
        hours: { format: ["HH:00"] },
      },
    },
  },
  vAxis: {
    title: "Sleep Stage",
    ticks: [
      { v: 0.5, f: "" },
      { v: 1, f: "awake" },
      { v: 2, f: "light" },
      { v: 3, f: "deep" },
      { v: 4, f: "rem" },
    ],
  },
  series: {
    1: { curveType: "function" },
  },
 
  colors: ['#4fc3f7' ],
  
 
 

};

export default function Graph() {
  return (

    <>
    <Chart
      chartType='AreaChart'
      data={data}
      options={options}
      height='380px'
      
    />
</>

  );
}
