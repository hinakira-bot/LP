import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled, loading = false, type = "button" }) => {
    const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-sm",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
        danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        outline: "border border-white/20 text-white hover:bg-white/10"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(baseStyle, variants[variant], className)}
        >
            {loading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
            {children}
        </button>
    );
};
