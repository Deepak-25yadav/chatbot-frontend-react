"use client";

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";
import './ChatBot.css';


const DEFAULT_BOT_MESSAGE = {
  sender: "bot",
  content: "Hello! I'm your AI assistant. How may I assist you today? I'm here to help with any questions or tasks you might have.",
};


const Chatbot = () => {

  const { messages, addMessage } = useContext(ChatContext);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");

  let baseUrl = "https://chatbot-backend-node.onrender.com";



  useEffect(() => {
    
    if (messages.length === 0) {
      addMessage(DEFAULT_BOT_MESSAGE);
    }
    
    const chatMessages = document.querySelector(".chat-messages");
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [messages]);






  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: input };
    addMessage(userMessage);
    setInput("");
    setLoading(true);


    try {

      const response = await axios.post(`${baseUrl}/api/chat`, {
        message: input,
      });
      const botMessage = { sender: "bot", content: response.data.reply };
      setLoading(false);
      addMessage(botMessage);

    } catch (error) {

      setLoading(false);
      const errorMessage = {
        sender: "bot",
        content: "Error connecting to server.",
      };
      addMessage(errorMessage);

    }
  };







  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>AI Chatbot</h2>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_iVkc-39aoUWOlS15rDnMPAKVN88jH2MIhA&s"
          alt="AI Chatbot"
          width="50"
          height="50"
          className="header-image"
        />


      </div>


      <div className="chat-messages">

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <img
              src={
                msg.sender === "bot"
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKHzfxmxQLlgEMdqjZGiY5nAFBqNusJJCLw&s"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMkPBuM5OCggBmsMpYYTTrn0tnUqToivRvWK4YmbNfm_hPyHSar0mNeXczWwYXLj9EmI&usqp=CAU"
              }
              alt={msg.sender === "bot" ? "Bot Avatar" : "User Avatar"}
              width="30"
              height="30"
              className="avatar-image"
            />

            <div className="message-content">{msg.content}</div>
          </div>

        ))}
        {loading && (

          <div className="message bot thinking">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKHzfxmxQLlgEMdqjZGiY5nAFBqNusJJCLw&s"
              alt="Bot Avatar"
              width={30}
              height={30}
              className="avatar-image"
            />
            <div className="message-content">Thinking...</div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="chat-input"
      >

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
        
      </form>

    </div>
  );
};

export default Chatbot;
