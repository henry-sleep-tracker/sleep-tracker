import { AccountBalanceWalletSharp, AppRegistration, DarkMode, DevicesOther, Groups2, Home, Login, QuestionMark } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";

const SideBar = ({mode,setMode})=>{
    return(
        <Box
        flex={1}
        p={2}
        bgcolor='grey'
        // sx={{display: {xs: "none", sm: "block" ,}}}
        >
            <Box>
            <List>

            <ListItem disablePadding>
                    <ListItemButton component='a'>
                        <ListItemIcon>
                            <DarkMode/>
                        </ListItemIcon>
                        <Switch onChange={event=>setMode(mode === "light" ? "dark" : "light")}/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#home'>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#login'>
                        <ListItemIcon>
                            <Login/>
                        </ListItemIcon>
                        <ListItemText primary="Iniciar sesion" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#registration'>
                        <ListItemIcon>
                            <AppRegistration/>
                        </ListItemIcon>
                        <ListItemText primary="Registrarse" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#howItWorks'>
                        <ListItemIcon>
                            <QuestionMark/>
                        </ListItemIcon>
                        <ListItemText primary="Como funciona" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#supportedDevices'>
                        <ListItemIcon>
                            <DevicesOther/>
                        </ListItemIcon>
                        <ListItemText primary="Dispositivos soportados" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#billingPlans'>
                        <ListItemIcon>
                            <AccountBalanceWalletSharp/>
                        </ListItemIcon>
                        <ListItemText primary="Planes de pago" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#meetTheTeam'>
                        <ListItemIcon>
                            <Groups2/>
                        </ListItemIcon>
                        <ListItemText primary="Conoce al equipo" />
                    </ListItemButton>
                </ListItem>

            </List>

            
            </Box>
        </Box>
    )
}

export default SideBar;