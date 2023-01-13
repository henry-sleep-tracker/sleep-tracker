/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
import "./App.css";
import GraphWM from "./components/Graph-W-M";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fitbit />} />
        <Route path="/inicio" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
