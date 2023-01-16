import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import { useDispatch, useSelector } from "react-redux";

/* ====================== ACTIONS IMPORTS ======================= */

import {
  setStatusNewUser,
  setStatusNewUserError,
  setStatusExistingUser,
  setStatusUpdatePassOk,
  setStatusUpdatePassError,
} from "../../actions/loading";

/* ====================== STYLE IMPORTS ======================= */

import "./GlobalLoading.css";


//>======================>//
//> Starts Component
//>======================>//

const GlobalLoading = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** Redux States Section *********************/

  const newUser = useSelector(state => state.loading.newUser);
  const newUserError = useSelector(state => state.loading.newUserError);
  const existingUser = useSelector(state => state.loading.existingUser);
  const passUpdateOk = useSelector(state => state.loading.passUpdateOk);
  const passUpdateError = useSelector(state => state.loading.passUpdateError);
  

  useEffect(() => {
    const delay = () => {
      if (existingUser) {
        navigate("/registro");
      } else {
        navigate("/login");
      }
    };

    setTimeout(() => {
      delay();
    }, 2000);

    return () => {
      if (newUser) {
        dispatch(setStatusNewUser());
        message.success("Usuario registrado correctamente", 2500);
      }
      if (newUserError) {
        dispatch(setStatusNewUserError());
        message.error("Hubo un error al registrar usuario", 2500);
      }
      if (existingUser) {
        dispatch(setStatusExistingUser());
        message.warn("El usuario ya existe", 2500);
      }
      if (passUpdateOk) {
        dispatch(setStatusUpdatePassOk());
        message.success("La contraseña se actualizo correctamente", 2500);
      }

      if (passUpdateError) {
        dispatch(setStatusUpdatePassError());
        message.error(
          "Hubo un error al actualizar la contraseña. Intentelo nuevamente.",
          2500
        );
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Cargando...</div>
      </div>
    </div>
  );
};

export default GlobalLoading;
