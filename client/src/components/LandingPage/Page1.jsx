import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
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

      <Grid
        container
        // display='flex'
        // direction="row"
        justifyContent="center"
        alignItems='stretch'
        className={classes.mainPaper}
        // flex={4}
        // p={2}
        columns={12}
      >
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          className={classes.bg}
        >
          <Grid
            container
            direction='column'
            justifyContent="center"
            alignItems="center"
            width="100%"
            paddingTop={10}
            spacing={4}
          >
            <Grid
              item
            >
              <Typography
                fontWeight='bold'
                variant="h1"
                display='flex'
                flexwrap='wrap'
              >
                Sleep Tracker
              </Typography>

            </Grid>
            <Grid
              item
            >
              <Typography
                variant='h4'
                display='flex'
                flexwrap='wrap'
              >
                Lleva el control de tu sueño
              </Typography>

            </Grid>
            <Grid
              item
            >
              <Button
                variant='contained'
                size='large'
                href='/registro'
              >
                Comienza ya
              </Button>

            </Grid>


            <br />
          </Grid>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xs={12}
        >

          <img
            src={page1SleepA}
            className={classes.imageStyle}
            alt={'imagen'}
            loading="lazy"
            width='400px'
            height='100%'
          />

        </Grid>

      </Grid>


  );
};

export default Page1;

const useStyles = makeStyles(() => ({

  bg: {
    backgroundColor: '#9fa8da'
  },

  mainPaper: {
    width: '100vw',
    minHeight: '60vh',

  },

  imageStyle: {
    width: '100%',
    height: '100%'
  },

}));
