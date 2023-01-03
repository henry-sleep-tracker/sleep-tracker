import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography } from "@mui/material";
import page2A from "./Images/page2A.jpg";
import page2B from "./Images/page2B.jpg";
import page2C from "./Images/page2C.jpg";
import page2D from "./Images/page2D.jpg";
import page2E from "./Images/page2E.jpg";

const imgHeight = 140;

const Page2 = () => {
  const classes = useStyles();
  return (
    <Paper
      // variant="outlined"
      // square
      elevation={20}
      // className={classes.mainPaper}
      >
      <Typography variant="h4">Como funciona</Typography>

      <Grid
        container
        alignItems="center"
        flex={4}
        p={9}

      >

        <Grid
          item
          xs={12}
          md={6}>
          <Typography variant="h6">Paso 1</Typography>
          <Typography>Registrate usando tu cuenta de Gmail.</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className={classes.mosaic}>
            <img
              src={page2A}
              alt={"Imagen representativa"}
              height={imgHeight}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Paso 2</Typography>
          <Typography>Inicia sesion.</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className={classes.mosaic}>
            <img
              src={page2B}
              alt={"Imagen representativa"}
              height={imgHeight}
            />
          </div>
        </Grid>
        <Grid
          item xs={12}
          md={6}
        >
          <Typography variant="h6">Paso 3</Typography>
          <Typography>
            Observa los datos de tu smartwatch en la aplicación, previamente
            conectado con Google Fit.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className={classes.mosaic}>
            <img
              src={page2C}
              alt={"Imagen representativa"}
              height={imgHeight}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography variant="h6">Paso 4</Typography>
          <Typography>
            Lleva regisro de tu actividad física, hora de cena, consumo de
            alcohol y café.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className={classes.mosaic}>
            <img
              src={page2D}
              alt={"Imagen representativa"}
              height={imgHeight}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography variant="h6">Paso 5</Typography>
          <Typography>Observa tus estadisticas del sueno.</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className={classes.mosaic}>
            <img
              src={page2E}
              alt={"Imagen representativa"}
              height={imgHeight}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Page2;

const useStyles = makeStyles((theme) => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },

  mainPaper:{
    height:'100vh',
    width:'97vw'
  },

}));
