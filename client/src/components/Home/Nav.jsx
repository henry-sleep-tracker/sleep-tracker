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
  Avatar,
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountBalanceWalletSharp,
  DarkMode,
  Groups2,
  Logout,
  Mail,
  Notifications,
  QuestionMark,
  Settings,
} from "@mui/icons-material";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ForumIcon from '@mui/icons-material/Forum';
import AddchartIcon from '@mui/icons-material/Addchart';

function ResponsiveAppBar({ mode, setMode }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.users);
  const currentUser2 = useSelector((state) => state.users.currentUser);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogOut(event) {
    event.preventDefault();
    setAnchorEl(null);
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
    navigate("/private/loading");
  };

  const handlerChat = (e) => {
    e.preventDefault();
    navigate("/private/chat");
  };

  const handlerProfile = (e) => {
    e.preventDefault();
    navigate("/private/profile");
    setAnchorEl(null);

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setMode(mode === "light" ? "dark" : "light")
  };

  return (
    <AppBar position="sticky" backgroundColor='primary'>
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
              <List>

                <ListItem
                  disablePadding
                  sx={{
                    display: {
                      lg: 'none', md: 'none', sm: 'block', xs: 'block'
                    }
                  }}
                >
                  <ListItemButton component="a">
                    <ListItemIcon>
                      {
                        currentUser2.image ?
                          <Avatar
                            alt="Not found"
                            srcSet={currentUser2.image}
                            sx={{
                              width: 50,
                              height: 50
                            }}
                          />
                          :
                          <PersonIcon />
                      }
                    </ListItemIcon>
                    <ListItemText primary="Perfil" onClick={handlerProfile} />
                  </ListItemButton>
                </ListItem>

                {currentUser.currentUser.isAdmin && (
                  <ListItem
                    disablePadding
                    sx={{
                      display: {
                        lg: 'none', md: 'none', sm: 'block', xs: 'block'
                      }
                    }}
                  >
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

                <Divider
                  sx={{
                    display: {
                      lg: 'none', md: 'none', sm: 'block', xs: 'block'
                    }
                  }}
                />

                <ListItem
                  disablePadding
                  sx={{
                    display: {
                      lg: 'none', md: 'none', sm: 'block', xs: 'block'
                    }
                  }}
                >
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <Brightness4Icon />
                    </ListItemIcon>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                    />
                    <ListItemIcon>
                      <Brightness7Icon />
                    </ListItemIcon>

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
                      <AddchartIcon />
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
                      <ForumIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Chat"
                      onClick={handlerChat}
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

                <ListItem
                  disablePadding
                  sx={{
                    display: {
                      lg: 'none', md: 'none', sm: 'block', xs: 'block'
                    }
                  }}
                >
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
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="conoce al equipo"
              onClick={handleConoce}
              sx={{ my: 2, color: "white", display: "block" }}
              startIcon={<Groups2 />}
            >
              conoce al equipo
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Graficas"
              onClick={handleGraph}
              sx={{ my: 2, color: "white", display: "block" }}
              startIcon={<TimelineIcon />}
            >
              Graficas
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Registrar Actividad"
              onClick={handlerRecord}
              sx={{ my: 2, color: "white", display: "block" }}
              startIcon={<AddchartIcon />}
            >
              Registrar Actividad
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Chat"
              onClick={handlerChat}
              sx={{ my: 2, color: "white", display: "block" }}
              startIcon={<ForumIcon/>}
            >
              Chat
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tooltip title={currentUser2.names}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <ListItemIcon>
                  {
                    currentUser2.image ?
                      <Avatar
                        alt="Not found"
                        srcSet={currentUser2.image}
                        sx={{
                          width: 50,
                          height: 50
                        }}
                      />
                      :
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                  }
                </ListItemIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                display: {
                  lg: 'block',
                  md: 'block',
                  sm: 'none',
                  xs: 'none'
                }
              }}
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <ListItemIcon>
                  <Brightness4Icon />
                </ListItemIcon>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                />
                <ListItemIcon>
                  <Brightness7Icon />
                </ListItemIcon>
              </MenuItem>

              {currentUser.currentUser.isAdmin && (
                <MenuItem
                  // onClick={handleClose}
                  onClick={handlerDashboard}
                >
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  Tablero
                </MenuItem>
              )}

              <MenuItem
                // onClick={handleClose}
                onClick={handlerProfile}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Perfil
              </MenuItem>

              <MenuItem
                onClick={handleLogOut}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Salir
              </MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
