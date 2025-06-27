import React, { useState } from 'react';
import NoteInput from './components/NoteInput';
import MindMap from './components/MindMap';

function App() {
  const [mindMapData, setMindMapData] = useState(null);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#FFECCC', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: 'auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 10px #722323' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#722323' }}>
          🧠 ThinkSpace — Smart Mind Map from Notes
        </h1>
        <NoteInput onNodesGenerated={setMindMapData} />
        {mindMapData && mindMapData.nodes && Array.isArray(mindMapData.nodes) && (
          <MindMap data={mindMapData} />
        )}
      </div>
    </div>
  );
}

export default App;
