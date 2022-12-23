import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Fitbit from "./components/SignUp/Fitbit";
import Graph from "./components/Graphs/TestGraph.js";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.js"
import axios from "axios";

//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
axios.defaults.baseURL = "http://localhost:3001/";
//The following link must be un-comented on gitHub if you wanna work with on-line servers
// axios.defaults.baseURL = 'https://sleep-tracker-production.up.railway.app'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/fitBit" element={<Fitbit />} />
      <Route exact path="/graph" element={<Graph />} />
      <Route exact path="/inicio" element={<Home />} />
      <Route path='/dashboard/*' element={<Dashboard />}/>
      <Route exact path="/login" element={<LogIn />} />
      <Route exact path="/registro" element={<Register />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
