//sacado de https://www.youtube.com/watch?v=ZXiJdEWVcqY&ab_channel=LatteAndCode
import { createContext, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";
const MY_AUTH_APP = "MY_AUTH_APP_1";
const USER_ID = "USER_ID";
const PLAN_EXPIRATION_DATE = "PLAN_EXPIRATION_DATE";
const IS_GOOGLE_USER = "IS_GOOGLE_USER";
const IS_PASSWORD_SET_UP = "IS_PASSWORD_SET_UP";

export const AuthContext = createContext(); //es un objeto que adentro tiene un provider

export function AuthContextProvider({ children }) {
  //children son todos los que van a poder consumir el contexto
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(MY_AUTH_APP) ?? false
  ); //el localstorage permite guardar valores para que asi se cierre la pestaña guarde valores, entonces cada vez que abra la app se sabra si esta conectado o no
  const [userId, setUserId] = useState(
    window.localStorage.getItem(USER_ID) ?? null
  );
  const [planExpDate, setPlanExpDate] = useState(
    window.localStorage.getItem(PLAN_EXPIRATION_DATE) ?? "1900-01-01"
  );
  const [isGoogleUser, setIsGoogleUser] = useState(
    window.localStorage.getItem(IS_GOOGLE_USER) ?? false
  );
  const [isPasswordSetUp, setIsPasswordSetUp] = useState(
    window.localStorage.getItem(IS_PASSWORD_SET_UP) ?? false
  );
  const payPlan = useCallback(function (expDate) {
    //esto lo usa el componente log in cuando se valide la contraseña y el email
    window.localStorage.setItem(PLAN_EXPIRATION_DATE, expDate);
    setPlanExpDate(expDate);
  }, []);

  const createPassword = useCallback(function (expDate) {
    //esto lo usa el componente log in cuando se valide la contraseña y el email

    window.localStorage.setItem(IS_PASSWORD_SET_UP, true);
    setIsPasswordSetUp(true);
  }, []);

  const login = useCallback(function (id, email, password, planExpirationDate) {
    //esto lo usa el componente log in cuando se valide la contraseña y el email
    window.localStorage.setItem(MY_AUTH_APP, true); //cuando se invoque establecera en el localstorage que establece el valor true para la clave my_auth_app
    setIsAuthenticated(true); //actualiza el estado

    window.localStorage.setItem(USER_ID, id);
    setUserId(id);

    window.localStorage.setItem(PLAN_EXPIRATION_DATE, planExpirationDate);
    setPlanExpDate(planExpirationDate);

    if (email.slice(-10) === "@gmail.com") {
      window.localStorage.setItem(IS_GOOGLE_USER, true);
      setIsGoogleUser(true);
    }
    if (password !== null) {
      window.localStorage.setItem(IS_PASSWORD_SET_UP, true);
      setIsPasswordSetUp(true);
    } else {
      window.localStorage.setItem(IS_PASSWORD_SET_UP, false);
      setIsPasswordSetUp(false);
    }
  }, []);
  const logout = useCallback(function () {
    //esto lo usa el componente log in cuando se valide la contraseña y el email
    window.localStorage.removeItem(MY_AUTH_APP); //cuando se invoque establecera en el localstorage que establece el valor true para la clave my_auth_app
    window.localStorage.removeItem(USER_ID);
    window.localStorage.removeItem(PLAN_EXPIRATION_DATE);
    window.localStorage.removeItem(IS_PASSWORD_SET_UP);
    window.localStorage.removeItem(IS_GOOGLE_USER);
    setIsAuthenticated(false); //actualiza el estado
    setUserId(null);
    setIsGoogleUser(false);
    setIsPasswordSetUp(false);
    setPlanExpDate("1900-01-01");
  }, []);
  const value = useMemo(
    () => ({
      //este use memo es para que no se cree cada vez que se renderice. sino que guarde esto, uy solo va  acambiar si una de las dependencias cambia
      login,
      logout,
      payPlan,
      createPassword,
      isAuthenticated,
      userId,
      planExpDate,
      isGoogleUser,
      isPasswordSetUp,
    }),
    [
      login,
      logout,
      payPlan,
      createPassword,
      isAuthenticated,
      userId,
      planExpDate,
      isGoogleUser,
      isPasswordSetUp,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
export function useAuthContext() {
  return useContext(AuthContext);
}
