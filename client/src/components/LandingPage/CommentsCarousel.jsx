import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useSelector } from "react-redux";
import { Grid, Rating } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const allComments = [
  {
    name: "Carlos Canguro",
    rate: "3",
    comment:
      "Mi sueño mejoro al poder llevar un registro y ver que comidas me afectan antes de ir a dormir.",
  },
  {
    name: "Tina Tazmania",
    rate: "4",
    comment:
      "Soy una persona muy tranquila, luego de ver las graficas de sueño de la toda la semana me di cuenta de que no me despierto mas que por un vaso de agua en la noche :-)",
  },
  {
    name: "Pepe Perezoso",
    rate: "5",
    comment:
      "Yo solia sentirme muy cansado durante el dia, desde que descargo el PDF con el registro de sueño soy mas conciente lo poco que dormia.",
  },
];

function SwipeableTextMobileStepper({ commentsState }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const currentComments = useSelector((state) => state.comments);

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Paper
            square
            elevation={0}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
              backgroundColor: "#e8eaf6",
              paddingTop: 2,
            }}
          >
            {currentComments.data[activeStep] !== undefined ? (
              <Typography variant="h4">
                {currentComments.data[activeStep].name}
              </Typography>
            ) : (
              <Typography>{allComments[activeStep].name}</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item>
          {currentComments.data[activeStep] !== undefined ? (
            <Typography variant="h5">
              <Rating
                name="read-only"
                value={currentComments.data[activeStep].rate}
                readOnly
                size="large"
              />
            </Typography>
          ) : (
            <Typography>{allComments[activeStep].rate}</Typography>
          )}
        </Grid>

        <Grid item sx={{ paddingBottom: 3 }}>
          {currentComments.data[activeStep] !== undefined ? (
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {currentComments.data?.map((step, index) => (
                <div key={step.name}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Typography variant="h5">
                      {currentComments.data[activeStep]?.comment}
                    </Typography>
                  ) : (
                    <Typography variant="h5">
                      {allComments[activeStep]?.comment}
                    </Typography>
                  )}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          ) : (
            <Typography>Cargando</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
