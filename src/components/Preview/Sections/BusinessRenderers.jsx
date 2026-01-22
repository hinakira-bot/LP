import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, MessageCircle, ExternalLink } from 'lucide-react';

export const ConversionPanel = ({ section }) => {
    // Default buttons if none provided
    const buttons = section.buttons || [
        { id: 1, label: 'Amazonで購入する', url: '#', color: 'orange', icon: 'cart' },
        { id: 2, label: '楽天で購入する', url: '#', color: 'red', icon: 'cart' }
    ];

    const isSticky = section.isSticky || false;

    // Helper to get button style based on color name
    const getButtonStyle = (color) => {
        switch (color) {
            case 'orange': return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-600 shadow-orange-200';
            case 'red': return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700 shadow-red-200';
            case 'green': return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700 shadow-green-200';
            case 'blue': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-700 shadow-blue-200';
            case 'black': return 'bg-gradient-to-r from-gray-800 to-black text-white border-gray-900 shadow-gray-400';
            default: return 'bg-white text-gray-800 border-gray-200';
        }
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'cart': return <ShoppingCart size={20} />;
            case 'line': return <MessageCircle size={20} />;
            default: return <ExternalLink size={20} />;
        }
    };

    const Content = () => (
        <div className={clsx(
            "w-full max-w-md mx-auto p-4 space-y-3",
            isSticky ? "bg-white/90 backdrop-blur-md shadow-inner border-t border-gray-100" : ""
        )}>
            {section.title && (
                <p className="text-center text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    {section.title}
                </p>
            )}
            <div className="flex flex-col gap-3">
                {buttons.map((btn, idx) => (
                    <a
                        key={idx}
                        href={btn.url}
                        className={clsx(
                            "flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-transform active:scale-95 hover:-translate-y-0.5 border-b-4",
                            getButtonStyle(btn.color)
                        )}
                    >
                        {getIcon(btn.icon)}
                        <span>{btn.label}</span>
                    </a>
                ))}
            </div>
            {section.microCopy && (
                <p className="text-center text-[10px] text-gray-400 mt-2">
                    {section.microCopy}
                </p>
            )}
        </div>
    );

    if (isSticky) {
        return (
            <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
                {/* Wrapper to center content and enable pointer events only on buttons */}
                <div className="pointer-events-auto">
                    <Content />
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 bg-gray-50">
            <Content />
        </div>
    );
};

export const PointList = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    return (
        <div className="space-y-16 max-w-5xl mx-auto px-6 py-12">
            {section.items.map((item, index) => {
                const isEven = index % 2 === 1;
                return (
                    <div key={item.id} className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-8 items-center ${!isMobile && isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} relative group`}>
                            <div className="absolute -top-4 -left-4 bg-yellow-400 text-black font-bold py-1 px-4 shadow-lg z-10 skew-x-[-10deg]">
                                <span className="block skew-x-[10deg] text-sm tracking-wider">POINT {String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg border-4 border-white">
                                <img src={item.image} alt={item.title} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </div>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} space-y-4`}>
                            <h3 className="text-2xl font-bold border-b-2 border-yellow-400 pb-2 inline-block">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const ProblemChecklist = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';

    return (
        <div className={`py-12 ${isMobile ? 'px-4' : 'px-6'} bg-gray-800 text-white relative overflow-hidden`}>
            {/* Background noise texture simulation */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className={`text-center ${isMobile ? 'mb-6' : 'mb-10'}`}>
                    <span className="bg-red-600 text-white px-4 py-1 text-xs font-bold rounded-full mb-4 inline-block tracking-widest">CHECK LIST</span>
                    <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold tracking-wider leading-relaxed`}>
                        {section.title || "こんなお悩みありませんか？"}
                    </h2>
                </div>

                <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl ${isMobile ? 'p-4' : 'p-6 md:p-10'} shadow-2xl space-y-4`}>
                    {section.items.map((item, i) => (
                        <div key={i} className={`flex items-start ${isMobile ? 'gap-3' : 'gap-4'} p-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors rounded-lg`}>
                            <div className={`bg-red-500 rounded-full ${isMobile ? 'p-0.5' : 'p-1'} flex-shrink-0 mt-0.5`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} leading-snug`}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
