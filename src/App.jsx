// src/App.jsx
import { useState } from 'react';
import EarthGlobe from './components/EarthGlobe';
import TimelineSlider from './components/TimelineSlider';
import InfoPanel from './components/InfoPanel';
import './App.css';

export default function App() {
  const [currentYear, setCurrentYear] = useState(2024);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0f172a',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.6)'
      }}>
        {/* <h1>🛰️ Terra 25th Anniversary: Land Cover Through Time</h1> */}
        <p>An interactive 3D visualization using NASA Terra satellite data</p>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 3D Globe — ONLY ONE INSTANCE! */}
        <div style={{ flex: 3, height: '100%' }}>
          <EarthGlobe currentYear={currentYear} />
        </div>

        {/* Controls */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          background: 'rgba(15, 23, 42, 0.8)',
          overflowY: 'auto'
        }}>
          <TimelineSlider year={currentYear} setYear={setCurrentYear} />
          <InfoPanel year={currentYear} />
        </div>
      </div>
    </div>
  );
}