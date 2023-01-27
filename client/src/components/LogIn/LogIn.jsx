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
import { message } from "react-message-popup";
import { style } from "@mui/system";
import AlertDialog from "../Alert/Alert";
import { makeStyles } from "@mui/styles";
import styles from "./Login.module.css";

export default function LogIn() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
    if (
      loggedUser.hasOwnProperty("id") &&
      loggedUser.id !== 0 &&
      !loggedUser.deletedAt
    ) {
      dispatch(getUsersPlanExpDate(loggedUser.id));
      if (
        planExpirationDate !== "1900-01-01" &&
        planExpirationDate !== undefined
      ) {
        message.success("Usuario validado", 2500);
        login(
          loggedUser.id,
          loggedUser.isAdmin,
          loggedUser.email,
          loggedUser.hashedPassword,
          planExpirationDate
        );
      }
    } else if (loggedUser.id === 0) {
      message.error("El usuario o la contraseña no son correctos", 2500);
    }
  }, [loggedUser, login, planExpirationDate]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(logInUser(input.email, input.password, setOpen));
    } catch (error) {
      console.log("el error es:", error);
    }
  }

  // const classes = useStyles();
  return (
    <Grid
      container
      // height='100vh'
    >
      <AlertDialog open={open} handleClose={handleClose} input={input} />

      <Helmet>
        <title>Iniciar sesion | Sleep Tracker</title>
      </Helmet>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        // alignItems="stretch"
        // width="100%"
        columns={16}
        // className={classes.bg}
      >
        {/* <Grid
          item
          lg={7}
          md={9}
          sm={16}
          xs={16}
          height="100%"
          paddingTop={10}
          className={classes.bgImage}
        > */}
        <Grid item xs={7} paddingTop={10} className={styles.outerCard}>
          {/* <Grid container spacing={3}>
            <Grid container marginLeft={13} marginRight={13} direction="column"> */}
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={3}
          >
            <Grid
              item
              // sx={{ marginLeft: 9 }}
            >
              <img src={log} alt="logo" width="300vw" />
            </Grid>

            <Grid item>
              <Card
                className="titleresume"
                variant="outlined"
                sx={{ minWidth: "30rem" }}
                //variant="outlined"
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={3}
                    flex={4}
                    p={2}
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 26, fontWeight: "medium" }}>
                        Inicia sesión
                      </Typography>
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
                        sx={{ width: "22rem" }}
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
                size="medium"
                sx={{ background: "white", opacity: 0.6 }}
                startIcon={<ArrowBackIosNewIcon />}
                href="/"
              >
                Regresar
              </Button>
            </Grid>

            {/* <Grid
              item
              sx={{
                marginLeft: 10,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                href="/"
              >
                Regresar
              </Button>
            </Grid> */}
          </Grid>
          {/* <br /> */}
        </Grid>
        <Grid item xs={9}>
          <Grid>
            <img src={wakeup} alt="wakeup login" className={styles.zenImage} />
          </Grid>
        </Grid>

        {/* <Grid
          item
          lg={9}
          md={7}
          sm={0}
          xs={0}
          sx={{
            display: { lg: "block", md: "block", sm: "none", xs: "none" },
          }}
          height="100%"
          paddingTop={0}
          paddingBottom={0}
        >
          <img src={wakeup} alt="wakeup login" className={classes.imageStyle} />
        </Grid> */}
      </Grid>
    </Grid>
  );
}

// const useStyles = makeStyles(() => ({
//   imageStyle: {
//     width: "100%",
//     minHeight: "100vh",
//     height: "100%",
//   },

//   bg: {
//     backgroundColor: "#ecefef",
//   },

//   bgImage: {
//     backgroundImage: `url(${wakeup})`,
//   },
// }));
