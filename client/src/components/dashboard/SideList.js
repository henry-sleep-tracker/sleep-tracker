import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import Divider from '@mui/material/Divider';

function SideListContent( ) {
  const navigate = useNavigate();

  return (
    <List>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/private/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/private/dashboard/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      </ListItem>

    </List>
  );
};

export default function SideList() {
  return <SideListContent />;
}