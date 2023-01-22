import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
} from "recharts";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const sleepTranslations = {
  summary_light_min: "Sueño ligero",
  summary_deep_min: "Sueño profundo",
  summary_rem_min: "REM",
  summary_awake_min: "Despierto",
  efficiency: "Eficiencia",
};

export default function DualGraph() {
  const ranges = useSelector((state) => state.session);

  const [opacity, setOpacity] = useState({
    summary_light_min: 1,
    summary_deep_min: 1,
    summary_rem_min: 1,
    summary_awake_min: 1,
    efficiency: 1,
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

    return uniqueKeys.map((k, index) => {
      return (
        <Line
          key={`line-${index}`}
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
              Etapas de sueño
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
              <LineChart
                width={windowWidth - 150}
                height={500}
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
                  wrapperStyle={{
                    paddingLeft: "2rem",
                  }}
                />
                {ranges?.length && lines()}
              </LineChart>
              <Grid item>
                <Button onClick={handleReset} variant="contained">
                  Reset grafica
                </Button>
              </Grid>
            </Grid>
            <Grid>
              <Typography fontSize="1rem" color="grey" align="center" p={3}>
                En esta gráfica puedes observar el promedio de duración de cada
                una de las etapas del sueño, en el lapso de tiempo seleccionado.
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
