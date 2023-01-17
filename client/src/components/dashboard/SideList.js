import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

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