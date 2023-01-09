import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home/Home.jsx";
import LogIn from "./components/LogIn/LogIn";
import LogOut from "./components/LogOut/LogOut.jsx";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Fitbit from "./components/SignUp/Fitbit";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.js";
import Record from "./components/Record/Record.jsx";
import GraphWM from "./components/Graph-Week/Graph-W-M.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthContextProvider } from "./actions/authContext";
import Pricing from "./components/PlanesPago/PlanesPago.jsx";
import ConoceAlEquipo from "./components/Home/ConoceAlEquipo";
import Profile from "./components/Profile/Profile.jsx";
import ChangePassword from "./components/Profile/ChangePassword.jsx";
import DeleteUser from "./components/Profile/DeleteProfile.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import CommentCreate from "./components/Comments/Comment";
import "./App.css";
//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
axios.defaults.baseURL = "http://localhost:3001/";
//The following link must be un-comented on gitHub if you wanna work with on-line servers
// axios.defaults.baseURL = 'https://sleep-tracker-production.up.railway.app'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<LandingPage />} />{" "}
          {/* rutas publicas- lo de indez quiere decir / */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/contrasena_olvidada" element={<ForgotPassword />} />
          <Route
            path="/reiniciar_contrasena/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="*" element={<NotFound />} />
          {/*deberia ser privada, pero solo es para probar*/}
        </Route>
        <Route path="/private" element={<PrivateRoute />}>
          {/* rutas privadas */}
          <Route index element={<Home />} />

          <Route path="/private/team" element={<ConoceAlEquipo />} />
          <Route path="/private/fitbit" element={<Fitbit />} />
          <Route path="/private/graficas" element={<GraphWM />} />
          <Route path="/private/planes" element={<Pricing />} />
          <Route path="/private/newrecord" element={<Record />} />
          <Route path="/private/dashboard/*" element={<Dashboard />} />
          <Route path="/private/profile" element={<Profile />} />
          <Route
            path="/private/change-password/:id"
            element={<ChangePassword />}
          />
          <Route path="/private/delete-user/:id" element={<DeleteUser />} />
          <Route path="/private/createcomment" element={<CommentCreate />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
