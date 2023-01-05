import React from "react";
import { useSelector } from "react-redux";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";

export default function DualGraph() {
  const ranges = useSelector((state) => state.range);
  console.log("ranges", ranges);

  const getRandomColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  const lines = () => {
    const uniqueKeys = Object.keys(ranges[0]).filter((item) =>
      [
        "efficiency",
        "summary_deep_min",
        "summary_light_min",
        "summary_rem_min",
        "summary_awake_min",
      ].includes(item)
    );
    console.log("uniqueKeys", uniqueKeys);
    return uniqueKeys.map((k) => {
      return <Line type="monotone" stroke={getRandomColor()} dataKey={k} />;
    });
  };

  return (
    <div>
      <LineChart
        width={500}
        height={400}
        data={ranges}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {ranges?.length && lines()}
      </LineChart>
    </div>
  );
}
