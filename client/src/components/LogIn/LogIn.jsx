import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { logInUser} from "../../actions/index";

export default function LogIn() {
  const dispatch=useDispatch();
  var [input, setInput] = useState({
    email: "",
    password: "",
  });

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
      alert("usuario validado");
      setInput({
        email: "",
        password: "",
      });
      // history.push("/home"); //asi es como se rediriges
    } catch (error) {
      console.log("el error es:", error);
      alert("usuario o contraseña incorrecto");
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
