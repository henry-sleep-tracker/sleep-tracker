import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import SideList from './SideList';
import Default from "./default/Default";
import Users from "./users/Users";
import Copyright from "./Copyright";

import { useAuthContext } from "../../actions/authContext";
import { logOutUser } from "../../actions";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuthContext();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => { setOpen(!open) };

  async function handleLogOut(event) {
    event.preventDefault();
    dispatch( logOutUser());
    await logout();
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
            >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={ {marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              >
              Sleep Tracker
            </Typography>

            <Button
              sx={{ m: 2, color: "white", display: "block" }}
              onClick={ () => navigate( '/private/home' )}
              >
              Home
            </Button>

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

                <MenuItem key="Log Out" onClick={handleCloseUserMenu}>
                  <Button onClick={event => handleLogOut(event)}>Log Out</Button>
                </MenuItem>
              </Menu>
          </Box>

          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>

          <Toolbar
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}
            >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <SideList />

        </Drawer>

        <Box component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
          <Toolbar />
          
          <Routes>
            <Route exact path='' element={<Default />}/>
            <Route exact path='/users' element={<Users />}/>
          </Routes>
          
          <Copyright sx={{ pt: 4 }} />
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
