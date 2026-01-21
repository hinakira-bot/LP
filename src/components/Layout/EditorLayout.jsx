import React, { useState } from 'react';
import { Sidebar } from '../Editor/Sidebar';
import { LivePreview } from '../Preview/LivePreview';
import { Settings, Smartphone, Monitor } from 'lucide-react';
import { DEFAULT_DATA } from '../../data/defaultData';
import { clsx } from 'clsx';

export const EditorLayout = () => {
    const [data, setData] = useState(DEFAULT_DATA);
    const [viewMode, setViewMode] = useState('desktop');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSectionId, setActiveSectionId] = useState(null);

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                data={data}
                setData={setData}
                setActiveSectionId={setActiveSectionId}
            />

            {/* Main Preview Area */}
            <div className="flex-1 flex flex-col relative bg-[#1a1a1a]">
                {/* View Mode Toggles */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 bg-[#222]/90 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl">
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={clsx(
                            "p-2 rounded-full transition-all",
                            viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        )}
                    >
                        <Smartphone size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={clsx(
                            "p-2 rounded-full transition-all",
                            viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        )}
                    >
                        <Monitor size={18} />
                    </button>
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 ml-2 text-blue-500 hover:text-blue-400 border-l border-white/10 pl-4"
                        >
                            <Settings size={18} />
                        </button>
                    )}
                </div>

                {/* Preview Container */}
                <div className="flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8 bg-dots-pattern">
                    <LivePreview data={data} viewMode={viewMode} activeSectionId={activeSectionId} />
                </div>
            </div>
        </div>
    );
};
