import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import page2A from "./Images/page2A.jpg";
import page2B from "./Images/page2B.jpg";
import page2C from "./Images/page2C.jpg";
import page2D from "./Images/page2D.jpg";
import page2E from "./Images/page2E.jpg";

const imgHeight = 300;

const Page2 = () => {
  const classes = useStyles();

  return (

    <Grid
      container
      alignItems="center"
      justifyContent='center'
      className={classes.mainPaper}
      p={9}
      paddingLeft={15}
      paddingRight={15}
    >

      <Grid
        item
      >
        <Typography
          variant='h4'
          fontWeight='bold'
        >
          Como funciona
        </Typography>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent='center'
        display='flex'
        spacing={5}
        p={2}
      >

        <Grid
          item
        >
          <Card
            variant='square'
          >
            <CardContent>

              <Grid
                container
                alignItems="flex-start"
                direction='column'
                spacing={2}
              >

                <Grid item>

                  <div className={classes.mosaic}>
                    <img
                      src={page2A}
                      alt={"Imagen representativa"}
                      // height={imgHeight}
                      width={imgHeight}
                      height={imgHeight}

                    />
                  </div>
                </Grid>

                <Grid item>

                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Registrate
                  </Typography>
                </Grid>

                <Grid item>

                  <Typography>Ingresa brevemente tus datos</Typography>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>

        <Grid
          item
        >
          <Card
            variant='square'
          >
            <CardContent>

              <Grid
                container
                alignItems="flex-start"
                direction='column'
                spacing={2}
              >

                <Grid item>

                  <div className={classes.mosaic}>
                    <img
                      src={page2B}
                      alt={"Imagen representativa"}
                      // height={imgHeight}
                      width={imgHeight}
                      height={imgHeight}

                    />
                  </div>
                </Grid>

                <Grid item>

                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Inicia sesion
                  </Typography>
                </Grid>

                <Grid item>

                  <Typography>Con tu cuenta o Google</Typography>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>

        <Grid
          item
        >
          <Card
            variant='square'
          >
            <CardContent>

              <Grid
                container
                alignItems="flex-start"
                direction='column'
                spacing={2}
              >

                <Grid item>

                  <div className={classes.mosaic}>
                    <img
                      src={page2C}
                      alt={"Imagen representativa"}
                      // height={imgHeight}
                      width={imgHeight}
                      height={imgHeight}

                    />
                  </div>
                </Grid>

                <Grid item>

                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Conecta tu reloj inteligente
                  </Typography>
                </Grid>

                <Grid item>

                  <Typography>Usa FitBit para tomar datos precisos</Typography>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>


        <Grid
          item
        >
          <Card
            variant='square'
          >
            <CardContent>

              <Grid
                container
                alignItems="flex-start"
                direction='column'
                spacing={2}
              >

                <Grid item>

                  <div className={classes.mosaic}>
                    <img
                      src={page2D}
                      alt={"Imagen representativa"}
                      // height={imgHeight}
                      width={imgHeight}
                      height={imgHeight}

                    />
                  </div>
                </Grid>

                <Grid item>

                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Registra informacion
                  </Typography>
                </Grid>

                <Grid item>

                  <Typography>
                    Mide actividad fisica, alcohol y cafe
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>

        <Grid
          item
        >
          <Card
            variant='square'
          >
            <CardContent>

              <Grid
                container
                alignItems="flex-start"
                direction='column'
                spacing={2}
              >

                <Grid item>

                  <div className={classes.mosaic}>
                    <img
                      src={page2E}
                      alt={"Imagen representativa"}
                      // height={imgHeight}
                      width={imgHeight}
                      height={imgHeight}

                    />
                  </div>
                </Grid>

                <Grid item>

                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Observa la graficas
                  </Typography>
                </Grid>

                <Grid item>

                  <Typography>Informacion util para un buen sueño</Typography>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>




        {/* <Grid item>
        <Typography variant="h4">Como funciona</Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        >
        <Typography variant="h6">Paso 1</Typography>
        <Typography>Registrate.</Typography>
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
        <img
          src={page2E}
          alt={"Imagen representativa"}
          height={imgHeight}
        />
      </Grid>*/}
      </Grid >
    </Grid >

  );
};

export default Page2;

const useStyles = makeStyles(() => ({
  mosaic: {
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "space-around",
  },

  mainPaper: {
    height: '130vh',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#ecefef'

  },

}));
