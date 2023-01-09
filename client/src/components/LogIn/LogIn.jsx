import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../actions/index";
import { useAuthContext } from "../../actions/authContext";
import LogInGoogleButton from "../LogInGoogleButton/LogInGoogleButton";
import { gapi } from "gapi-script";
import { getUsersPlanExpDate } from "../../actions/plan";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function LogIn() {
  const clientId =
    "335316690432-trah7lbld3ptrek9o23jo6n0t7g30foe.apps.googleusercontent.com";
  const { login } = useAuthContext();
  const loggedUser = useSelector((state) => state?.users.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    email: "",
    password: "",
  });
  function start() {
    gapi.client.init({
      clientId: clientId,
      scope: "",
    });
  }
  gapi.load("client:auth2", start);

  useEffect(() => {
    if (loggedUser.hasOwnProperty("id") && loggedUser.id !== 0) {
      console.log("planExpirationDate:", planExpirationDate);
      dispatch(getUsersPlanExpDate(loggedUser.id));
      if (
        planExpirationDate !== "1900-01-01" &&
        planExpirationDate !== undefined
      ) {
        alert("Usuario validado");
        login(loggedUser.id, planExpirationDate);
      }
    } else if (loggedUser.id === 0) {
      alert("El usuario o la contraseña no son correctos");
    }
  }, [loggedUser, login, planExpirationDate]);
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      flex={4}
      p={2}
    >
      <Grid item></Grid>

      <Grid item>
        <Typography variant="h2">Iniciar sesion</Typography>
      </Grid>

      <Grid item>
        <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} href="/">
          Regresar
        </Button>
      </Grid>

      <Grid item>
        <Card
          className="titleresume"
          variant="outlined"
          elevation={20}
          sx={{ maxWidth: 300 }}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              flex={4}
              p={2}
            >
              <Grid item></Grid>

              <Grid item>
                <TextField
                  label="Correo electronico"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>

              {/* <Grid
                item
              >
                <Typography
                  variant='h5'
                >
                  Contraseña*:
                </Typography>
                <label htmlFor="password">{`Contraseña*:`} </label>
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
 */}

              <Grid item>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña *
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    label="Contraseña"
                    variant="outlined"
                    name="password"
                    value={input.password}
                    onChange={(event) => handleChange(event)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  onClick={(event) => handleSubmit(event)}
                >
                  Iniciar Sesion
                </Button>
              </Grid>

              <Grid item>
                <Typography variant="h5">Ó ingresa con Google</Typography>
              </Grid>

              <Grid item>
                <LogInGoogleButton />
              </Grid>

              <Grid item>
                <Typography variant="h5">¿No tienes cuenta?</Typography>
              </Grid>

              <Grid item>
                <Button variant="contained" size="large">
                  <a
                    href="/registro"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    registrate
                  </a>
                </Button>
              </Grid>

              <Grid item>
                <a
                  href="/contrasena_olvidada"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
