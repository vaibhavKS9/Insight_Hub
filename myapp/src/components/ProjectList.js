import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project ,props}) => {
    return (
      <div className="card" style={{backgroundColor: props.mode === 'light' ? '#E0FFEB' : '#1A1A2E'}} >
        <img 
          src={`data:image/png;base64,${project.image_binary}`} 
          alt="Project" 
          className="card-img-top" // Bootstrap class for image at the top of the card
          style={{ height: '200px', objectFit: 'cover' }} // Set height and object-fit for image
        />
        <div className="card-body d-flex flex-column" style={{color: props.mode === 'light' ? 'black' : 'white'}}>
          <h5 className="card-title">{project.name}</h5>
          <p className="card-text mb-0">{project.project_type}: <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-button">{project.video_title ? project.video_title.slice(0, 35) + '...' : project.link.slice(0, 35)}..</a></p>
          {/* <Link className="ask-button mt-2">View Analysis</Link> */}
          <Link to={`/analysis/${project.unique_code}`} className="ask-button mt-2">View Analysis</Link>
          
        </div>
      </div>
    );
  };
  

const ProjectList = (props) => {
  const [projects, setProjects] = useState([]);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchProjects = async () => {
      if (isAuthenticated && user.sub) {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/projects?userId=${user.email}`);
          console.log(response.data); // Log the response data to see what you're getting
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
          alert('Error fetching projects. Please try again later.');
        }
      }
    };

    fetchProjects();
  }, [isAuthenticated, user]);

  return (
    <div>
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
      <div className="container" style={{marginTop: '75px',marginBottom: '50px',position: 'relative'  }}>
        <div className="chat-header" style={{width: '100%'}}>YOUR PROJECTS</div>
        
        <div className="row my-3">
          {projects.map(project => (
            <div key={project._id} className="col-md-4 mb-4">
              <ProjectCard project={project} props={props}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
