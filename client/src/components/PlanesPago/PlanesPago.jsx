import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";
import { USER_ID } from "../../actions/constants";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./PlanesPago.css";

function Pricing() {
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
    if (currentUser === "") {
      dispatch(getUserById(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentUser, userId]);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/prices`
    );
    let allPlans = response.data;
    if (currentUser.hasUsedFreePlan === true) {
      allPlans = allPlans.filter((plan) => plan.unit_amount !== 0);
    }
    setPrices(allPlans);
  };

  const createSession = async (currentUser, priceId) => {
    const email = currentUser.email;

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/session`,
      { priceId, email }
    );

    window.location.href = response.url; // obtener la url y redirigil al usuario a la url
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paperWraper}>
        <GlobalStyles
          styles={{
            ul: {
              margin: 0,
              padding: 0,
              listStyle: "none",
              alignItems: "row",
              justifyContent: "center",
            },
          }}
        />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `5px solid ${theme.palette.divider}` }}
        ></AppBar>
        {/* Hero unit */}
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 2, pb: 4 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Planes
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Te damos los mejores beneficios para que tengas una mejor calidad de
            sueño con nuestros planes
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container
          maxWidth="md"
          component="main"
          alignItems="row"
          justifyContent="center"
        >
          <Grid container spacing={5} alignItems="flex-end">
            {!currentUser.plan?.name
              ? prices.map((price, index) => (
                  // Enterprise card is full width at sm breakpoint
                  <Grid item key={`Basico-${index}`} xs={12} md={4}>
                    <Card>
                      <CardHeader
                        title={price.nickname}
                        titleTypographyProps={{ align: "center" }}
                        action={
                          price.nickname === "Estandar" ? <StarIcon /> : null
                        }
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h3"
                            color="text.primary"
                          >
                            ${price.unit_amount / 100}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            {price.nickname === "Premium" ? "/Año" : "/mes"}
                          </Typography>
                        </Box>
                        <ul>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={"line1"}
                          >
                            <StarPurple500Icon />
                            Registro de actividad fisica
                            <StarPurple500Icon />
                            Registro de consumos diarios( alimentos y bebidas)
                            <StarPurple500Icon />
                            Información de sueño conseguido diario y semanal{" "}
                            <br />
                            <StarPurple500Icon />
                            Exporta tu información completa en formato PDF
                          </Typography>
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : currentUser.plan?.name === "Basico"
              ? prices.slice(0).map((price, index) => (
                  <Grid item key={`Estandar-${index}`} xs={12} md={4}>
                    <Card>
                      <CardHeader
                        title={price.nickname}
                        titleTypographyProps={{ align: "center" }}
                        action={
                          price.nickname === "Estandar" ? <StarIcon /> : null
                        }
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h3"
                            color="text.primary"
                          >
                            ${price.unit_amount / 100}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            {price.nickname === "Premium" ? "/Año" : "/mes"}
                          </Typography>
                        </Box>
                        <ul>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={"line2"}
                          >
                            <StarPurple500Icon />
                            Registro de actividad fisica
                            <StarPurple500Icon />
                            Registro de consumos diarios( alimentos y bebidas)
                            <StarPurple500Icon />
                            Información de sueño conseguido diario y semanal{" "}
                            <br />
                            <StarPurple500Icon />
                            Exporta tu información completa en formato PDF
                          </Typography>
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : currentUser.plan?.name === "Estandar"
              ? prices.slice(1).map((price, index) => (
                  <Grid item key={`Premium-${index}`} xs={12} md={4}>
                    <Card>
                      <CardHeader
                        title={price.nickname}
                        titleTypographyProps={{ align: "center" }}
                        action={
                          price.nickname === "Estandar" ? <StarIcon /> : null
                        }
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h3"
                            color="text.primary"
                          >
                            ${price.unit_amount / 100}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            {price.nickname === "Premium" ? "/Año" : "/mes"}
                          </Typography>
                        </Box>
                        <ul>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={"line3"}
                          >
                            <StarPurple500Icon />
                            Registro de actividad fisica
                            <StarPurple500Icon />
                            Registro de consumos diarios( alimentos y bebidas)
                            <StarPurple500Icon />
                            Información de sueño conseguido diario y semanal{" "}
                            <br />
                            <StarPurple500Icon />
                            Exporta tu información completa en formato PDF
                          </Typography>
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default Pricing;

const useStyles = makeStyles(() => ({
  middle: {
    justifyContent: "center",
  },

  paperWraper: {
    minHeight: "100vh",
  },
}));
