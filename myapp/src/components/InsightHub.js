import React from 'react'


export default function InsightHub() {

  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;

}

body {
    background: #081b29;
    color: #ededed;
    background: url('home7.png') no-repeat; 

}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 10%;
    background: transparent;
    display: flex;
    justify-content:space-between;
    align-items: center;
    z-index: 100;

}

.logo {
    position:relative;
    font-size: 25px;
    color: #ededed;
    text-decoration: none;
    font-weight: 600;


}



.home {
    height:100vh;  
   
    background-size: cover;
    background-position: center;
    display:flex;
    align-items: center;
    padding: 0 10%;

}

.home-content  {
    max-width: 1000px;
}

.home-content h1{
    position: relative;
    font-size: 56px;
    font-weight: 700;
    line-height: 1.2;

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

}



.home-content .btn-box {
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
    bottom: 80px;
    width: 170px;
    display: flex;
    justify-content: space-between;

}

.home-bottom  {
    position: absolute;
    bottom: 12px;
    width: 300px;
    font-size: 10px;
    font-style: #00abf0;

}


.home-sci a{
    position: relative;
    display: inline-flex;
    justify-content:center;
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


.home-sci a::before{
    content:'';
    position: absolute;
    top:0;
    left:0;
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
    100%{
        width:0;
    }
}



.container {
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    left: 400px;
    width: 700px;
    height: 750px; 
    padding-top: 50px;
    margin: 10px;
    justify-content: center;
    
  }
  
  .box {
    width: 330px;
    height: 330px;
    background-color: #00abf0;
    
}
  
.h1{
      color: white;
      }


  
  .home {
  height:100vh;  
  /* background: url('home6.png') no-repeat; */
  background-size: cover;
  background-position: center;
  display:flex;
  align-items: center;
  padding: 0 10%;
  
  }
  
  .logo {
  position:relative;
  font-size: 25px;
  color: #ededed;
  text-decoration: none;
  font-weight: 600;
  
  
  
  }
  
  
 


  /* SIDE BAR NAVIGATION */

  .side-nav{
    width: 70px;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    padding: 30px 15px;
    background: rgba(255,255,255,0.2);
    backdrop-filter:blur(5px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: width 0.5s;

  }

  .user{
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 60px;
    font-size: 12px;
    padding: 10px;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  .user div{
    display:none;

  }

  .user h2{
    font-size: 15px;
    font-weight: 600;
    white-space: no wrap;

  }

  .user-img {
    width: 40px;
    border-radius: 50%;
    margin: auto;

  }

  .star-img {
    width: 20px;
    display: none;

  }
  ul{
    list-style: none;
    padding: 0 15px;
    text-decoration: none;

  }

  ul li{
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    justify-content: center;

}

ul li img{
    width: 30px;
    margin-right: 0px;

}

ul li p{
    white-space: nowrap;
    display: none;
}


.side-nav:hover{
    width:250px;

}

.side-nav:hover .user div{
    display: block;
}

.side-nav:hover .user {
    width:100%;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur;

}

.side-nav:hover .star-img{
    display: block;
}

.side-nav:hover .user-img{
    margin: 0;

}

.side-nav:hover ul li p{
    display:block;

}

.side-nav:hover img{
    margin-right: 10px;

}

.side-nav:hover ul li{
    justify-content: flex-start;
}

  

 `}</style>
 <div className='container'>
    <div className="header">
        <a href='#' className="logo">Insights.</a>
        <div className="side-nav">
            <div className="user">
                <img src="setting.png" className="user-img" alt="User Settings"/>
                <div>
                    <h2>Insights.</h2>
                    <p>IIT Ropar</p>
                </div>
                <img src="star.png" className="star-img" alt="Star Icon"/>
            </div>
            <ul>
                <li><img src="home.png" alt="Home Icon"/><p>Home</p></li>
                <li><img src="projects.png" alt="Projects Icon"/><p>Add Projects</p></li>
                <li><img src="projects.png" alt="Projects Icon"/><p>Your Projects</p></li>
                <li><img src="community.png" alt="Community Icon"/><p>Community</p></li>
                <li><img src="feedbackform.png" alt="Feedback Form Icon"/><p>Feedback Form</p></li>
                <li><img src="aichatbot.png" alt="AI Chatbot Icon"/><p>AI Chatbot</p></li>
            </ul>
            <ul>
                <li><img src="logout.png" alt="Logout Icon"/><p>Log Out</p></li>
            </ul>
        </div>
    </div>
    <section className="home">
        <div className="home-content">
            <h1>Hi, we are Insights Hub.</h1>
            <h3>Dedicated to Insightful Sentimental Analysis.</h3>
            <p>Specialising in analysing Amazon product reviews, LinkedIn posts and more!</p>
            <div className="btn-box">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Youtube</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">Amazon</a>
            </div>
        </div>
        <div className="home-sci">
            <a href="#"><i className='bx bxl-amazon'></i></a>
            <a href="#"><i className='bx bxl-youtube'></i></a>
            <a href="#"><i className='bx bxl-linkedin'></i></a>
        </div>
        <span className="home-imgHover"></span>
    </section>
    </div>
</>
  )
}
