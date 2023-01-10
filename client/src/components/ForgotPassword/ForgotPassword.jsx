import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRecoveryEmail } from "../../actions";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    email: "",
  });
  const [errorsEmptiness, setErrorsEmptiness] = useState({
    email: "",
  })
  function validate(input) { //aca entra todo el estado input
    let errors = {}
    for (let propiedad in input) {
      if (!input[propiedad]) {
        errors[propiedad] = `${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)} es requerido`
      }
    }
    return errors
  }
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrorsEmptiness(
      validate({
        ...input,
        [event.target.name]: event.target.value
      })
    )
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (Object.keys(errorsEmptiness).length !== 0) {
        alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
      } else {
        dispatch(sendRecoveryEmail(input.email));
        setInput({
          email: "",
        });
      }
    } catch (error) {
      console.log("el error es:", error);
    }
    navigate('/');

  }

  let navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent='center'
      direction='column'
      alignItems='center'
      spacing={3}
    >

      <Helmet>
        <title>Recuperar contraseña | Sleep Tracker</title>
      </Helmet>

      <Grid item></Grid>

      <Grid
        item
      >
        <Typography
          variant="h2"
        >
          Recuperar contraseña
        </Typography>
      </Grid>

      <Grid
        item
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          href='/login'
        >
          Regresar
        </Button>

      </Grid>

      <Grid
        item
      >

        <Card
          variant='outlined'
        >
          <CardContent>
            <Grid
              container
              justifyContent='center'
              direction='column'
              alignItems='center'
              spacing={3}
            >
              <Grid
                item
              >
                {/* <label htmlFor="email">{`Correo electronico*:`} </label> */}
                <TextField
                  type="email"
                  name="email"
                  label="Correo electronico"
                  value={input.email}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>

              <Grid
                item
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={(event) => handleSubmit(event)}

                >
                  Enviar correo
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
