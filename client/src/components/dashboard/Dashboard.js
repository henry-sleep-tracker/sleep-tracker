
import { Routes, Route } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import SideList from './SideList';
import Default from "./default/Default";
import Users from "./users/Users";
import Copyright from "./Copyright";

const drawerWidth = 240;

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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <Drawer variant="permanent" open={true}>
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
