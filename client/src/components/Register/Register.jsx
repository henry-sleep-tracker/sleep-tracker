import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser,getUserByEmail } from "../../actions";
import { useDispatch } from "react-redux";
import {TextField,Typography} from "@mui/material";

let nationalities = [
 'Afganistan','Albania','Alemania','Andorra','Angola','Antigua y Barbuda','Arabia Saudita','Argelia','Argentina','Armenia','Australia','Austria','Azerbaiyán','Bahamas','Bangladés','Barbados','Baréin','Bélgica','Belice','Bielorrusia','Benín','Birmania','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunei','Bulgaria','Burkina Faso','Burundi','Bután','Cabo Verde','Camboya','Camerún','Canadá','Catar','Chad','República Checa','Chile','China','Chipre','Ciudad del Vaticano','Colombia','Comoras','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Dinamarca','Dominica','República Dominicana','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eritrea','Eslovaquia','Eslovenia','España','Estados Unidos','Estonia','Etiopía','Filipinas','Finlandia','Fiyi','Francia','Gabón','Gambia','Georgia','Ghana','Granada','Grecia','Guatemala','Guinea','Guinea-Bisáu','Guinea Ecuatorial','Guyana','Haití','Honduras','Hungría','India','Indonesia','Irak','Irán','Irlanda','Islandia','Israel','Italia','Jamaica','Japón','Jordania','Kazajistán','Kenia','Kirguistán','Kiribati','Kuwait','Laos','Lesoto','Letonia','Líbano','Liberia','Libia','Liechtenstein','Lituania','Luxemburgo','Macedonia del Norte','Madagascar','Malasia','Malaui','Maldivas','Mali','Malta','Marruecos','Islas Marshall','Mauricio','Mauritania','México','Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Mozambique','Namibia','Nauru','Nepal','Nicaragua','Níger','Nigeria','Noruega','Nueva Zelanda','Omán','Países Bajos','Pakistán','Palaos','Palestina','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Polonia','Portugal','Reino Unido','República Centroafricana','República del Congo','República Democrática del Congo','Ruanda','Rumania','Rusia','Islas Salomón','Samoa','San Cristóbal y Nieves','San Marino','San Vicente y las Granadinas','Santa Lucía','Santo Tomé y Príncipe','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Siria','Somalia','Sri Lanka','Suazilandia','Sudáfrica','Sudán','Sudán del Sur','Suecia','Suiza','Surinam','Tailandia','Tanzania','Tayikistán','Timor Oriental','Togo','Tonga','Trinidad y Tobago','Túnez','Turkmenistán','Turquía','Tuvalu','Ucrania','Uganda','Uruguay','Uzbekistán','Vanuatu','Venezuela','Vietnam','Yemen','Yibuti','Zambia','Zimbabue'
];
let keyNationalities=0;
let yourDate = new Date()
yourDate=yourDate.toISOString().split('T')[0]

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    names: "",
    lastNames: "",
    nationality: "",
    birthday: "",
    googleId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorsEmptiness,setErrorsEmptiness]=useState({
    names: "",
    lastNames: "",
    nationality: "",
    birthday: "",
    googleId: "",
    email: "",
    password: "",
    confirmPassword: "",
}) //aca se crean los posibles errores
function validate(input){ //aca entra todo el estado input
  let errors={}
  for(let propiedad in input){
      if (!input[propiedad]){
          errors[propiedad]=`${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)} es requerido`
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

  async function  handleSubmit (event) {

    try {
      event.preventDefault();
      const existingEmail= await getUserByEmail(input.email);
      console.log("existing email:",existingEmail);
      if(existingEmail.userId!==0){
        alert(`El email ${existingEmail.email} ya se encontraba registrado en nuestra base de datos y no es posible registrarse mas de una vez`)
      }else if(Object.keys(errorsEmptiness).length!==0 ){
        alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
      }else if(input.names.length>50 ){
        alert(`La longitud de los nombres no puede ser mayor a 50 caracteres`)
      }else if(input.lastNames.length>50 ){
        alert(`La longitud de los apellidos no puede ser mayor a 50 caracteres`)
      }else if(!nationalities.includes(input.nationality)){
        alert(`La nacionalidad debe ser una de las que se encuentran en la lista y debe estar exactamente igual a como esta en la lista`)
      }else if(input.password!==input.confirmPassword){
        alert(`La contraseña no se confirmo correctamente`)
      }
      // else if(input.birthday<1900-01-01||input.birthday>yourDate){
      //   alert(`La fecha minima debe ser 1900-01-01 y la maxima la del dia de hoy`)
      // }
      else{
        dispatch(postUser(input));
        alert("Usuario registrado correctamente");
        setInput({
          names: "",
          lastNames: "",
          nationality: "",
          birthday: "",
          googleId: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate('/login')
      }
    } catch (error) {
      console.log("el error es:", error.message);
      alert("El usuario no pudo ser registrado");
    }
  }

    function handleSelect(event) {
      setInput({
          ...input,
          nationality:event.target.value
      })
    }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Typography variant='h2'>Registro</Typography>
      <div>
        <label htmlFor="names">{`Nombre(s)*:`} </label>
        <TextField id="outlined-basic" label="Outlined" variant="outlined"
        type="text"
        name="names"
        placeholder="Nombre(s)"
        maxLength="50"
        onChange={(event) => handleChange(event)}
        required />
        {/* <input
          
        /> */}
      </div>

      <div>
        <label htmlFor="lastNames">{`Apellido(s)*:`} </label>
        <input
          type="text"
          name="lastNames"
          placeholder="Apellido(s)"
          maxLength="50"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
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
      </div>

      <div>
        <label htmlFor="birthday">{`Cumpleaños*:`} </label>
        <input
          type="date"
          name="birthday"
          placeholder="Cumpleaños"
          min="1900-01-01" max={yourDate}
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
        <label htmlFor="googleId">{`GoogleId:`} </label>
        <input
          type="text"
          name="googleId"
          placeholder="GoogleId"
          maxLength="50"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">{`Correo electronico*:`} </label>
        <input
          type="email"
          name="email"
          placeholder="Correo electronico"
          maxLength="256"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title={`El correo debe contener @ y .`} 
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">{`Contraseña*:`} </label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          maxLength="32"
          pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`} 
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">{`Confirmar contraseña*:`} </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Contraseña"
          maxLength="32"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
