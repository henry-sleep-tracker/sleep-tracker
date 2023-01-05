import React, { useState  } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Profile.module.css";

const Profile = () => {
    
    const currentUser = useSelector((state) => state.users.currentUser);
    console.log("SOY CURRENTUSER PROFILE", currentUser);

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

    return (
       
          <div className= {style.container}>
              <Link to = "/home">
                <button className= {style.buttonBack}>Back Home</button>
              </Link>

              <div className= {style.containerImg}>
                <img  src = "https://upload.wikimedia.org/wikipedia/en/4/4c/Team_8_logo.png" alt="Imagen aqui" className= {style.img}/>
              </div>

              <div className= {style.containers}>
                  
                  <div className= {style.containers2}>
                    {!editNames ? <h3 className= {style.font}>{`${currentUser.names } ${currentUser.lastNames}`}</h3> 
                    : <input placeholder="Enter names"/>}
                    <button className= {style.buttons} onClick = {(e) => handleClick(e)}>Edit</button>
                  </div>

                  <div  className= {style.containers2}>
                    {!editEmail ? <p className= {style.font}>{`Email: ${currentUser.email}`}</p> 
                    : <input placeholder="Enter new email"/>}
                    <button className= {style.buttons} onClick = {(e) => handleClickEmail(e)}>Edit</button>
                  </div>

                  <div className= {style.containers2}>
                    {!editiBirthday ? <p className= {style.font}>{`Birthday: ${currentUser.birthday}`}</p> 
                    : <input placeholder="Enter new Birthday"/>}
                    <button className= {style.buttons} onClick = {(e) => handleClickBirthday(e)}>Edit</button>
                  </div>

                  <div className= {style.containers2}>
                    {!editNationality ? <p className= {style.font}>{`Nationality: ${currentUser.nationality}`}</p> 
                    : <input placeholder="Enter new nationality"/>}
                    <button className= {style.buttons} onClick = {(e) => handleClickNationality(e)}>Edit</button>
                  </div>

                  <div className= {style.containers2}>
                    <Link to ="/private/deleteUser">
                      <button id= {style.buttonDelete}>Delete User</button>
                    </Link>
                  </div>

              </div>

          </div>
    );
  };
  
  export default Profile;
