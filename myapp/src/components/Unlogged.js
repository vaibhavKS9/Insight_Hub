import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faAmazon, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Unlogged() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const [showAnimation, setShowAnimation] = useState(false);
    const [welcomeText, setWelcomeText] = useState('');
  
    const handleLogin = () => {
      loginWithRedirect();
    };
  return (
    <>
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

            .homee {
                position: relative;
                top: 80px; /* Adjusted position by 70px */
                background-repeat: repeat-y; /* Vertically repeat the background image */
                background-image: url(${require('./home7.png')});
                background-size: cover;
                height: calc(100vh - 70px); /* Adjusted height by 70px */
                background-attachment: fixed; /* Make the background fixed */
            }

            /* Your existing styles */

            .container {
                max-width: 1000px;
                margin: auto;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: stretch;
                position: relative;
                z-index: 1;
                
            }

            .home-content {
                flex: 1; /* Expand to fill remaining space */
            }

            .home-content h1 {
                position: relative;
                font-size: 56px;
                font-weight: 700;
                line-height: 1.2;
                color: white;

            }

            .home-content h3 {
                position: relative;
                font-size: 32px;
                font-weight: 700;
                color: #00abf0;
            }

            .home-content p {
                position: relative;
                font-size: 16px;
                margin: 10px 0 30px;
                color:white;
            }

            .btn-box {
                position: relative;
                display: flex;
                justify-content: space-between;
                width: 500px;
                height: 50px;
            }

            .btn-box a {
                position: relative;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 150px;
                height: 100%;
                background: #00abf0;
                border: 2px solid #00abf0;
                border-radius: 10px;
                font-size: 18px;
                color: #081b29;
                text-decoration: none;
                font-weight: 600;
                letter-spacing: 1px;
                z-index: 1;
                overflow: hidden;
                transition: .5s;
            }

            .btn-box a:hover {
                color: #00abf0;
            }

            .btn-box a:nth-child(2) {
                background: transparent;
                color: #00abf0;
            }

            .btn-box a:nth-child(2):hover {
                color: #081b29;
            }

            .btn-box a:nth-child(2)::before {
                background: #00abf0;
            }

            .btn-box a:nth-child(2)::after {
                background: #00abf0;
            }

            .btn-box a::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background: #081b29;
                z-index: -1;
                transition: .5s;
            }

            .btn-box a:hover::before {
                width: 100%;
            }

            .home-sci {
                position: absolute;
                bottom: -500px; /* Adjusted position */
                width: 170px;
                display: flex;
                justify-content: space-between;
            }

            .home-sci a {
                position: relative;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                background: transparent;
                border: 2px solid #00abf0;
                border-radius: 50%;
                font-size: 20px;
                color: #00abf0;
                text-decoration: none;
                z-index: 1;
                overflow: hidden;
            }

            .home-sci a::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background: #00abf0;
                z-index: -1;
                transition: .5s;
            }

            .home-sci a:hover::before {
                width: 100%;
            }

            @keyframes showRight {
                100% {
                    width: 0;
                }
            }
            .ask-button {
                padding: 10px 20px; /* Decrease the padding */
                
                border: none;
                border-radius: 25px;
                background: #f09433; 
                background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
                background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
                color: #ffffff; /* Text color */
                font-size: 14px; /* Decrease the font size */
                width: 150px; /* Set a specific width for the button */
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease; /* Added transition for background-color and transform */
                box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
                
                /* Positioning */
                position: fixed; /* Position the button relative to the viewport */
                bottom: 300px; /* Adjust the distance from the bottom */
                left: 450px; /* Optionally adjust the horizontal position */
            }
            
            .ask-button:hover {
                background-color: #e6683c; /* Change the hover background color */
                transform: scale(1.05); /* Scale the button slightly on hover */
            }
            
            
            
        `}
    </style>

    <div className='homee'>
        <div className="container">
            <div class="home-content">
                <h1>Welcome to Insights Hub.</h1>
                <h3>Dedicated to Insightful Sentimental Analysis.</h3>
                <p>Specialising in analysing Youtube Comment Sentiment Analysis and Amazon product reviews Analysis, LinkdeIn posts and more!</p>
                <div class="btn-box">
                    <a href="#"  onClick={handleLogin}>Youtube</a>
                    <a href="#" onClick={handleLogin}>LinkedIn</a>
                    <a href="#"  onClick={handleLogin}>Amazon</a>
                </div>
            </div>
            {/* <div className='center' style={{color:'white'}}><button id="addProjectBtn" className="btn" >
                         LogIn / SignUp
    </button></div> */}
            
            <button  className="ask-button mx-1" onClick={handleLogin}>LogIn / SignUp</button>

            <div className="home-sci">
                <a href="#" onClick={handleLogin}><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="#" onClick={handleLogin}><FontAwesomeIcon icon={faAmazon} /></a>
                <a href="#" onClick={handleLogin}><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
        </div>
    </div>
</>



  )
}




