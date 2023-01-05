import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { useParams,useNavigate } from 'react-router-dom';
import { resetPassword } from "../../actions";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
    const dispatch=useDispatch();
    var [input, setInput] = useState({
        password: "",
        confirmPassword: "",
      });
      const [errorsEmptiness,setErrorsEmptiness]=useState({
        password: "",
        confirmPassword: "",
    }) 
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
      async function handleSubmit(event) {
        event.preventDefault();
        try {
          if(Object.keys(errorsEmptiness).length!==0 ){
            alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
          }else if(input.password!==input.confirmPassword){
            alert(`La contraseña no se confirmo correctamente`)
          }else{
            dispatch( resetPassword(input.password, id, token));
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
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h1>Crear una nueva contraseña</h1>
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
          pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <button type="submit">Cambiar la contraseña</button>
    </form>
  );
}
