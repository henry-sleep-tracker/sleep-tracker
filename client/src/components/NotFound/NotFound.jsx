import React from "react";
import "./NotFound.css";
import NavigationBar from "../LandingPage/NavegationBar";
import image404 from "../../images/404.png";

export default function NotFound() {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <img className="image-blur-404" src={image404} alt="not found" />
      <div className="div-no-blur-404">
        <img className="img-404-no-blur" src={image404} alt="" />
      </div>
    </div>
  );
}
