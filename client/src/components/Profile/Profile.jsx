import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthContext } from "../../actions/authContext";
import { updateUser, updateImage } from "../../actions/profileActions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { Helmet } from "react-helmet";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from "@mui/icons-material/AddComment";
import PaymentIcon from "@mui/icons-material/Payment";
import { message } from "react-message-popup";


const Profile = () => {
  let navigate = useNavigate();
  const { isGoogleUser, isPasswordSetUp} = useAuthContext();
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
  let nationalities = [
    'Afganistan', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados', 'Baréin', 'Bélgica', 'Belice', 'Bielorrusia', 'Benín', 'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Ciudad del Vaticano', 'Colombia', 'Comoras', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala', 'Guinea', 'Guinea-Bisáu', 'Guinea Ecuatorial', 'Guyana', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia','Islas Marshall', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'MalGridas', 'Mali', 'Malta', 'Marruecos',  'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos', 'Palestina', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Checa','República Centroafricana', 'República del Congo', 'República Democrática del Congo','República Dominicana', 'Ruanda', 'Rumania', 'Rusia', 'Islas Salomón', 'Samoa', 'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'
  ];
  let keyNationalities = 0;
  let yourDate = new Date();

  useEffect(() => {
    if (currentUser.hashedPassword !== null) {
      createPassword();
    }
  }, [currentUser, createPassword]);

  const convertirBase64 = async (e) =>{
    let reader = new FileReader();
     reader.readAsDataURL(e.target.files[0]);
     reader.onload = function(){
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
  const handleClickDeleteUser = () => {
    if (isGoogleUser==="true" && isPasswordSetUp==="false") {
      message.error(
        "No puede eliminar el usuario hasta no haber creado una contraseña.",
        3000
      );
    }else{
      navigate(`/private/delete-user/${currentUser.id}`);
    }
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

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Helmet>
        <title>Perfil | Sleep Tracker</title>
      </Helmet>

      <Grid item></Grid>

      <Grid item>
        <Typography variant="h2">Perfil</Typography>
      </Grid>

      {/* <Grid
        item
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          href='/'
        >
          Regresar
        </Button>
      </Grid> */}

      <Grid container
        display= "flex"
        justifyContent="space-evenly"
        gap={50}
      >
        <Grid item>
        {/* <Link to={`/private/delete-user/${currentUser.id}`}> */}
          <Button
            href={`/private/change-password/${currentUser.id}`}
            startIcon={<PasswordIcon />}
            variant="outlined"
            id="ButtonPassword"
          >
            Cambiar contraseña
          </Button>
        </Grid>

        <Grid item
        >
          <Grid container display= "flex" flexDirection= "column" gap={2}>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            id="ButtonDelete"
            onClick={handleClickDeleteUser}
          >
            Borrar usuario
          </Button>{currentUser.image ? <Button onClick={handleClickDelete}>Eliminar foto</Button>: null}
          </Grid>
        </Grid>
        {/* </Link> */}
      </Grid>

      <Grid
        item
      >
        <Grid container direction= "column" gap={1} justifyContent= "center">
          <Avatar 
            alt = "Not found"
            srcSet={currentUser.image}
            sx={{ width: 200, height: 200 }}
          />
          {image ? 
            <Button color="success" size="small" variant="contained" onClick={handleImage}>Confirmar foto</Button> 
            : 
            <Button sx={{
              ml: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }} 
            startIcon = {<PhotoCamera/>} 
            color="primary" 
            aria-label="upload picture" 
            component="label">
              <input hidden accept="image/*" type="file" onChange = {(e) => convertirBase64(e)}/>
            </Button>}
         </Grid>

      </Grid>

      <Grid item>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              flex={4}
              p={2}
            >
              <Grid item>
                <Typography variant="h4">Tu nombre:</Typography>
              </Grid>

              <Grid item>
                {!editNames ? (
                  <Typography variant="h6">
                    {`${currentUser.names} ${currentUser.lastNames}`}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    label="Nuevo nombre"
                    type="text"
                    name="names"
                    value={inputs.names}
                    onChange={(e) => handleInputs(e)}
                  />
                )}
              </Grid>

              <Grid item>
                {!inputs.names && (
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClick(e)}
                    startIcon={<PersonIcon />}
                  >
                    Editar
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h5">Correo electronico:</Typography>
              </Grid>

              <Grid item>
                {!editEmail ? (
                  <Typography variant="h6">{currentUser.email}</Typography>
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

              <Grid item>
                {!inputs.email && (
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickEmail(e)}
                    startIcon={<EmailIcon />}
                  >
                    Editar
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h5">Fecha de nacimiento:</Typography>
              </Grid>

              <Grid item>
                {!editiBirthday ? (
                  <Typography variant="h6">{currentUser.birthday}</Typography>
                ) : (
                  <TextField
                    helperText="Fecha de nacimiento"
                    type="date"
                    name="birthday"
                    min="1900-01-01" max={yourDate}
                    placeholder=""
                    value={inputs.birthday}
                    onChange={handleInputs}
                  />
                )}
              </Grid>

              <Grid item>
                {!inputs.birthday && (
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickBirthday(e)}
                    startIcon={<CalendarMonthIcon />}
                  >
                    Editar
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h5">Nacionalidad:</Typography>
              </Grid>

              <Grid item>
                {!editNationality ? (
                  <Typography variant="h6">
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

              <Grid item>
                {!inputs.nationality && (
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickNationality(e)}
                    startIcon={<PlaceIcon />}
                  >
                    Editar
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Typography variant="h5">Plan actual:</Typography>
              </Grid>
              <Grid item>
              <Button variant="contained" href="/private/planes">
                  {currentUser.plan?.name}
              </Button>
              </Grid>
              
      
              <Grid item>
                {inputs.names ||
                inputs.email ||
                inputs.birthday ||
                inputs.nationality ? (
                  <Button
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
            </Grid>
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
  );
};

export default Profile;
