import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../actions/authContext";
import ResponsiveAppBar from "../Home/Nav";
import { useState } from "react";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { amber, deepOrange, grey, indigo } from "@mui/material/colors";

export default function PrivateRoute() {
  const [mode, setMode] = useState("light");

  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    //si esta autenticado que vaya a la seccion privada
    return <Navigate to="/" />; //aca se quita el return
  }

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       light: '#757ce8',
  //       main: '#3f50b5',
  //       dark: '#002884',
  //       contrastText: '#fff',
  //     },
  //     secondary: {
  //       light: '#ff7961',
  //       main: '#f44336',
  //       dark: '#ba000d',
  //       contrastText: '#000',
  //     },
  //     lightFont:
  //     {
  //       main: "#e3f2fd",
  //       light: "#e3f2fd",
  //     },
  //     mode: mode
  //   },
  // });

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "dark" && {
        primary: {
          main: "#283593",
        },
        secondary: {
          main: "#f50057",
        },
      }),
      ...(mode === "light" && {
        primary: {
          main: "#303f9f",
        },
        secondary: {
          main: "#f50057",
        },
      }),

      //   primary: {
      //     ...amber,
      //     ...(mode === 'dark' && {
      //       main: amber[300],
      //     }),
      //   },
      //   ...(mode === 'dark' && {
      //     background: {
      //       default: deepOrange[900],
      //       paper: indigo[100],
      //     },
      //     main: amber[300],
      //   }),
      //   text: {
      //     ...(mode === 'light'
      //       ? {
      //         primary: grey[900],
      //         secondary: grey[800],
      //       }
      //       : {
      //         primary: '#fff',
      //         secondary: grey[500],
      //       }),
      //   },
    },
  });

  const darkModeTheme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <ResponsiveAppBar mode={mode} setMode={setMode} />
      <Outlet /> {/*todo lo que esta anidado dentro de publico */}
    </ThemeProvider>
  );
}
