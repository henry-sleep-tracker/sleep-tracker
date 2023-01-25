import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useSelector } from "react-redux";
import { Card, Grid, Typography } from "@mui/material";

const isMobile = window.innerWidth < 800;

export default function GraphHome() {
  const stages = useSelector((state) => state.stage);

  stages.forEach((s) => {
    if (s.level === "rem") {
      s.level = 1;
    }
    if (s.level === "deep") {
      s.level = 2;
    }
    if (s.level === "light") {
      s.level = 3;
    }
    if (s.level === "wake") {
      s.level = 4;
    }
  });

  const data = [
    ...stages.map((d) => {
      let time = d.time.slice(0, -3);
      return {
        Hora: time,
        Nivel: d.level,
      };
    }),
  ];

  const renderCustomAxisTick = ({ x, y, payload }) => {
    let path;

    switch (payload.value) {
      case 1:
        path = "🟢 R.E.M";
        break;
      case 2:
        path = "🟣 Profundo";
        break;
      case 3:
        path = "🟡 Ligero";
        break;
      case 4:
        path = "🟠 Despierto";
        break;

      default:
        path = "";
    }

    return (
      <text x={x} y={y} dy={12} fontSize="14px" textAnchor="end" fill="#666">
        {path}
      </text>
    );
  };

  return (
    <Card sx={{ boxShadow: 2 }}>
      <Typography fontSize="2rem" fontWeight={"bold"} align="center" p={3}>
        Etapas de sueño por noche
      </Typography>
      <ResponsiveContainer width="95%" height={500}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3f50b5" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3f50b5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="Hora"
            minTickGap={50}
            tickFormatter={(value) => {
              if (value) {
                const hours = value.split(":")[0];
                return `${hours}:00 Hrs`;
              }
            }}
          />
          <YAxis tick={renderCustomAxisTick} width={100} />
          <CartesianGrid strokeDasharray="0 1" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Nivel"
            stroke="#3f50b5"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <Grid p={!isMobile ? 3 : 0}>
        <Typography fontSize="1rem" color="grey" align="center">
          En esta grafica puedes visualizar cada etapa de tu ciclo de sueño.
        </Typography>
        <Typography fontSize="1rem" color="grey" align="center">
          Durante una noche, nuestro sueño pasa por distintas etapas. Usualmente
          se mueve de sueño ligero, a sueño profundo, regresa a sueño ligero,
          para despues pasar a REM.
        </Typography>
      </Grid>
    </Card>
  );
}
