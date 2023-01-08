import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { changePassword } from "../../actions/profileActions";
import style from "./ChangePassword.module.css";

export default function ChangePassword() {

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch=useDispatch();

  const [errors,setErrors]=useState({
      password: "",
      confirmPassword: "",
  }) 
  var [input, setInput] = useState({
      password: "",
      confirmPassword: "",
    });
    
  function validate(input){ 
    let errors={}
    for(let propiedad in input){
        if (!input[propiedad]){
            errors[propiedad]=`${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)} es requerido`
        }
    }
    return errors
  }
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
        ...input,
        [e.target.name]: e.target.value
        })
      )
    }
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        if(Object.keys(errors).length !==0 ){
          alert(`Todos los campos obligatorios deben ser llenados para poder registrarse`)
        }else if(input.password !== input.confirmPassword){
          alert(`La contraseña no se confirmo correctamente`)
        }else{
          dispatch( changePassword(id, input.password));
          setInput({
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        }
      } catch (error) {
        console.log("el error es:", error);
      }
    }

  return (
    <div className= {style.container}>
      <h1 className= {style.h1}>Crear una nueva contraseña</h1>
      <Link to = "/private/profile">
        <button className= {style.buttonBack}>Regresar</button>
      </Link>
      <form className = {style.containers} onSubmit={(event) => handleSubmit(event)}>
        <div className= {style.containers2}>
          <label htmlFor="password">{`Contraseña*:`} </label>
          <input
          className= {style.inputs}
            type="password"
            name="password"
            placeholder="Contraseña"
            maxLength="32"
            pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`} 
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className= {style.containers2}>
          <label htmlFor="confirmPassword">{`Confirmar contraseña*:`} </label>
          <input
          className= {style.inputs}
            type="password"
            name="confirmPassword"
            placeholder="Contraseña"
            maxLength="32"
            pattern="(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*" title={`Ocho o mas caracteres. Al menos una letra mayuscula. Al menos una letra minuscula. Al menos un caracter especial`}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className= {style.containers2}>
          <button className = {style.buttonConfirm} type="submit">Cambiar la contraseña</button>
        </div>
      </form>
    </div>
  );
}
