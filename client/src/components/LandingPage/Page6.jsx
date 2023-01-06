import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import getComments from "../../actions/Comments/getComments";

const Page1 = () => {
  const classes = useStyles();

  useEffect(()=>{
    getComments()
  })

  return (

    <Paper
      elevation={20}
    >

      <Grid
        container
        // display='flex'
        // direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.mainPaper}
        flex={4}
        p={2}

      >
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
        >
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Page1;

const useStyles = makeStyles(() => ({
  mainPaper: {
    height: '100vh',
    width: '97vw'

  }
}));
