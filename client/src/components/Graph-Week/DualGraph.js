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
  ResponsiveContainer,
} from "recharts";
import { Button, Card, CardContent, Grid } from "@mui/material";

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
          strokeWidth={1.5}
          strokeOpacity={opacity[k]}
          name={k.replace(/_/g, " ")}
          dataKey={k}
          activeDot={{ r: 5 }}
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
                  <Tooltip
                    itemStyle={{
                      textTransform: "capitalize",
                      textAlign: "left",
                    }}
                    content={"efficiency"}
                  />
                  <Legend onClick={handleClick} />
                  {ranges?.length && lines()}
                </LineChart>
              </ResponsiveContainer>

              <Grid item>
                <Button onClick={handleReset} variant="outlined">
                  Reiniciar grafica
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
