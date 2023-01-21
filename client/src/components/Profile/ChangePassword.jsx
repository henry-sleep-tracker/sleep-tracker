import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { changePassword } from "../../actions/profileActions";
import { message } from "react-message-popup";
// import style from "./ChangePassword.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuthContext } from "../../actions/authContext";

export default function ChangePassword() {
  const { createPassword } = useAuthContext();
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })
  var [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  function validate(input) {
    let errors = {}
    for (let propiedad in input) {
      if (!input[propiedad]) {
        errors[propiedad] = `${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)} es requerido`
      }
    }
    return errors
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (Object.keys(errors).length !== 0) {
        //alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
        message.warn(
          `Todos los campos obligatorios deben ser llenados para poder registrarse`
        ,2500);
      } else if (input.password !== input.confirmPassword) {
        //alert(`La contraseña no se confirmo correctamente`)
        message.error(`La contraseña no se confirmo correctamente`,2500)
      } else {
        dispatch(changePassword(id, input.password));
        createPassword();
        setInput({
          password: "",
          confirmPassword: "",
        });
        navigate("/private/changepasswordok");
      }
    } catch (error) {
      //console.log("el error es:", error);
      navigate("/private/changepassworderror");
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

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

      <Grid
        item
      >
        <Helmet>
          <title>Cambiar contraseña | Sleep Tracker</title>
        </Helmet>
      </Grid>

      <Grid
        item
      >

        <Typography
          variant="h2"
        >
          Crear una nueva contraseña
        </Typography>

      </Grid>

      <Grid
        item
      >

        <Button
          href="/private/profile"
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
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
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              flex={4}
              p={2}
            >

              <Grid
                item
              >
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña *
                  </InputLabel>
                  <OutlinedInput
                    value={input.password}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    label="Contraseña *"
                    variant="outlined"
                    name="password"
                    inputProps={{ maxLength: 32 }}
                    pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
                    onChange={(e) => handleChange(e)}
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

              <Grid
                item
              >
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirmar contraseña *
                  </InputLabel>
                  <OutlinedInput
                    value={input.confirmPassword}
                    id="outlined-adornment-password"
                    type={showPassword2 ? "text" : "password"}
                    label="Confirmar contraseña *"
                    variant="outlined"
                    name="confirmPassword"
                    inputProps={{ maxLength: 32 }}
                    pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
                    onChange={(e) => handleChange(e)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid
                item>
                {
                  !input.password || !input.confirmPassword || input.password !== input.confirmPassword?
                    <Button variant="contained" disabled>
                      Cambiar contraseña
                    </Button>
                    :
                    <Button
                      variant='contained'
                      color='success'
                      type="submit"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Cambiar contraseña
                    </Button>
                }
              </Grid>

            </Grid>

          </CardContent>

        </Card>

      </Grid>

    </Grid >
  );
}