import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

/* ====================== STYLE IMPORTS ======================= */

import "./Loading.css";

//>======================>//
//> Starts Component
//>======================>//

const NewUserSuccess = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/login");
    
    setTimeout(() => {
      delay();
    }, 2000);

    return () => message.success("Usuario registrado correctamente", 3000);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Registrando Usuario...</div>
      </div>
    </div>
  );
};

export default NewUserSuccess;
