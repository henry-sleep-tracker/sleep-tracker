//Esta action utiliza el currentUser para mandar a traer la info del Usuario loggeado 
export const getUser = (id) => { 
    return async function(dispatch){
        try {
            const response = await fetch(`http://localhost:3001/myuser/${id}`);
            const user = await response.json();
            console.log("ACTIONS USER", user);
            return dispatch({type: "GET_USER", payload: user })
        } 
        catch (error) {
            console.log(error);
        }
    }
};

export const clearUser = () => {
    return {
        type: "CLEAR_USER"
    }
}