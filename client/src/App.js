import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Fitbit from "./components/SignUp/Fitbit";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.js";
import Record from "./components/Record/Record.jsx";
import GraphWM from "./components/Graph-Week/Graph-W-M.jsx";
import axios from "axios";

import PublicRoute from "./components/PublicRoute/PublicRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthContextProvider } from "./actions/authContext";
//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
axios.defaults.baseURL = "http://localhost:3001/";
//The following link must be un-comented on gitHub if you wanna work with on-line servers
// axios.defaults.baseURL = 'https://sleep-tracker-production.up.railway.app'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/fitBit" element={<Fitbit />} />
      <Route exact path="/inicio" element={<Home />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route exact path="/login" element={<LogIn />} />
      <Route exact path="/registro" element={<Register />} />
      <Route exact path="/newrecord" element={<Record />} />
      <Route exact path="*" element={<NotFound />} />
      <Route exact path="/graficas" element={<GraphWM />} />
    </Routes>
    // <AuthContextProvider>
    //   <Routes>
    //     <Route path="/" element={<PublicRoute />}>
    //       <Route index element={<LandingPage />} />{" "}
    //       {/* rutas publicas- lo de indez quiere decir / */}
    //       <Route path="/login" element={<LogIn />} />
    //       <Route path="/registro" element={<Register />} />
    //     </Route>
    //     <Route path="/private" element={<PrivateRoute />}>
    //       {/* rutas privadas */}
    //       <Route path="/private/fitBit" element={<Fitbit />} />
    //       <Route path="/private/graph" element={<Graph />} />
    //       <Route path="/private/inicio" element={<Home />} />
    //     </Route>
    //     <Route path="*" element={<NotFound />} />
    //   </Routes>
    // </AuthContextProvider>
  );
}

export default App;
