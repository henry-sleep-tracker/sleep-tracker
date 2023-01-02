import GoogleLogin from 'react-google-login';
import { useAuthContext} from "../../actions/authContext";
import {useDispatch, useSelector} from "react-redux";
import { logInUserWithGoogle} from "../../actions/index";

export default function LogInGoogleButton() {
    const clientId="335316690432-trah7lbld3ptrek9o23jo6n0t7g30foe.apps.googleusercontent.com"
    const loggedUser =  useSelector((state)=>state?.users.currentUser)
    const {login} = useAuthContext();
    const dispatch=useDispatch();
    const onSuccess = (response) => {
      console.log("login success current user:",response);
      dispatch( logInUserWithGoogle(response));
      login();
    }
    const onFailure = (response) => {
      console.log("login failed res:",response);
    }

    return (
        <GoogleLogin
        clientId={clientId}
        buttonText="Iniciar Sesion"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    );
  }
  