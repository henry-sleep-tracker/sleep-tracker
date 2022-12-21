import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
import Graph from "./components/Graphs/TestGraph.js";
import "./App.css";
<<<<<<< HEAD
import LandingPage from "./components/LandingPage/LandingPage.jsx"
=======
import GraphWM from "./components/Graph-W-M";
>>>>>>> 63e3f02aed0e2a3b0870fac1f9728b40f8b6523e

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/fitBit" element={<Fitbit />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/inicio" element={<Home />} />
    </Routes>
  );
}

export default App;
