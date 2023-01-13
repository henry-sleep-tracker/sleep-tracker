import { useEffect } from "react";
import { useAuthContext } from "../../actions/authContext";

function LogOut() {
  const { logout } = useAuthContext();
  useEffect(() => logout());
  return null;
}
export default LogOut;
