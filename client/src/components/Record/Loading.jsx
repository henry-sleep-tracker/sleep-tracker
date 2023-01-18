import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions Imports
import { getRecordByIdDate } from "../../actions/records";
import { setTime, setStartTime, setEndTime } from "../../actions/loading";
import { getSleepStage } from "../../actions/getUserHealthData";

// Import helpers
import { date_maker } from "../../helpers/date_maker";

/* ====================== STYLE IMPORTS ======================= */

import "./Loading.css";

//>======================>//
//> Starts Component
//>======================>//

const Loading = () => {
  // Hooks init
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** Redux States Section *********************/
  const day = useSelector(state => state.loading.day);
  const userId = useSelector(state => state.users.currentUser.id);

  useEffect(() => {
    if (day) {
      dispatch(getRecordByIdDate(userId, day));
      dispatch(getSleepStage(day));
    } else {
      dispatch(getRecordByIdDate(userId, date_maker()));
      dispatch(getSleepStage(date_maker()));
    }

    dispatch(setTime(""));
    dispatch(setStartTime(""));
    dispatch(setEndTime(""));

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
