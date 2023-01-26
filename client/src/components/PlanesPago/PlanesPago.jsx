import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";
import { USER_ID } from "../../actions/constants";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";

const Pricing = () => {
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
    if (currentUser === "") {
      dispatch(getUserById(userId));
    }
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

  const priceProps = (
    <Box>
      <Typography>- Registro de actividad fisica</Typography>
      <Typography>
        - Registro de consumos diarios( alimentos y bebidas)
      </Typography>
      <Typography>
        - Información de sueño conseguido diario y semanal
      </Typography>
      <Typography>- Exporta tu información completa en formato PDF</Typography>
    </Box>
  );
  const classes = useStyles();

  const theme = useTheme();

  return (
    <Paper sx={{ minHeight: "100vh" }}>
      <Helmet>
        <title>Planes | Sleep Tracker</title>
      </Helmet>

      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={5}
        paddingRight={3}
        paddingLeft={3}
      >
        <Grid item>
          <Typography variant="h2" fontWeight="bold" paddingTop={5}>
            Planes
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">
            Te damos los mejores beneficios para que tengas una mejor calidad de
            sueño con nuestros planes
          </Typography>
        </Grid>

        <Grid item>
          <Grid
            container
            justifyContent="center"
            direction="row"
            alignItems="stretch"
            spacing={5}
          >
            {!currentUser.plan?.name
              ? prices.map((price, index) => (
                  <Grid item key={`basico-${index}`}>
                    <Card variant="outlined" spacing={5}>
                      <CardContent
                        sx={{
                          backgroundColor:
                            theme.palette.mode == "dark"
                              ? "#7986cb"
                              : "#303f9f",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold">
                          {price.nickname}
                        </Typography>
                      </CardContent>

                      <CardContent>
                        <Typography variant="h4">
                          ${price.unit_amount / 100}
                          <small>/{price.recurring.interval}</small>
                        </Typography>
                      </CardContent>

                      <CardContent>{priceProps}</CardContent>

                      <CardContent
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : currentUser.plan?.name === "Basico"
              ? prices.slice(0).map((price, index) => (
                  <Grid item key={`estandar-${index}`}>
                    <Card variant="outlined" spacing={5}>
                      <CardContent
                        sx={{
                          backgroundColor:
                            theme.palette.mode == "dark"
                              ? "#7986cb"
                              : "#303f9f",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold">
                          {price.nickname}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography variant="h4">
                          ${price.unit_amount / 100}
                          <small>/{price.recurring.interval}</small>
                        </Typography>
                      </CardContent>
                      <CardContent>
                        {price.nickname === "Premium" && (
                          <Typography>
                            - Participa en el foro con otros usuarios
                          </Typography>
                        )}
                        {priceProps}
                      </CardContent>
                      <CardContent
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : currentUser.plan?.name === "Estandar"
              ? prices.slice(1).map((price, index) => (
                  <Grid item key={`premium-${index}`}>
                    <Card variant="outlined" spacing={6}>
                      <CardContent
                        sx={{
                          backgroundColor:
                            theme.palette.mode == "dark"
                              ? "#7986cb"
                              : "#303f9f",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold">
                          {price.nickname}
                        </Typography>
                      </CardContent>

                      <CardContent>
                        <Typography variant="h4">
                          ${price.unit_amount / 100}
                          <small>/{price.recurring.interval}</small>
                        </Typography>
                      </CardContent>

                      <CardContent>
                        {price.nickname === "Premium" && (
                          <Typography>
                            - Participa en el foro con otros usuarios
                          </Typography>
                        )}
                        {priceProps}
                      </CardContent>

                      <CardContent
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Pricing;

const useStyles = makeStyles(() => ({
  middle: {
    justifyContent: "center",
  },

  paperWraper: {
    minHeight: "100vh",
  },
}));
