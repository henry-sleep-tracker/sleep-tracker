import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import googlePixelWatchChalk from "./Images/google-pixel-watch-chalk-device-3qt.png";
import googlePixelWatchObsidian from "./Images/google-pixel-watch-obsidian-device-3qt.png";
import sense2 from "./Images/sense2-black-device-3qt.png";
import versa2 from "./Images/versa2-3qtr-black.png";
import versa4 from "./Images/versa4-black-device-3qtr.png";
import { Card, CardContent, Grid } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Pixel Watch Chalk",
    imgPath: googlePixelWatchChalk,
    author: "Google",
  },
  {
    label: "Pixel Watch Obsidian",
    imgPath: googlePixelWatchObsidian,
    author: "Google",
  },
  {
    label: "Sense 2",
    imgPath: sense2,
    author: "FitBit",
  },
  {
    label: "Versa 2",
    imgPath: versa2,
    author: "FitBit",
  },
  {
    label: "Versa 4",
    imgPath: versa4,
    author: "FitBit",
  },
];

const DevicesCarousel = ({ localStep }) => {
  const theme = useTheme();
  // const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(localStep);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const widthSize = 400;
  return (
    <Grid container direction="column">
      <Grid item>
        <Card elevation={20}>
          <CardContent>
            <Grid container spacing={2} alignItems="center" direction="column">
              <Grid item>
                <Typography variant="h2" fontWeight="bold">
                  {images[activeStep].author}
                </Typography>
              </Grid>

              <Grid item>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {images.map((step, index) => (
                    <div key={step.label}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: "auto",
                            display: "block",
                            maxWidth: widthSize,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
              </Grid>

              <Grid item>
                <Typography variant="h5" fontWeight="bold">
                  {images[activeStep].label}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DevicesCarousel;
