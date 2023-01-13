import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import googlePixelWatchChalk from "./Images/google-pixel-watch-chalk-device-3qt.png";
import googlePixelWatchObsidian from "./Images/google-pixel-watch-obsidian-device-3qt.png";
import sense2 from "./Images/sense2-black-device-3qt.png";
import versa2 from "./Images/versa2-3qtr-black.png";
import versa4 from "./Images/versa4-black-device-3qtr.png";
import { Grid } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Google Pixel Watch Chalk',
        imgPath: googlePixelWatchChalk
    },
    {
        label: 'Google Pixel Watch Obsidian',
        imgPath: googlePixelWatchObsidian
    },
    {
        label: 'Sense 2',
        imgPath: sense2
    },
    {
        label: 'Versa 2',
        imgPath: versa2
    },
    {
        label: 'Versa 4',
        imgPath: versa4
    },
];

function DevicesCarousel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        // <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Grid
            container
            // justifyContent="space-evenly"
            // alignItems="center"
            // // flex={4}
            // // p={9}
            // direction='row'
        >
            <Grid
                item
            >
                <Button 
                size="large" 
                variant='contained'
                onClick={handleBack} 
                disabled={activeStep === 0}
                >
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
            </Grid>

            <Grid
                item
            >
                <Paper square>

                    <Typography>{images[activeStep].label}</Typography>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
                                            height: 500,
                                            display: 'block',
                                            maxWidth: 500,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                </Paper>

            </Grid>

            <Grid
                item
            >
                <Button
                    size="large"
                    variant='contained'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            </Grid>

        </Grid>

        // </Box>
    );
}

export default DevicesCarousel;