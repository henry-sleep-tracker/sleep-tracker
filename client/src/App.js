import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import LogIn from "./components/LogIn/LogIn";
import LogOut from "./components/LogOut/LogOut.jsx";
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
import Pricing from "./components/PlanesPago/PlanesPago.jsx";
import ConoceAlEquipo from "./components/Home/ConoceAlEquipo";
//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
axios.defaults.baseURL = "http://localhost:3001/";
//The following link must be un-comented on gitHub if you wanna work with on-line servers
// axios.defaults.baseURL = 'https://sleep-tracker-production.up.railway.app'

function App() {
  return (
    // <Routes>
    // <Route exact path="/" element={<LandingPage />} />
    // <Route exact path="/fitBit" element={<Fitbit />} />
    // <Route exact path="/inicio" element={<Home />} />
    // <Route path="/dashboard/*" element={<Dashboard />} />
    // <Route exact path="/login" element={<LogIn />} />
    // <Route exact path="/registro" element={<Register />} />
    // <Route exact path="/newrecord" element={<Record />} />
    // <Route exact path="*" element={<NotFound />} />
    // <Route exact path="/graficas" element={<GraphWM />} />
    // </Routes>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<LandingPage />} />{" "}
          {/* rutas publicas- lo de indez quiere decir / */}
          <Route path="/graficas" element={<GraphWM />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/registro" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/team" element={<ConoceAlEquipo />} />
          {/*deberia ser privada, pero solo es para probar*/}
        </Route>
        <Route path="/private" element={<PrivateRoute />}>
          {/* rutas privadas */}
          <Route index element={<Home />} />

          <Route path="/private/fitbit" element={<Fitbit />} />
          <Route path="/private/planes" element={<Pricing />} />
          <Route path="/private/newrecord" element={<Record />} />
          <Route path="/private/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
