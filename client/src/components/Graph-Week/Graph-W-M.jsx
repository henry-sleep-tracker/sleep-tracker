import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GraphRecord from "./Graph-Records";
import DualGraph from "./DualGraph";
import GraphTime from "./Graph-Time";
import CombinedGraph from "./CombinedGraph";
import RangeCalendar from "../Calendario/RangeCalendar";
import { getSleepSession } from "../../actions/getUserHealthData";
import { getRecordsRange } from "../../actions/records_data";
import {
  Button,
  Card,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useReactToPrint } from "react-to-print";
import { message } from "react-message-popup";
import image from "../../images/sleeping_person.jpeg";
import styles from "./Graph-W-M.module.css";

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

  const classes = useStyles();

  return (
    <Paper className={classes.paperWraper}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
        flex={2}
        p={3}
      >
        <Grid item>
          <Typography fontSize={"2.5rem"} fontWeight="bold">
            Reporte de tu perfil de sueño
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" key="pdf" onClick={handlePrint}>
            Descargar reporte
          </Button>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={5}
          ref={componentPdf}
        >
          <Grid item>
            <Card>
              <RangeCalendar />
            </Card>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GraphWM;

const useStyles = makeStyles(() => ({
  paperWraper: {
    minHeight: "100vh",
  },
}));
