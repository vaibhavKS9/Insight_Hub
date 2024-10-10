import React from 'react';

const FeedbackForm = () => {
  return (
    <>
    <style>{`
    .feedbackk{
      position: relative;
      top: 80px; /* Adjusted position by 70px */
    }
    
    `}</style>
    <div className='feedbackk'>
    <div className="feedback-container" style={{ backgroundColor: '#1A1A2E', marginTop: '50px' }}>
      <h2 className="feedback-heading" style={{ color: 'white' }}>Feedback Form</h2>
      <form className="feedback-form" action="https://formspree.io/f/mqkrjzyg" method="POST">
        <input type="hidden" name="_to" value="downtownknight009@gmail.com" /> {/* Your email address */}
        <div className="input-group">
          <label htmlFor="name" style={{ color: 'white' }}>Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="input-group">
          <label htmlFor="email" style={{ color: 'white' }}>Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="input-group">
          <label htmlFor="feedback" style={{ color: 'white' }}>Feedback:</label>
          <textarea id="feedback" name="feedback"></textarea>
        </div>
        <button type="submit" className="ask-button">Submit</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default FeedbackForm;

// CSS Styles
const styles = `
  .feedback-container {
    margin: 50px auto;
    max-width: 600px;
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .feedback-heading {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .feedback-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    margin-bottom: 30px;
    width: 100%;
    max-width: 400px;
    text-align: left;
  }

  label {
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }

  input, textarea {
    padding: 15px;
    border: 2px solid #ccc;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  textarea {
    min-height: 150px;
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
    background-color: #ff7f00;
    transform: translateY(-2px);
  }
`;

// Inject styles into head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
