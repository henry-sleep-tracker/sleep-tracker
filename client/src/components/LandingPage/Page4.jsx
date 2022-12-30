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

const Page4 = () => {
  const classes = useStyles();
  return (
    <div>

      <Paper
        // variant="outlined"
        // square
        elevation={20}
      // className={classes.mainPaper}
      >
        <Typography variant="h4">Planes de pago</Typography>

        <Grid
          container
          // direction="row"
          justifyContent="space-evenly"
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
                  <ThumbUpIcon />
                </Box>
                <Typography variant="h5">Prueba por 3 meses.</Typography>
                <Box
                  sx={{ display: { xs: "none", sm: "none", md:'block' } }}
                >
                  <Typography>Registro de actividad física</Typography>
                  <Typography>
                    Registra tus consumos diarios de comida y bebida.
                  </Typography>
                  <Typography>
                    Información de sueño conseguido diario y semanal.
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
                  <Button variant="contained" size="large" >
                    Gratis
                  </Button>
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
                    <EmojiEmotionsIcon />
                  </Box>
                  <Typography variant="h5">
                    Exporta informacion en formato PDF.
                  </Typography>
                  <Box
                    sx={{ display: { xs: "none", sm: "none", md:'block'  } }}
                  >
                    <Typography>Registro de actividad física</Typography>
                    <Typography>
                      Registra tus consumos diarios de comida y bebida.
                    </Typography>
                    <Typography>
                      Información de sueño conseguido diario y semanal.
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
                    <Button variant="contained" size="large">
                      $1 USD / Mes
                    </Button>
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
                  <AutoAwesomeIcon />
                </Box>
                <Typography variant="h5">Descuento anual.</Typography>
                <Box
                  sx={{ display: { xs: "none", sm: "none", md:'block'  } }}
                >
                  <Typography>Registro de actividad física</Typography>
                  <Typography>
                    Registra tus consumos diarios de comida y bebida.
                  </Typography>
                  <Typography>
                    Información de sueño conseguido diario y semanal.
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
                  <Button variant="contained" size="large">
                    $10 USD / Año
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div >
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
