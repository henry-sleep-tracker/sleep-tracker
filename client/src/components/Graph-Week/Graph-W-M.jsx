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
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { message } from "react-message-popup";
import image from "../../images/sleeping_person.jpeg";

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
      width="auto"
      justifyContent="center"
      alignItems="center"
      direction="column"
      ref={componentPdf}
      spacing={5}
      flex={4}
      p={5}
      sx={{ backgroundColor: "#f7f8fb" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        p={5}
      >
        <Grid item width={"40%"}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="170"
                image={image}
                alt="sleeping person"
              />
              <CardContent sx={{ backgroundColor: "white" }}>
                <Typography
                  fontSize={"2rem"}
                  fontWeight="medium"
                  lineHeight={2}
                >
                  Reporte de tu perfil de sueño
                </Typography>
                <Typography fontSize={"1rem"}>
                  Dormir bien no se refiere solo al total de horas de sueño,
                  también es importante que el sueño sea de buena calidad para
                  que te sientas descansado cuando despiertes.
                </Typography>
                <Typography fontSize={"1rem"}>
                  Aquí podrás obtener un mejor entendimiento sobre la calidad de
                  tu sueño.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item width="auto">
          <Card>
            <RangeCalendar />
          </Card>
        </Grid>
      </Grid>

      <Grid item>
        <Button variant="contained" key="pdf" onClick={handlePrint}>
          Descargar reporte
        </Button>
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
  );
};

export default GraphWM;
