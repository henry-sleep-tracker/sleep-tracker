import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function GraphTime() {
  const sleepSession = useSelector((state) => state.session);

  const data = sleepSession?.map((session) => {
    let obj = {};
    obj["date"] = session.date;
    obj["duration"] = (parseInt(session.duration, 10) / 3600000).toFixed(1);
    obj["goal"] = 8;
    return obj;
  });

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
        <Typography fontSize="2rem" fontWeight={"bold"} align="center" p={3}>
          Promedio de sueño por día
        </Typography>
        <ComposedChart width={windowWidth - 150} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, 12]} tickCount={7} />
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{
              paddingLeft: "1.5rem",
            }}
          />
          <ReferenceLine
            y="8"
            label="Meta"
            stroke="#b90007"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <Bar
            dataKey="duration"
            name="Duración de sueño"
            fill="#ff7961"
            unit=" hrs"
          />
        </ComposedChart>
        <Grid>
          <Typography fontSize="1rem" color="grey" align="center" p={3}>
            En esta gráfica puedes observar las horas de sueño diarias que has
            tenido en el lapso de tiempo seleccionado.
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
