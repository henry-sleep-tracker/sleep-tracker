
export const updateUser = (id, info) => { 
    return async function(){
        try {
            const response = await fetch(`http://localhost:3001/updateprofile/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            if (response.status === 200) {
                alert(`Los datos del perfil se cambiaron correctamente`);
              } else {
                alert(
                  `Hubo un error al cambiar los datos del perfil. Intentelo nuevamente.`
                );
                }
            // const resp = await response.json();
            // console.log("UPDATE PROFILE RESPONSE", resp);
            // return dispatch({type: "UPDATE_PROFILE"})
        } 
        catch (error) {
            console.log(error);
        }
    }
};

export const changePassword = (id, newPassword) => { 
    return async function(){
        try {
            const response = await fetch(`http://localhost:3001/changepassword/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPassword),
            });
            if (response.status === 200) {
                alert(`La contraseña se cambio correctamente`);
              } else {
                alert(
                  `Hubo un error al cambiar la contraseña. Intentelo nuevamente.`
                );
                }

            // const resp = await response.json();
            // console.log("UPDATE PASSWORD RESPONSE", resp);
            // return dispatch({type: "UPDATE_PROFILE"})
        } 
        catch (error) {
            console.log(error);
        }
    }
};

export const deleteUser = (id, password) => { 
    return async function(){
        try {
            const response = await fetch(`http://localhost:3001/deleteuser/${id}/${password}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
            });
            if(response.status === 200){
                alert(`${response}`)
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
};


