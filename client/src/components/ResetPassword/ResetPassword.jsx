import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from "../../actions";
import log from "../logi/log-.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorsEmptiness, setErrorsEmptiness] = useState({
    password: "",
    confirmPassword: "",
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
      } else if (input.password !== input.confirmPassword) {
        alert(`La contraseña no se confirmo correctamente`)
      } else {
        dispatch(resetPassword(input.password, id, token));
        setInput({
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
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
    <Grid
      container
      justifyContent='center'
      direction='column'
      alignItems='center'
      spacing={3}
    >

      <Helmet>
        <title>Nueva contraseña | Sleep Tracker</title>
      </Helmet>


      <Grid
        item
      >
      </Grid>

      <Grid item>
        <img
          src={log}
          alt="logo"
          width="200px"
        />
      </Grid>

      <Grid
        item
      >

        <Typography
          variant='h2'
        >
          Crear una nueva contraseña
        </Typography>
      </Grid>

      <Grid
        item
      >

        <Card
          variant="outlined"
        >
          <CardContent>
            <Grid
              container
              justifyContent='center'
              direction='column'
              alignItems='center'
              spacing={3}
            >

              {/* <Grid
                item
              >
                <label htmlFor="password">{`Contraseña*:`} </label>
                <TextField
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  maxLength="32"
                  pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>
 */}

              <Grid
                item
              >
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
                  <OutlinedInput
                    value={input.password}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              {/* <Grid
                item
              >
                <label htmlFor="confirmPassword">{`Confirmar contraseña*:`} </label>
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Contraseña"
                  maxLength="32"
                  pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid> */}

              <Grid
                item
              >
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña *</InputLabel>
                  <OutlinedInput
                    value={input.confirmPassword}
                    id="outlined-adornment-password"
                    type={showPassword2 ? 'text' : 'password'}
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
                  !input.password || !input.confirmPassword || input.password !== input.confirmPassword
                  ?
                    <Button variant="contained" disabled>
                      Crear nueva contraseña
                    </Button>
                    :
                    <Button
                      variant='contained'
                      color='success'
                      type="submit"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Crear nueva contraseña
                    </Button>
                }
              </Grid>

            </Grid>

          </CardContent>

        </Card>

      </Grid>

    </Grid>
  );
}
