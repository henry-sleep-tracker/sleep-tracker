import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../actions/authContext"
import ResponsiveAppBar from "../Home/Nav";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export default function PrivateRoute() {
    const [mode, setMode] = useState("light");

    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) { //si esta autenticado que vaya a la seccion privada
        return <Navigate to="/" /> //aca se quita el return
    }

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <ResponsiveAppBar
                mode={mode}
                setMode={setMode}
            />
            <Outlet /> {/*todo lo que esta anidado dentro de publico */}
        </ThemeProvider>
    )
}