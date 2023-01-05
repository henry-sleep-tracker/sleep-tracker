import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { sendRecoveryEmail } from "../../actions";

export default function ForgotPassword() {
    const dispatch=useDispatch();
    var [input, setInput] = useState({
        email: "",
      });
      const [errorsEmptiness,setErrorsEmptiness]=useState({
        email: "",
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
          }else{
            dispatch( sendRecoveryEmail(input.email));
            setInput({
              email: "",
            });
          }
        } catch (error) {
          console.log("el error es:", error);
        }
      }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h1>Recuperar contraseña</h1>
      <div>
        <label htmlFor="email">{`Correo electronico*:`} </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <button type="submit">Enviar correo</button>
    </form>
  );
}
