import { useState } from 'react';
import EarthGlobe from './components/EarthGlobe';
import TimelineSlider from './components/TimelineSlider';
import InfoPanel from './components/InfoPanel';
import './App.css';

const START_YEAR = 2001;
const END_YEAR = 2024; 

export default function App() {
  const [currentYear, setCurrentYear] = useState(START_YEAR);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0f172a',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <header style={{
        textAlign: 'center',
        padding: '0.25rem',
        background: 'rgba(0,0,0,0.6)'
      }}>
        <h2>🛰️ Terra Land Cover Through Time ({START_YEAR} - {END_YEAR})</h2> 
        <p><i>An interactive 3D visualization using NASA Terra satellite data</i></p>
      </header>

      <div style={{ display: 'flex', flex: 2, overflow: 'hidden' }}>
        
        <div style={{ flex: 8, height: '100%', position: 'relative' }}> 
          <EarthGlobe 
            currentYear={currentYear} 
            startYear={START_YEAR}
            endYear={END_YEAR}
          />
        </div>

        <div style={{
          flex: 1,
          padding: '1.5rem',
          background: 'rgba(15, 23, 42, 0.8)',
          overflowY: 'auto'
        }}>
          <TimelineSlider 
            year={currentYear} 
            setYear={setCurrentYear} 
            startYear={START_YEAR} 
            endYear={END_YEAR}     
          />
          <InfoPanel year={currentYear} />
        </div>
      </div>
    </div>
  );
}
