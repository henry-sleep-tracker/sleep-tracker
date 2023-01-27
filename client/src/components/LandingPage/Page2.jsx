import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import page2A from "./Images/page2A.jpg";
import page2B from "./Images/page2B.jpg";
import page2C from "./Images/page2C.jpg";
import page2D from "./Images/page2D.jpg";
import page2E from "./Images/page2E.jpg";

const itemData = [
  {
    img: page2A,
    title: "Registrate",
    description: "Ingresa brevemente tus datos",
  },
  {
    img: page2B,
    title: "Inicia sesion",
    description: "Con tu cuenta o Google",
  },
  {
    img: page2C,
    title: "Conecta tu reloj inteligente",
    description: "Usa FitBit para tomar datos precisos",
  },
  {
    img: page2D,
    title: "Registra informacion",
    description: "Mide actividad fisica, alcohol y cafe",
  },
  {
    img: page2E,
    title: "Observa la grafica",
    description: "Informacion util para un buen sueño",
  },
];

let imgHeight = 300;

let imageSize = 400;

const Page2 = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        minHeight: "auto",
        backgroundColor: "#ecefef",
      }}
      columns={12}
      spacing={4}
    >
      <Grid item>
        <Typography variant="h2" fontWeight="bold" align="center">
          Como funciona
        </Typography>
      </Grid>

      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          p={2}
          spacing={4}
          sx={{
            display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
          }}
        >
          {itemData.map((item) => (
            <Grid item marginBottom={4}>
              <Card variant="square">
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    spacing={2}
                  >
                    <Grid item>
                      <img
                        src={item.img}
                        alt={"Imagen representativa"}
                        width={imgHeight}
                        height={imgHeight}
                      />
                    </Grid>

                    <Grid item>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography>{item.description}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item sx={{ display: { lg: "none", md: "none" } }} lg={12}>
        <ImageList sx={{ width: "90vw", height: "100vh" }} cols={1}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={item.img}
                srcSet={item.img}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.description}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default Page2;

const useStyles = makeStyles(() => ({
  mainPaper: {
    width: "100vw",
    backgroundColor: "#ecefef",
  },
}));
