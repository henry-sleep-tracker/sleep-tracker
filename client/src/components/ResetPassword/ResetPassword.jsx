import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import { resetPassword } from "../../actions";
import log from "../logi/log-.png";
import { message } from "react-message-popup";
import wakeup from "../../images/Signup/zen-balancing.jpg";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  var passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const { id, token } = useParams();
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorsEmptiness, setErrorsEmptiness] = useState({
    password: "",
    confirmPassword: "",
  });
  function validate(input) {
    //aca entra todo el estado input
    let errors = {};
    for (let propiedad in input) {
      if (!input[propiedad]) {
        errors[propiedad] = `${
          propiedad.charAt(0).toUpperCase() + propiedad.slice(1)
        } es requerido`;
      }
    }
    return errors;
  }
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrorsEmptiness(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (Object.keys(errorsEmptiness).length !== 0) {
        message.warn(
          `Todos los campos obligatorios deben ser llenados para poder registrarse`,
          2500
        );
      } else if (input.password !== input.confirmPassword) {
        message.error(`La contraseña no se confirmo correctamente`, 2500);
      } else if (input.password.match(passwordPattern) === null) {
        message.warn(
          `Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`,
          2500
        );
      } else {
        dispatch(resetPassword(input.password, id, token));
        setInput({
          password: "",
          confirmPassword: "",
        });
        //navigate("/login");
      }
    } catch (error) {
      console.log("el error es:", error);
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={16}
      >
        <Grid item xs={7} paddingTop={10} className={styles.outerCard}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={3}
          >
            <Helmet>
              <title>Nueva contraseña | Sleep Tracker</title>
            </Helmet>

            <Grid item>
              <img src={log} alt="logo" width="300vw" />
            </Grid>

            <Grid item>
              <Card
                className="titleresume"
                variant="outlined"
                sx={{ minWidth: "30rem" }}
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
                        Crear una nueva contraseña
                      </Typography>
                    </Grid>

                    <Grid item>
                      <FormControl
                        sx={{ m: 1, width: "22rem" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Contraseña *
                        </InputLabel>
                        <Input
                          value={input.password}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          label="Contraseña"
                          maxLength="32"
                          pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*"
                          title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
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

                    <Grid item>
                      <FormControl
                        sx={{ m: 1, width: "22rem" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirmar contraseña *
                        </InputLabel>
                        <Input
                          value={input.confirmPassword}
                          id="outlined-adornment-password"
                          type={showPassword2 ? "text" : "password"}
                          name="confirmPassword"
                          label="Confirmar contraseña"
                          maxLength="32"
                          pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*"
                          title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
                          onChange={(event) => handleChange(event)}
                          required
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword2 ? (
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

                    <Grid item>
                      {!input.password ||
                      !input.confirmPassword ||
                      input.password !== input.confirmPassword ? (
                        <Button variant="contained" disabled>
                          Crear nueva contraseña
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: "22rem", height: 40 }}
                          onClick={(event) => handleSubmit(event)}
                        >
                          Crear nueva contraseña
                        </Button>
                      )}
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
              size="medium"
              sx={{ background: "white", opacity: 0.6 }}
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
