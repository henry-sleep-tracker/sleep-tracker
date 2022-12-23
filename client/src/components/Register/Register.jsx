import React from "react";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { postUser } from "../../actions";
import { useDispatch } from "react-redux";

const nationalities = [
  "afgano",
  "albanés",
  "argelino",
  "angoleño",
  "antiguano",
  "australiano",
  "austriaco",
  "cahameños",
  "bangladesí",
  "carbadenses",
  "bielorruso",
  "belga",
  "celiceños",
  "Bosnio",
  "botsuano",
  "búlgaro",
  "burkinés",
  "burundés",
  "camerunés",
  "canadienses",
  "chadiano",
  "chino",
  "comorano",
  "tico",
  "marfileño",
  "croata",
  "cubano",
  "checo",
  "danes",
  "yibutianos",
  "dominicano",
  "egipcio",
  "eritreo",
  "etíope",
  "finlandés",
  "francés",
  "gabonés",
  "gambiano",
  "alemán",
  "ghanés",
  "griego",
  "guatemalteco",
  "guineano",
  "haitiano",
  "hondureño",
  "húngaro",
  "indio",
  "iraní",
  "iraquí",
  "Irlandés",
  "israelita",
  "italiano",
  "japonés",
  "keniata",
  "letón",
  "liberiano",
  "libio",
  "lituano",
  "madagascarí",
  "malauí",
  "mauritano",
  "Moldavo",
  "marroquí",
  "mozambiqueño",
  "namibio",
  "holandés",
  "Neozelandés",
  "nicaragüense",
  "nigeriano",
  "nigeriano",
  "macedónio",
  "noruego",
  "pakistaní",
  "panameño",
  "Papú",
  "filipino",
  "polaco",
  "portugués",
  "rumano",
  "ruso",
  "ruandés",
  "serbio",
  "eslovaco",
  "esloveno",
  "sudafricano",
  "surcoreano",
  "sudanés",
  "sueco",
  "suizo ",
  "tanzano",
  "tailandés",
  "tunecino",
  "turco",
  "ugandés",
  "ucraniano",
  "británico",
  "uzbeco",
  "vietnamita",
  "zambiano",
  "zimbabuense",
];

export default function Register() {
  const dispatch = useDispatch();
  // const history = useHistory();
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

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      // dispatch(postUser(input));
      alert("user registered");
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
      // history.push("/login"); //asi es como se rediriges
    } catch (error) {
      console.log("el error es:", error);
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
      <h1>Registro</h1>
      <div>
        <label htmlFor="names">{`Nombre(s)*:`} </label>
        <input
          type="text"
          name="names"
          placeholder="Nombre(s)"
          maxlength="50"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
        <label htmlFor="lastNames">{`Apellido(s)*:`} </label>
        <input
          type="text"
          name="lastNames"
          placeholder="Apellido(s)"
          maxlength="50"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>

      <div>
        <label htmlFor="nationality">{`Nacionalidad*:`} </label>
        <select name="select" onChange={(event) => handleSelect(event)}>
          {nationalities?.map((nationality) => (
            <option
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
          maxlength="50"
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
          maxlength="256"
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
          maxlength="32"
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
          maxlength="32"
          onChange={(event) => handleChange(event)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
