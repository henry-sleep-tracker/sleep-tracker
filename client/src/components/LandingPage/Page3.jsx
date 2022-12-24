import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import xiaomiBand5 from "./Images/xiaomiBand5.jpg";
import xiaomiBand6 from "./Images/xiaomiBand6.jpg";
import samsungGalaxyFit2 from "./Images/samsungGalaxyFit2.jpg";

const Page3 = () => {
  const classes = useStyles();
  return (
    <Paper
      // variant="outlined"
      // square
      elevation={20}
      // className={classes.mainPaper}
    >
      <Typography variant="h4">Dispositivos soportados</Typography>

      <Grid
        container
        // direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.mainPaper}

      >

        <Grid
          item
          xs={12}
          md={3}
        >

          <Card>
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={xiaomiBand5}
                  alt={"Imagen representativa"}
                  height={220}
                />
              </div>
              <Divider />
              <div className={classes.title}>
                <Typography variant="h4">Xiaomi Band 5</Typography>
              </div>
              <Typography>Dispositivo Android</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card>
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={samsungGalaxyFit2}
                  alt={"Imagen representativa"}
                  height={220}
                />
              </div>
              <Divider />
              <div className={classes.title}>
                <Typography variant="h4">Samsung Galaxy Fit 2</Typography>
              </div>
              <Typography>Dispositivo Android</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card>
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={xiaomiBand6}
                  alt={"Imagen representativa"}
                  height={220}
                />
              </div>
              <Divider />
              <div className={classes.title}>
                <Typography variant="h4" >Xiaomi Band 6</Typography>
              </div>
              <Typography>Dispositivo Android</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
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
    width: '97vw'
  },
}));
