import React from "react";
import { Chart } from "react-google-charts";
import { stages } from "./FakeDB";

console.log("stages", stages);

const newData = [];

stages.map((s) => {
  if (s.level === "wake") {
    s.level = 4;
  }
  if (s.level === "light") {
    s.level = 3;
  }
  if (s.level === "deep") {
    s.level = 2;
  }
  if (s.level === "rem") {
    s.level = 1;
  }
  newData.push([s.dateTime.split("T")[1], s.level]);
});
console.log("newData", newData);

export const data = [
  ["x", "stage"],
  ...newData.map((d) => {
    return [[d[0].split(":")[0], d[0].split(":")[1], d[0].split(":")[2]], d[1]];
  }),
];

console.log("DATA", data);

export const options = {
  hAxis: {
    title: "Hour",
    gridlines: {
      count: 5,
      units: {
        hours: { format: ["HH"] },
      },
    },
  },
  vAxis: {
    title: "Sleep Stage",
    ticks: [
      { v: 4, f: "awake" },
      { v: 3, f: "light" },
      { v: 2, f: "deep" },
      { v: 1, f: "rem" },
    ],
  },
  series: {
    1: { curveType: "function" },
  },
};

export default function Graph() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
