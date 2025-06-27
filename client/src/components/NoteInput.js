import React, { useState } from 'react';
import axios from 'axios';

const NoteInput = ({ onNodesGenerated }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        'https://3ad7-34-16-252-90.ngrok-free.app/process',
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      console.log("🧩 Backend response:", response.data);
      onNodesGenerated(response.data);
    } catch (err) {
      console.error('Error processing text:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <textarea
        placeholder="Paste your notes here..."
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
          outline: 'none',
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#BA487F',
          color: '#fff',
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '6px',
          marginTop: '0.5rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {loading ? 'Processing...' : 'Generate Mind Map'}
      </button>
    </div>
  );
};

export default NoteInput;
