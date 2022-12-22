import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import xiaomiBand5 from "./Images/xiaomiBand5.jpg";
import xiaomiBand6 from "./Images/xiaomiBand6.jpg";
import samsungGalaxyFit2 from "./Images/samsungGalaxyFit2.jpg";

const Page3 = () => {
  const classes = useStyles();
  return (
    <div>

      <Paper
        variant="outlined"
        square
        elevation={0}
        className={classes.presentation}
      >
          <Typography variant="h4">Dispositivos soportados</Typography>

        <Grid
          container
          spacing={8}
          justifyContent="space-evenly"
          alignItems="center"
        >

          <Grid item xs={12} md={3}>

            <Card>
              <CardContent>
                <div className={classes.mosaic}>
                  <img
                    src={xiaomiBand5}
                    alt={"Imagen representativa"}
                    height={220}
                  />
                </div>
                <Typography variant="h4">Xiaomi Band 5</Typography>
                <Typography>Dispositivo Android</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <div className={classes.mosaic}>
                  <img
                    src={samsungGalaxyFit2}
                    alt={"Imagen representativa"}
                    height={220}
                  />
                </div>
                <Typography variant="h4">Samsung Galaxy Fit 2</Typography>
                <Typography>Dispositivo Android</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <div className={classes.mosaic}>
                  <img
                    src={xiaomiBand6}
                    alt={"Imagen representativa"}
                    height={220}
                  />
                </div>
                <Typography variant="h4">Xiaomi Band 6</Typography>
                <Typography>Dispositivo Android</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Page3;

const useStyles = makeStyles((theme) => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },

  ul: {
    display: "flex",
    listStyle: "none",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },
}));
