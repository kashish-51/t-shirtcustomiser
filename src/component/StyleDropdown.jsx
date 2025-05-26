import React, { useState, useRef, useEffect } from 'react';
import './StyleDropdown.css';

const options = ['Lean', 'Reg', 'Athletic', 'Big'];

export default function StyleDropdown({ layout }) {
  const [selected, setSelected] = useState('Modern');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = layout === 2;

  return (
    <div className={`dropdown-wrapper ${isDark ? 'dark' : 'light'}`} ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <span className="dropdown-label">Style:</span>
        <span className="dropdown-selected">{selected}</span>
        <span className="arrow">▾</span>
      </button>

      {open && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${selected === option ? 'selected' : ''}`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
              {selected === option && <span className="checkmark">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
