import {Navigate, Outlet} from "react-router-dom"
import {useAuthContext} from "../../actions/authContext"

export default function PublicRoute(){
    const {isAuthenticated}= useAuthContext();//consume el contexto para saber si esta autenticado
    if (!isAuthenticated) { //si esta autenticado que vaya a la seccion privada
        return <Navigate to="/login"/>
    }
    return(
        <div>
             <Outlet/> {/*todo lo que esta anidado dentro de publico */}
        </div>
    )
}