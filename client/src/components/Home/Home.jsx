import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collection from "./resume";
import Graph from "../Graphs/TestGraph";
import ResponsiveAppBar from "./Nav";
// import "./home.css";
import Calc from "./calc";
import Swipeable from "./tips";
import { Grid, Typography } from "@mui/material";
import Calendario from "../Calendario/Calendario";
import { makeStyles } from "@mui/styles";
import Fitbit from "../SignUp/Fitbit";
import { getSleepByDate } from "../../actions/getSleepData";
import { getRecordsQuery } from "../../actions/newRecord";
const MY_AUTH_APP = "MY_AUTH_APP_1";
const USER_ID = "USER_ID";

const Home = () => {
  const userId= window.localStorage.getItem(USER_ID)
  const currentUser = useSelector((state) => state?.users.currentUser);
  console.log("SOY CURRENTUSER", currentUser);


  const dispatch = useDispatch();
  useEffect(() => {
    const yesterday = new Date(Date.now() - 28800000)
      .toISOString()
      .split("T")[0];
    dispatch(getSleepByDate(yesterday));
    let id = currentUser.id
    let date = yesterday
    dispatch(getRecordsQuery(id,date))
  }, [dispatch, currentUser]);

  let user = {
    name: currentUser.names?currentUser.names : '🥰',
  };
 
  


  const greet = () => {
    var text = "";
    var now = new Date();
    var time = now.getHours();
    if (time >= 5 && time < 13) {
      text = "Buenos días! ☀️ ";
    } else if (time >= 13 && time < 21) {
      text = "Buenas tardes! 🌎";
    } else {
      text = "Buenas noches! 🌙 ";
    }
    return text;
  };

  
  const classes = useStyles();

  return (
    <Grid
      className={classes.home}
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
      flex={4}
      p={2}
    // maxWidth='100vw'
    >
      <ResponsiveAppBar />
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
        className={classes.Collection}
        item
      >
        <Collection/>
      </Grid>

      <Grid
        item
      >
        <Calendario />
      </Grid>

      <Grid className={classes.graphHome} item>
        <Graph />
      </Grid>

      <Grid className={classes.calc} item>
        <Calc />
      </Grid>

      <Grid className={classes.swipeableHome} item>
        <Swipeable className={classes.swipeable} />
      </Grid>

    </Grid>
  );
};

export default Home;

const useStyles = makeStyles(() => ({}));
