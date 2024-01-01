"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your Socket.io server URL

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });

    return () => {
      // Clean up when component unmounts
      socket.disconnect();
    };
  }, [messages]);

  const handleSendMessage = () => {
    // Emit a message to the server
    socket.send(message);
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        className=""
        placeholder="chat"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
