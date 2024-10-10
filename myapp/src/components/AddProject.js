// import React, { useState, useEffect, useRef } from 'react';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faYoutube, faAmazon, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';




// export default function AddProject(props) {

//     const [buttonTop, setButtonTop] = useState('75px'); // Initial top position
//     const { isAuthenticated, loginWithRedirect, user } = useAuth0();
//     const [showOptions, setShowOptions] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [projects, setProjects] = useState([]);
//     const linkInputRef = useRef(null);

//     const handleAddProjectClick = () => {
//         setShowOptions(true);
//     };

//     const handleOptionClick = (option) => {
//         setSelectedOption(option);
//     };

//     const handleScroll = () => {
//         const scrollPosition = window.scrollY;

//         // Adjust top position based on scroll position
//         if (scrollPosition > 75) { // Change this value based on your design
//             setButtonTop('5px');
//         } else {
//             setButtonTop('75px');
//         }
//     };

//     const handleAnalyseClick = async () => {
//         const link = linkInputRef.current.value;
//         const projectType = selectedOption;
    
//         console.log('Analyzing:', link);
    
//         try {
//             const response = await axios.post('/api/projects', {
//                 userId: user.email,
//                 name: user.name,
//                 email: user.email,
//                 projectType: projectType,
//                 projectLink: link,
//             });
    
//             console.log('Project added:', response.data);
    
//             // Add the newly added project to the projects state
//             setProjects([...projects, response.data]);
    
//             linkInputRef.current.value = ''; // Clear input field after submission
    
//         } catch (error) {
//             console.error('Error adding project:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchProjects = async () => {
//             if (isAuthenticated && user.sub) {
//                 try {
//                     const response = await axios.get(`/api/projects?userId=${user.email}`);
//                     console.log(response.data); // Log the response data to see what you're getting
//                     setProjects(response.data);
//                 } catch (error) {
//                     console.error('Error fetching projects:', error);
//                     alert('Error fetching projects. Please try again later.');
//                 }
//             }
//         };

//         fetchProjects();
//     }, [isAuthenticated, user]);

//     return (
//         <>
//         <div style={{
//             position: 'fixed',
//             top: '75px',
//             left:'40%',
//             fontFamily: 'Arial, sans-serif',
//             backgroundColor: '#f9f9f9',
//             color: '#333',
//             margin: '0',
//             padding: '0',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '10vh',
//         }}>
//             <style>
//                 {`
//                             body {
//                                 font-family: Arial, sans-serif;
//                                 background-color: #f9f9f9;
//                                 color: #333;
//                                 margin: 0;
//                                 padding: 0;
//                                 display: flex;
//                                 justify-content: center;
//                                 align-items: center;
//                                 height: 100vh;
//                             }
//                             .container {
//                                 text-align: center;
//                             }
//                             .btn {
//                                 padding: 15px 30px;
//                                 font-size: 1.2em;
//                                 background: #f09433; 
//                                 background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
//                                 background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
//                                 background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
//                                 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
//                                 color: #fff;
//                                 border: none;
//                                 border-radius: 25px;
//                                 cursor: pointer;
//                                 box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//                                 transition: background-color 0.3s ease, transform 0.2s ease;
//                                 outline: none;
//                             }
//                             .btn:hover {
//                                 background-color: #e88228;
//                                 transform: translateY(-5px);
//                             }
//                             .btn:active {
//                                 transform: translateY(3px);
//                                 box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//                             }
//                             .icon-btn {
//                                 background-color: transparent;
//                                 color: #999; /* Gray */
//                                 padding: 15px 25px;
//                                 font-size: 2em;
//                                 margin: 10px;
//                                 border: none;
//                                 cursor: pointer;
//                                 transition: transform 0.2s ease;
//                             }
//                             .icon-btn.hovered,
//                             .icon-btn:hover {
//                                 transform: translateY(-5px);
//                             }
//                             .icon-btn:active {
//                                 transform: translateY(3px);
//                             }
//                             .icon-btn.youtube:hover,
//                             .icon-btn.youtube.hovered {
//                                 color: #ff0000; /* Red */
//                             }
//                             .icon-btn.amazon:hover,
//                             .icon-btn.amazon.hovered {
//                                 color: black; /* Black */
//                             }
//                             .icon-btn.linkedin:hover,
//                             .icon-btn.linkedin.hovered {
//                                 color: #0077b5; /* Blue */
//                             }
//                             .options {
//                                 margin-top: 30px;
//                             }
//                             .option {
//                                 display: inline-block;
//                                 margin: 0 20px;
//                                 text-align: center;
//                             }
//                             .option a {
//                                 text-decoration: none;
//                                 color: inherit;
//                             }
//                             .option i {
//                                 font-size: 3em;
//                                 margin-bottom: 15px;
//                             }
//                             .option span {
//                                 display: block;
//                                 margin-top: 10px;
//                                 font-size: 1.5em;
//                             }
//                             #linkInput {
//                                 margin-top: 20px;
//                                 padding: 10px;
//                                 width: 300px;
//                                 border-radius: 25px;
//                                 border: 1px solid #ccc;
//                                 font-size: 1em;
//                             }
//                 `}
//             </style>
//             <div className="container" style={{ backgroundColor: props.mode === 'light' ? 'white' : '#212020' }}>
//                 {!showOptions && (
//                     <button id="addProjectBtn" className="btn" onClick={handleAddProjectClick}>
//                         <FontAwesomeIcon icon={faPlus} /> Add Project
//                     </button>
//                 )}
//                 {showOptions && (
//                     <div className="options">
//                         <button className={`icon-btn youtube${selectedOption === 'youtube' ? ' hovered' : ''}`} onClick={() => handleOptionClick('youtube')}>
//                             <FontAwesomeIcon icon={faYoutube} />
//                         </button>
//                         <button className={`icon-btn amazon${selectedOption === 'amazon' ? ' hovered' : ''}`} onClick={() => handleOptionClick('amazon')}>
//                             <FontAwesomeIcon icon={faAmazon} />
//                         </button>
//                         <button className={`icon-btn linkedin${selectedOption === 'linkedin' ? ' hovered' : ''}`} onClick={() => handleOptionClick('linkedin')}>
//                             <FontAwesomeIcon icon={faLinkedin} />
//                         </button>
//                     </div>
//                 )}
//                 {selectedOption && (
//                     <div id="linkContainer">
//                         <input type="text" id="linkInput" ref={linkInputRef} placeholder="Enter link..." />
//                         <button id="analyseBtn" className="btn mx-2" onClick={handleAnalyseClick}>Analyse</button>
//                     </div>
//                 )}
//             </div>


            
//         </div>
        
