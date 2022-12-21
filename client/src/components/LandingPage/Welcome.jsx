import { Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Page1 from './Page1'

const Welcome = () => {
    const classes = useStyles()
    return (
        <Paper
            variant="outlined"
            square
            elevation={0}
            className={classes.presentation}>
            <Typography
                variant="h5"
            >
                Welcome
            </Typography>
            <Page1 />
        </Paper>
    )
}

export default Welcome;

const useStyles = makeStyles((theme) => ({
    root: {}
}))