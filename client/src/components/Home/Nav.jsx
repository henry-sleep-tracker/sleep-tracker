import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import log from "../logi/log-.png";
import logWhite from "../logi/log-white.png";
import { useAuthContext } from "../../actions/authContext";
import { logOutUser, cleanExpDate } from "../../actions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import {
  AccountBalanceWalletSharp,
  DarkMode,
  Groups2,
  QuestionMark,
} from "@mui/icons-material";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DashboardIcon from "@mui/icons-material/Dashboard";

function ResponsiveAppBar({ mode, setMode }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.users);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogOut(event) {
    event.preventDefault();
    dispatch(logOutUser());
    dispatch(cleanExpDate());
    await logout();
  }

  const handleConoce = (e) => {
    e.preventDefault();
    navigate("/private/team");
  };
  const handleGraph = (e) => {
    e.preventDefault();
    navigate("/private/graficas");
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/private/home");
  };

  const handlerRecord = (e) => {
    e.preventDefault();
    navigate("/private/records");
  };

  const handlerProfile = (e) => {
    e.preventDefault();
    navigate("/private/profile");
  };

  const handlerPlans = (e) => {
    e.preventDefault();
    navigate("/private/planes");
  };

  const handlerComment = (e) => {
    e.preventDefault();
    navigate("/private/createcomment");
  };

  const handlerDashboard = (e) => {
    e.preventDefault();
    navigate("/private/dashboard");
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{ color: "black" }}>
        <Toolbar disableGutters>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {mode === "light" ? (
              <Button onClick={handleBack}>
                <img src={log} alt="logo" width="200px" />
              </Button>
            ) : (
              <Button onClick={handleBack}>
                <img src={logWhite} alt="logo" width="200px" />
              </Button>
            )}
          </Box>

          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Perfil" onClick={handlerProfile} />
                    </ListItemButton>
                  </ListItem>

                  {currentUser.currentUser.isAdmin && (
                    <ListItem disablePadding>
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Tablero de administrador"
                          onClick={handlerDashboard}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}

                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <DarkMode />
                      </ListItemIcon>
                      <Switch
                        onChange={(event) =>
                          setMode(mode === "light" ? "dark" : "light")
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <Groups2 />
                      </ListItemIcon>
                      <ListItemText
                        primary="Conoce al equipo"
                        onClick={handleConoce}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Graficas" onClick={handleGraph} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <QuestionMark />
                      </ListItemIcon>
                      <ListItemText
                        primary="Registrar actividad"
                        onClick={handlerRecord}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <AccountBalanceWalletSharp />
                      </ListItemIcon>
                      <ListItemText
                        primary="Planes de pago"
                        onClick={handlerPlans}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <AddCommentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dejar comentario"
                        onClick={handlerComment}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cerrar sesion"
                        onClick={(event) => handleLogOut(event)}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="conoce al equipo"
              onClick={handleConoce}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              conoce al equipo
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Graficas"
              onClick={handleGraph}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Graficas
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Registrar Actividad"
              onClick={handlerRecord}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Registrar Actividad
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
