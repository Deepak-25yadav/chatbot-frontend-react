
import React, { useEffect } from 'react';
import { ChatProvider } from './context/ChatContext';
import Chatbot from './components/ChatBot';
import keepAlive from './services/KeepAlive';



function App() {
   
useEffect(()=>{
  keepAlive()
},[])


    return (
        <ChatProvider>

            <div className="App">
                <Chatbot/>
            </div>

        </ChatProvider>
    );
}

export default App;