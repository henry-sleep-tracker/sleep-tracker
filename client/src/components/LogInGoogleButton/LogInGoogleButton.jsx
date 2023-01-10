import GoogleLogin from 'react-google-login';
import { useAuthContext} from "../../actions/authContext";
import {useDispatch} from "react-redux";
import { logInUserWithGoogle} from "../../actions/index";

export default function LogInGoogleButton() {
    const clientId="335316690432-trah7lbld3ptrek9o23jo6n0t7g30foe.apps.googleusercontent.com"
    const {login} = useAuthContext();
    const dispatch=useDispatch();
    const onSuccess = (response) => {
      dispatch( logInUserWithGoogle(response));
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
        isSignedIn={false}
        />
    );
  }
  