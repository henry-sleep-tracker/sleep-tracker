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

  ranges.forEach((s) => {
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

  //   const data = ranges.map((r) => {
  //     return [
  //       {
  //         date: r.time,
  //         level: r.level,
  //         coffee: 1,
  //       },
  //     ];
  //   });

  const data2 = [
    { date: "2021-07-05", name: "test", value: 1, oil: 2 },
    {
      date: "2021-08-05",
      name: "test",
      value: 2,
      oil: 2,
    },
    {
      date: "2021-09-05",
      name: "test",
      value: 3,
      oil: 2,
    },
    {
      date: "2021-10-05",
      name: "test",
      value: 4,
      oil: 2,
    },
    {
      date: "2021-11-05",
      name: "test",
      value: 5,
      oil: 2,
      coffee: 3,
      alcohol: 5,
      run: 10,
    },
    {
      date: "2021-12-05",
      name: "test",
      value: 6,
      oil: 2,
      coffee: 3,
      alcohol: 5,
      run: 10,
    },
  ];

  const getRandomColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  const lines = () => {
    const entries = data2.map((option) => {
      const keys = Object.keys(option);
      return keys;
    });
    const flattened = entries.reduce((prev, current) => {
      prev = prev.concat(current);
      return prev;
    }, []);
    const filtered = flattened.filter((key) => key !== "date");
    const uniqueKeys = [...new Set(filtered)];
    return uniqueKeys.map((key) => {
      return <Line type="monotone" stroke={getRandomColor()} dataKey={key} />;
    });
  };
  return (
    <div>
      <LineChart
        width={500}
        height={400}
        data={data2}
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
        {lines()}
      </LineChart>
    </div>
  );
}
