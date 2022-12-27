import { createContext, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";
const MY_AUTH_APP = "MY_AUTH_APP_1";

export const AuthContext = createContext(); //es un objeto que adentro tiene un provider

export function AuthContextProvider({ children }) {
  //children son todos los que van a poder consumir el contexto
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(MY_AUTH_APP) ?? false
  ); //el localstorage permite guardar valores para que asi se cierre la pestaña guarde valores, entonces cada vez que abra la app se sabra si esta conectado o no
  const login = useCallback(function () {
    //esto lo usa el componente log in cuando se valide la contraseña y el email
    window.localStorage.setItem(MY_AUTH_APP, true); //cuando se invoque establecera en el localstorage que establece el valor true para la clave my_auth_app
    setIsAuthenticated(true); //actualiza el estado
  }, []);
  const logout = useCallback(function () {
    //esto lo usa el componente log in cuando se valide la contraseña y el email
    window.localStorage.removeItem(MY_AUTH_APP); //cuando se invoque establecera en el localstorage que establece el valor true para la clave my_auth_app
    setIsAuthenticated(false); //actualiza el estado
  }, []);
  const value = useMemo(
    () => ({
      //este use memo es para que no se cree cada vez que se renderice. sino que guarde esto, uy solo va  acambiar si una de las dependencias cambia
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
export function useAuthContext() {
  return useContext(AuthContext);
}
