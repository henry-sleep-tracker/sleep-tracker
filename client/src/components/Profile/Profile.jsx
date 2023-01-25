import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthContext } from "../../actions/authContext";
import { updateUser, updateImage } from "../../actions/profileActions";
import { nationalities } from "../../actions/nationalities"
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Divider,
  Box,
  Paper,
  Tooltip,
  IconButton,
  ListItemIcon,
  Menu
} from "@mui/material";
import Fab from '@mui/material/Fab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from "@mui/icons-material/Delete";
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import { Helmet } from "react-helmet";
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@mui/styles";
import EditIcon from '@mui/icons-material/Edit';
import { message } from "react-message-popup";

const Profile = () => {
  const { createPassword, isPasswordSetUp } = useAuthContext();
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editBirthday, setEditBirthday] = useState(false);
  const [editNationality, setEditNationality] = useState(false);
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({
    names: "",
    lastNames: "",
    email: "",
    birthday: "",
    nationality: "",
  });
  let keyNationalities = 0;
  let yourDate = new Date();

  useEffect(() => {
    if (currentUser.hashedPassword !== null) {
      createPassword();
    }
    if (isPasswordSetUp === "false" || currentUser.nationality === null || currentUser.birthday === null) {
      message.error(
        `Tiene que haber completado toda su informacion de perfil para poder continuar...  
        Contraseña, nacionalidad y cumpleaños`,
        8000
      );
    }
  }, [currentUser, createPassword]);

  const convertirBase64 = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      let base64 = reader.result;
      setImage(base64)
    }
  };

  const handleInputs = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!editNames) {
      setEditNames(true);
    } else {
      setEditNames(false);
    }
  };
  const handleClickEmail = (e) => {
    e.preventDefault();
    if (!editEmail) {
      setEditEmail(true);
    } else {
      setEditEmail(false);
    }
  };
  const handleClickBirthday = (e) => {
    e.preventDefault();
    if (!editBirthday) {
      setEditBirthday(true);
    } else {
      setEditBirthday(false);
    }
  };
  const handleClickNationality = (e) => {
    e.preventDefault();
    if (!editNationality) {
      setEditNationality(true);
    } else {
      setEditNationality(false);
    }
  };

  const handleSelect = (event) => {
    setInputs({
      ...inputs,
      nationality: event.target.value
    });
  };

  const handleClickDelete = () => {
    setOpen(true);
  };
  const handleClickConfirm = () => {
    setOpen2(true);
  };
  const handleNo = () => {
    setOpen(false);
  };
  const handleNo2 = () => {
    setOpen2(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setOpen(false);
      const eliminar = "";
      dispatch(updateImage(currentUser.id, eliminar))
      setImage("");
      message.success("Imagen eliminada", 2000)

    } catch (error) {
      // console.log("el error es:", error);
      message.error("Hubo un error intentelo nuevamente", 2000);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateImage(currentUser.id, image))
      setImage("");
      message.success("Imagen actualizada", 2000)
    } catch (error) {
      // console.log("el error es:", error);
      message.error("Hubo un error intentelo nuevamente", 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setOpen2(false);
      dispatch(updateUser(currentUser.id, inputs));
      setInputs({
        names: "",
        lastNames: "",
        email: "",
        birthday: "",
        nationality: "",
      });
      setEditNames(false);
      setEditEmail(false);
      setEditBirthday(false);
      setEditNationality(false);
      message.success("Datos actualizados", 2000);
    } catch (error) {
      // console.log("el error es:", error);
      message.error("Hubo un error intentelo nuevamente", 2000);
    }
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  return (

    <Paper
      className={classes.paperWraper}
    >

      <Helmet>
        <title>Perfil | Sleep Tracker</title>
      </Helmet>

      <Grid
        container
        justifyContent="center"
        direction='column'
        alignItems='center'
        spacing={5}
      >
        <Grid
          item
        >
          <Typography
            variant="h2"
            fontWeight='bold'
            paddingTop={5}
          >
            Perfil
          </Typography>
        </Grid>


        <Grid item>
          <Card
            variant="outlined"
            sx={{ width: {large:'50vw', md:'50vw', sm: '70vw', xs:'90vw'} }}
          >
            <CardContent>

              <Grid
                container
                // sx={{
                //   direction: {
                //     md: 'row',
                //     sm: 'column'
                //   }
                // }}
                justifyContent="center"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}

              >

                <Grid
                  item
                >
                  <Box>
                    <Tooltip
                      title={
                        <Typography
                          variant='h6'
                          fontWeight='bold'
                        >
                          Editar
                        </Typography>
                      }>

                      <IconButton
                        onClick={handleClickAnchor}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={openAnchor ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openAnchor ? 'true' : undefined}
                      >
                        <ListItemIcon>
                          {
                            currentUser.image ?
                              <Avatar
                                alt="Not found"
                                srcSet={currentUser.image}
                                sx={{
                                  width: 150,
                                  height: 150
                                }}
                              />
                              :
                              <Avatar
                                sx={{
                                  width: 150,
                                  height: 150
                                }}
                                alt="Not found"
                              >
                                <PersonIcon
                                  sx={{
                                    width: 150,
                                    height: 150
                                  }}
                                />
                              </Avatar>
                          }
                        </ListItemIcon>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openAnchor}
                      onClose={handleCloseAnchor}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      {image ?
                        <MenuItem
                          onClick={handleImage}
                        >
                          <ListItemIcon>
                            <CheckIcon
                              color='success'
                            />
                          </ListItemIcon>
                          Confirme
                        </MenuItem>

                        :
                        <Button
                          size='large'
                          sx={{
                            "&.MuiButtonBase-root:hover"
                              :
                            {
                              bgcolor: "transparent"
                            },
                          }}
                          color="primary"
                          aria-label="upload picture"
                          component="label">
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => convertirBase64(e)}
                          />
                          <MenuItem>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            Cambiar
                          </MenuItem>
                        </Button>
                      }

                      {
                        currentUser.image ?
                          <MenuItem
                            onClick={handleClickDelete}
                          >
                            <ListItemIcon>
                              <DeleteIcon
                                color='error'
                              />
                            </ListItemIcon>
                            <Typography>
                              Eliminar
                            </Typography>
                          </MenuItem>

                          :
                          null
                      }
                    </Menu>

                  </Box>
                </Grid>
              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                   xs={7}
                >
                  {!editNames ? (
                    <Typography>
                      {`${currentUser.names} ${currentUser.lastNames}`}
                    </Typography>
                  ) : (
                    <Grid container gap={1}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Nuevo nombre"
                      type="text"
                      name="names"
                      value={inputs.names}
                      onChange={(e) => handleInputs(e)}
                    />
                    <TextField
                    size="small"
                      variant="outlined"
                      label="Nuevo apellido"
                      type="text"
                      name="lastNames"
                      value={inputs.lastNames}
                      onChange={(e) => handleInputs(e)}
                    />
                    </Grid>
                  )}
                </Grid>

                <Grid
                  item
                >
                  {!inputs.names && (
                    <Tooltip title= {!editNames ? "Editar nombre" : "Cancelar"}>
                      <Fab
                        size='small'
                        color={!editNames ? "primary" : "error"}
                        onClick={(e) => handleClick(e)}
                      >
                        {!editNames ? <EditIcon /> : <HighlightOffIcon/>}
                      </Fab>
                   </Tooltip>
                  )}
                </Grid>

              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                >
                  {!editEmail ? (
                    <Typography>{currentUser.email}</Typography>
                  ) : (
                    <TextField
                      size="small"
                      type="text"
                      name="email"
                      label="Nuevo email"
                      value={inputs.email}
                      onChange={handleInputs}
                    />
                  )}
                </Grid>

                <Grid
                  item
                // xs={12}
                >
                  {!inputs.email && (
                    <Tooltip title = {!editEmail ? "Editar email" : "Cancelar"}>
                      <Fab
                        size='small'
                        color={!editEmail ? "primary" : "error"}
                        onClick={(e) => handleClickEmail(e)}
                      >
                        {!editEmail ? <EditIcon /> : <HighlightOffIcon/>}
                      </Fab>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                >
                  {!editBirthday ? (
                    <Typography>
                      {currentUser.birthday ? currentUser.birthday : "¡ Registra fecha de nacimiento !"}
                    </Typography>
                  ) : (
                    <TextField
                      size="small"
                      helperText="Fecha de nacimiento"
                      type="date"
                      name="birthday"
                      min="1900-01-01"
                      max={yourDate}
                      placeholder=""
                      value={inputs.birthday}
                      onChange={handleInputs}
                    />
                  )}
                </Grid>

                <Grid
                  item
                >
                  {!inputs.birthday && (
                    <Tooltip title = {!editBirthday ? "Editar nacimiento" : "Cancelar"}>
                    <Fab
                      size='small'
                      color={!editBirthday ? "primary" : "error"}
                      onClick={(e) => handleClickBirthday(e)}
                    >
                      {!editBirthday ? <EditIcon /> : <HighlightOffIcon/>}
                    </Fab>
                  </Tooltip>
                  )}
                </Grid>
              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                >
                  {!editNationality ? (
                    <Typography>
                      {currentUser.nationality ? currentUser.nationality : " ¡ Registra tu nacionalidad !"}
                    </Typography>
                  ) : (
                    <TextField
                      size="small"
                      required
                      select
                      label="Nacionalidad"
                      defaultValue=""
                      helperText="Seleccione su nacionalidad"
                      value={inputs.nationality}
                      onChange={handleSelect}
                    >
                      {nationalities?.map((nationality) => (
                        <MenuItem key={keyNationalities++}
                          value={nationality}
                        >
                          {nationality}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>

                <Grid
                  item
                >
                  {!inputs.nationality && (
                    <Tooltip title = {!editNationality ? "Editar nacionalidad" : "Cancelar"}>
                    <Fab
                      size='small'
                      color={!editNationality ? "primary" : "error"}
                      onClick={(e) => handleClickNationality(e)}
                    >
                      {!editNationality ? <EditIcon /> : <HighlightOffIcon/>}
                    </Fab>
                  </Tooltip>
                  )}
                </Grid>

              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                >
                  <Typography>
                  {currentUser.hashedPassword ? "**********" : "¡ Crea tu contraseña !"} 
                  </Typography>
        
                </Grid>

                <Grid
                  item
                >
                  <Tooltip title={currentUser.hashedPassword ? "Cambiar contraseña" : "Crea tu contraseña"}>
                    <Fab
                      size='small'
                      href={`/private/change-password/${currentUser.id}`}
                      color="primary"
                      sx={{
                        ':hover': {
                          color: 'white',
                        },
                      }}
                    >
                      <PasswordIcon/>
                    </Fab>
                  </Tooltip>

                </Grid>

              </Grid>

              <Divider />

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={1}
              >

                <Grid
                  item
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Plan actual
                  </Typography>
                </Grid>

                <Grid
                  item
                >
                  <Tooltip title= {currentUser.plan.name ? "Cambiar plan" : "Subscribete a un plan"}>
                    <Fab
                      size='small'
                      variant="extended"
                      href="/private/planes"
                      color="primary"
                      sx={{
                        ':hover': {
                          color: 'white',
                        },
                      }}
                    >
                      {currentUser.plan.name ? currentUser.plan?.name : "Planes"}
                    </Fab>
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid
                item
              >
                <Fab
                  size='small'
                  href={`/private/delete-user/${currentUser.id}`}
                  variant="extended"
                  color="error"
                  id="ButtonDelete"
                  sx={{
                    ':hover': {
                      color: 'white',
                    },
                  }}
                >
                  Borrar usuario
                </Fab>
              </Grid>

              <Grid item paddingTop = {1}>
                {inputs.names ||
                  inputs.email ||
                  inputs.birthday ||
                  inputs.nationality ? (
                  <Fab
                    size="small"
                    onClick={handleClickConfirm}
                    color="success"
                    variant="extended"
                  >
                    Confirmar
                  </Fab>
                ) : null}
              </Grid>
              {/* </Grid> */}

            </CardContent>
          </Card>
        </Grid>

        <Grid item >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿ Desea eliminar la imagen de perfil ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Si continuas tu foto de perfil será eliminada para siempre.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => handleDelete(e)} autoFocus>Si, deseo eliminarla</Button>
              <Button onClick={handleNo}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item >
          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿ Desea realizar los cambios en tu perfil?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Si continuas tus datos se modificaran con la nueva información que has colocado.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => handleSubmit(e)} autoFocus>Si, quiero realizar los cambios</Button>
              <Button onClick={handleNo2}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Paper>

  );
};

export default Profile;

const useStyles = makeStyles(() => ({
  middle: {
    justifyContent: 'center'
  },

  paperWraper: {
    minHeight: '100vh'
  }

}));
