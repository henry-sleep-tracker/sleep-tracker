import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import { useSelector } from "react-redux";

export default function PlansRoute() {
  const currentUser = useSelector((state) => state?.users.currentUser);
  const { isPasswordSetUp} = useAuthContext();
  if (isPasswordSetUp==="false" ||currentUser.nationality === null ||currentUser.birthday === null ) {
    return <Navigate to="/private/profile" />;
  }else {
    return (
      <div>
        <Outlet /> 
      </div>
    );
  }
}