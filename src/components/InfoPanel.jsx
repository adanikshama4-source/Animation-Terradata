// src/components/InfoPanel.jsx
export default function InfoPanel({ year }) {
    const stories = {
      2001: "Terra satellite begins global land cover monitoring.",
      2010: "Rapid urban expansion in Asia and Africa.",
      2020: "Record Amazon deforestation in Brazil.",
      2024: "Global reforestation efforts show early success."
    };
  
    return (
      <div style={{
        background: 'rgba(30, 41, 59, 0.7)',
        padding: '1rem',
        borderRadius: '8px',
        color: '#f1f5f9'
      }}>
        <h3 style={{ marginTop: 0 }}>🌍 Earth Science Story</h3>
        <p>{stories[year] || "Explore 25 years of land cover change from NASA Terra."}</p>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          Data: NASA Terra MODIS MCD12Q1 (2001–2024)
        </p>
      </div>
    );
  }