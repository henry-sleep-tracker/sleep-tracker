export const updateUser = (id, info) => {
  return async function (dispatch) {
    try {
      const filterInfo = Object.entries(info).map((entri) => {
        if (entri[1]) return entri[0];
        return null;
      });
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info, [...filterInfo]),
        }
      );
      if (response.status === 200) {
        const user = await response.json();
        return dispatch({ type: "GET_PROFILE", payload: user });
      } else {
        alert(
          `Hubo un error al cambiar los datos del perfil. Intentelo nuevamente.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateImage = (id, file) => {
  return async function (dispatch) {
    try {
      console.log(file);
      const response = await fetch(`${process.env.REACT_APP_DEFAULT_URL}/changeimage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: file }),
      });
      if (response.status === 200) {
        const user = await response.json();
        return dispatch({ type: "GET_PROFILE", payload: user });
      } else {
        alert(
          `Hubo un error al cambiar la imagen del perfil. Intentelo nuevamente.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePassword = (id, newPassword) => {
  return async function () {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/user/changepassword/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        }
      );
      if (response.status === 200) {
        alert(`La contraseña se cambio correctamente`);
      } else {
        alert(`Hubo un error al cambiar la contraseña. Intentelo nuevamente.`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id, password) => {
  return async function () {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEFAULT_URL}/user/${id}/${password}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
