import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import { useSelector } from "react-redux";

export default function GeneralRoute() {
  let yourDate = new Date().toISOString().split("T")[0];
  const { isGoogleUser, isPasswordSetUp} = useAuthContext();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );
  if (currentUser.plan && currentUser.plan !== null) {
    if ((isGoogleUser==="true" && isPasswordSetUp==="false") || planExpirationDate < yourDate) {
      //si esta autenticado que vaya a la seccion privada

      if (isGoogleUser==="true" && isPasswordSetUp==="false") {
        return <Navigate to="/private/profile" />;
      }

      if (planExpirationDate < yourDate) {
        return <Navigate to="/private/planes" />;
      }
    }
    return (
      <div>
        <Outlet /> {/*todo lo que esta anidado dentro de publico */}
      </div>
    );
  }else {
  return <Navigate to="/private/planes" />;
  }
}