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
  Link,
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
import { Helmet } from "react-helmet";
import log from "../logi/log-.png";
import wakeup from "../../images/Signup/zen-balancing.jpg";
import styles from "./Login.module.css";

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
      dispatch(getUsersPlanExpDate(loggedUser.id));
      if (
        planExpirationDate !== "1900-01-01" &&
        planExpirationDate !== undefined
      ) {
        alert("Usuario validado");
        login(
          loggedUser.id,
          loggedUser.email,
          loggedUser.hashedPassword,
          planExpirationDate
        );
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
    <Grid container width="100%">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        columns={16}
        className={styles.bg}
      >
        <Grid item xs={7} height="100%" paddingTop={10}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            flex={4}
            p={2}
          >
            <Helmet>
              <title>Iniciar sesion | Sleep Tracker</title>
            </Helmet>

            <Grid item>
              <img src={log} alt="logo" width="300vw" />
            </Grid>

            <Grid item>
              <Card
                className="titleresume"
                variant="outlined"
                elevation={20}
                sx={{ minWidth: "30rem" }}
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
                    <Grid item>
                      <Typography variant="h4">Inicia sesion</Typography>
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Correo electronico"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={(event) => handleChange(event)}
                        required
                        style={{ width: "22rem" }}
                      />
                    </Grid>

                    <Grid item>
                      <FormControl
                        sx={{ m: 1, width: "22rem" }}
                        variant="outlined"
                      >
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item></Grid>

                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "22rem", height: 40 }}
                        onClick={(event) => handleSubmit(event)}
                      >
                        Iniciar Sesion
                      </Button>
                    </Grid>

                    <Grid item>
                      <LogInGoogleButton />
                    </Grid>

                    <Grid container>
                      <Grid item sx={{ marginTop: 5, marginLeft: 3 }}>
                        <Link href="/contrasena_olvidada" variant="body2">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Grid>
                      <Grid item sx={{ marginTop: 5, marginLeft: 3 }}>
                        <Link href="/registro" variant="body2">
                          {"¿No tienes una cuenta? Registrate"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "4vh",
              marginLeft: "7vw",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewIcon />}
              href="/"
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid>
            <img src={wakeup} alt="wakeup login" className={styles.zenImage} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
