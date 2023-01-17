import {
  CREATE_TOKEN,
  GET_CURRENT_USER,
  POST_USER_WITH_GOOGLE,
  GET_CURRENT_PLAN,
} from "./constants";
import axios from "axios";
import { message } from "react-message-popup";
const emailjs = require("emailjs-com");
const templateId = "template_upsqgx4";
const serviceId = "service_ts4dsnk";
const Public_Key = "DkkyjnDmwCqT4qOL1";

const getUsersPlanExpDate = require("./plan");

// require("dotenv").config();

const nullUser = {
  id: 0,
  isAdmin: false,
  hasUsedFreePlan: false,
  email: "",
  hashedPassword: "",
  names: "",
  lastNames: "",
  nationality: "",
  birthday: "",
  lastConnection: "",
  stripeCustomerId: "",
  image: "",
  createdAt: "",
  updatedAt: "",
};

export const createToken = (code, userId) => async (dispatch) => {
  try {
    const sendCode = await fetch(
      `${process.env.REACT_APP_DEFAULT_URL}/fitbit`,
      {
        // The default URL for backEnd is written on "app.js", just write "/*yourBackenRoute*"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code, userId: userId }),
      }
    );

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
        //alert(`El usuario ya existe`);
        window.location.href =
          "http://localhost:3000/4b19bb28098dae39a259f67d30a0a8b932a6b925";
      } else {
        await axios.post(`${process.env.REACT_APP_DEFAULT_URL}/user`, user);
        alert("Usuario registrado correctamente");
        window.location.href = "http://localhost:3000/login";

        window.location.href =
          "http://localhost:3000/8f26c6520d61588a9757bc182157c4497628e871";
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
      if (userByEmail.status === 202) {
        message.error(
          "El usuario no esta registrado en la base de datos.",
          3000
        );
      } else {
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
      }
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
        //alert(`La contraseña se actualizo correctamente`);
        window.location.href =
          "http://localhost:3000/50ff4e65285ea9c7145fa1ca00766e9c38a44748";
      } else {
        /*  alert(
          `Hubo un error al actualizar la contraseña. Intentelo nuevamente.`
        ); */
        window.location.href =
          "http://localhost:3000/12bc2f45940ab508152184813fa70aec73d0da87";
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

export const getUserById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEFAULT_URL}/user/userId/${id}`
      );

      return dispatch({ type: GET_CURRENT_USER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const restoreUser = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/login/manual`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const userFound = await response.json();
      await axios.post(
        `${process.env.REACT_APP_DEFAULT_URL}/user/restoreUser/${userFound.id}`
      );
      return dispatch({
        type: GET_CURRENT_USER,
        payload: userFound,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const restoreGoogleUser = (email) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEFAULT_URL}/user/${email}`
      );
      const restoredUser = await axios.post(
        `${process.env.REACT_APP_DEFAULT_URL}/user/restoreGoogleUser/${email}`
      );
      return dispatch({
        type: GET_CURRENT_USER,
        payload: restoredUser.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export function logInUser(email, password, setOpen) {
  console.log("check", email, password, setOpen);
  return async function (dispatch) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/login/manual`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const userFound = await response.json();
      console.log("userFound", response);
      if (response.status === 204) {
        return dispatch({
          type: GET_CURRENT_USER,
          payload: nullUser,
        });
      } else if (response.status === 202) {
        setOpen(true);
      } else {
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
export function logInUserWithGoogle(response, setOpen) {
  return async function (dispatch) {
    try {
      const { email, familyName, givenName } = response.profileObj;
      const userCreated = await axios.post(
        `${process.env.REACT_APP_DEFAULT_URL}/user/google`,
        { email, lastNames: familyName, names: givenName }
      );
      if (userCreated.status === 203) {
        setOpen(true);
      } else {
        return dispatch({
          type: POST_USER_WITH_GOOGLE,
          payload: userCreated.data,
        });
      }
    } catch (error) {
      console.log("el error de logInUserWithGoogle es:", error.message);
    }
  };
}

export function cleanUser() {
  return async function (dispatch) {
    return dispatch({
      type: GET_CURRENT_USER,
      payload: "",
    });
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
