import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import {  IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Notification = () => {
  const [count, setCount] = React.useState(1);
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        setCount(Math.max(count - 1, 0));
        navigate("/private/notificacion");
      }}
      sx={{ p: 0, marginRight: "40px" }}
    >
      <Badge badgeContent={count} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notification;
