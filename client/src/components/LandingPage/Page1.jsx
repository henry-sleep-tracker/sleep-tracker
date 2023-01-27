import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography } from "@mui/material";
import page1SleepA from "./Images/page1SleepA.jpg";

const Page1 = (
  currentPage,
  setCurrentPage,
  page1,
  page2,
  page3,
  page4,
  page5
) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="center"
      justifyContent="center"
      className={classes.mainPaper}
    >
      <Grid item md={6} xs={12} className={classes.bg}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={10}
          spacing={4}
        >
          <Grid item>
            <Typography
              fontWeight="bold"
              variant="h1"
              display="flex"
              flexwrap="wrap"
              align="center"
            >
              Sleep Tracker
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="h4"
              display="flex"
              flexwrap="wrap"
              align="center"
            >
              Lleva el control de tu sueño
            </Typography>
          </Grid>

          <Grid item>
            <Button variant="contained" size="large" href="/registro">
              Comienza ya
            </Button>
          </Grid>

          <Grid item>
            <br />
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={6} xs={12}>
        <img
          src={page1SleepA}
          alt={"imagen"}
          loading="lazy"
          height="100%"
          width="100%"
        />
      </Grid>
    </Grid>
  );
};

export default Page1;

const useStyles = makeStyles(() => ({
  bg: {
    backgroundColor: "#9fa8da",
  },

  mainPaper: {
    width: "100vw",
    minHeight: "60vh",
  },
}));
