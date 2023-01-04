import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";

const Page4 = () => {
  const classes = useStyles();
  return (

    <Paper
    // variant="outlined"
    // square
    elevation={20}
  // className={classes.mainPaper}
  >
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      // className={classes.mainPaper}
      // flex={4}
      // p={9}

    >
      <Grid
        item
      >
        <Typography variant="h4" sx={{ mt: 7 }}>Planes de pago</Typography>
      </Grid>

      <Grid
        container
        // direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.mainPaper}
        flex={4}
        p={9}

      >
        <Grid
          item
          xs={12}
          md={3}
        >
          <Card
            elevation={20}
          >
            <CardContent>

              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
              </Box>  
              <Typography variant="h4" sx={{ mb: 8 }} >Prueba gratis</Typography>
              <Box
                sx={{ display: { xs: "none", sm: "none", md: 'block' } }}
              >
                <Typography>Registro de actividad física</Typography>
                <Typography>
                  Registra tus consumos diarios de comida y bebida.
                </Typography>
                <Typography>
                  Información de sueño conseguido diario y semanal.
                </Typography>
                <Typography>
                  Prueba gratis 30 dias
                </Typography>
                <Divider />
              </Box>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
                <Link to={"/registro"} style={{textDecoration: "none"}}>
                <Button variant="contained" size="large" >
                  Gratis
                </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card
            elevation={20}
          >
            <CardContent>
              <Box>

                <Box
                  className={classes.mosaic}
                  sx={{
                    marginTop: { md: '50px', xs: '5px' },
                    marginBottom: { md: '50px', xs: '5px' }
                  }}
                >
                </Box>
                <Typography variant="h4" sx={{ mb: 8 }}>
                  Plan Estandar
                </Typography>
                <Box
                  sx={{ display: { xs: "none", sm: "none", md: 'block' } }}
                >
                  <Typography>Registro de actividad física</Typography>
                  <Typography>
                    Registra tus consumos diarios de comida y bebida.
                  </Typography>
                  <Typography>
                    Información de sueño conseguido diario y semanal.
                  </Typography>
                  <Typography>
                    Descarga tu información completa en formato PDF
                  </Typography>
                  <Divider />
                </Box>
                <Box
                  className={classes.mosaic}
                  sx={{
                    marginTop: { md: '50px', xs: '5px' },
                    marginBottom: { md: '50px', xs: '5px' }
                  }}
                >
                <Link to={"/registro"} style={{textDecoration: "none"}}>
                  <Button variant="contained" size="large">
                    $1 USD / Mes
                  </Button>
                </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
        >
          <Card
            elevation={20}
          >
            <CardContent>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
              </Box>
              <Typography variant="h4" sx={{ mb: 8 }}>Plan Premium</Typography>
              <Box
                sx={{ display: { xs: "none", sm: "none", md: 'block' } }}
              >
                <Typography>Registro de actividad física</Typography>
                <Typography>
                  Registra tus consumos diarios de comida y bebida.
                </Typography>
                <Typography>
                  Información de sueño conseguido diario y semanal.
                </Typography>
                <Typography>
                    Descarga tu información completa en formato PDF
                  </Typography>
                <Divider />
              </Box>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: '50px', xs: '5px' },
                  marginBottom: { md: '50px', xs: '5px' }
                }}
              >
                <Link to={"/registro"} style={{textDecoration: "none"}}>
                <Button variant="contained" size="large">
                  $10 USD / Año
                </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  </Paper>

 
  );
};

export default Page4;

const useStyles = makeStyles(() => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
    // marginTop: '50px',
    // marginBottom: '50px',
  },

  ul: {
    display: "flex",
    listStyle: "none",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },

  mainPaper: {
    height: '100vh',
    width: '97vw'
  },

}));
