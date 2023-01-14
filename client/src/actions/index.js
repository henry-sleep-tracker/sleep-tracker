
import {
  CREATE_TOKEN,
  GET_CURRENT_USER,
  POST_USER_WITH_GOOGLE,
  GET_CURRENT_PLAN,
} from "./constants";
import axios from "axios";
const emailjs = require("emailjs-com");
const templateId = "template_upsqgx4";
const serviceId = "service_ts4dsnk";
const Public_Key = "DkkyjnDmwCqT4qOL1";

const getUsersPlanExpDate = require("./plan");

// require("dotenv").config();



const nullUser = {
  id: 0,
  isAdmin: false,
  isActive: false,
  email: "",
  hashedPassword: "",
  names: "",
  lastNames: "",
  nationality: "",
  birthday: "",
  lastConnection: "",
};

export const createToken = (code, userId) => async (dispatch) => {
  try {
    const sendCode = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/fitbit`, {
      // The default URL for backEnd is written on "app.js", just write "/*yourBackenRoute*"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, userId: userId }),
    });

    const response = await sendCode.json();

    dispatch({ type: CREATE_TOKEN, payload: response });
  } catch (error) {
    console.error(error);
  }
};

export function postUser(user) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEFAULT_URL}/user/${user.email}`
      );
      if (response.data !== "") {
        alert(`El usuario ya existe`);
      } else {
        await axios.post(`${process.env.REACT_APP_DEFAULT_URL}/user`, user);
        alert("Usuario registrado correctamente");
        window.location.href = `${process.env.REACT_APP_BASE_FRONT_URL}/login`;
      }
    } catch (error) {
      console.log("El error client actions postUser es:", error.message);
      throw new Error("El error client actions postUser es:", error.message);
    }
  };
}

export function sendRecoveryEmail(email) {
  return async function (dispatch) {
    try {
      const userByEmail = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const response = await userByEmail.json();
      const data = { email: email, link: response };
      emailjs.send(serviceId, templateId, data, Public_Key).then(
        (result) => {
          console.log("result", result);
          console.log(result.text);
        },
        (error) => {
          console.log("error.text:", error);
        }
      );
      return response;
    } catch (error) {
      console.log(
        "El error client actions sendRecoveryEmail es:",
        error.message
      );
      throw new Error(
        "El error client actions sendRecoveryEmail es:",
        error.message
      );
    }
  };
}

export function resetPassword(password, id, token) {
  return async function (dispatch) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/user/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: password }),
        }
      );
      if (response.status === 200) {
        alert(`La contraseña se actualizo correctamente`);
      } else {
        alert(
          `Hubo un error al actualizar la contraseña. Intentelo nuevamente.`
        );
      }
    } catch (error) {
      console.log("El error client actions resetPassword es:", error.message);
      throw new Error(
        "El error client actions resetPassword es:",
        error.message
      );
    }
  };
}

// export function logInUser(email, password) {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_DEFAULT_URL}/login/manual`, {email: email, password:password});
//       if (response.status === 204) {
//         return dispatch({
//           type: GET_CURRENT_USER,
//           payload: nullUser,
//         });
//       } else {
//         const userFound = await response;
//         return dispatch({
//           type: GET_CURRENT_USER,
//           payload: userFound,
//         });
//       }
//       // return response
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
export function logInUser(email, password) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/login/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.status === 204) {
        return dispatch({
          type: GET_CURRENT_USER,
          payload: nullUser,
        });
      } else {
        const userFound = await response.json();
        return dispatch({
          type: GET_CURRENT_USER,
          payload: userFound,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function logOutUser() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_CURRENT_USER,
        payload: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanExpDate() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_CURRENT_PLAN,
        payload: "1900-01-01",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logInUserWithGoogle(response) {
  return async function (dispatch) {
    try {
      const { email, familyName, givenName } = response.profileObj;
      const userCreated = await axios.post(
        `${process.env.REACT_APP_DEFAULT_URL}/user/google`,
        { email, lastNames: familyName, names: givenName }
      );
      return dispatch({
        type: POST_USER_WITH_GOOGLE,
        payload: userCreated.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getUserById = (id) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/myuser/${id}`);
      const user = await response.json();
      console.log("ACTIONS USER", user);
      return dispatch({ type: "GET_USER", payload: user });
    } catch (error) {
      console.log(error);
    }
  };
};
