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
        className="simple-card"
        style={{
          padding: '2rem 1.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '2px',
              color: 'var(--uc-gold)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            🧭 EXPEDITION LOG DOSSIER
          </div>
          <h1
            style={{
              fontSize: '1.85rem',
              color: '#2A2017',
              margin: '0.2rem 0 0.5rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '1px',
            }}
          >
            Register Your Alias
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#584937',
              margin: 0,
            }}
          >
            Every treasure hunter needs a map. Yours starts here — enter your coordinates to begin.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                color: '#584937',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
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
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid #C5A059',
                borderRadius: '6px',
                color: '#2A2017',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                color: '#584937',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
              }}
            >
              ✦ Guild / Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid #C5A059',
                borderRadius: '6px',
                color: '#2A2017',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
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
                fontFamily: 'var(--font-mono)',
                color: '#584937',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
              }}
            >
              ✦ Coordinates (Email)
            </label>
            <input
              type="email"
              placeholder="hunter@expedition.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid #C5A059',
                borderRadius: '6px',
                color: '#2A2017',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            className="simple-btn-primary gold-pulse"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.9rem',
              fontSize: '1rem',
            }}
          >
            Mark the Map & Begin Expedition 🗺️
          </button>
        </form>
      </div>
    </div>
  );
}

