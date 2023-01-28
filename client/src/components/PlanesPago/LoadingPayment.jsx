import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersPlanExpDate } from "../../actions/plan";
import { getUserById } from "../../actions/index";
import "./Loading.css";

let count2 = 0;

export default function LoadingPayment() {
  let yourDate = new Date().toISOString().split("T")[0];
  const { isGoogleUser, isPasswordSetUp, planExpDate, payPlan } =
    useAuthContext();
  const currentUser = useSelector((state) => state?.users?.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users?.planExpirationDate
  );
  console.log("planExpirationDate", planExpirationDate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersPlanExpDate(currentUser.id));
    dispatch(getUserById(currentUser.id));
  }, [dispatch, currentUser]);

  if (planExpirationDate > yourDate && count2 <= 0) {
    payPlan(planExpirationDate);
    count2++;
  }

  console.log("currentUser", currentUser);
  console.log("planExpDate", planExpDate);

  if (currentUser.plan && currentUser.plan !== null && planExpDate > yourDate) {
    if (isGoogleUser === "true" && isPasswordSetUp === "false") {
      return <Navigate to="/private/profile" />;
    } else {
      return <Navigate to="/private/home" />;
    }
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Cargando...</div>
      </div>
    </div>
  );
}
