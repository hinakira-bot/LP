import React from 'react';

export const Slider = ({ value, min, max, step = 1, onChange, unit = '' }) => (
    <div className="flex items-center gap-3">
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-xs text-gray-400 w-12 text-right font-mono">{value}{unit}</span>
    </div>
);
