// src/components/TimelineSlider.jsx
import { useState } from 'react';

export default function TimelineSlider({ year, setYear }) {
  const minYear = 2001;
  const maxYear = 2024;

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label>
        <strong>Year:</strong> {year}
      </label>
      <input
        type="range"
        min={minYear}
        max={maxYear}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          background: '#4b5563',
          outline: 'none',
          marginTop: '8px'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af' }}>
        <span>{minYear}</span>
        <span>{maxYear}</span>
      </div>
    </div>
  );
}