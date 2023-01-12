import * as React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import log from "../logi/log-.png";
import { useAuthContext } from "../../actions/authContext";
import { useDispatch } from "react-redux";
import { logOutUser, cleanExpDate } from "../../actions";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, styled } from "@mui/material";
import { AccountBalanceWalletSharp, AppRegistration, DarkMode, DevicesOther, Groups2, Login, QuestionMark } from "@mui/icons-material";
import Home from "./Home";
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DashboardIcon from '@mui/icons-material/Dashboard';

function ResponsiveAppBar({ mode, setMode }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  async function handleLogOut(event) {
    event.preventDefault();
    dispatch(logOutUser());
    dispatch(cleanExpDate());
    await logout();
  }
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleConoce = e => {
    e.preventDefault();
    navigate("/private/team");
  };
  const handleGraph = e => {
    e.preventDefault();
    navigate("/private/graficas");
  };
  const handleBack = e => {
    e.preventDefault();
    navigate("/private/home");
  };

  const handlerRecord = e => {
    e.preventDefault();
    navigate("/private/newrecord");
  };

  const handlerProfile = e => {
    e.preventDefault();
    navigate("/private/profile");
  };

  const handlerPlans = e => {
    e.preventDefault();
    navigate("/private/planes");
  };

  const handlerComment = e => {
    e.preventDefault();
    navigate("/private/createcomment");
  };

  const handlerDashboard = e => {
    e.preventDefault();
    navigate("/private/dashboard");
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const StyledToolbar = styled(Toolbar)({
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: 'center',
  // })

  return (
    <AppBar position="sticky">
      {/* <StyledToolbar> */}

      <Container maxWidth="xl" sx={{ color: "black" }}>
        <Toolbar disableGutters>
          <Box
          // sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
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

            <Button onClick={handleBack}>
              <img
                src={log}
                alt="logo"
                width="200px"
              />
            </Button>

            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="Conoce al equipo" onClick={handleConoce}>
                <Button>Conoce al equipo</Button>
              </MenuItem>

              <MenuItem key="Graficas" onClick={handleGraph}>
                <Button>Graficas</Button>
              </MenuItem>

              <MenuItem key="reporteS" onClick={handleCloseUserMenu}>
                <Button alt="Reporte" href="/pdf" download="{pdf}">
                  Reporte semanal
                </Button>
              </MenuItem>

              <MenuItem key="registro">
                <Button onClick={handlerRecord}>Registrar actividad</Button>
              </MenuItem>
            </Menu> */}
          </Box>

          <Box
            component="nav"
            // sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
          >
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
                    <ListItemButton component='a'>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Perfil"
                        onClick={handlerProfile}
                      />
                    </ListItemButton>
                  </ListItem>

                  {currentUser.isAdmin &&
                    <ListItem disablePadding>
                      <ListItemButton component='a'>
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Tablero de administrador"
                          onClick={handlerDashboard}
                        />
                      </ListItemButton>
                    </ListItem>
                  }

                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton component='a'>
                      <ListItemIcon>
                        <DarkMode />
                      </ListItemIcon>
                      <Switch onChange={event => setMode(mode === "light" ? "dark" : "light")} />
                    </ListItemButton>
                  </ListItem>

                  <Divider />


                  <ListItem disablePadding>
                    <ListItemButton component='a'>
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
                    <ListItemButton component='a'>
                      <ListItemIcon>
                        <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Graficas"
                        onClick={handleGraph}
                      />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component='a'
                    >
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
                    <ListItemButton
                      component='a'
                    >
                      <ListItemIcon>
                        <AccountBalanceWalletSharp />
                      </ListItemIcon>
                      <ListItemText
                        primary="Planes de pago"
                        onClick={handlerPlans} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component='a'
                    >
                      <ListItemIcon>
                        <AddCommentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dejar comentario"
                        onClick={handlerComment} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component='a'
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cerrar sesion"
                        onClick={event => handleLogOut(event)}
                      />
                    </ListItemButton>
                  </ListItem>

                </List>

              </div>

            </Drawer>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Tooltip title="Inicio">
              <Button onClick={handleBack}>
                <img src={log} alt="logo" width="200px" />
              </Button>
            </Tooltip> */}
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

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="pdf"
              download="pdf"
              href="/pdf"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Reporte PDF
            </Button>
          </Box> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Registrar Actividad"
              onClick={handlerRecord}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Registrar Actividad
            </Button>
          </Box>
{/* 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginRight: "20px" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://cdn-icons-png.flaticon.com/512/10/10915.png"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key="Perfil"
                onClick={handleCloseUserMenu}
              >
                <Link to="/private/profile">
                  <Button>Perfil</Button>
                </Link>
              </MenuItem>

              {currentUser.isAdmin ?
                <MenuItem key="Dashboard" onClick={handleCloseUserMenu}>
                  <Button onClick={event => navigate('/private/dashboard')}>Dashboard</Button>
                </MenuItem>
                :
                <> </>
              }

              <MenuItem key="Log Out" onClick={handleCloseUserMenu}>
                <Button onClick={event => handleLogOut(event)}>Log Out</Button>
              </MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
      {/* </StyledToolbar> */}

    </AppBar>
  );
}
export default ResponsiveAppBar;
