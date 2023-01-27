import {
  AppBar,
  styled,
  IconButton,
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import {
  AccountBalanceWalletSharp,
  AppRegistration,
  DevicesOther,
  Groups2,
  Home,
  Login,
  /*Mail, Notifications,*/ QuestionMark,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { theme } from "../../theme";
import { ThemeProvider } from "@emotion/react";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import log from "../logi/log-.png";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Icons = styled("div")(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const NavegationBar = ({
  mode,
  setMode,
  currentPage,
  setCurrentPage,
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const currentComments = useSelector((state) => state.comments);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <StyledToolbar>
          <Box
            component="nav"
            sx={{
              width: { sm: 240 },
              flexShrink: { sm: 0 },
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

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
                    <ListItemButton component="a" href="login">
                      <ListItemIcon>
                        <Login />
                      </ListItemIcon>
                      <ListItemText primary="Iniciar sesion" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="registro">
                      <ListItemIcon>
                        <AppRegistration />
                      </ListItemIcon>
                      <ListItemText primary="Registrarse" />
                    </ListItemButton>
                  </ListItem>

                  <Divider />

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      onClick={() => setCurrentPage(page1)}
                    >
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      onClick={() => setCurrentPage(page2)}
                    >
                      <ListItemIcon>
                        <QuestionMark />
                      </ListItemIcon>
                      <ListItemText primary="Como funciona" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      onClick={() => setCurrentPage(page3)}
                    >
                      <ListItemIcon>
                        <DevicesOther />
                      </ListItemIcon>
                      <ListItemText primary="Dispositivos soportados" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      onClick={() => setCurrentPage(page4)}
                    >
                      <ListItemIcon>
                        <AccountBalanceWalletSharp />
                      </ListItemIcon>
                      <ListItemText primary="Planes de pago" />
                    </ListItemButton>
                  </ListItem>
                  {currentComments.data && (
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        onClick={() => setCurrentPage(page6)}
                      >
                        <ListItemIcon>
                          <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comentarios" />
                      </ListItemButton>
                    </ListItem>
                  )}

                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      onClick={() => setCurrentPage(page5)}
                    >
                      <ListItemIcon>
                        <Groups2 />
                      </ListItemIcon>
                      <ListItemText primary="Conoce al equipo" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </Drawer>
            <img
              onClick={() => setCurrentPage(page1)}
              src={log}
              alt="logo"
              width="180"
            />
          </Box>
          <Button
            startIcon={<LoginIcon />}
            sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            color="lightFont"
            href="login"
          ></Button>

          <Button
            startIcon={<AppRegistrationIcon />}
            sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            color="lightFont"
            href="/registro"
          ></Button>

          <Icons>
            <Button
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              variant="text"
              color="lightFont"
              href="/login"
            >
              Iniciar sesion
            </Button>

            <Button
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              variant="outlined"
              color="lightFont"
              href="/registro"
            >
              Registrarse
            </Button>
          </Icons>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavegationBar;
