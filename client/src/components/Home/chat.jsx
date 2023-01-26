import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
// import './chat.css';
import { Container, Divider, Grid, List, ListItem, Paper, TextField, Typography, Button, Card, CardContent, Avatar, InputAdornment } from "@mui/material";
import { Box } from "@mui/system"
import SendIcon from '@mui/icons-material/Send';
import { Helmet } from "react-helmet";
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from "@mui/styles";
import backgroundImage from '../../images/chatBackground.png'
import { useTheme } from "@mui/material/styles";
import ReactScrollableFeed from "react-scrollable-feed"

const socket = io(`${process.env.REACT_APP_DEFAULT_URL}`);

const Chat = () => {
  const currentUser = useSelector((state) => state?.users.currentUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const image = currentUser.image

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {

      socket.emit("message", message, currentUser.names, image);
      const newMessage = {
        body: message,
        from: "Yo",
        image: currentUser.image
      };
      setMessages([...messages, newMessage]);
      setMessage("");

    }
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

  const classes = useStyles();

  const theme = useTheme();

  const avatarSize = 50;

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
          <title>Sala de chat | Sleep Tracker</title>
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
            Sala de chat
          </Typography>
        </Grid>

        <Grid
          item
        >
          <Card
            variant='outlined'
            sx={{
              width: '70vw',
              height: '60vh',
              marginBottom: 10
            }}
          >
            <CardContent>

              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                // paddingTop={1}
                // paddingLeft={1}
                // paddingBottom={1}
                spacing={3}
              >

                {/* <Card
                  sx={{ width: '100%' }}
                  elevation={20}
                > */}
                {/* <Grid
                    container
                    spacing={4}
                    alignItems="center"
                  > */}
                <Grid
                  item
                  id="chat-window"
                  xs={12}
                  marginTop={5}
                >

                  <Paper
                    variant='outlined'
                    sx={{
                      width: '60vw',
                      height: '40vh',
                      backgroundColor:
                        theme.palette.mode === "light" &&
                        "#eeeeee",

                      backgroundImage:`url(${backgroundImage})`,
                      backgroundSize: 'cover'
                    }}
                  // className={classes.bgImage}
                  >

                    <ReactScrollableFeed>
                      <List
                        id="chat-window-messages"
                      >
                        {
                          messages.map((message, index) => (
                            message.from === 'Yo' ?
                              <ListItem
                                key={index}
                                className={
                                  message.from === 'Yo' ? 'myMessages' : 'OtherMessages'
                                }
                                sx={{
                                  display: "flex",
                                  justifyContent: 'flex-end'
                                }}
                              >
                                <Card
                                  elevation={20}
                                  sx={{
                                    marginLeft: 3,
                                    marginRight: 3,
                                    backgroundColor:
                                      theme.palette.mode === "dark"
                                        ? "#81c784"
                                        : "#388e3c",
                                  }}
                                >
                                  <CardContent >

                                    <Typography
                                      fontWeight='bold'
                                    >
                                      {message.body}
                                    </Typography>

                                  </CardContent>
                                </Card>
                                {message.image ? (
                                  <Avatar
                                    alt="Not found"
                                    srcSet={message.image}
                                    sx={{
                                      width: avatarSize,
                                      height: avatarSize,
                                    }}
                                    variant="dot"

                                  />
                                ) : (
                                  <Avatar>
                                    <PersonIcon
                                      sx={{
                                        width: avatarSize,
                                        height: avatarSize,
                                      }}
                                    />
                                  </Avatar>
                                )}

                              </ListItem>
                              :
                              <ListItem
                                key={index}
                                className={
                                  message.from === 'Yo' ? 'myMessages' : 'OtherMessages'
                                }
                                sx={{
                                  display: "flex",
                                  justifyContent: 'flex-start'
                                }}
                              >
                                {message.image ? (
                                  <Avatar
                                    alt="Not found"
                                    srcSet={message.image}
                                    sx={{
                                      width: avatarSize,
                                      height: avatarSize,
                                    }}
                                    variant="dot"

                                  />
                                ) : (
                                  <Avatar>
                                    <PersonIcon
                                      sx={{
                                        width: avatarSize,
                                        height: avatarSize,
                                      }}
                                    />
                                  </Avatar>
                                )}
                                <Card
                                  elevation={20}
                                  sx={{
                                    marginLeft: 3,
                                    marginRight: 3,
                                    backgroundColor:
                                      theme.palette.mode === "dark"
                                        ? "#7986cb"
                                        : "#4fc3f7",
                                  }}
                                >
                                  <CardContent>
                                    <Typography
                                      fontWeight='bold'
                                    >
                                      {message.body}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </ListItem>
                          ))
                        }

                      </List>
                    </ReactScrollableFeed>
                  </Paper>

                </Grid>

                {/* </Grid> */}
                {/* </Card> */}
                <Grid
                  item
                  xs={9}
                  sx={{ width: '60vw' }}
                >
                  <form onSubmit={handleSubmit} >
                    <TextField
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      variant="outlined"
                      fullWidth
                      autoComplete="false"
                      placeholder="Escribe un mensaje"
                      InputProps={{
                        endAdornment:
                          <InputAdornment
                            position="end"
                            onClick={handleSubmit}
                          >
                            <Button
                              variant='contained'
                              color='success'
                            >
                              <SendIcon />
                            </Button>
                          </InputAdornment>,
                      }}
                    />
                  </form >
                </Grid>


              </Grid>

            </CardContent>
          </Card>

        </Grid>

      </Grid>
    </Paper>
  );
};

export default Chat;

const useStyles = makeStyles(() => ({
  imageStyle: {
    width: '100%',
    minHeight: '100vh',
    height: '100%'
  },

  bg: {
    backgroundColor: '#ecefef'
  },

  bgImage: {
    backgroundImage: `url(${backgroundImage})`,
    blockSize: '300px',
  },
}));
