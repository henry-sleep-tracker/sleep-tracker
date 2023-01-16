import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./actions/authContext";
import axios from "axios";
import GeneralRoutes from "./components/GeneralRoutes/GeneralRoutes";
import ChangePassword from "./components/Profile/ChangePassword.jsx";
import CommentCreate from "./components/Comments/Comment";
import ConoceAlEquipo from "./components/Home/ConoceAlEquipo";
import Dashboard from "./components/dashboard/Dashboard.js";
import DeleteUser from "./components/Profile/DeleteProfile.jsx";
import Fitbit from "./components/SignUp/Fitbit";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import GraphWM from "./components/Graph-Week/Graph-W-M.jsx";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import LogIn from "./components/LogIn/LogIn";
import LogOut from "./components/LogOut/LogOut.jsx";
import NotFound from "./components/NotFound/NotFound";
import Pricing from "./components/PlanesPago/PlanesPago.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Record from "./components/Record/Record.jsx";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import NewUserSuccess from "./components/Loading/NewUserSuccess";
import UserExist from "./components/Loading/UserExist";
import ChangePasswordOk from "./components/Loading/ChangePasswordOk";
import ChangePasswordError from "./components/Loading/ChangePasswordError";
import Saving from "./components/Record/Saving";
import Loading from "./components/Record/Loading";
import LoadingPayment from "./components/PlanesPago/LoadingPayment";

import "./App.css";
//The following link must be un-comented on gitHub if you wanna work with your "npm start" running
// axios.defaults.baseURL = "http://localhost:3001";
//The following link must be un-comented on gitHub if you wanna work with on-line servers
// axios.defaults.baseURL = 'https://sleep-tracker-production.up.railway.app'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<LandingPage />} />{" "}
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/contrasena_olvidada" element={<ForgotPassword />} />
          <Route
            path="/reiniciar_contrasena/:id/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/8f26c6520d61588a9757bc182157c4497628e871"
            element={<NewUserSuccess />}
          />
          <Route
            path="/4b19bb28098dae39a259f67d30a0a8b932a6b925"
            element={<UserExist />}
          />
          <Route
            path="/50ff4e65285ea9c7145fa1ca00766e9c38a44748"
            element={<ChangePasswordOk />}
          />
          <Route
            path="/12bc2f45940ab508152184813fa70aec73d0da87"
            element={<ChangePasswordError />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/private" element={<PrivateRoute />}>
          <Route path="/private" element={<GeneralRoutes />}>
            <Route index path="/private/home" element={<Home />} />
            <Route path="/private/team" element={<ConoceAlEquipo />} />
            <Route path="/private/fitbit" element={<Fitbit />} />
            <Route path="/private/graficas" element={<GraphWM />} />
            <Route path="/private/records" element={<Record />} />
            <Route path="/private/loading" element={<Loading />} />
            <Route path="/private/saving" element={<Saving />} />
            <Route path="/private/dashboard/*" element={<Dashboard />} />
            <Route path="/private/createcomment" element={<CommentCreate />} />
          </Route>
          <Route path="/private/profile" element={<Profile />} />
          <Route
            path="/private/change-password/:id"
            element={<ChangePassword />}
          />
          <Route path="/private/planes" element={<Pricing />} />
          <Route path="/private/loadingpayment" element={<LoadingPayment />} />
          <Route path="/private/delete-user/:id" element={<DeleteUser />} />
          <Route path="/private/createcomment" element={<CommentCreate />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
