import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
// import xiaomiBand5 from "./Images/xiaomiBand5.jpg";
// import xiaomiBand6 from "./Images/xiaomiBand6.jpg";
// import samsungGalaxyFit2 from "./Images/samsungGalaxyFit2.jpg";
import DevicesCarousel from "./DevicesCarousel";

const Page3 = () => {
  const classes = useStyles();
  const step0 = 0
  const step1 = 1
  const step2 = 2

  return (

    <Grid
      container
      className={classes.mainPaper}
      direction='column'
      alignItems='center'
      spacing={5}
      p={2}
      paddingLeft={15}
      paddingRight={15}

    >

      <Grid
        item
      >

        <Typography
          variant="h4"
          fontWeight='bold'
        >
          Dispositivos soportados
        </Typography>
      </Grid>

      <Grid
        item
      >

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"

        >

          <Grid
            item
            xs={12}
            md={3}
          >
            <DevicesCarousel
              localStep={step0}
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={3}
          >
            <DevicesCarousel
              localStep={step1}
            />

          </Grid>

          <Grid
            item
            xs={12}
            md={3}
          >
            <DevicesCarousel
              localStep={step2}
            />

          </Grid>

        </Grid>
      </Grid>

      <Grid
        item
      >

        <Typography
          variant="h5"
        >
          Compatibles con FitBit
        </Typography>
      </Grid>

    </Grid>
  );
};

export default Page3;

const useStyles = makeStyles(() => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },

  title: {
    marginTop: '50px',
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",

  },

  mainPaper: {
    height: '100vh',
    width: '100vw',
    minHeight: '100vh',
    // maxWidth: '97vw',
    backgroundColor: '#e8eaf6'
  },

  card: {
    // maxWidth: '88vw',
  }
}));
