import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersPlanExpDate } from "../../actions/plan";
import { getUserById } from "../../actions/index";

export default function GeneralRoute() {
  let yourDate = new Date().toISOString().split("T")[0];
  const { isGoogleUser, isPasswordSetUp, planExpDate, payPlan } =
    useAuthContext();

  // ACA TIENE QUE REVISAR SI EL CAMPO DEL PLAN DEL USUARIO ES MAYOR O IGUAL A HOY Y SI SI PUES ACTUALIZAR EL ESTADO DEL CONTEXTO
  const currentUser = useSelector((state) => state?.users.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("GENERAL ROUTES");
    if (currentUser?.plan === null) {
      dispatch(getUsersPlanExpDate(currentUser.id));
      dispatch(getUserById(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (planExpirationDate > yourDate) {
    payPlan(planExpirationDate);
  }
  if (currentUser.plan !== null) {
    if ((isGoogleUser && !isPasswordSetUp) || planExpDate < yourDate) {
      //si esta autenticado que vaya a la seccion privada

      if (isGoogleUser && !isPasswordSetUp) {
        return <Navigate to="/private/profile" />;
      }

      if (planExpDate < yourDate) {
        return <Navigate to="/private/planes" />;
      }
    }
    return (
      <div>
        <Outlet /> {/*todo lo que esta anidado dentro de publico */}
      </div>
    );
  }
}
