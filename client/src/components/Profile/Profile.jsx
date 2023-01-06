import React, { useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Profile.module.css";
import { useNavigate } from 'react-router-dom';
import { updateUser } from "../../actions/profileActions";

const Profile = () => {
    
    const currentUser = useSelector((state) => state.users.currentUser);
    console.log("SOY CURRENTUSER PROFILE", currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [editNames, setEditNames] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editiBirthday, setEditBirthday] = useState(false);
    const [editNationality, setEditNationality] = useState(false);
    const [inputs, setInputs] = useState({
      names: "",
      lastNames: "",
      email: "",
      birthday: "",
      nationality: "",
    })

    const handleInputs = (e) => {
      setInputs({
          ...inputs,
          [e.target.name]: e.target.value
      })
    }
   
    const handleClick = (e) => {
      e.preventDefault();
      if(!editNames){
          setEditNames(true);
        }
      else{
        setEditNames(false);
      }
    }
    const handleClickEmail = (e) => {
      e.preventDefault();
      if(!editEmail){
          setEditEmail(true);
        }
      else{
        setEditEmail(false);
      }
    }
    const handleClickBirthday = (e) => {
      e.preventDefault();
      if(!editiBirthday){
          setEditBirthday(true);
        }
      else{
        setEditBirthday(false);
      }
    }
    const handleClickNationality = (e) => {
      e.preventDefault();
      if(!editNationality){
          setEditNationality(true);
        }
      else{
        setEditNationality(false);
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      try {
        dispatch(updateUser(currentUser.id, inputs ))
        setInputs({
          names: "",
          lastNames: "",
          email: "",
          birthday: "",
          nationality: "",
        })
        alert("Your profile was updated");
        navigate("/login");
      } catch (error) {
        console.log("el error es:", error);
      }
  }

    return (
       
          <div className= {style.container}>
              <Link to = "/home">
                <button className= {style.buttonBack}>Back Home</button>
              </Link>

              <div className= {style.containerImg}>
                <img  src = "https://upload.wikimedia.org/wikipedia/en/4/4c/Team_8_logo.png" alt="Imagen aqui" className= {style.img}/>
              </div>

                  <form className= {style.containers} onSubmit= {(e) => handleSubmit(e)}>
                    <div className= {style.containers2}>
                      {!editNames ? <h3 className= {style.font}>{`${currentUser.names } ${currentUser.lastNames}`}</h3> 
                      : <input type = "text" placeholder="Enter names" value= {inputs.names} onChange = {handleInputs}/>}
                      <button className= {style.buttons} onClick = {(e) => handleClick(e)}>Edit</button>
                    </div>

                    <div  className= {style.containers2}>
                      {!editEmail ? <p className= {style.font}>{`Email: ${currentUser.email}`}</p> 
                      : <input type = "text" placeholder="Enter new email" value= {inputs.email} onChange = {handleInputs}/>}
                      <button className= {style.buttons} onClick = {(e) => handleClickEmail(e)}>Edit</button>
                    </div>

                    <div className= {style.containers2}>
                      {!editiBirthday ? <p className= {style.font}>{`Birthday: ${currentUser.birthday}`}</p> 
                      : <input type = "text" placeholder="Enter new Birthday" value= {inputs.birthday} onChange = {handleInputs}/>}
                      <button className= {style.buttons} onClick = {(e) => handleClickBirthday(e)}>Edit</button>
                    </div>

                    <div className= {style.containers2}>
                      {!editNationality ? <p className= {style.font}>{`Nationality: ${currentUser.nationality}`}</p> 
                      : <input type = "text" placeholder="Enter new nationality" value= {inputs.nationality} onChange = {handleInputs}/>}
                      <button className= {style.buttons} onClick = {(e) => handleClickNationality(e)}>Edit</button>
                    </div>

                    <div className= {style.containers2}>
                      <Link to = {`/private/change-password/${currentUser.id}`}>
                        <button id= {style.buttonPassword}>Change Password</button>
                      </Link>
                    </div>

                    <div className= {style.containers2}>
                      <Link to ={`/private/delete-user/${currentUser.id}`}>
                        <button id= {style.buttonDelete}>Delete User</button>
                      </Link>
                    </div>

                  </form>
          </div>
    );
  };
  
  export default Profile;
