'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

const departmentOptions = [
  "AI-DS", "CSE-DS", "COMPS", "EXTC", "MECH",
  "VLSI", "IT", "CIVIL", "MMS"
];

interface ExpeditionDossierProps {
  onSuccess: () => void;
}

export default function ExpeditionDossier({ onSuccess }: ExpeditionDossierProps) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !department) {
      alert('Please complete all fields before continuing.');
      return;
    }

    login({ name, department, email });
    onSuccess();
  };

  return (
    <div
      style={{
        maxWidth: '460px',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="simple-card vintage-border"
        style={{
          padding: '2.25rem 1.75rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Corner Embellishments */}
        <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '0.8rem', color: '#A88448', pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.8rem', color: '#A88448', pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '0.8rem', color: '#A88448', pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '0.8rem', color: '#A88448', pointerEvents: 'none' }}>✦</div>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '3px',
              color: '#652B19',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
            }}
          >
            🧭 EXPEDITION LOG DOSSIER • N° 1897
          </div>
          <h1
            style={{
              fontSize: '2rem',
              color: '#2C1E14',
              margin: '0.2rem 0 0.5rem',
              fontFamily: 'var(--font-title)',
              letterSpacing: '1.5px',
              textShadow: '0 1px 1px rgba(255,255,255,0.6)',
            }}
          >
            Register Your Alias
          </h1>
          <p
            style={{
              fontSize: '0.95rem',
              color: '#523D24',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: '1.4',
            }}
          >
            &quot;Every lost treasure requires a map. Yours begins here — log your credentials to chart the uncharted.&quot;
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#422F1B',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '5px',
              }}
            >
              ✦ Explorer Alias (Full Name)
            </label>
            <input
              type="text"
              placeholder="e.g. Nathan Drake"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 0.9rem',
                backgroundColor: '#FFFDF7',
                border: '1.5px solid #A88448',
                borderRadius: '4px',
                color: '#2C1E14',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#422F1B',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '5px',
              }}
            >
              ✦ Guild / Department Sector
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 0.9rem',
                backgroundColor: '#FFFDF7',
                border: '1.5px solid #A88448',
                borderRadius: '4px',
                color: '#2C1E14',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              }}
            >
              <option value="" disabled>Select Department Sector...</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#422F1B',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '5px',
              }}
            >
              ✦ Coordinates (Email Address)
            </label>
            <input
              type="email"
              placeholder="hunter@expedition.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 0.9rem',
                backgroundColor: '#FFFDF7',
                border: '1.5px solid #A88448',
                borderRadius: '4px',
                color: '#2C1E14',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              }}
            />
          </div>

          <button
            type="submit"
            className="simple-btn-primary gold-pulse"
            style={{
              marginTop: '0.6rem',
              width: '100%',
              padding: '0.95rem',
              fontSize: '0.95rem',
            }}
          >
            Mark the Map & Begin Expedition 🗺️
          </button>
        </form>
      </div>
    </div>
  );
}

