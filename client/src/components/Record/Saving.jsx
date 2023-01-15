import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ====================== STYLE IMPORTS ======================= */

import "./Saving";

//>======================>//
//> Starts Component
//>======================>//

const Saving = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = () => navigate("/private/records");

    setTimeout(() => {
      delay();
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Guardando...</div>
      </div>
    </div>
  );
};

export default Saving;
