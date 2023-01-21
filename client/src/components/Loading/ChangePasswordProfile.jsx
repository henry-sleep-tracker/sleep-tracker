import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

/* ====================== STYLE IMPORTS ======================= */

import "./Loading.css";

//>======================>//
//> Starts Component
//>======================>//

export const ChangePasswordOkProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/private/profile");

    setTimeout(() => {
      delay();
    }, 2000);

    return () => {
      message.success("La contraseña se actualizo correctamente", 3000);
      message.success("La contraseña se actualizo correctamente", 3000);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Actualizando Contraseña...</div>
      </div>
    </div>
  );
};

export const ChangePasswordErrorProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/private/profile");

    setTimeout(() => {
      delay();
    }, 2000);

    return () => {
      message.error(
        "Hubo un error al actualizar la contraseña. Intentelo nuevamente.",
        3000
      );
      message.error(
        "Hubo un error al actualizar la contraseña. Intentelo nuevamente.",
        3000
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Actualizando Contraseña...</div>
      </div>
    </div>
  );
};
