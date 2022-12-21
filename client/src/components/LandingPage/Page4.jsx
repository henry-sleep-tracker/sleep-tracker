import { makeStyles } from "@mui/styles"
import { Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import page1SleepA from './Images/page1SleepA.jpg'

const Page4 = (
) => {
    const classes = useStyles();
    return (
        <div>
            <Typography
                variant='h4'
            >Planes de pago
            </Typography>

            <Paper
                variant="outlined"
                square
                elevation={0}
                className={classes.presentation}>

                <Grid 
                container 
                spacing={8}
                justifyContent= "space-evenly"
                alignItems="center"
                direction='stretch'
                >
                    <Grid
                        item xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent >
                                <div className={classes.mosaic}>
                                    <ThumbUpIcon
                                    />
                                </div>
                                <Typography
                                    variant='h5'
                                >
                                    Prueba por 3 meses.
                                </Typography>
                                <Typography
                                >
                                    Registro de actividad física
                                </Typography>
                                <Typography>
                                    Registra tus consumos diarios de comida y bebida.
                                </Typography>
                                <Typography>
                                    Información de sueño conseguido diario y semanal.
                                </Typography>
                                <Button variant="contained" size="large">Gratis</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid
                        item xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent  >
                                <div className={classes.mosaic}>
                                    <EmojiEmotionsIcon />
                                </div>
                                <Typography
                                    variant='h5'
                                >
                                    Exporta informacion en formato PDF.
                                </Typography>
                                <Typography>
                                    Registro de actividad física
                                </Typography>
                                <Typography>
                                    Registra tus consumos diarios de comida y bebida.
                                </Typography>
                                <Typography>
                                    Información de sueño conseguido diario y semanal.
                                </Typography>
                                <Button variant="contained" size="large">$1 USD / Mes</Button>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid
                        item xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent  >
                                <div className={classes.mosaic}>
                                    <AutoAwesomeIcon />
                                </div>
                                <Typography
                                    variant='h5'
                                >
                                    Descuento anual.
                                </Typography>
                                <Typography
                                >
                                    Registro de actividad física
                                </Typography>
                                <Typography>
                                    Registra tus consumos diarios de comida y bebida.
                                </Typography>
                                <Typography>
                                    Información de sueño conseguido diario y semanal.
                                </Typography>
                                <Button variant="contained" size="large">$10 USD / Año</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default Page4;

const useStyles = makeStyles((theme) => ({

    mosaic: {
        display: "flex",
        flexwrap: "wrap",
        justifyContent: "space-around"
    },

    ul: {
        display: "flex",
        listStyle: 'none',
        flexwrap: "wrap",
        justifyContent: "space-around",
    }

}))