//         {/* Scrollable Container for Project Cards */}
//         <div style={{
//             marginTop: '15vh',
//             marginLeft: '20vh',
//             width: '80%',
//             overflowY: 'auto',
//             maxHeight: '65vh',
//         }}>
//             <h1>Your Projects</h1>
//             <div className="project-list">
//                 {projects.map((project) => (
//                     <div key={project._id} className="project-card" style={{
//                         border: '1px solid #ccc',
//                         borderRadius: '5px',
//                         padding: '10px',
//                         margin: '10px',
//                         maxWidth: '100%',
//                         wordWrap: 'break-word',
//                     }}>
//                         <h2>{project.name}</h2>
//                         <p>Email: {project.email}</p>
//                         <p>Type: {project.projectType}</p>
//                         <p>Link: <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a></p>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         </>
        
//     );
    
  
// };




import React, { useState, useRef } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faAmazon, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Loading() {
    return (
      <>
      <style>
        {`body {
              font-family: 'Arial', sans-serif;
              background-color: #black;
              color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              padding: 0;
          }
  
          .loading-container {
              text-align: center;
              animation: fadeIn 1s ease-in-out forwards;
          }
  
          .loading-text {
              font-size: 1.5em;
              margin-top: 20px;
          }
  
          .loading-spinner {
              border: 4px solid rgba(255, 255, 255, 0.3);
              border-top: 4px solid #61dafb;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              animation: spin 1s linear infinite;
              margin-bottom: 20px;
          }
  
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
  
          @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
          }`}
      </style>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text" style={{color:'white'}}>ANALYZING...</div>
      </div>
  
      </>
    );
  }

