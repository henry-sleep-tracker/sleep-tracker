import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import style from "./Profile.module.css";
import { useNavigate } from 'react-router-dom';
import { updateUser } from "../../actions/profileActions";
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import { Helmet } from 'react-helmet';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PaymentIcon from '@mui/icons-material/Payment';

const Profile = () => {

  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editNames, setEditNames] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editiBirthday, setEditBirthday] = useState(false);
  const [editNationality, setEditNationality] = useState(false);
  const [inputs, setInputs] = useState({
    names: "",
    lastNames: "",
    email: "",
    birthday: "",
    nationality: "",
  });

  const handleInputs = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!editNames) {
      setEditNames(true);
    }
    else {
      setEditNames(false);
    }
  }
  const handleClickEmail = (e) => {
    e.preventDefault();
    if (!editEmail) {
      setEditEmail(true);
    }
    else {
      setEditEmail(false);
    }
  }
  const handleClickBirthday = (e) => {
    e.preventDefault();
    if (!editiBirthday) {
      setEditBirthday(true);
    }
    else {
      setEditBirthday(false);
    }
  }
  const handleClickNationality = (e) => {
    e.preventDefault();
    if (!editNationality) {
      setEditNationality(true);
    }
    else {
      setEditNationality(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser(currentUser.id, inputs))
      setInputs({
        names: "",
        lastNames: "",
        email: "",
        birthday: "",
        nationality: "",
      })
      navigate("/home");
    } catch (error) {
      console.log("el error es:", error);
    }
  }

  return (

    <Grid
      container
      justifyContent='center'
      direction='column'
      alignItems='center'
      spacing={3}
    >

      <Helmet>
        <title>Perfil | Sleep Tracker</title>
      </Helmet>

      <Grid item></Grid>

      <Grid
        item
      >
        <Typography
          variant='h2'
        >
          Perfil
        </Typography>
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
        {/* <Link to={`/private/delete-user/${currentUser.id}`}> */}
        <Button
          href={`/private/delete-user/${currentUser.id}`}
          startIcon={<DeleteIcon />}
          variant='outlined'
          color='error'
          id='ButtonDelete'
        >
          Borrar usuario
        </Button>
        {/* </Link> */}
      </Grid>

      <Grid
        item
      >
        {/* <Link to={`/private/change-password/${currentUser.id}`}> */}
        <Button
          href={`/private/change-password/${currentUser.id}`}
          startIcon={<PasswordIcon />}
          variant='outlined'
          id='ButtonPassword'
        >
          Cambiar contraseña
        </Button>
        {/* </Link> */}
      </Grid>

      <Grid
        item
      >
        <Button
          href='/private/createcomment'
          startIcon={<AddCommentIcon />}
          variant='outlined'
          id='buttonCreatecomment'
        >
          Dejar comentario
        </Button>
      </Grid>

      <Grid
        item
      >
        <Button
          href='/private/planes'
          startIcon={<PaymentIcon />}
          variant='outlined'
          id='buttonPlanes'
        >
          Planes de pago
        </Button>
      </Grid>

      {/* <Grid
        item
      >
        <img src="https://upload.wikimedia.org/wikipedia/en/4/4c/Team_8_logo.png" alt="Imagen aqui" />
      </Grid> */}

      <Grid
        item
      >
        <Card
          variant="outlined"
        >
          <CardContent>

            <Grid
              container
              direction='column'
              justifyContent="center"
              alignItems="center"
              spacing={3}
              flex={4}
              p={2}
            >
              <Grid
                item
              >
                {
                  !editNames ?
                    <Typography
                      variant="h6"
                    >
                      {`${currentUser.names} ${currentUser.lastNames}`}
                    </Typography>
                    :
                    <TextField
                      variant='outlined'
                      label="Nuevo nombre"
                      type="text"
                      name="names"
                      value={inputs.names}
                      onChange={(e) => handleInputs(e)}
                    />
                }
              </Grid>

              <Grid
                item
              >
                {
                  !inputs.names &&
                  <Button
                    variant='outlined'
                    onClick={(e) => handleClick(e)}
                    startIcon={<PersonIcon />}
                  >
                    Editar
                  </Button>
                }
              </Grid>

              <Grid
                item
              >
                {
                  !editEmail ?
                    <Typography
                      variant="h6"
                    >
                      {`Correo electronico: ${currentUser.email}`}
                    </Typography>
                    :
                    <TextField
                      type="text"
                      name="email"
                      label="Nuevo email"
                      value={inputs.email}
                      onChange={handleInputs}
                    />
                }
              </Grid>

              <Grid
                item
              >
                {
                  !inputs.email &&
                  <Button
                    variant='outlined'
                    onClick={(e) => handleClickEmail(e)}
                    startIcon={<EmailIcon />}
                  >
                    Editar
                  </Button>
                }
              </Grid>

              <Grid
                item
              >
                {
                  !editiBirthday ?
                    <Typography
                      variant="h6"
                    >
                      {`Fecha de nacimiento: ${currentUser.birthday}`}
                    </Typography>
                    : <TextField
                      type="text"
                      name="birthday"
                      label="Nueva fecha de nacimiento"
                      value={inputs.birthday}
                      onChange={handleInputs}
                    />
                }

              </Grid>

              <Grid
                item
              >
                {
                  !inputs.birthday &&
                  <Button
                    variant='outlined'
                    onClick={(e) => handleClickBirthday(e)}
                    startIcon={<CalendarMonthIcon />}
                  >
                    Editar
                  </Button>
                }
              </Grid>

              <Grid
                item
              >
                {!editNationality ?
                  <Typography
                    variant="h6"
                  >
                    {`Nationality: ${currentUser.nationality}`}
                  </Typography>
                  : <TextField
                    type="text"
                    name="nationality"
                    label="Nueva nacionalidad"
                    value={inputs.nationality}
                    onChange={handleInputs} />}
              </Grid>

              <Grid
                item
              >
                {
                  !inputs.nationality &&
                  <Button
                    variant='outlined'
                    onClick={(e) => handleClickNationality(e)}
                    startIcon={<PlaceIcon />}
                  >
                    Editar
                  </Button>
                }
              </Grid>

              <Grid
                item
              >
                {
                  inputs.names || inputs.email || inputs.birthday || inputs.nationality ?
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      color='success'
                      variant='contained'
                      type="submit" id='ButtonSubmit'
                      startIcon={<CheckIcon />}
                    >
                      Confirmar
                    </Button>
                    :
                    null
                }
              </Grid>

            </Grid>
          </CardContent>
        </Card>

      </Grid>

    </Grid>
  );
};

export default Profile;
