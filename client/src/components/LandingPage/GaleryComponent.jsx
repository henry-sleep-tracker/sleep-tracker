import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import page1SleepA from "./Images/page1SleepA.jpg";

const GaleryComponent = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square elevation={0} className={classes.root}>
      <div className={classes.mosaic}>
        <img src={page1SleepA} alt={"Imagen representativa"} height="300px" />
      </div>
    </Paper>
  );
};

export default GaleryComponent;

const useStyles = makeStyles((theme) => ({
  text: {
    color: "ea5933",
  },

  root: {
    display: "flex",
    flexwrap: "wrap",
  },

  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },
}));
