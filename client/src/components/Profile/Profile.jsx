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
import DeleteIcon from "@mui/icons-material/Delete";
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { Helmet } from "react-helmet";
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@mui/styles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditIcon from '@mui/icons-material/Edit';
import { message } from "react-message-popup";

const Profile = () => {
  const { createPassword } = useAuthContext();
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editiBirthday, setEditBirthday] = useState(false);
  const [editNationality, setEditNationality] = useState(false);
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({
    names: "",
    lastNames: "",
    email: "",
    birthday: "",
    nationality: "",
  });
  console.log(inputs);
  let keyNationalities = 0;
  let yourDate = new Date();

  useEffect(() => {
    if (currentUser.hashedPassword !== null) {
      createPassword();
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
    if (!editiBirthday) {
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

    } catch (error) {
      console.log("el error es:", error);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateImage(currentUser.id, image))
      setImage("");
    } catch (error) {
      console.log("el error es:", error);
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
    } catch (error) {
      console.log("el error es:", error);
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
            sx={{ width: '70vw' }}
          >
            <CardContent>

              <Grid
                container
                sx={{
                  direction: {
                    md: 'row',
                    sm: 'column'
                  }
                }}
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
                            }
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
                            <Typography>
                              Editar
                            </Typography>

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
              >

                <Grid
                  item
                // xs={12}
                >
                  {!editNames ? (
                    <Typography>
                      {`${currentUser.names} ${currentUser.lastNames}`}
                    </Typography>
                  ) : (
                    <Grid container gap={1}>
                      <TextField
                        variant="outlined"
                        label="Nuevo nombre"
                        type="text"
                        name="names"
                        value={inputs.names}
                        onChange={(e) => handleInputs(e)}
                      />
                      <TextField
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
                // xs={12}
                >
                  {!inputs.names && (
                    <Button
                      size='large'
                      variant="outlined"
                      onClick={(e) => handleClick(e)}
                      startIcon={<PersonIcon />}
                    >
                      Nombre
                    </Button>
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
              // spacing={30}
              >

                {/* <Grid
                  item
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Correo electronico
                  </Typography>
                </Grid> */}

                <Grid
                  item
                // xs={12}
                >
                  {!editEmail ? (
                    <Typography>{currentUser.email}</Typography>
                  ) : (
                    <TextField
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
                    <Button
                      size='large'
                      variant="outlined"
                      onClick={(e) => handleClickEmail(e)}
                      startIcon={<EmailIcon />}
                    >
                      Correo
                    </Button>
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

              // spacing={30}
              >

                {/* <Grid
                  item
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Fecha de nacimiento
                  </Typography>
                </Grid> */}

                <Grid
                  item
                // xs={12}
                >
                  {!editiBirthday ? (
                    <Typography>
                      {currentUser.birthday}
                    </Typography>
                  ) : (
                    <TextField
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
                // xs={12}
                >
                  {!inputs.birthday &&
                    <Button
                      size='large'
                      variant="outlined"
                      onClick={(e) => handleClickBirthday(e)}
                      startIcon={<CalendarMonthIcon />}
                    >
                      Nacimiento
                    </Button>
                  }
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

              // spacing={30}
              >

                {/* <Grid
                  item
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Nacionalidad
                  </Typography>
                </Grid> */}

                <Grid
                  item
                // xs={12}
                >
                  {!editNationality ? (
                    <Typography>
                      {currentUser.nationality}
                    </Typography>
                  ) : (
                    <TextField
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
                // xs={12}
                >
                  {!inputs.nationality && (
                    <Button
                      size='large'
                      variant="outlined"
                      onClick={(e) => handleClickNationality(e)}
                      startIcon={<PlaceIcon />}
                    >
                      Nacionalidad
                    </Button>
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

              >

                {/* <Grid
                  item
                >
                  <Typography
                    variant="h6"
                    fontWeight='bold'
                  >
                    Contraseña
                  </Typography>
                </Grid> */}

                <Grid
                  item
                // xs={12}

                >
                  <Typography>
                    **********
                  </Typography>
                </Grid>

                <Grid
                  item
                // xs={12}

                >
                  <Button
                    size='large'
                    href={`/private/change-password/${currentUser.id}`}
                    startIcon={<PasswordIcon />}
                    variant="outlined"
                    id="ButtonPassword"
                  >
                    Contraseña
                  </Button>

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

              // spacing={30}
              >

                <Grid
                  item
                // xs={12}
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
                // xs={12}
                >
                  <Button
                    size='large'
                    variant="outlined"
                    href="/private/planes"
                    startIcon={<AccountBalanceWalletIcon />}
                  >
                    {currentUser.plan?.name}
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
              >
                <Button
                  size='small'
                  href={`/private/delete-user/${currentUser.id}`}
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                  id="ButtonDelete"
                >
                  Borrar usuario
                </Button>
              </Grid>

              <Grid item>
                {inputs.names ||
                  inputs.email ||
                  inputs.birthday ||
                  inputs.nationality ? (
                  <Button
                    size='large'
                    onClick={handleClickConfirm}
                    color="success"
                    variant="contained"
                    type="submit"
                    id="ButtonSubmit"
                    startIcon={<CheckIcon />}
                  >
                    Confirmar
                  </Button>
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
