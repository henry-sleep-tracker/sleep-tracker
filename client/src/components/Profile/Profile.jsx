import {React} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    
    const user = useSelector((state) => state.user.user);
    console.log("SOY USER", user);
   
    return (
       
          <div>
              <Link to = "/home">
                <button>Back Home</button>
              </Link>

              <div>
                <img  src = "" alt="Imagen aqui"/>
                <h3>{user.names + " " + user.lastNames}</h3>
              </div>

              <div>
                <p>{user.email}</p>
                <p>Aqui va el Birthday</p>
                <p>Aqui va la Nationality</p>
              </div>

              <div>
                <Link to ="/private/editprofile">
                    <button>Edit</button>
                </Link>

                <Link to ="/private/deleteuser">
                    <button>Delete</button>
                </Link>


              </div>

          </div>
    );
  };
  
  export default Profile;
