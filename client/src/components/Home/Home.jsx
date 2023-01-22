import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Resume from "./resume";
import Calc from "./calc";
import Swipeable from "./Swipeable";
import { getUsersPlanExpDate } from "../../actions/plan";
import { useAuthContext } from "../../actions/authContext";
import { getSleepStage } from "../../actions/getUserHealthData";
import { getRecordsQuery } from "../../actions/records_data";
import Calendario from "../Calendario/Calendario";
import GraphHome from "../Graphs/Graph-home";
import CollapsibleTable from "../Graph-Week/CollapsibleTable";
import Fitbit from "../SignUp/Fitbit";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";

const yesterday = new Date(Date.now() - 28800000).toISOString().split("T")[0];

const Home = () => {
  const { payPlan } = useAuthContext();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSleepStage(yesterday));
    dispatch(getRecordsQuery(currentUser.id, yesterday));
    dispatch(getUsersPlanExpDate(currentUser.id));
    payPlan(planExpirationDate);
  }, [dispatch, payPlan, planExpirationDate, currentUser]);

  let user = {
    name: currentUser.names ? currentUser.names : "🥰",
  };

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

  const classes = useStyles();

  return (
    <Paper className={classes.paperWraper}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={3}
        flex={4}
        p={"2rem"}
      >
        <Helmet>
          <title>Inicio | Sleep Tracker</title>
        </Helmet>

        <Grid item>
          <Typography variant="h2" fontWeight="bold" paddingTop={2}>
            ¡Hola {user.name}, {greet()}
          </Typography>
        </Grid>

        <Grid item>
          <Fitbit />
        </Grid>

        <Grid item>
          <Calendario />
        </Grid>
        <Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 4, md: 6 }}
            p={"2rem"}
            columns={16}
          >
            <Grid item xs={12}>
              <GraphHome />
            </Grid>

            <Grid item xs={4}>
              <CollapsibleTable />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            p={"2rem"}
            spacing={{ xs: 4, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 15 }}
          >
            <Grid item xs={5}>
              <Resume />
            </Grid>

            <Grid item xs={5}>
              <Swipeable className={classes.swipeable} />
            </Grid>

            <Grid item xs={5}>
              <Calc />
            </Grid>
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
  },
}));
