import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollapsibleTableTime from "./CollapsibleTableTime";
import GraphRecord from "./Graph-Records";
import DualGraph from "./DualGraph";
import GraphTime from "./Graph-Time";
import CombinedGraph from "./CombinedGraph";
import RangeCalendar from "../Calendario/RangeCalendar";
import { getSleepSession } from "../../actions/getUserHealthData";
import { getRecordsRange } from "../../actions/records_data";
import { Button, Grid } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { message } from "react-message-popup";

const yesterday = new Date(Date.now() - 28800000).toISOString().split("T")[0];
const fiveDaysAgo = new Date(Date.now() - 432000000)
  .toISOString()
  .split("T")[0];

const GraphWM = () => {
  const currentUser = useSelector((state) => state?.users.currentUser);
  const componentPdf = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPdf.current,
    onAfterPrint: () => message.success("print success", 2500),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSleepSession(fiveDaysAgo, yesterday));
    dispatch(getRecordsRange(currentUser.id, fiveDaysAgo, yesterday));
  }, [dispatch]);

  return (
    <Grid
      container
      ref={componentPdf}
      style={{ width: "100%" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={5}
      flex={4}
      p={1}
      sx={{ backgroundColor: "#f7f8fb" }}
    >
      <Grid item>
        <Button variant="contained" key="pdf" onClick={handlePrint}>
          Descargar reporte
        </Button>
      </Grid>

      <Grid item>
        <RangeCalendar />
      </Grid>

      <Grid item>
        <CombinedGraph />
      </Grid>

      <Grid item>
        <DualGraph />
      </Grid>

      <Grid item>
        <GraphRecord />
      </Grid>

      <Grid item>
        <GraphTime />
      </Grid>

      <Grid item>
        <CollapsibleTableTime />
      </Grid>
    </Grid>
  );
};

export default GraphWM;
