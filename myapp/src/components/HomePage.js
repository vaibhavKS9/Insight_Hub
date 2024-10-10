import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { faYoutube, faAmazon, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

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
                        color: white
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
                        color: white;
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
                `}
            </style>

            <div className='homee'>
                <div className="container">
                    <div class="home-content">
                        <h1>Hi {user.name}, we are Insight Hub.</h1>
                        <h3>Dedicated to Insightful Sentimental Analysis.</h3>
                        <p>Specialising in analysing Youtube Comment Sentiment and Amazon product reviews, LinkdeIn posts and more!</p>
                        <div class="btn-box">
                            <Link to="/addproject" >Youtube</Link>
                            <Link to="/addproject" >LinkedIn</Link>
                            <Link to="/addproject" >Amazon</Link>
                        </div>
                    </div>

                    <div className="home-sci">
                        <Link to="/addproject"><FontAwesomeIcon icon={faYoutube} /></Link>
                        <Link to="/addproject"><FontAwesomeIcon icon={faAmazon} /></Link>
                        <Link to="/addproject"><FontAwesomeIcon icon={faLinkedin} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
};
