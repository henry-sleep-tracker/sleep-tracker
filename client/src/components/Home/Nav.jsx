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

function ResponsiveAppBar() {
  const dispatch=useDispatch();
  const currentUser = useSelector((state) => state?.users.currentUser);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  async function handleLogOut(event) {
    event.preventDefault();
    dispatch( logOutUser());
    dispatch( cleanExpDate());
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
    navigate("/private");
  };

  const handlerRecord = e => {
    e.preventDefault();
    navigate("/private/newrecord");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{ color: "black" }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Button onClick={handleBack}>
              <img src={log} alt="logo" width="200px" />
            </Button>

            <Menu
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
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Inicio">
              <Button onClick={handleBack}>
                <img src={log} alt="logo" width="200px" />
              </Button>
            </Tooltip>
            <Button
              key="hola"
              onClick={handleConoce}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              conoce al equipo
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="hola"
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
              key="actividad"
              onClick={handlerRecord}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Registrar Actividad
            </Button>
          </Box>

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
              <MenuItem key="Perfil" onClick={handleCloseUserMenu}>
                <Link to="/private/profile">
                  <Button>Perfil</Button>
                </Link>
              </MenuItem>

              { currentUser.isAdmin? 
                <MenuItem key="Dashboard" onClick={handleCloseUserMenu}>
                  <Button onClick={ event => navigate('/private/dashboard')}>Dashboard</Button>
                </MenuItem>
                :
                <> </>
              }

              <MenuItem key="Log Out" onClick={handleCloseUserMenu}>
                <Button onClick={event => handleLogOut(event)}>Log Out</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
