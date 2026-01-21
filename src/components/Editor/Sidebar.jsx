import React, { useState } from 'react';
import { Layout, X, ImageIcon, Type, Palette, Download, FileCode } from 'lucide-react';
import { Button } from '../UI/Button';
import { clsx } from 'clsx';
import { VisualPanel } from './VisualPanel';
import { ContentPanel } from './ContentPanel';
import { StylePanel } from './StylePanel';
import { exportConfig, exportHTML } from '../../utils/Exporter';

export const Sidebar = ({ isOpen, setIsOpen, data, setData, setActiveSectionId }) => {
    const [activeTab, setActiveTab] = useState('visual');

    return (
        <div className={clsx(
            "bg-[#111] border-r border-gray-800 flex-shrink-0 transition-all duration-300 ease-in-out relative z-20 flex flex-col h-full shadow-2xl",
            isOpen ? 'w-full md:w-[480px]' : 'w-0'
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#111]">
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Layout className="text-blue-500" size={20} />
                    LP Builder <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full">SWELL Style</span>
                </h1>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-400">
                    <X size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800">
                <TabButton
                    active={activeTab === 'visual'}
                    onClick={() => setActiveTab('visual')}
                    icon={ImageIcon}
                    label="Visual"
                />
                <TabButton
                    active={activeTab === 'content'}
                    onClick={() => setActiveTab('content')}
                    icon={Type}
                    label="Content"
                />
                <TabButton
                    active={activeTab === 'style'}
                    onClick={() => setActiveTab('style')}
                    icon={Palette}
                    label="Theme"
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-hide">
                {activeTab === 'visual' && <VisualPanel data={data} setData={setData} />}
                {activeTab === 'content' && <ContentPanel data={data} setData={setData} setActiveSectionId={setActiveSectionId} />}
                {activeTab === 'style' && <StylePanel data={data} setData={setData} />}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-800 bg-[#111] space-y-3">
                <Button
                    onClick={() => exportConfig(data)}
                    variant="primary"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    icon={Download}
                >
                    設定書き出し (config.json)
                </Button>
                <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                    ※ 本番公開用: ビルドしたViewer内の<br />config.jsonをこれで上書きしてください
                </p>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex-1 py-3 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors",
            active ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/30' : 'text-gray-500 hover:text-white'
        )}
    >
        <Icon size={14} /> {label}
    </button>
);
