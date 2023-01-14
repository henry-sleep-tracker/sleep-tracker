import React from "react";
import { useState } from "react";
import { postUser } from "../../actions/index.js";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Helmet } from "react-helmet";
import log from "../logi/log-.png";
import { message } from "react-message-popup";
import wakeup from "../../images/Signup/zen-balancing.jpg";
import styles from "./Register.module.css";

let nationalities = [
  "Afganistan",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Bielorrusia",
  "Benín",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Ciudad del Vaticano",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guinea",
  "Guinea-Bisáu",
  "Guinea Ecuatorial",
  "Guyana",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Macedonia del Norte",
  "Madagascar",
  "Malasia",
  "Malaui",
  "MalGridas",
  "Mali",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Palestina",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Checa",
  "República Centroafricana",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "Ruanda",
  "Rumania",
  "Rusia",
  "Islas Salomón",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Suazilandia",
  "Sudáfrica",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
];
let keyNationalities = 0;
let yourDate = new Date();
yourDate = yourDate.toISOString().split("T")[0];

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
  }); //aca se crean los posibles errores
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
    try {
      event.preventDefault();
      if (Object.keys(errorsEmptiness).length !== 0) {
        message.warn(
          `Todos los campos obligatorios deben ser llenados para poder registrarse`,
          2500
        );
      } else if (input.names.length > 50) {
        message.warn(
          `La longitud de los nombres no puede ser mayor a 50 caracteres`,
          2500
        );
      } else if (input.lastNames.length > 50) {
        message.warn(
          `La longitud de los apellidos no puede ser mayor a 50 caracteres`,
          2500
        );
      } else if (!nationalities.includes(input.nationality)) {
        message.warn(
          `La nacionalidad debe ser una de las que se encuentran en la lista y debe estar exactamente igual a como esta en la lista`,
          2500
        );
      } else if (input.password !== input.confirmPassword) {
        message.warn(`La contraseña no se confirmo correctamente`, 2500);
      } else {
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
      message.error("El usuario no pudo ser registrado", 2500);
    }
  }

  function handleSelect(event) {
    setInput({
      ...input,
      nationality: event.target.value,
    });
    setErrorsEmptiness(
      validate({
        ...input,
        nationality: event.target.value,
      })
    );
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
        <Grid item xs={8} paddingTop={3} className={styles.outerCard}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={1}
          >
            <Helmet>
              <title>Registro | Sleep Tracker</title>
            </Helmet>

            <Grid item></Grid>

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
                    clasName={styles.card}
                  >
                    <Grid item>
                      <Typography variant="h4" sx={{ margin: 2 }}>
                        Registro
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="standard-start-adornment"
                        label="Nombre"
                        variant="standard"
                        type="text"
                        name="names"
                        maxLength="50"
                        InputProps={{
                          startAdornment: <InputAdornment></InputAdornment>,
                        }}
                        onChange={(event) => handleChange(event)}
                        required
                        sx={{ width: "10rem", marginRight: 5 }}
                      />
                      <TextField
                        id="standard-start-adornment"
                        label="Apellido"
                        variant="standard"
                        type="text"
                        name="lastNames"
                        maxLength="50"
                        InputProps={{
                          startAdornment: <InputAdornment></InputAdornment>,
                        }}
                        onChange={(event) => handleChange(event)}
                        required
                        sx={{ width: "10rem" }}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        required
                        id="standard-start-adornment"
                        select
                        label="Nacionalidad"
                        defaultValue=""
                        name="select"
                        variant="standard"
                        value={input.nationality}
                        InputProps={{
                          startAdornment: <InputAdornment></InputAdornment>,
                        }}
                        onChange={(event) => handleSelect(event)}
                        sx={{ width: "10rem", marginRight: 5 }}
                      >
                        {nationalities?.map((nationality, index) => (
                          <MenuItem key={`nat-${index}`} value={nationality}>
                            {nationality}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        id="standard-start-adornment"
                        variant="standard"
                        label="Fecha de nacimiento"
                        type="date"
                        name="birthday"
                        placeholder=""
                        min="1900-01-01"
                        max={yourDate}
                        InputProps={{
                          startAdornment: <InputAdornment></InputAdornment>,
                        }}
                        onChange={(event) => handleChange(event)}
                        required
                        sx={{ width: "10rem" }}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        id="standard-start-adornment"
                        label="Correo electronico"
                        variant="standard"
                        type="email"
                        name="email"
                        maxLength="256"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title={`El correo debe contener @ y .`}
                        onChange={(event) => handleChange(event)}
                        required
                        sx={{ width: "23rem" }}
                      />
                    </Grid>

                    <Grid item>
                      <FormControl sx={{ width: "23rem" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                          Contraseña *
                        </InputLabel>
                        <Input
                          id="standard-adornment-password"
                          type={showPassword ? "text" : "password"}
                          label="Contraseña"
                          name="password"
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
                      <FormControl sx={{ width: "23rem" }} variant="standar">
                        <InputLabel htmlFor="standard-adornment-password">
                          Confirmar contraseña *
                        </InputLabel>
                        <Input
                          id="standard-adornment-password"
                          type={showPassword2 ? "text" : "password"}
                          label="Confirmar contraseña"
                          name="confirmPassword"
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
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "23rem", height: 50, margin: 2 }}
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
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "4vh",
              marginLeft: "10.5vw",
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
        <Grid item xs={8}>
          <Grid>
            <img src={wakeup} alt="wakeup login" className={styles.zenImage} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
