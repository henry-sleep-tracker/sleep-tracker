import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import {useDispatch} from "react-redux";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteUser } from "../../actions/profileActions";
import style from "./ChangePassword.module.css";
import { logOutUser, cleanExpDate } from "../../actions";
import { useAuthContext } from "../../actions/authContext";

export default function DeleteUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { logout } = useAuthContext();

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  function validate(input) {
    let errors = {};
    for (let propiedad in input) {
      if (!input[propiedad]) {
        errors[propiedad] = `${
          propiedad.charAt(0).toUpperCase() + propiedad.slice(1)
        } es requerido`;
      }
    }
    return errors;
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  console.log("INPUT PASSWORD", input);
  console.log("ERRORS", errors);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (Object.keys(errors).length !== 0) {
        alert(
          "Todos los campos obligatorios deben ser llenados para poder continuar"
        );
      } else if (input.password !== input.confirmPassword) {
        alert("La contraseña no se confirmo correctamente");
      } else {
        dispatch(deleteUser(id, input.password));
        setInput({
          password: "",
          confirmPassword: "",
        });
        dispatch(logOutUser());
        dispatch(cleanExpDate());
        await logout();
      }
    } catch (error) {
      console.log("el error es:", error);
    }
  }
  return (
    <div className= {style.container}>
            <Helmet>
        <title>Eliminar usuario | Sleep Tracker</title>
      </Helmet>

        <h1 className= {style.h1}>Para continuar confirme su contraseña</h1>
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
                onChange={(e) => handleChange(e)}
                required
                />
            </div>

        <div className={style.containers2}>
          <button className={style.buttonConfirm} type="submit">
            Eliminar usuario
          </button>
        </div>
      </form>
    </div>
  );
}
