import React from 'react';

export const ColorPicker = ({ value, onChange }) => (
    <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
        <div className="relative w-8 h-8 rounded cursor-pointer overflow-hidden border border-gray-600 flex-shrink-0">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute -top-1 -left-1 w-10 h-10 p-0 m-0 border-0 cursor-pointer"
            />
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-xs text-gray-200 focus:outline-none w-full font-mono uppercase"
            maxLength={7}
        />
    </div>
);
