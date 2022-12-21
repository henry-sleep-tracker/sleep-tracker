/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
import Graph from "./components/Graphs/TestGraph.js";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Fitbit />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/inicio" element={<Home />} />
    </Routes>
  );
}

export default App;
