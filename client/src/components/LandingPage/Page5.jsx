import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
} from "@mui/material";
import { Info } from "@mui/icons-material";

const Page5 = () => {
  const classes = useStyles();

  const itemData = [
    {
      img: "https://avatars.githubusercontent.com/u/112527170?v=4",
      name: "Pablo Gomez",
      github: "@Pablo3360",
      githubURL: "https://github.com/Pablo3360",
    },
    {
      img: "https://avatars.githubusercontent.com/u/111720134?v=4",
      name: "Oscar Sarabia",
      github: "@Karso23",
      githubURL: "https://github.com/Karso23",
    },
    {
      img: "https://avatars.githubusercontent.com/u/105515713?v=4",
      name: "Juan Felipe Parrado",
      github: "@jfparrado",
      githubURL: "https://github.com/jfparrado",
    },
    {
      img: "https://avatars.githubusercontent.com/u/111819140?v=4",
      name: "Lizhana Campos Najera",
      github: "@Lizhana",
      githubURL: "https://github.com/Lizhana",
    },
    {
      img: "https://avatars.githubusercontent.com/u/82216404?v=4",
      name: "Helena Arzabala León",
      github: "@arza1012",
      githubURL: "https://github.com/arza1012",
    },
    {
      img: "https://avatars.githubusercontent.com/u/111090725?v=4",
      name: "Juan Jose Rivera",
      github: "@JuanRiv96",
      githubURL: "https://github.com/JuanRiv96",
    },
    {
      img: "https://avatars.githubusercontent.com/u/106901527?v=4",
      name: "Renato Alcedo Melendez",
      github: "@renatoshi",
      githubURL: "https://github.com/renatoshi",
    },
    {
      img: "https://avatars.githubusercontent.com/u/94816708?v=4",
      name: "Joaquin Padron",
      github: "@elhombrej",
      githubURL: "https://github.com/elhombrej",
    },
  ];

  return (

      <Paper
        // variant="outlined"
        // square
        elevation={20}
        // className={classes.mainPaper}
      >
        <Typography variant="h4">Conoce al equipo</Typography>

        <ImageList 
        // sx={{ width: 1000, height: 450 }} 
        cols={1}
        rows={1}
        // display='flex'

        >
          <Grid
            container
            // direction="row"
            justifyContent="center"
            // alignItems="flex-start"
            // spacing={0}
            // display='flex'
            flex={4}
            p={9}
            // height='100vh'
            gap='10px'
            
            >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
              <Grid
                item
              >
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={<span>GitHub: {item.github}</span>}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.name}`}
                      >
                        <a className={classes.aTag} href={item.githubURL}>
                          <Info />
                        </a>
                      </IconButton>
                    }
                  />
              </Grid>
                </ImageListItem>
            ))}
          </Grid>
            </ImageList>
      </Paper>
  );
};

export default Page5;

const useStyles = makeStyles(() => ({
  aTag: {
    color: "white",
  },

  mainPaper:{
    height:'100vh',
    width:'97vw'
  },

}));
