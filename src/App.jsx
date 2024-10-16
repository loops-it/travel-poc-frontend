import { useState } from 'react';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [details, setDetails] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getDetails = async () => {
    try {
      const response = await fetch('https://travel-poc-backend.vercel.app/extract-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }

      const data = await response.json();
      setDetails(data.extractedDetails);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
      <div className="container">
        <h1>Extract Customer Details</h1>
        <textarea
            rows="10"
            cols="50"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Paste text here"
            className="input-textarea"
        />
        <br />
        <button onClick={getDetails} className="get-details-button">
          Get Details
        </button>

        {details && (
            <div className="details-container">
              <h3>Extracted Details:</h3>
              <div className="detail-item">
                <strong>Name:</strong> {details.customerName || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Phone Number:</strong> {details.pNumber || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {details.email || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Expected Destination:</strong> {details.hopeToGo || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Expected Date:</strong> {details.date || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Expected Return Date:</strong> {details.return || 'Not provided'}
              </div>
              <div className="detail-item">
                <strong>Budget:</strong> {details.budget || 'Not provided'}
              </div>
            </div>
        )}
      </div>
  );
};

export default App;
