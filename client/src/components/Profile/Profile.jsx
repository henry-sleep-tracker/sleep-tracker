import {React} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    
    const currentUser = useSelector((state) => state.users.currentUser);
    console.log("SOY CURRENTUSER PROFILE", currentUser);
   
    return (
       
          <div>
              <Link to = "/home">
                <button>Back Home</button>
              </Link>

              <div>
                <img  src = "" alt="Imagen aqui"/>
                <h3>{currentUser.names + " " + currentUser.lastNames}</h3>
              </div>

              <div>
                <p>{currentUser.email}</p>
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
