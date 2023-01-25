import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import './chat.css';
import { Container, Divider,  Grid,  List, ListItem,  Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system"
import SendIcon from '@mui/icons-material/Send';


const socket = io(`${process.env.REACT_APP_DEFAULT_URL}`);

const Chat = () => {
  const currentUser = useSelector((state) => state?.users.currentUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message, currentUser.names);
    const newMessage = {
      body: message,
      from: "Yo",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    const reciveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, [messages]);

  return (


    <Container>
      <Paper elevation={4} >
    <Box p={3}>
    <Typography variant="h4" gutterBottom   >
      SleepTrackerChat
    </Typography>
    <Divider/>
    <Grid container spacing={4} alignItems="center" >
<Grid id="chat-window" xs={12} item >

<List 
id="chat-window-messages"

>
       {messages.map((message, index) => (
        <ListItem key={index} 
        className={ message.from === 'Yo'? 'myMessages': 'OtherMessages' }
        
        >
          <p className={ message.from === 'Yo'? 'myMessage': 'OtherMessage'} >
            {message.from}: {message.body}
          </p>
        </ListItem>
      ))}
      </List>

</Grid>
<Grid xs={9} item>
<form onSubmit={handleSubmit} >
  <TextField onChange={(e) => setMessage(e.target.value)}
   value={message}
   variant="outlined"
   fullWidth
   autoComplete="false" />
</form >
</Grid>
<Grid xs={1} item color="#f3f4fa" >
  <Button onClick={handleSubmit} endIcon={<SendIcon/>} variant="contained" size='large'  >   
  </Button>
</Grid>
    </Grid>
    </Box>
        </Paper>
    </Container>
  );
};

export default Chat;