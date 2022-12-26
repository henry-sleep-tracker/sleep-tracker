import { CREATE_TOKEN } from "./constants";

export const createToken = (code) => async (dispatch) => {
  console.log("actioncode", code);
  try {
    const sendCode = await fetch("/restapi", {
      // The default URL for backEnd is written on "app.js", just write "/*yourBackenRoute*"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
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
      const userPosted = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user }),
      });

      const response = await userPosted.json();
      return response;
    } catch (error) {
      console.log("El error client actions postUser es:", error.message);
      throw new Error("El error client actions postUser es:", error.message);
    }
  };
}
export async function getUserByEmail(email) {
  try {
    const userByEmail = await fetch(`http://localhost:3001/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await userByEmail.json();
    console.log("response:", response);
    return response;
  } catch (error) {
    console.log("El error client actions getUserByEmail es:", error.message);
    throw new Error(
      "El error client actions getUserByEmail es:",
      error.message
    );
  }
}
