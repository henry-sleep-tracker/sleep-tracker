import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
import Graph from "./components/Graphs/TestGraph.js";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import GraphWM from "./components/Graph-Week/Graph-W-M.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/fitBit" element={<Fitbit />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/graficas" element={ <GraphWM />} />
    </Routes>
  );
}

export default App;
