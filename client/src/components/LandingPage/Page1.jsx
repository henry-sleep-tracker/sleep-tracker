import { makeStyles } from "@mui/styles"
import { Grid, Paper, Typography } from "@mui/material";
import page1SleepA from './Images/page1SleepA.jpg'

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
        <div>
            <ul className={classes.ul}>
                <li onClick={() => setCurrentPage(page2)}>Como funciona</li>
                <li onClick={() => setCurrentPage(page3)}>Dispositivos soportados</li>
                <li onClick={() => setCurrentPage(page4)}>Planes de pago</li>
                <li onClick={() => setCurrentPage(page5)}>Conoce al equipo</li>
            </ul>

            <Paper
                variant="outlined"
                square
                elevation={0}
                className={classes.presentation}>

                <Grid container spacing={3}>
                    <Grid
                        item xs={12}
                        md={6}
                    >
                        <Typography
                            variant='h6'
                        >
                            Sweet Dreams
                        </Typography>
                        <Typography>
                            Lleva el control de tu sueño con tu telefono movil y/o reloj inteligente
                        </Typography>
                    </Grid>
                    <Grid
                        item xs={12}
                        md={6}
                    >
                        <div className={classes.mosaic}>
                            <img
                                src={page1SleepA}
                                alt={'Imagen representativa'}
                                height={220}
                            />
                        </div>

                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Page1;

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