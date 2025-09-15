import React from 'react';

export default function Tooltip({ text, children }) {
  return (
    <span className="relative group">
      {children}
      <span className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
      </span>
    </span>
  );
} 