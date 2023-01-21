import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import "./chat.css";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
    <div className="page">
      <div className="screen">
        <div className="screen-container">
          <div className="chat">
            <div className="chat-container">
              <div className="user-bar">
                <div class="avatar">
                  <img
                    src={
                      currentUser.image
                        ? currentUser.image
                        : " https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Photo.png"
                    }
                    alt="Avatar"
                  />
                </div>
                <div className="nameChat">Sleep Tracker Chat</div>
              </div>
              <div className="conversation">
                <ul className="conversation-container">
                  {messages.map((message, index) => (
                    <li
                      key={index}
                      className={
                        message.from === "Yo"
                          ? "message sent"
                          : "message received"
                      }
                    >
                      <p>
                        {message.from}: {message.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="conversation-compose">
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  type="text"
                  autoComplete="off"
                  className="input-msg"
                />
                <div color="#f3f4fa">
                  <Button
                    onClick={handleSubmit}
                    endIcon={<SendIcon />}
                    variant="contained"
                    size="large"
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
