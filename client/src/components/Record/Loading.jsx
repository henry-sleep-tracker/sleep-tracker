import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ====================== STYLE IMPORTS ======================= */

import "./Loading.css";

//>======================>//
//> Starts Component
//>======================>//

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/private/records");

    setTimeout(() => {
      delay();
    }, 500);

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

export default Loading;
