import React from "react";
import { useState } from "react";
import { postUser } from "../../actions/index.js";
import { useDispatch } from "react-redux";
import { Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

let nationalities = [
  'Afganistan', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados', 'Baréin', 'Bélgica', 'Belice', 'Bielorrusia', 'Benín', 'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'República Checa', 'Chile', 'China', 'Chipre', 'Ciudad del Vaticano', 'Colombia', 'Comoras', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'República Dominicana', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala', 'Guinea', 'Guinea-Bisáu', 'Guinea Ecuatorial', 'Guyana', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'MalGridas', 'Mali', 'Malta', 'Marruecos', 'Islas Marshall', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos', 'Palestina', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Centroafricana', 'República del Congo', 'República Democrática del Congo', 'Ruanda', 'Rumania', 'Rusia', 'Islas Salomón', 'Samoa', 'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'
];
let keyNationalities = 0;
let yourDate = new Date()
yourDate = yourDate.toISOString().split('T')[0]

export default function Register() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    names: "",
    lastNames: "",
    nationality: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorsEmptiness, setErrorsEmptiness] = useState({
    names: "",
    lastNames: "",
    nationality: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  }) //aca se crean los posibles errores
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

    try {
      event.preventDefault();
      if (Object.keys(errorsEmptiness).length !== 0) {
        alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
      } else if (input.names.length > 50) {
        alert(`La longitud de los nombres no puede ser mayor a 50 caracteres`)
      } else if (input.lastNames.length > 50) {
        alert(`La longitud de los apellidos no puede ser mayor a 50 caracteres`)
      } else if (!nationalities.includes(input.nationality)) {
        alert(`La nacionalidad debe ser una de las que se encuentran en la lista y debe estar exactamente igual a como esta en la lista`)
      } else if (input.password !== input.confirmPassword) {
        alert(`La contraseña no se confirmo correctamente`)
      }
      else {
        dispatch(postUser(input));
        // setInput({
        //   names: "",
        //   lastNames: "",
        //   nationality: "",
        //   birthday: "",
        //   email: "",
        //   password: "",
        //   confirmPassword: "",
        // });
      }
    } catch (error) {
      console.log("el error es:", error.message);
      alert("El usuario no pudo ser registrado");
    }
  }

  function handleSelect(event) {
    setInput({
      ...input,
      nationality: event.target.value
    })
    setErrorsEmptiness(
      validate({
        ...input,
        nationality: event.target.value
      })
    )
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

      <Grid item></Grid>

      <Grid
        item
      >
        <Typography variant='h2'>Registro</Typography>
      </Grid>

      <Grid
        item
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          href='/'
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
                {/* <label htmlFor="names">{`Nombre(s)*:`} </label> */}
                <TextField id="outlined-basic" label="Nombre" variant="outlined"
                  type="text"
                  name="names"
                  // placeholder="Nombre(s)"
                  maxLength="50"
                  onChange={(event) => handleChange(event)}
                  required />
                {/* <input
          
        /> */}
              </Grid>

              <Grid
                item
              >
                {/* <label htmlFor="lastNames">{`Apellido(s)*:`} </label> */}
                <TextField id="outlined-basic" label="Apellido" variant="outlined"
                  type="text"
                  name="lastNames"
                  maxLength="50"
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>

              {/* <Grid
        item
      >
        <label htmlFor="nationality">{`Nacionalidad*:`} </label>
        <select name="select" value={input.nationality} onChange={(event) => handleSelect(event)}>
          {nationalities?.map((nationality) => (
            <option key={keyNationalities++}
              value={nationality}
            >
              {nationality}
            </option>
          ))}
        </select>
      </Grid> */}

              <Grid
                item
              >
                <TextField
                  required
                  id="outlined-select-currency"
                  select
                  label="Nacionalidad"
                  defaultValue=""
                  helperText="Seleccione su nacionalidad"
                  name="select" value={input.nationality} onChange={(event) => handleSelect(event)}
                >
                  {nationalities?.map((nationality) => (
                    <MenuItem key={keyNationalities++}
                      value={nationality}
                    >
                      {nationality}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
              >
                {/* <label htmlFor="birthday">{`Cumpleaños*:`} </label> */}
                <TextField id="outlined-basic" variant="outlined"
                  helperText="Fecha de nacimiento"
                  type="date"
                  name="birthday"
                  placeholder=""
                  min="1900-01-01" max={yourDate}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>

              <Grid
                item
              >
                {/* <label htmlFor="email">{`Correo electronico*:`} </label> */}
                <TextField id="outlined-basic" label="Correo electronico" variant="outlined"
                  type="email"
                  name="email"
                  placeholder="Correo electronico"
                  maxLength="256"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title={`El correo debe contener @ y .`}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </Grid>

              {/* <Grid
        item
      > */}
              {/* <label htmlFor="password">{`Contraseña*:`} </label> */}
              {/* <TextField id="outlined-basic" label="Contraseña" variant="outlined"
          type="password"
          name="password"
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
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Contraseña"
                    name="password"
                    maxLength="32"
                    pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
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
        <TextField id="outlined-basic" label="Confirmar contraseña" variant="outlined"
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
                    id="outlined-adornment-password"
                    type={showPassword2 ? 'text' : 'password'}
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    maxLength="32"
                    pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
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
                item
              >
                <Button
                  type="submit"
                  variant='contained'
                  color='success'
                  onClick={(event) => handleSubmit(event)}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
