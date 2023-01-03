import { Grid } from '@mui/material';
import React from 'react';
import Page5 from '../LandingPage/Page5';
import ResponsiveAppBar from './Nav';

function MeetTheTeam() {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
            maxWidth='100vw'
            direction="column"
            flex={4}
            p={2}
        >
            <ResponsiveAppBar />
            <Grid
                item>
                <Page5 />
            </Grid>
        </Grid>
    );
}

export default MeetTheTeam;