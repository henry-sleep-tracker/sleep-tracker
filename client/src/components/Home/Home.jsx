import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collection from "./resume";
import Calc from "./calc";
import Swipeable from "./tips";
import { Grid, Typography } from "@mui/material";
import Calendario from "../Calendario/Calendario";
import { makeStyles } from "@mui/styles";
import Fitbit from "../SignUp/Fitbit";
import { getSleepStage } from "../../actions/getUserHealthData";
import { getRecordsQuery } from "../../actions/records_data";
import GraphHome from "../Graphs/Graph-home";
import CollapsibleTable from "../Graph-Week/CollapsibleTable";
import { getUsersPlanExpDate } from "../../actions/plan";
import { useAuthContext } from "../../actions/authContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { payPlan } = useAuthContext();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const yesterday = new Date(Date.now() - 28800000)
      .toISOString()
      .split("T")[0];
    dispatch(getSleepStage(yesterday));
    let id = currentUser.id;
    let date = yesterday;
    dispatch(getRecordsQuery(id, date));
    dispatch(getUsersPlanExpDate(id));
    payPlan(planExpirationDate);
  }, [dispatch, currentUser, planExpirationDate, payPlan]);

  let user = {
    name: currentUser.names ? currentUser.names : "🥰",
  };

  const greet = () => {
    var text = "";
    var now = new Date();
    var time = now.getHours();
    if (time >= 5 && time < 13) {
      text = "Buenos días!  ";
    } else if (time >= 13 && time < 21) {
      text = "Buenas tardes! ";
    } else {
      text = "Buenas noches!  ";
    }
    return text;
  };

  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
      p={2}
    // maxWidth='100vw'
    >
      <Helmet>
        <title>Inicio | Sleep Tracker</title>
      </Helmet>

      <Grid item>
        <Typography className={classes.saludo} variant="h4">
          ¡Hola {user.name} {greet()}
        </Typography>
      </Grid>

      <Grid
        item
      >
        <Fitbit />
      </Grid>

      {/* <Grid
        item
      >
        <Typography variant="h6">{Date()}</Typography>
      </Grid> */}
      <Grid
        item
      >
        <Calendario />
      </Grid>

      <Grid
        item
      >
        <GraphHome />
      </Grid>

      <Grid
        item
      >
        <CollapsibleTable />
      </Grid>

      <Grid className={classes.Collection}
        item
      >
        <Collection />
      </Grid>

      <Grid className={classes.calc}
        item
      >
        <Calc />
      </Grid>

      <Grid className={classes.swipeableHome}
        item
      >
        <Swipeable className={classes.swipeable} />
      </Grid>

    </Grid>
  );
};

export default Home;

const useStyles = makeStyles(() => ({}));
