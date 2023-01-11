import React from "react";
import ResponsiveAppBar from "../Home/Nav";
import RangeCalendar from "../Calendario/RangeCalendar";
import CollapsibleTableTime from "./CollapsibleTableTime";
import DualGraph from "./DualGraph";
import GraphEff from "./Graph-efficiency";
import GraphTime from "./Graph-Time";
import { Button, Grid } from "@mui/material";
import CollapsibleTableEfficiency from "./CollapsibleTableEfficiency";

const GraphWM = () => {

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
      p={1}
    >

      <Grid
        item
      >
        <Button
          variant="outlined"
          key="pdf"
          download="pdf"
          href="/pdf"
        >
          Reporte PDF
        </Button>
      </Grid>

      <Grid
        item
      >
        <RangeCalendar />
      </Grid>

      <Grid
        item
      >
        <DualGraph />
      </Grid>

      <Grid
        item
      >
        {/* <h4>{options1.title}</h4> */}
        <GraphEff />
      </Grid>

      <Grid
        item
      >
        <CollapsibleTableEfficiency />
      </Grid>

      <Grid
        item
      >
        <GraphTime />
      </Grid>

      <Grid
        item
      >
        <CollapsibleTableTime />
      </Grid>

    </Grid>
  );
};

export default GraphWM;
