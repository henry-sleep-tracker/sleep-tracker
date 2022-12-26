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
      // variant="outlined"
      // square
      elevation={20}
      // className={classes.mainPaper}
    >
      {/* <ul className={classes.ul}>
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