export default function AddProject(props) {
    const { isAuthenticated, user } = useAuth0();
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const linkInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const [analysisCode, setAnalysisCode] = useState(null);

    const handleAddProjectClick = () => {
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleAnalyseClick = async () => {
        try {
            const projectLink = linkInputRef.current.value;
            
            if (!projectLink) {
                alert('Please enter a project link');
                return;
            }

            if (!selectedOption) {
                alert('Please select a project type');
                return;
            }
            setLoading(true)
            if(selectedOption=='youtube'){
                    
                const response = await axios.post('http://127.0.0.1:8080/analyze', { 
                    name: user.name,
                    email: user.email,
                    projectLink: projectLink,
                    projectType: selectedOption, 
                });
                const { code } = response.data;
                setAnalysisCode(code);
                setLoading(false)
            }
            if(selectedOption=='amazon'){
            
                const response = await axios.post('http://127.0.0.1:8080/analyze', { 
                    name: user.name,
                    email: user.email,
                    projectLink: projectLink,
                    projectType: selectedOption,
                });
                const { code } = response.data;
                setAnalysisCode(code);
                setLoading(false)
            }
            if(selectedOption=='linkedin'){
            
                const response = await axios.post('http://127.0.0.1:8080/analyze', { 
                    name: user.name,
                    email: user.email,
                    projectLink: projectLink,
                    projectType: selectedOption, 
                });
                const { code } = response.data;
                setAnalysisCode(code);
                setLoading(false)
            }
            // Send POST request to save the project
            // await axios.post('/api/projects', {
            //     userId: user.email,
            //     name: user.name,
            //     email: user.email,
            //     projectType: selectedOption,
            //     projectLink: projectLink,
            // });

            // Clear input field after submission
            linkInputRef.current.value = '';

            // Reset selectedOption and hide options
            setSelectedOption('');
            setShowOptions(false);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
            }}>
                <style>
                    {`
                        .btn {
                            padding: 15px 30px;
                            font-size: 1.2em;
                            background: #f09433; 
                            background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
                            background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
                            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
                            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
                            color: #fff;
                            border: none;
                            border-radius: 25px;
                            cursor: pointer;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                            transition: background-color 0.3s ease, transform 0.2s ease;
                            outline: none;
                        }
                        .btn:hover {
                            background-color: #e88228;
                            transform: translateY(-5px);
                        }
                        .btn:active {
                            transform: translateY(3px);
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        .icon-btn {
                            background-color: transparent;
                            color: #999; /* Gray */
                            padding: 15px 25px;
                            font-size: 2em;
                            margin: 10px;
                            border: none;
                            cursor: pointer;
                            transition: transform 0.2s ease;
                        }
                        .icon-btn.hovered,
                        .icon-btn:hover {
                            transform: translateY(-5px);
                        }
                        .icon-btn:active {
                            transform: translateY(3px);
                        }
                        .icon-btn.youtube:hover,
                        .icon-btn.youtube.hovered {
                            color: #ff0000; /* Red */
                        }
                        .icon-btn.amazon:hover,
                        .icon-btn.amazon.hovered {
                            color: ${props.mode === 'light' ? 'black' : 'black'}; /* Black */
                        }
                        .icon-btn.linkedin:hover,
                        .icon-btn.linkedin.hovered {
                            color: #00008B; /* Blue */
                        }
                        #linkInput {
                            margin-top: 20px;
                            padding: 10px;
                            width: 300px;
                            border-radius: 25px;
                            border: 1px solid #ccc;
                            font-size: 1em;
                        }
                    `}
                </style>
                {!showOptions && (
                    <button className="btn" onClick={handleAddProjectClick}>
                        <FontAwesomeIcon icon={faPlus} /> Add Project
                    </button>
                )}
                {showOptions && (
                    <>
                    {!loading &&(
                        <>
                        <div className="options">
                            <button className={`icon-btn youtube${selectedOption === 'youtube' ? ' hovered' : ''}`} onClick={() => handleOptionClick('youtube')}>
                                <FontAwesomeIcon icon={faYoutube} />
                            </button>
                            <button className={`icon-btn amazon${selectedOption === 'amazon' ? ' hovered' : ''}`} onClick={() => handleOptionClick('amazon')}>
                                <FontAwesomeIcon icon={faAmazon} />
                            </button>
                            <button className={`icon-btn linkedin${selectedOption === 'linkedin' ? ' hovered' : ''}`} onClick={() => handleOptionClick('linkedin')}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </button>
                        </div>
                        <div>
                            <input type="text" id="linkInput" ref={linkInputRef} placeholder="Enter link..." />
                            <button className="btn mx-2" onClick={handleAnalyseClick}>Analyse</button>
                        </div>
                        </>
                    )}
                    {loading &&(
                        <Loading/>
                    )}

                    </>
                )}
                
                {analysisCode && (
                    <Link to={`/analysis/${analysisCode}`}>View Analysis Result</Link>
                )}
            </div>
        </>
    );
}


