import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { useSelector } from "react-redux";
import { Card, CardContent, Grid } from "@mui/material";

export default function GraphHome() {
  const stages = useSelector((state) => state.date);

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
    ...stages.map((d) => {
      let time = d.time.slice(0, -3);
      return {
        name: time,
        uv: d.level,
      };
    }),
  ];

  const renderCustomAxisTick = ({ x, y, payload }) => {
    let path;

    switch (payload.value) {
      case 1:
        path = "Despierto 🟠";
        break;
      case 2:
        path = "Ligero 🟡";
        break;
      case 3:
        path = "Profundo 🟣";
        break;
      case 4:
        path = "R.E.M 🟢";
        break;

      default:
        path = "";
    }

    return (
      <text x={x} y={y} dy={12} textAnchor="end" fill="#666">
        {path}
      </text>
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
    >
      <Grid item>
        <Card variant="outlined">
          <CardContent>
            <AreaChart
              width={350}
              height={250}
              data={data}
              margin={{ top: 10, left: 40, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4fc3f7" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#4fc3f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                minTickGap={50}
                tickFormatter={(value) => {
                  console.log("value", value);
                  if (value) {
                    const hours = value.split(":")[0];
                    return `${hours}:00`;
                  }
                }}
              />
              <YAxis tick={renderCustomAxisTick} />
              <CartesianGrid strokeDasharray="0 1" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#4fc3f7"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
