import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { logInUser } from "../../actions";
import { useDispatch } from "react-redux";

export default function LogIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  var [input, setInput] = useState({
    email: "",
    password: "",
  });
  // useEffect(()=>{
  //     setInput({
  //         email:"",
  //         password:"",
  //     })
  // })
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log("component login");
      console.log("input is:", input);
      dispatch(logInUser(input));
      alert("user validated");
      setInput({
        email: "",
        password: "",
      });
      history.push("/home"); //asi es como se rediriges
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
        No tienes cuenta? <a href="/register">registrate</a>
      </p>
    </form>
  );
}
