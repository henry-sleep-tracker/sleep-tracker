import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import xiaomiBand5 from "./Images/xiaomiBand5.jpg";
import xiaomiBand6 from "./Images/xiaomiBand6.jpg";
import samsungGalaxyFit2 from "./Images/samsungGalaxyFit2.jpg";

const Page3 = () => {
  const classes = useStyles();
  return (
<<<<<<< HEAD
    <div>
=======

    <Paper
      // variant="outlined"
      // square
      elevation={20}
      // className={classes.mainPaper}
    >
      <Typography variant="h4">Dispositivos soportados</Typography>
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902

      <Grid
        container
        // direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.mainPaper}
        flex={4}
        p={9}

      >
<<<<<<< HEAD
          <Typography variant="h4">Dispositivos soportados</Typography>
=======
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902

        <Grid
          item
          xs={12}
          md={3}
        >
<<<<<<< HEAD

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
=======
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902

          <Card 
          className={classes.card}
            elevation={20}
          >
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={xiaomiBand5}
                  alt={"Imagen representativa"}
                  height={200}
                />
              </div>
              <Divider />
              <Box
                className={classes.title}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
                <Typography
                  sx={{ variant: { md: "h4", xs: 'h5' } }}
                >
                  Xiaomi Band 5
                </Typography>
              </Box>
              <Typography
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block'
                  }
                }}
              >
                Dispositivo Android
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card 
          className={classes.card}
          elevation={20}
          >
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={samsungGalaxyFit2}
                  alt={"Imagen representativa"}
                  height={200}
                />
              </div>
              <Divider />
              <Box
                className={classes.title}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
                <Typography
                  sx={{ variant: { md: "h4", xs: 'h5' } }}
                >
                  Samsung Galaxy Fit 2
                </Typography>
              </Box>
              <Typography
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block'
                  }
                }}
              >
                Dispositivo Android
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card 
          className={classes.card}
          elevation={20}
          >
            <CardContent>
              <div className={classes.mosaic}>
                <img
                  src={xiaomiBand6}
                  alt={"Imagen representativa"}
                  height={200}
                />
              </div>
              <Divider />
              <Box
                className={classes.title}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
                <Typography
                  sx={{ variant: { md: "h4", xs: 'h5' } }}
                >
                  Xiaomi Band 6
                </Typography>
              </Box>
              <Typography
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block'
                  }
                }}
              >
                Dispositivo Android
              </Typography>
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
    width: '97vw',
    // maxWidth: '97vw',
  },

  card: {
    // maxWidth: '88vw',
  }
}));
