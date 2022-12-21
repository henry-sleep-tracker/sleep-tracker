/* eslint-disable no-unused-vars */
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Landing, Login, Signup, Home} from "./components";
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Fitbit from "./components/SignUp/Fitbit.js";
>>>>>>> 20f8fd4e71b46c467eeb73ded8410c9f651054c5
import "./App.css";
import GraphWM from "./components/Graph-W-M";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* <Route
          path="/"
          element={user?.email ? <Navigate to="/home" /> : <Landing />}
        />
        <Route
          path="/signup"
          element={user?.email ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user?.email ? <Navigate to="/home" /> : <Login />}
        /> */}
        <Route
          path="/inicio"
          element= <Home/>
        />
        <Route path="/graficas"
        element= <GraphWM/> />
=======
        <Route path="/" element={<Fitbit />} />
        <Route path="/inicio" element={<Home />} />
>>>>>>> 20f8fd4e71b46c467eeb73ded8410c9f651054c5
      </Routes>
    </BrowserRouter>
  );
}

export default App;
