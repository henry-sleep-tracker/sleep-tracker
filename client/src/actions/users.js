export function getUsersResponse(users){
  return {
    type: 'GET_USERS_RESPONSE',
    payload: users
  }
};

export function getUsers() {
  return function(dispatch) {
    fetch('http://localhost:3001/users')
    .then(r => r.json())
    .then((users) => dispatch(getUsersResponse(users)))
    .catch( error => console.log(error))
  }
};

export async function updateUsers(updatedFields, userId){
  try {
    let result = await fetch(`http://localhost:3001/users/update/${userId}`, {
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'PUT',
      body: JSON.stringify(updatedFields)
      }).then(r => r.json());
    return result;
  } catch (error) {
    console.log(error.message)
    return 0;
  }
};
