import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import page1SleepA from "./Images/page1SleepA.jpg";

const Page1 = (
  currentPage,
  setCurrentPage,
  page1,
  page2,
  page3,
  page4,
  page5
) => {
  const classes = useStyles();
  return (

    <Paper
<<<<<<< HEAD
      variant="outlined"
      square
      elevation={0}
      className={classes.presentation}
    >
      <ul className={classes.ul}>
=======
      // variant="outlined"
      // square
      elevation={20}
      // className={classes.mainPaper}
    >
      {/* <ul className={classes.ul}>
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
        <li onClick={() => setCurrentPage(page2)}>Como funciona</li>
        <li onClick={() => setCurrentPage(page3)}>Dispositivos soportados</li>
        <li onClick={() => setCurrentPage(page4)}>Planes de pago</li>
        <li onClick={() => setCurrentPage(page5)}>Conoce al equipo</li>
      </ul> */}
      {/* <div className={classes.mosaic}> */}

        <Grid
          container
          // display='flex'
          // direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.mainPaper}
          flex={4}
          p={2}

<<<<<<< HEAD
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography variant="h1">Sweet Dreams</Typography>
          <Typography
            variant='h6'
          >
            Lleva el control de tu sueño con tu telefono movil y/o reloj
            inteligente
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          {/* <div className={classes.mosaic}> */}
          {/* <img
                src={page1SleepA}
                alt={"Imagen representativa"}
                height={220}
              /> */}

          <ImageList
            sx={{ width: 1000, height: 450 }}
            cols={2}
            rowHeight={'auto'}
          >
            <ImageListItem >
              <img
                src={page1SleepA}
                alt={'imagen'}
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>

          {/* </div> */}
        </Grid>
      </Grid>
=======
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              variant="h1"
              display='flex'
              flexwrap='wrap'
            >Sleep Tracker
            </Typography>
            <Typography
              variant='h6'
              display='flex'
              flexwrap='wrap'
            >
              Lleva el control de tu sueño con tu telefono movil y/o reloj
              inteligente
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            >

            <ImageList
              // cols={2}
              // rowHeight={'auto'}
              >
              <ImageListItem 
              sx={{ width: '400px', height: 'auto' }}  
              // overflow='hidden'            
              >
                <img
                  src={page1SleepA}
                  alt={'imagen'}
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>

          </Grid>
        </Grid>
      {/* </div> */}
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
    </Paper>
  );
};

export default Page1;

const useStyles = makeStyles(() => ({
  mainPaper:{
    height:'100vh',
    width:'97vw'

  }
}));
