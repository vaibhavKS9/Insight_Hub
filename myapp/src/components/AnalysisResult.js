import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AnalysisResult = (props) => {
  const [imageSrc, setImageSrc] = useState('');
  const [summary, setSummary] = useState('');
  const { code } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/analysis-result/image/${code}`, {
          responseType: 'arraybuffer',
        });
        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/analysis-result/summary/${code}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchImage();
    fetchSummary();
  }, [code]);

  return (
    <>
    <styles>{`
      .container{
        top: 80px; /* Adjusted position by 70px */
      }
    
    `}</styles>
    <div className="container my-5" >
      {imageSrc && 
        <div className="image-container" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
          <img src={imageSrc} alt="Analysis Result" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
        </div>
      }
      {summary && 
        <div className="summary" style={{ color: props.mode === 'light' ? 'black' : 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
          {summary}
        </div>
      }
    </div>
    </>
  );
};

export default AnalysisResult;

// Add CSS styles directly within the component file
const styles = `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.summary {
  font-size: 18px;
  background-color: #0f7bdb;
}

.image-container {
  margin-bottom: 20px;
}
`;

// Inject the CSS styles into the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const AnalysisResult = () => {
//   const [mainDescriptionSummary, setMainDescriptionSummary] = useState('');
//   const [clubbedDescriptionSummary, setClubbedDescriptionSummary] = useState('');
//   const [positiveSummary, setPositiveSummary] = useState('');
//   const [negativeSummary, setNegativeSummary] = useState('');
//   const [transcriptSummary, setTranscriptSummary] = useState('');
//   const [imageSrc, setImageSrc] = useState('');
//   const [error, setError] = useState('');
//   const { code } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch summary data
//         const response = await axios.get(`http://127.0.0.1:5000/analysis-result/summary/${code}`);
        

//         if (response.data['project_type'] === 'linkedin') {
//           setMainDescriptionSummary(response.data['main_description_summary']);
//           setClubbedDescriptionSummary(response.data['clubbed_description_summary']);
//         } else if (response.data['project_type']) {
//           setPositiveSummary(response.data['positive_summary']);
//           setNegativeSummary(response.data['negative_summary']);
//           setTranscriptSummary(response.data['transcript_summary']);
//         } else {
//           setError('Unknown project type');
//         }

//         // Fetch image data
//         const imageResponse = await axios.get(`http://127.0.0.1:5000/analysis-result/image/${code}`, {
//           responseType: 'arraybuffer',
//         });
//         const blob = new Blob([imageResponse.data], { type: 'image/png' });
//         const imageUrl = URL.createObjectURL(blob);
//         setImageSrc(imageUrl);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data');
//       }
//     };

//     fetchData();
//   }, [code]);

//   return (
//     <div className="container my-5" style={{ marginTop: '80px' }}>
//       {imageSrc && 
//         <div className="image-container" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <img src={imageSrc} alt="Analysis Result" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
//         </div>
//       }
//       {mainDescriptionSummary && 
//         <div className="summary" style={{ color: 'black', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <h3>Main Description Summary:</h3>
//           <p>{mainDescriptionSummary}</p>
//         </div>
//       }
//       {clubbedDescriptionSummary && 
//         <div className="summary" style={{ color: 'black', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <h3>Clubbed Description Summary:</h3>
//           <p>{clubbedDescriptionSummary}</p>
//         </div>
//       }
//       {positiveSummary && 
//         <div className="summary" style={{ color: 'black', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <h3>Positive Summary:</h3>
//           <p>{positiveSummary}</p>
//         </div>
//       }
//       {negativeSummary && 
//         <div className="summary" style={{ color: 'black', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <h3>Negative Summary:</h3>
//           <p>{negativeSummary}</p>
//         </div>
//       }
//       {transcriptSummary && 
//         <div className="summary" style={{ color: 'black', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', marginTop: '20px', border: '5px solid #a0d6ff', padding: '20px', borderRadius: '10px' }}>
//           <h3>Transcript Summary:</h3>
//           <p>{transcriptSummary}</p>
//         </div>
//       }
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default AnalysisResult;
