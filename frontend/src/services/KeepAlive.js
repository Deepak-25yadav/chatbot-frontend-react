import axios from "axios";

const keepAlive = () => {
  const url = "https://chatbot-backend-node.onrender.com/health"; 
  setInterval(async () => {
    try {
      const response = await axios.get(url);
     
      console.log(`Ping successful: ${response}`);
    } catch (error) {
      console.error("Ping failed:", error.message);
    }
  }, 30000); 
};

export default keepAlive;
