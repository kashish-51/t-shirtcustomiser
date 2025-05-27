import React, { useEffect, useRef, useState } from 'react';
import { apply, isSupported } from 'https://cdn.skypack.dev/@oddbird/popover-polyfill/fn';
import './StyleDropdown.css'; // Assuming you have styles in StyleDropdown.css

const styles = [
'Lean',
'Regular',
'Atheletic',
'Big',
'Minimalist',


];

const StyleDropdown = () => {
  const [selectedStyle, setSelectedStyle] = useState('Minimalist');
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!isSupported()) apply();

    const pop = popoverRef.current;

    const selectOption = (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;

      setSelectedStyle(button.dataset.value);
    };

    const handleSelect = (event) => {
      if (event.newState === 'open') {
        pop.addEventListener('click', selectOption);
      } else {
        pop.removeEventListener('click', selectOption);
      }
    };

    pop.addEventListener('beforetoggle', handleSelect);

    return () => {
      pop.removeEventListener('beforetoggle', handleSelect);
      pop.removeEventListener('click', selectOption);
    };
  }, []);

  return (
    <div>
      <button popovertarget="pop">
        <span className='mr-2'>Style:</span>
        <span>{selectedStyle}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </button>

      <div id="pop" ref={popoverRef} popover="auto">
        <div className="popover__content">
          <ul>
            {styles.map((style) => (
              <li key={style}>
                <button
                  data-value={style}
                  data-selected={selectedStyle === style}
                  popovertarget="pop"
                  autoFocus={selectedStyle === style}
                >
                  {style}
                  {selectedStyle === style && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
};

export default StyleDropdown;
