import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions Imports
import { getRecordByIdDate } from "../../actions/records";
import { setTime } from "../../actions/loading";

/* ====================== STYLE IMPORTS ======================= */

import "./Saving";

//>======================>//
//> Starts Component
//>======================>//

const Saving = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const day = useSelector(state => state.loading.day);
  const userId = useSelector(state => state.users.currentUser.id);

  useEffect(() => {
    dispatch(setTime(null));

    const delay = () => navigate("/private/records");

    setTimeout(() => {
      delay();
    }, 500);

    return () => {
      dispatch(getRecordByIdDate(userId, day));
    }

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
