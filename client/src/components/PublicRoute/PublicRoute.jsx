import {Navigate, Outlet} from "react-router-dom"
import {useAuthContext} from "../../actions/authContext"

export default function PublicRoute(){
    let yourDate = new Date()
yourDate=yourDate.toISOString().split('T')[0]
    const {isAuthenticated,planExpDate}= useAuthContext();//consume el contexto para saber si esta autenticado
    if (isAuthenticated&&(planExpDate<yourDate)) { //si esta autenticado que vaya a la seccion privada
        return <Navigate to="/private/planes"/>
    }else if(isAuthenticated&&(planExpDate>=yourDate)){
        return <Navigate to="/private"/>
    }else{
        return(
            <div>
                 <Outlet/> {/*todo lo que esta anidado dentro de publico */}
            </div>
        )
    }
    
}