
import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function Chatbot(props) {
    const [messages, setMessages] = useState([
        { text: 'Welcome! How can I assist you today?', sender: 'bot' }
    ]);
    const [userQuery, setUserQuery] = useState('');
    const [send, setsend] = useState('');
    const chatBoxRef = useRef(null);
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const handleInputChange = (e) => {
        setUserQuery(e.target.value);
    };

    const handleSubmit = async () => {
        if (userQuery.trim() === '') {
            setMessages([...messages, { text: 'Please enter a valid question.', sender: 'bot' }]);
            return;
        }


        try {
            const response = await fetch('http://127.0.0.1:8080/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_query=${encodeURIComponent(userQuery)}`
            });
            setUserQuery('');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
            setMessages([
                ...messages,
                { text: userQuery, sender: 'user' },
                { text: data.response, sender: 'bot' }
            ]);
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
            setMessages([...messages, { text: 'Error fetching data.', sender: 'bot' }]);
        }
    };


    useEffect(() => {
        // Scroll to the bottom of the chatbox
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        console.log("Current mode:", props.mode); // Debugging line
        // ... rest of the code
    }, [props.mode, messages]);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            margin: '0',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
                <style>{`body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.chat-container {
    width: 100%;
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.chat-header {
    background: #f09433; 
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    color: #ffffff; /* Text color */
    padding: 20px;
    text-align: center;
    font-size: 24px;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
    position: relative;
}

.chat-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 0, 0.8), transparent); /* Yellowish shining effect */
    opacity: 0;
    transform: scale(1.2);
    animation: shine 2s infinite;
}

@keyframes shine {
    0% {
        transform: scale(1.2);
        opacity: 0;
    }
    50% {
        transform: scale(1);
        opacity: 0.8;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}

.chat-box {
    width: 600px;
    padding: 20px;
    background-color: #f9f9f9;
    overflow-y: auto;
    height: 500px;
}

.message {
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #1E90FF;
    color: black;
    position: relative;
}



.user-message {
    background-color: #98FF22;
    color:black;
    position: relative;
}



.user-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    
}

.user-query {
    flex-grow: 1;
    padding: 10px;
    border-radius: 25px;
    border: 2px solid #ccc;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.user-query:focus {
    border-color: #007bff;
}

.ask-button {
    padding: 12px 25px;
    border: none;
    border-radius: 25px;
    background: #f09433; 
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    color: #ffffff; /* Text color */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease; /* Added transition for background-color and transform */
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
}

.ask-button:hover {
    background-color: #e6683c; /* Change the hover background color */
    transform: scale(1.05); /* Scale the button slightly on hover */
}




`}</style>

            <div className="chat" >
                <div className="chat-header">FAQ AI-Chatbot</div>
                
                <div ref={chatBoxRef} className="chat-box my-1" style={{ backgroundColor: props.mode === 'light' ? '#E0FFEB' : '#1A1A2E' ,borderRadius: '20px 20px 20px 20px'}}>
                    {messages.map((message, index) => (
                        <div 
                            key={index}
                            className={`message ${message.sender === 'user' ? 'user-message' : ''}`}
                        >
                            <img src={message.sender === 'user' ? user.picture :'chatbotimg.png' }  style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginRight: '10px',
                            }} />
                            {message.text}
                        </div>
                    ))}
                </div>
                
                <div className="user-input my-1" style={{ backgroundColor: props.mode === 'light' ? '#E0FFEB' : '#1A1A2E', borderRadius: '20px 20px 20px 20px'}}>
                    <input 
                        type="text" 
                        className="user-query" 
                        placeholder="Ask your question..."
                        value={userQuery}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();  // Prevent the default action (submitting the form)
                                handleSubmit();      // Call the handleSubmit function
                            }
                        }}
                    />
                    <button onClick={handleSubmit} className="ask-button mx-1">Ask</button>
                </div>
            </div>

        </div>
    );
}



