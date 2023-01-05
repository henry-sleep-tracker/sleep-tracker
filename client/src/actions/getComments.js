export function getComments(payload) {
  return {
    type: "GET_USERS_RESPONSE",
    payload: payload,
  };
}

export function getUsers() {
  return function (dispatch) {
    fetch("http://localhost:3001/getcomments")
      .then((r) => r.json())
      .then((payload) => dispatch(getComments(payload)))
      .catch((error) => console.log(error));
  };
}

