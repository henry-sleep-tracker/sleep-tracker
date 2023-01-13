export function getUsersResponse(users) {
  return {
    type: "GET_USERS_RESPONSE",
    payload: users,
  };
}

export function getUsers(page, size) {
  return function (dispatch) {
    fetch(`${process.env.REACT_APP_DEFAULT_URL}/users?page=${page}&limit=${size}`)
      .then((r) => r.json())
      .then((users) => dispatch(getUsersResponse(users)))
      .catch((error) => console.log(error));
  };
}

export async function updateUsers(updatedFields, id) {
  try {
    let result = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/users/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(updatedFields),
    }).then((r) => r.json());
    return result;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
}
