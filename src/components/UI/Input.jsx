import React from 'react';
import clsx from 'clsx';

export const InputGroup = ({ label, children, className = "" }) => (
    <div className={`mb-5 ${className}`}>
        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold flex items-center gap-2">
            {label}
        </label>
        {children}
    </div>
);

export const TextInput = ({ value, onChange, placeholder, type = "text", className = "" }) => (
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
            "w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all",
            className
        )}
        placeholder={placeholder}
    />
);

export const TextArea = ({ value, onChange, placeholder, rows = 3, className = "" }) => (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
            "w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-600",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none",
            className
        )}
        placeholder={placeholder}
        rows={rows}
    />
);
