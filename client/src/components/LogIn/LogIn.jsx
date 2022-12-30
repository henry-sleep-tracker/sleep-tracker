import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { logInUser} from "../../actions/index";
import { useAuthContext} from "../../actions/authContext";

export default function LogIn() {
  const {login} = useAuthContext();
  const loggedUser =  useSelector((state)=>state?.users.currentUser)
  const dispatch=useDispatch();
  var [input, setInput] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    if (loggedUser.hasOwnProperty('id')&&loggedUser.id!==0) {
      alert("Usuario validado");
      login();
    } else if(loggedUser.id===0){
      alert("El usuario o la contraseña no son correctos");
    }

  },[loggedUser,login])
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch( logInUser(input.email, input.password));
      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("el error es:", error);
    }
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h1>Iniciar sesion</h1>
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

      <div>
        <label htmlFor="password">{`Contraseña*:`} </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesion</button>
      <p>
        No tienes cuenta? <a href="/registro">registrate</a>
      </p>
    </form>
  );
}
