import React from 'react';
import { User, useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

export default function NarrowSidebar(props) {
    const { user, isAuthenticated } = useAuth0();
    const { logout } = useAuth0();

    return (
        <div style={{
            position: 'fixed',
            top: '50px',  // Height of the navbar
            left: '0',
            width: '250px',
            height: 'calc(100vh - 100px)',  // Full height minus navbar and footer height
            overflowY: 'auto',  // Scrollable
            zIndex: '98',  // Place it below the navbar
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}>
            <style>
                {`
                    :root {
                        --custom-bg-color: ${props.mode === 'light' ? 'black' : 'black'};
                        --custom-text-color: ${props.mode === 'light' ? 'dark' : 'white'};
                    }
                    
                    .sidebar {
                        background-color: var(--custom-bg-color);
                        color: var(--custom-text-color);
                    }
                    .nav-link:hover {
                        cursor: pointer;
                    }
                `}
            </style>

            
                <div className="sidebar sidebar-dark sidebar-narrow-unfoldable border-end" style={{ flex: '1', height: '100%'}}>
                    <div className="sidebar-header border-bottom">
                        <div className="sidebar-brand" style={{fontWeight:'bold',fontSize:'24px', position:'fixed'}}>≡</div>
                    </div>
                    <ul className="sidebar-nav" style={{ height: '100%', overflowY: 'auto' }}>
                        <li className="nav-title">Menu</li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="nav-icon cil-speedometer"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addproject">
                                <i className="nav-icon cil-speedometer"></i> Add Project
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/yourprojects">
                                <i className="nav-icon cil-speedometer"></i> Your Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/community">
                                <i className="nav-icon cil-speedometer"></i> Community Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback">
                                <i className="nav-icon cil-speedometer"></i> Feedback Form
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/chatbot">
                                <i className="nav-icon cil-speedometer"></i> AI-ChatBot
                            </Link>
                        </li>
                        <li className="nav-item my-10">
                            <Link className="nav-link" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                <div className="rounded-circle overflow-hidden me-2" style={{ width: '30px', height: '30px' }}>
                                    <img src={user.picture} alt={user.name} className="img-fluid" />
                                </div> 
                                <i className="nav-icon cil-speedometer"></i>LogOut
                            </Link>
                        </li>
                    </ul>
                </div>
            
        </div>
    );
}
