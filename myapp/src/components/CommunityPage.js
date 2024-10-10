import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const CommunityPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const messagesContainerRef = useRef(null); // Define the ref for messages container

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the messages container when messages change
        scrollToBottom();
    }, [messages]); // Add messages as a dependency

    useLayoutEffect(() => {
        // Scroll to the bottom of the messages container when the component is first rendered
        scrollToBottom();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('api/messages');
            const sortedMessages = response.data.sort((a, b) => new Date(a.sentTime) - new Date(b.sentTime)); // Sort messages by sentTime
            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const scrollToBottom = () => {
        // Scroll to the bottom of the messages container
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/messages', {
                text: inputText,
                user: {
                    email: user.email,
                    profilePicture: user.picture, // Assuming profile picture is available in user object
                },
                sentTime: new Date().toISOString(), // Store current time as ISO string
            });
            setMessages([...messages, response.data]);
            setInputText('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    return (
        <div >
                <style>{`

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
    width: 100%;
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
.user-input-container {
    display: flex;
    align-items: center;
    padding: 15px; /* Increase padding to make it taller */
    width: 100%;
}

.user-input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 25px;
    border: 2px solid #ccc;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.user-input:focus {
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
        <div className="container" style={{marginTop: '75px',marginBottom: '50px',position: 'relative' }}>
            <div className="chat-header">COMMUNITY PAGE</div>
            <div className="messages-container my-3" style={{ backgroundColor: props.mode === 'light' ? '#E0FFEB' : '#1A1A2E' ,borderRadius: '20px 20px 20px 20px',height: '650px', overflowY: 'auto',marginBottom: '10px',}} ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            ...messageStyle,
                            backgroundColor: message.user.email === user.email ? '#98FF22' : '#1E90FF',
                            alignSelf: message.user.email === user.email ? 'flex-end' : 'auto',
                        }}
                    >
                        <div style={userInfoStyle}>
                            <img src={message.user.profilePicture} alt="Profile" style={profilePictureStyle} />
                            <div>
                                <span style={userStyle}>{message.user.email}</span>
                                <span style={timeStyle}>{new Date(message.sentTime).toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <p style={textStyle}>{message.text}</p>
                    </div>
                ))}
            </div>
            <form className="user-input-container my-1" onSubmit={handleSubmit} style={{ backgroundColor: props.mode === 'light' ? '#E0FFEB' : '#1A1A2E', borderRadius: '20px 20px 20px 20px'}}>
                <input
                    type="text"
                    className='user-input'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    
                />
                <button type="submit" className="ask-button mx-1">Send</button>
            </form>
        </div>
    </div>
    );
};

export default CommunityPage;

// CSS styles
const communityPageStyle = {
    marginTop: '75px',
    marginBottom: '50px',
    position: 'relative', // Set position to relative to contain the form
};

const messagesContainerStyle = {
    backgroundColor:'#f9f9f9',
    height: '650px', // Fixed height for the chatbox container
    overflowY: 'auto',
    marginBottom: '10px',
};

const messageStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '20px',
    maxWidth: '70%',
    wordWrap: 'break-word',
};

const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
};

const profilePictureStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
};

const userStyle = {
    fontWeight: 'bold',
};

const timeStyle = {
    marginLeft: '10px', 
    fontSize: '0.8rem',
    color: '#777',
};

const textStyle = {
    margin: 0,
};

const inputFormStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 20px)',
    backgroundColor: '#fff',
    borderTop: '2px solid #ccc',
    display: 'flex',
    alignItems: 'center',
};

const inputFieldStyle = {
    flex: 1,
    marginTop:'10px',
    marginRight: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '20px',
};

// Hover effect for the send button
const sendButtonHoverStyle = {
    backgroundColor: '#e6683c',
    transform: 'scale(1.05)',
};

const sendButtonStyle = {
    
    padding: '12px 20px',
    border: 'none',
    borderRadius: '20px',
    background: '#f09433', 
    background: '-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
    background: '-webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 123, 255, 0.1)',
};



// Append hover style to the send button style
Object.assign(sendButtonStyle, sendButtonHoverStyle);
