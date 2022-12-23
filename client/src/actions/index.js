import { CREATE_TOKEN } from "./constants";

export const createToken = (code) => async (dispatch) => {
  try {
    const sendCode = await fetch("http://localhost:3001/sleepbyrange", {
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
