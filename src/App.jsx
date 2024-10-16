import { useState } from 'react';
import "./App.css"

const App = () => {
  const [inputText, setInputText] = useState('');
  const [details, setDetails] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/extract-details', {
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
    <div style={{ padding: '20px' }}>
      <h1>Extract Customer Details</h1>
      <textarea
        rows="10"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Paste text here"
      />
      <br />
      <button onClick={getDetails}>Get Details</button>

      {details && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Details:</h3>
          <p>{details}</p>
        </div>
      )}
    </div>
  );
};

export default App;
