import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import './chat.css';
import { Container, Divider, Grid, List, ListItem, Paper, TextField, Typography, Button, Card, CardContent, Avatar } from "@mui/material";
import { Box } from "@mui/system"
import SendIcon from '@mui/icons-material/Send';
import { Helmet } from "react-helmet";
import PersonIcon from '@mui/icons-material/Person';

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
    <Paper
      sx={{ minHeight: '100vh' }}
    >

      <Grid
        container
        justifyContent="center"
        direction='column'
        alignItems='center'
        spacing={5}
      >

        <Helmet>
          <title>Foro premium | Sleep Tracker</title>
        </Helmet>

        <Grid
          item
        >
          <Typography
            paddingTop={5}
            variant="h2"
            fontWeight='bold'
          // gutterBottom   
          >
            Foro premium
          </Typography>
        </Grid>

        <Grid
          item
        >
          <Card
            variant='outlined'
            sx={{ width: '60vw' }}
          >
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                paddingTop={1}
                paddingBottom={1}
                spacing={3}
              >

                <Box p={3}>
                  <Grid container spacing={4} alignItems="center" >
                    <Grid
                      id="chat-window"
                      xs={12}
                      item
                    >
                      <List
                        id="chat-window-messages"
                      >
                        {
                          messages.map((message, index) => (
                            <ListItem
                              key={index}
                              className={
                                message.from === 'Yo' ? 'myMessages' : 'OtherMessages'
                              }

                            >
                              <p
                                className={
                                  message.from === 'Yo' ? 'myMessage' : 'OtherMessage'
                                }
                              >
                                {/* {message.from} */}
                                {currentUser.image ? (
                                  <Avatar
                                    alt="Not found"
                                    srcSet={currentUser.image}
                                    sx={{
                                      width: 30,
                                      height: 30,
                                    }}
                                    variant="dot"
                                  />
                                ) : (
                                  <Avatar>
                                    <PersonIcon />
                                  </Avatar>
                                )}: {message.body}
                              </p>
                            </ListItem>
                          ))}
                      </List>

                    </Grid>
                    <Grid xs={9} item>
                      <form onSubmit={handleSubmit} >
                        <TextField
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          variant="outlined"
                          fullWidth
                          autoComplete="false"
                        />
                      </form >
                    </Grid>

                    <Grid
                      xs={1}
                      item
                    // color="#f3f4fa" 
                    >
                      <Button
                        onClick={handleSubmit}
                        startIcon={<SendIcon />}
                        variant="contained"
                        size='large'
                        color='success'
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default Chat;