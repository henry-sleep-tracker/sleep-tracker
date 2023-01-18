import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
import './chat.css'

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
    <div className="chatD" >
      <h1> Chat </h1>
      <p>
        Se respetuoso y amable, te sugerimos no compartir ningun tipo de
        informacion personal
      </p>
          <form onSubmit={handleSubmit} >
      <ul id="chatbox" >
      {messages.map((message, index) => (
        <li key={index} className={ message.from === 'Yo'? 'myMessage': 'OtherMessage' }
        
        >
          <b>
            {message.from}: {message.body}
          </b>
        </li>
      ))}
      </ul>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>send</button>
      </form>
    </div>
  );
};

export default Chat;