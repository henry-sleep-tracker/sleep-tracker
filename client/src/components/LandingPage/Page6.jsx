import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import getComments from "../../actions/Comments/getComments";
import CommentsCarousel from './CommentsCarousel'

const Page1 = () => {
  const classes = useStyles();

  useEffect(() => {
    getComments()
  })

  return (

    <Grid
      container
      direction="row"
      sx={{

        justifyContent: {
          lg: 'space-evenly',
          xs: 'center'
        }
      }}
      alignItems="center"
      className={classes.mainPaper}
    // flex={4}
    // p={9}

    >
      <Grid
        item
        xs={12}
        md={3}
      >
        <Typography
          variant="h2"
          fontWeight='bold'
        >
          Comentarios sobre Sleep Tracker
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
      >
        <CommentsCarousel />
      </Grid>
    </Grid>
  );
};

export default Page1;

const useStyles = makeStyles(() => ({
  mainPaper: {
    minHeight: '50vh',
    width: '50vw',
    backgroundColor: '#e8eaf6',
  }
}));
