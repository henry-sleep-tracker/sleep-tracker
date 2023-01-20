import React, { useEffect, useState, useCallback } from "react";
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
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

export default function GraphRecord() {
  const records = useSelector((state) => state?.record.recordsRange);
  const [opacity, setOpacity] = useState({
    summary_light_min: 1,
    summary_deep_min: 1,
    summary_rem_min: 1,
    summary_awake_min: 1,
    efficiency: 1,
    cafe: 1,
    ejercicio: 1,
    alcohol: 1,
    merienda: 1,
  });

  const handleClick = useCallback(
    (event) => {
      const { dataKey } = event;
      const updated = opacity[dataKey] === 0 ? 1 : 0;
      setOpacity({ ...opacity, [dataKey]: updated });
    },
    [opacity, setOpacity]
  );

  const handleReset = useCallback(() => {
    setOpacity((opacity) => {
      let updated = {};
      Object.keys(opacity).forEach((o) => {
        updated[o] = 1;
      });
      return { ...opacity, ...updated };
    });
  }, [setOpacity]);

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

  var tooltip;
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    for (const bar of payload) {
      if (bar.dataKey === tooltip)
        return (
          <div>
            {`${bar.name}:`}
            <br />
            {`${bar.value} ${bar.unit}`}
          </div>
        );
    }
    return null;
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
      p={2}
    >
      <Grid item>
        <Card variant="outlined">
          <CardContent>
            <Typography
              fontSize="2rem"
              fontWeight={"bold"}
              align="center"
              p={3}
            >
              Actividades diarias
            </Typography>
            <ComposedChart width={windowWidth - 150} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                content={<CustomTooltip />}
                itemStyle={{
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
                wrapperStyle={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                }}
              />
              <Legend
                onClick={handleClick}
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
              <Bar
                yAxisId="right"
                type="monotone"
                dataKey="ejercicio"
                onMouseEnter={() => (tooltip = "ejercicio")}
                onMouseLeave={() => (tooltip = null)}
                name="Ejercicio"
                fill="#3f51b5"
                fillOpacity={opacity.ejercicio}
                minPointSize={2}
                unit=" min"
              />
              <Bar
                yAxisId="right"
                type="monotone"
                dataKey="merienda"
                onMouseEnter={() => (tooltip = "merienda")}
                onMouseLeave={() => (tooltip = null)}
                name="Hora de cena"
                fill="#4db6ac"
                fillOpacity={opacity.merienda}
                unit=" hrs"
              />
              <Bar
                yAxisId="left"
                type="monotone"
                dataKey="alcohol"
                onMouseEnter={() => (tooltip = "alcohol")}
                onMouseLeave={() => (tooltip = null)}
                name="Alcohol"
                fill="#757de8"
                fillOpacity={opacity.alcohol}
                minPointSize={2}
                unit=" copas"
              />
              <Bar
                yAxisId="left"
                type="monotone"
                dataKey="cafe"
                onMouseEnter={() => (tooltip = "cafe")}
                onMouseLeave={() => (tooltip = null)}
                name="Café"
                fill="#90caf9"
                fillOpacity={opacity.cafe}
                minPointSize={2}
                unit=" tazas"
              />
            </ComposedChart>
            <Grid container justifyContent={"center"} alignItems="center">
              <Button onClick={handleReset} variant="contained">
                Reset grafica
              </Button>
            </Grid>
            <Grid>
              <Typography fontSize="1rem" color="grey" align="center" p={3}>
                En esta gráfica puedes observar el registro de actividades
                diarias en el rango de tiempo seleccionado.
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
