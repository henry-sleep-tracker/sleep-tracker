import { Grid } from '@mui/material';
import React from 'react';
import Page5 from '../LandingPage/Page5';

function MeetTheTeam() {

    return (
        <Grid
            container
            maxWidth='100vw'
            minHeight='100vh'
            backgroundColor= '#212121'

        >
            <Grid
                item>
                <Page5 />
            </Grid>
        </Grid>
    );
}

export default MeetTheTeam;
