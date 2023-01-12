import { Navigate, Outlet } from "react-router-dom"
import {useAuthContext} from "../../actions/authContext"
import ResponsiveAppBar from "../Home/Nav";
export default function PrivateRoute(){
    const {isAuthenticated}= useAuthContext();
    if (!isAuthenticated) { //si esta autenticado que vaya a la seccion privada
        return <Navigate to="/"/> //aca se quita el return
    }
    
    return(
        <div>
            <ResponsiveAppBar />
            <Outlet /> {/*todo lo que esta anidado dentro de publico */}
        </div>
    )
}