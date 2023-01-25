import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import { useAuthContext } from "../../actions/authContext";

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

export const DeleteUserProfile = () => {
  const { logout } = useAuthContext();

  useEffect(() => {
    const delay = () => logout();

    setTimeout(() => {
      delay();
    }, 2000);

    return () => {
      message.success("El usuario ha sido eliminado.", 3000);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text"> Eliminando usuario...</div>
      </div>
    </div>
  );
};

export const DeleteUserProfileError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/private/profile");

    setTimeout(() => {
      delay();
    }, 2000);

    return () => {
      message.error(
        "Hubo un error al eliminar el usuario. Intentelo nuevamente.",
        3000
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text"> Eliminando usuario...</div>
      </div>
    </div>
  );
};
