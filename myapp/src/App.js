import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import React, {useState} from 'react';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import AddProject from './components/AddProject';
import Unlogged from './components/Unlogged';
import { useAuth0 } from '@auth0/auth0-react';
import Chatbot from './components/Chatbot';
import axios from 'axios';
import Feedback from './components/Feedback';
import CommunityPage from './components/CommunityPage';
import AnalysisResult from './components/AnalysisResult';
import ProjectList from './components/ProjectList';
// import InsightHub from './components/InsightHub';

axios.defaults.baseURL = 'http://localhost:5000';

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
      <div className="loading-text">Loading...</div>
    </div>

    </>
  );
}

function App() {

  const [mode, setmode]=useState('dark');
  console.log("mode ",mode)
  document.body.style.backgroundColor='#212020';
  const [alert, setAlert] = useState(null);
  const { isAuthenticated , isLoading} = useAuth0();

  const showAlert=(message,message_type,argument)=>{
    setAlert({
      msg:message,
      type:message_type,
      arg:argument
  })
  setTimeout(()=>{
    setAlert(null);

  },1500);
  // AUTO REMOVAL OF ALERT
  }

  const toggleMode=()=>{
    if(mode==='light'){
      setmode('dark');
      document.body.style.backgroundColor='#212020';
      showAlert("DARK MODE ENABLED","success");
      // document.title='dark mode';
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      showAlert("LIGHT MODE ENABLED","success");
    }
  }
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
<style>
                {`
                    body {

                      background-image: url(${require('./home6.png')});

                      background-repeat: repeat-y;
                      background-attachment: fixed;
                    }
                `}
            </style>

<Router basename="/">

<Navbar title='Home' mode={mode} toggleMode={toggleMode} alert={alert}/>


  {isAuthenticated ? (
    <>
    <Sidebar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/addproject" element={<AddProject />} />
      <Route path="/chatbot"  element={<Chatbot />} />
      <Route path="/feedback"  element={<Feedback />} />
      <Route path="/community"  element={<CommunityPage />} />
      <Route path="/analysis/:code" element={<AnalysisResult />} />
      <Route path="/yourprojects" element={<ProjectList />} />
      {/* <Route path="/insighthub" element={<InsightHub/>} /> */}

    </Routes>
    </>
  ) : (
    <Unlogged/> // Render the Unlogged component if the user is not authenticated
  )}


</Router>

{/* <footer class="footer fixed-bottom" style={{ backgroundColor: '#343a40', color: 'white' }}>
  <div>
    <a href="https://coreui.io">CoreUI</a>
    <span>&copy; 2022 creativeLabs.</span>
  </div>
  <div>
    <span>Powered by</span>
    <a href="https://coreui.io">CoreUI</a>
  </div>
</footer>       */}
      
    


  
    </>
  );
}

export default App;
