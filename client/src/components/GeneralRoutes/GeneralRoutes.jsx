import { Navigate, Outlet } from "react-router-dom"
import {useAuthContext} from "../../actions/authContext"
export default function GeneralRoute(){
    let yourDate = new Date().toISOString().split('T')[0]
    const {isGoogleUser,isPasswordSetUp,planExpDate}= useAuthContext();

// ACA TIENE QUE REVISAR SI EL CAMPO DEL PLAN DEL USUARIO ES MAYOR O IGUAL A HOY Y SI SI PUES ACTUALIZAR EL ESTADO DEL CONTEXTO




    if (isGoogleUser&&!isPasswordSetUp||planExpDate<yourDate) { //si esta autenticado que vaya a la seccion privada
    
        if(isGoogleUser&&!isPasswordSetUp){
            return <Navigate to="/private/profile"/>
        }
        if(planExpDate<yourDate){
            return <Navigate to="/private/planes"/>
        }
    }
    return(
        <div>
            <Outlet /> {/*todo lo que esta anidado dentro de publico */}
        </div>
    )
}