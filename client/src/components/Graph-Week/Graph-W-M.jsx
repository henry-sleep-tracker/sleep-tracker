import React from "react";
import RangeCalendar from "../Calendario/RangeCalendar";
import CollapsibleTableTime from "./CollapsibleTableTime";
import DualGraph from "./DualGraph";
import GraphEff from "./Graph-efficiency";
import GraphTime from "./Graph-Time";
import { Button, Grid } from "@mui/material";
import CollapsibleTableEfficiency from "./CollapsibleTableEfficiency";
import GraphRecord from "./Graph-Records";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { message } from "react-message-popup";

const GraphWM = () => {
  const componentPdf = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPdf.current,
    onAfterPrint: () => message.success("print success", 2500),
  });

  return (
    <Grid
      container
      ref={componentPdf}
      style={{ width: "100%" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
      p={1}
    >
      <Grid item>
        <Button variant="outlined" key="pdf" onClick={handlePrint}>
          Reporte PDF
        </Button>
      </Grid>

      <Grid item>
        <RangeCalendar />
      </Grid>

      <Grid item>
        <DualGraph />
      </Grid>

      <Grid item>
        <GraphEff />
      </Grid>

      <Grid item>
        <CollapsibleTableEfficiency />
      </Grid>

      <Grid item>
        <GraphTime />
      </Grid>

      <Grid item>
        <CollapsibleTableTime />
      </Grid>

      <Grid item>
        <GraphRecord />
      </Grid>
    </Grid>
  );
};

export default GraphWM;
