import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

/* ====================== STYLE IMPORTS ======================= */

import "./Loading.css";

//>======================>//
//> Starts Component
//>======================>//

const ChangePasswordError = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/login");
    
    setTimeout(() => {
      delay();
    }, 2000);

    return () =>
      message.error(
        "Hubo un error al actualizar la contraseña. Intentelo nuevamente.",
        3000
      );
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Actualizando Password...</div>
      </div>
    </div>
  );
};

export default ChangePasswordError;
