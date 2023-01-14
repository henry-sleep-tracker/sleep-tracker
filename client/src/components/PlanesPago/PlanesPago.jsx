import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";

const Pricing = () => {
  const USER_ID = "USER_ID";
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );

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

  return (
    <div className="container">
      <header>
        <div className="text-center w-75 mx-auto">
          <h1>Planes</h1>
          <p className="fs-5 text-muted">
            Te damos los mejores beneficios para que tengas una mejor calidad de
            sueño con nuestros planes
          </p>
        </div>
      </header>
      <main>
        <div className="row row-col-1 row-cols-md-3">
          {!currentUser.plan?.name
            ? prices.map((price) => (
                <div className="col">
                  <div className="card text-center">
                    <div className="card-header bg-dark text-white">
                      <h4 className="fw-normal">{price.nickname}</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title">
                        ${price.unit_amount / 100}
                        <small className="text-muted fw-light">
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3">
                        <li>Registro de actividad fisica</li>
                        <li>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li>Exporta tu información completa en formato PDF</li>
                      </ul>
                      <button
                        className="btn btn-lg text-white btn-success w-100"
                        variant="outline-success"
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : currentUser.plan?.name === "Basico"
            ? prices.slice(0).map((price) => (
                <div className="col">
                  <div className="card text-center">
                    <div className="card-header bg-dark text-white">
                      <h4 className="fw-normal">{price.nickname}</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title">
                        ${price.unit_amount / 100}
                        <small className="text-muted fw-light">
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3">
                        <li>Registro de actividad fisica</li>
                        <li>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li>Exporta tu información completa en formato PDF</li>
                      </ul>
                      <button
                        className="btn btn-lg text-white btn-success w-100"
                        variant="outline-success"
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : currentUser.plan?.name === "Estandar"
            ? prices.slice(2).map((price) => (
                <div className="col">
                  <div className="card text-center">
                    <div className="card-header bg-dark text-white">
                      <h4 className="fw-normal">{price.nickname}</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title">
                        ${price.unit_amount / 100}
                        <small className="text-muted fw-light">
                          /{price.recurring.interval}
                        </small>
                      </h1>
                      <ul className="py-3">
                        <li>Registro de actividad fisica</li>
                        <li>
                          Registro de consumos diarios( alimentos y bebidas)
                        </li>
                        <li>
                          Información de sueño conseguido diario y semanal
                        </li>
                        <li>Exporta tu información completa en formato PDF</li>
                      </ul>
                      <button
                        className="btn btn-lg text-white btn-success w-100"
                        variant="outline-success"
                        onClick={() => createSession(currentUser, price.id)}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default Pricing;

/* import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


const tiers = [
  {
    title: 'Basico',
    price: '0',
    description: [
      "Registro de actividad fisica",
                  "Registro de consumos diarios( alimentos y bebidas)",
                  "Información de sueño conseguido diario y semanal",
                  "Exporta tu información completa en formato PDF",
    ],
    buttonText: 'Comprar',
    buttonVariant: 'outlined',
  },
  {
    title: 'Estandar',
    subheader: 'Mas popular',
    price: '1',
    description: [
      "Registro de actividad fisica",
                  "Registro de consumos diarios( alimentos y bebidas)",
                  "Información de sueño conseguido diario y semanal",
                  "Exporta tu información completa en formato PDF",
    ],
    buttonText: 'Comprar',
    buttonVariant: 'contained',
  },
  {
    title: 'Premium',
    price: '10',
    description: [
                 "Registro de actividad fisica",
                  "Registro de consumos diarios( alimentos y bebidas)",
                  "Información de sueño conseguido diario y semanal",
                  "Exporta tu información completa en formato PDF",
    ],
    buttonText: 'Comprar',
    buttonVariant: 'outlined',
  },
];


function PricingContent() {

  const USER_ID = "USER_ID";
  const userId= window.localStorage.getItem(USER_ID)
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

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
       
      </AppBar>
    
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Planes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        Te damos los mejores beneficios para que tengas una mejor calidad de
            sueño con nuestros planes
        </Typography>
      </Container>
     
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                {prices.map((price) => (
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={() => createSession(currentUser,price.id)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
      </Container>

    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
} */
