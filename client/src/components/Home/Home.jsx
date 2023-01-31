import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Resume from "./resume";
import Calc from "./calc";
import Swipeable from "./Swipeable";
import { getUsersPlanExpDate } from "../../actions/plan";
import { useAuthContext } from "../../actions/authContext";
import {
  getSleepSession,
  getSleepStage,
} from "../../actions/getUserHealthData";
import { getRecordsQuery } from "../../actions/records_data";
import GraphHome from "../Graphs/Graph-home";
import CollapsibleTable from "../Graph-Week/CollapsibleTable";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/styles";
import { Helmet } from "react-helmet";
import greeting from "../../images/bar-chart.png";
import sleep from "../../images/sleep.png";
import moon from "../../images/full-moon.png";
import sun from "../../images/sun.png";

const yesterday = new Date(Date.now() - 28800000).toISOString().split("T")[0];
const isMobile = window.innerWidth < 800;

const greet = () => {
  var text = "";
  var now = new Date();
  var time = now.getHours();
  if (time >= 5 && time < 13) {
    text = "buenos días!  ";
  } else if (time >= 13 && time < 21) {
    text = "buenas tardes! ";
  } else {
    text = "buenas noches!  ";
  }
  return text;
};

const Home = () => {
  const { payPlan } = useAuthContext();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const session = useSelector((state) => state.session);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSleepStage(yesterday));
    dispatch(getSleepSession(yesterday));
    dispatch(getRecordsQuery(currentUser.id, yesterday));
    dispatch(getUsersPlanExpDate(currentUser.id));
    payPlan(planExpirationDate);
  }, [dispatch, payPlan, planExpirationDate, currentUser]);

  let user = {
    name: currentUser.names ? currentUser.names : "🥰",
  };

  const sleepSession = useMemo(() => {
    let obj = {};
    obj["duration"] = (parseInt(session[0]?.duration, 10) / 3600000).toFixed(1);
    obj["bedTime"] = session[0]?.start_time?.split("T")[1].split(".")[0];
    obj["wakeupTime"] = session[0]?.end_time?.split("T")[1].split(".")[0];
    obj["date"] = session[0]?.date;
    return obj;
  }, [session]);

  console.log("session", session);
  console.log("sleepSession", sleepSession);
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Paper className={classes.paperWraper}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        p={!isMobile ? "3rem" : "0.5rem"}
      >
        <Helmet>
          <title>Inicio | Sleep Tracker</title>
        </Helmet>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={{ xs: 4, md: 6 }}
          sx={{ paddingRight: "2rem", paddingLeft: "2rem" }}
        >
          <Grid item sm={12} md={8}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f1f1f9",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    fontWeight="medium"
                    align="center"
                    color="black"
                  >
                    ¡Hola {user.name}, {greet()}
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151, padding: 1 }}
                image={greeting}
                alt="bar chart"
              />
            </Card>
          </Grid>
          <Grid item sx={12} md={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f1f1f9",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography fontSize={16} color="black" paddingLeft={3}>
                    Fecha: {sleepSession.date}
                  </Typography>
                  <Typography fontSize={16} color="black" paddingLeft={3}>
                    Promedio: {sleepSession.duration} h
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      color: "black",
                    }}
                  >
                    <div style={{ paddingLeft: 20, color: "grey" }}>
                      <img src={moon} height="30px" alt="moon" />
                      {sleepSession.bedTime?.split(":")[0]}:
                      {sleepSession.bedTime?.split(":")[1]} h
                    </div>
                    <div style={{ paddingLeft: 15, color: "grey" }}>
                      <img src={sun} height="30px" alt="moon" />
                      {sleepSession.wakeupTime?.split(":")[0]}:
                      {sleepSession.bedTime?.split(":")[1]} h
                    </div>
                  </div>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: !isMobile ? 150 : 0, padding: 3 }}
                image={sleep}
                alt="bar chart"
              />
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={{ xs: 4, md: 6 }}
          p={"2rem"}
        >
          <Grid item xs={12} sm={12} md={8}>
            <GraphHome />
          </Grid>

          <Grid item sm={12} md={4}>
            <CollapsibleTable />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingRight: "2rem", paddingLeft: "2rem" }}
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 15 }}
        >
          <Grid item sm={12} md={5}>
            <Resume />
          </Grid>

          <Grid item sm={12} md={5}>
            <Swipeable className={classes.swipeable} />
          </Grid>

          <Grid item sm={12} md={5}>
            <Calc />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;

const useStyles = makeStyles(() => ({
  paperWraper: {
    minHeight: "100vh",
    minWidth: "100vw",
  },
}));
