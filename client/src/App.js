import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
import Graph from "./components/Graphs/TestGraph.js";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.js"
import axios from 'axios';
//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
axios.defaults.baseURL = 'http://localhost:3001/'
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
    </Routes>
  );
}

export default App;
