import {
  CREATE_TOKEN,
  GET_CURRENT_USER,
  POST_USER_WITH_GOOGLE,
  GET_CURRENT_PLAN,
} from "./constants";
const emailjs = require("emailjs-com");
const templateId = "template_upsqgx4";
const serviceId = "service_ts4dsnk";
const Public_Key = "DkkyjnDmwCqT4qOL1";
const getUsersPlanExpDate = require("./plan");

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
    const sendCode = await fetch("http://localhost:3001/fitbit", {
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
      const userByEmail = await fetch(
        `http://localhost:3001/user/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await userByEmail.json();
      console.log("response1:", response);
      if (response.id !== 0) {
        alert(`El usuario ya existe`);
      } else {
        const userPosted = await fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user }),
        });
        await userPosted.json();
        alert("Usuario registrado correctamente");
        window.location.href = "http://localhost:3000/login";
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
        `http://localhost:3001/user/forgot-password`,
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
        `http://localhost:3001/user/reset-password/${id}/${token}`,
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

export function logInUser(email, password) {
  return async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/login/manual`, {
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
      const data = await fetch(`http://localhost:3001/user/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          lastNames: familyName,
          names: givenName,
        }),
      });
      const userCreated = await data.json();
      return dispatch({
        type: POST_USER_WITH_GOOGLE,
        payload: userCreated,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
