import {Navigate, Outlet} from "react-router-dom"
import {useAuthContext} from "../../actions/authContext"

export default function PublicRoute(){
    let yourDate = new Date().toISOString().split('T')[0]
    const {isAuthenticated,planExpDate,isGoogleUser,isPasswordSetUp}= useAuthContext();
    if(isAuthenticated&&isGoogleUser&&!isPasswordSetUp){
        return <Navigate to="/private/profile"/>
    }else if (isAuthenticated&&(planExpDate<yourDate)) {
        return <Navigate to="/private/planes"/>
    }else if(isAuthenticated&&(planExpDate>=yourDate)){
        return <Navigate to="/private/home"/>
    }else{
        return(
            <div>
                 <Outlet/> {/*todo lo que esta anidado dentro de publico */}
            </div>
        )
    }
    
}