import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRecoveryEmail } from "../../actions";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import log from "../logi/log-.png";
import { message } from "react-message-popup";
import styles from "./ForgotPassword.module.css";
import wakeup from "../../images/Signup/zen-balancing.jpg";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  var [input, setInput] = useState({
    email: "",
  });
  const [errorsEmptiness, setErrorsEmptiness] = useState({
    email: "",
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
        //alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
        message.warn(
          `Todos los campos obligatorios deben ser llenados para poder registrarse`,
          2500
        );
      } else {
        dispatch(sendRecoveryEmail(input.email));
        setInput({
          email: "",
        });
      }
    } catch (error) {
      console.log("el error es:", error);
    }
    navigate("/contrasena_olvidada");
  }

  let navigate = useNavigate();

  return (
    <Grid container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={16}
      >
        <Grid item xs={10} paddingTop={"20vh"} className={styles.outerCard}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={3}
          >
            <Helmet>
              <title>Recuperar contraseña | Sleep Tracker</title>
            </Helmet>

            <Grid item>
              <img src={log} alt="logo" width="300vw" />
            </Grid>

            <Grid item>
              <Card variant="outlined" sx={{ minWidth: "30rem", padding: 5 }}>
                <CardContent>
                  <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 30, fontWeight: "medium" }}>
                        Recuperar contraseña
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        type="email"
                        name="email"
                        label="Correo electronico"
                        value={input.email}
                        onChange={(event) => handleChange(event)}
                        required
                        sx={{ width: "22rem" }}
                      />
                    </Grid>

                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "22rem", height: 40 }}
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
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "4vh",
              marginLeft: "16.5vw",
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
        <Grid item xs={6}>
          <Grid>
            <img src={wakeup} alt="wakeup login" className={styles.zenImage} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
