import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const sleepTranslations = {
  summary_light_min: "Sueño ligero",
  summary_deep_min: "Sueño profundo",
  summary_rem_min: "REM",
  summary_awake_min: "Despierto",
  efficiency: "Eficiencia",
};

export default function CombinedGraph() {
  const ranges = useSelector((state) => state.session);
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
        cafe: d?.coffee,
        ejercicio: d?.timeActivity,
        alcohol: d?.drinks,
        merienda: d?.timeMeal.replace(":", ".").slice(0, -3),
      };
    }),
  ];

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

  const getColor = (k) => {
    if (k === "efficiency") {
      return "#62757f";
    }
    if (k === "summary_deep_min") {
      return "#ff3d00";
    }
    if (k === "summary_light_min") {
      return "#ff8a65";
    }
    if (k === "summary_rem_min") {
      return "#870000";
    }
    if (k === "summary_awake_min") {
      return "#ffca28";
    }
  };

  const lines = () => {
    const uniqueKeys = Object.keys(ranges[0]).filter((item) =>
      [
        "summary_light_min",
        "summary_deep_min",
        "summary_rem_min",
        "summary_awake_min",
        "efficiency",
      ].includes(item)
    );

    return uniqueKeys?.map((k, index) => {
      return (
        <Line
          key={`line-${index}`}
          yAxisId="left"
          connectNulls
          type="monotone"
          stroke={getColor(k)}
          strokeWidth={3}
          strokeOpacity={opacity[k]}
          name={sleepTranslations[k]}
          dataKey={k}
          onMouseEnter={() => (tooltip = k)}
          onMouseLeave={() => (tooltip = null)}
          activeDot={{ r: 5 }}
          unit=" min"
        />
      );
    });
  };

  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setwindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const combinedObjects = ranges?.map((range) => {
    const sameDate = data?.find((data) => data.date === range.date);
    let obj = {};
    obj["date"] = range.date;
    obj["efficiency"] = range.efficiency;
    obj["summary_awake_min"] = range.summary_awake_min;
    obj["summary_deep_min"] = range.summary_deep_min;
    obj["summary_light_min"] = range.summary_light_min;
    obj["summary_rem_min"] = range.summary_rem_min;
    obj["alcohol"] = sameDate?.alcohol;
    obj["cafe"] = sameDate?.cafe;
    obj["ejercicio"] = sameDate?.ejercicio;
    obj["merienda"] = sameDate?.merienda;
    return obj;
  });

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
              Etapas de sueño y actividades diarias
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              spacing={3}
              flex={4}
              p={2}
            >
              <ResponsiveContainer width={windowWidth - 150} height={500}>
                <ComposedChart
                  width={"10rem"}
                  height={"40rem"}
                  data={combinedObjects}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
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
                    barSize={20}
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
                    barSize={20}
                    unit=" hrs"
                  />
                  <Bar
                    yAxisId="right"
                    type="monotone"
                    dataKey="alcohol"
                    onMouseEnter={() => (tooltip = "alcohol")}
                    onMouseLeave={() => (tooltip = null)}
                    name="Alcohol"
                    barSize={20}
                    fill="#757de8"
                    fillOpacity={opacity.alcohol}
                    minPointSize={2}
                    unit=" copas"
                  />
                  <Bar
                    yAxisId="right"
                    type="monotone"
                    dataKey="cafe"
                    onMouseEnter={() => (tooltip = "cafe")}
                    onMouseLeave={() => (tooltip = null)}
                    name="Café"
                    barSize={20}
                    fill="#90caf9"
                    fillOpacity={opacity.cafe}
                    minPointSize={2}
                    unit=" tazas"
                  />
                  {ranges?.length && lines()}
                </ComposedChart>
              </ResponsiveContainer>

              <Grid item>
                <Button onClick={handleReset} variant="contained">
                  Reset grafica
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
