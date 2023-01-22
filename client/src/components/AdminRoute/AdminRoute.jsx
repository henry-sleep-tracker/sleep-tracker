import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import ResponsiveAppBar from "../Home/Nav";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export default function AdminRoute() {
  const [mode, setMode] = useState("light");

  const { isAdmin } = useAuthContext();
  if (isAdmin !== true) {
    //si esta autenticado que vaya a la seccion privada
    return <Navigate to="/private/home" />; //aca se quita el return
  }

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      lightFont: {
        main: "#e3f2fd",
        light: "#e3f2fd",
      },
      mode: mode,
    },
  });

  return <Outlet />;
}
