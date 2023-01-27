import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";

const Page4 = () => {
  const priceProps = (
    <Box>
      <Typography>- Registro de actividad fisica</Typography>
      <Typography>
        - Registro de consumos diarios( alimentos y bebidas)
      </Typography>
      <Typography>
        - Información de sueño conseguido diario y semanal
      </Typography>
      <Typography>- Exporta tu información completa en formato PDF</Typography>
    </Box>
  );
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.mainPaper}
    >
      <Grid item marginTop={5}>
        <Typography variant="h2" fontWeight="bold" align="center">
          Planes de pago
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        flex={4}
        p={9}
        gap="10px"
        height="70vh"
      >
        <Grid item xs={12} md={3}>
          <Card elevation={20}>
            <CardContent>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: "50px", xs: "5px" },
                  marginBottom: { md: "50px", xs: "5px" },
                }}
              >
                <ThumbUpIcon />
              </Box>
              <Typography
                variant="h4"
                sx={{ mb: 8 }}
                fontWeight="bold"
                className={classes.mosaic}
              >
                Prueba gratis
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Typography>- Duracion de 30 dias</Typography>
                {priceProps}
              </Box>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: "50px", xs: "5px" },
                  marginBottom: { md: "50px", xs: "5px" },
                }}
              >
                <Link to={"/registro"} style={{ textDecoration: "none" }}>
                  <Button variant="contained" size="large">
                    Gratis
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={20}>
            <CardContent>
              <Box>
                <Box
                  className={classes.mosaic}
                  sx={{
                    marginTop: { md: "50px", xs: "5px" },
                    marginBottom: { md: "50px", xs: "5px" },
                  }}
                >
                  <EmojiEmotionsIcon />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ mb: 8 }}
                  fontWeight="bold"
                  className={classes.mosaic}
                >
                  Plan Estandar
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                  {priceProps}
                  <Divider />
                </Box>
                <Box
                  className={classes.mosaic}
                  sx={{
                    marginTop: { md: "50px", xs: "5px" },
                    marginBottom: { md: "50px", xs: "5px" },
                  }}
                >
                  <Link to={"/registro"} style={{ textDecoration: "none" }}>
                    <Button variant="contained" size="large">
                      $1 USD / Mes
                    </Button>
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={20}>
            <CardContent>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: "50px", xs: "5px" },
                  marginBottom: { md: "50px", xs: "5px" },
                }}
              >
                <AutoAwesomeIcon />
              </Box>
              <Typography
                variant="h4"
                sx={{ mb: 8 }}
                fontWeight="bold"
                className={classes.mosaic}
              >
                Plan Premium
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Typography>- Descuento de $2 USD</Typography>
                <Typography>
                  - Participa en el foro con otros usuarios
                </Typography>
                {priceProps}
                <Divider />
              </Box>
              <Box
                className={classes.mosaic}
                sx={{
                  marginTop: { md: "50px", xs: "5px" },
                  marginBottom: { md: "50px", xs: "5px" },
                }}
              >
                <Link to={"/registro"} style={{ textDecoration: "none" }}>
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
  );
};

export default Page4;

const useStyles = makeStyles(() => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "center",
    height: "100%",
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
    width: "100vw",
    backgroundColor: "#ecefef",
    minHeight: "70vh",
  },
}));
