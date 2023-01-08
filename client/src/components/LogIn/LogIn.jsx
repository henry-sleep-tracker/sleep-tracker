import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../actions/index";
import { useAuthContext } from "../../actions/authContext";
import LogInGoogleButton from "../LogInGoogleButton/LogInGoogleButton";
import { gapi } from "gapi-script"
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { getUsersPlanExpDate } from "../../actions/plan";

export default function LogIn() {
  const clientId = "335316690432-trah7lbld3ptrek9o23jo6n0t7g30foe.apps.googleusercontent.com"
  const { login } = useAuthContext();
  const loggedUser = useSelector((state) => state?.users.currentUser)
  const planExpirationDate = useSelector((state) => state?.users.planExpirationDate);
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    email: "",
    password: "",
  });
  function start() {
    gapi.client.init({
      clientId: clientId,
      scope: ""
    })
  }
  gapi.load("client:auth2", start)

  useEffect(() => {
    if (loggedUser.hasOwnProperty('id') && loggedUser.id !== 0) {
      console.log("planExpirationDate:",planExpirationDate);
      dispatch(getUsersPlanExpDate(loggedUser.id))
      debugger
      if(planExpirationDate!=="1900-01-01"){
        alert("Usuario validado");
        // debugger
        login(loggedUser.id,planExpirationDate);
      }
    } else if(loggedUser.id===0){
      alert("El usuario o la contraseña no son correctos");
    }
  }, [loggedUser, login,planExpirationDate])
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(logInUser(input.email, input.password));
      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("el error es:", error);
    }
  }
  return (
    <Grid
      container
      direction='column'
      justifyContent="center"
      alignItems="center"
      spacing={2}
      flex={4}
      p={2}
    >

      <Card
        className="titleresume"
        variant='outlined'
        elevation={20}
        sx={{ maxWidth: 300 }}
      >
        <CardContent>

          <Grid
            container
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={2}
            flex={4}
            p={2}
          >

            <Grid
              item
            >
              <Typography
                variant='h4'
              >
                Iniciar sesion
              </Typography>
            </Grid>
            <Grid
              item
            >
              <Typography
                variant='h5'
              >
                Correo electronico*:
              </Typography>
              {/* <label htmlFor="email">{`Correo electronico*:`} </label> */}
            </Grid>
            <Grid
              item
            >
            </Grid>
            <Grid
              item
            >
              <TextField
                label="E-mail"
                variant="outlined"
                type="email"
                name="email"
                value={input.email}
                onChange={(event) => handleChange(event)}
                required
              />
            </Grid>

            <Grid
              item
            >
              <Typography
                variant='h5'
              >
                Contraseña*:
              </Typography>
              {/* <label htmlFor="password">{`Contraseña*:`} </label> */}
            </Grid>

            <Grid
              item
            >
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                type="password"
                name="password"
                value={input.password}
                onChange={(event) => handleChange(event)}
                required
              />
            </Grid>

            <Grid
              item
            >
              <Button
                type="submit"
                variant='contained'
                size='large'
                onClick={(event) => handleSubmit(event)}
              >
                Iniciar Sesion
              </Button>
            </Grid>

            <Grid
              item
            >
              <Typography
                variant='h5'
              >
                Ó iniciar sesion con Google
              </Typography>
            </Grid>


            <Grid
              item
            >
              <LogInGoogleButton />
            </Grid>

            <Grid
              item
            >
              <Typography
                variant='h5'
              >
                ¿No tienes cuenta?
              </Typography>
            </Grid>

            <Grid
              item
            >
              <Button
                variant='contained'
                size='large'
              >
                <a
                  href="/registro"
                  style={{
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  registrate
                </a>
              </Button>

            </Grid>
            <Grid
              item
            >
              <Typography
              >
                ¿Olvidaste tu contraseña?
              </Typography>

            </Grid>

            <Grid
              item
            >
              <a
                href="/contrasena_olvidada"
                style={{
                  textDecoration: 'none',
                }}
              >
                Recuperala
              </a>
            </Grid>

          </Grid>

        </CardContent>

      </Card>
    </Grid>
  );
}
