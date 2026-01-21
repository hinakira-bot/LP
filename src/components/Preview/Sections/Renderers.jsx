import React from 'react';
import { clsx } from 'clsx';
import { getYouTubeId } from '../../../utils/helpers';

// Helper for divider SVGs
const Dividers = ({ type, color, position }) => {
    if (!type || type === 'none') return null;

    // SVG paths from the original code
    const paths = {
        'wave': "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
        'tilt-right': "M0,120L1440,0L1440,120L0,120Z",
        'tilt-left': "M0,0L1440,120L0,120Z",
        'triangle': "M720,0L1440,120L0,120Z",
        'curve': "M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z",
    };

    if (!paths[type]) return null;

    const style = position === 'top'
        ? { top: 0, transform: 'translateY(-1px) rotate(180deg)', left: 0 }
        : { bottom: 0, transform: 'translateY(1px)', left: 0 };

    return (
        <div className="absolute w-full overflow-hidden leading-[0] z-20" style={style}>
            <svg viewBox="0 0 1440 120" fill={color} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d={paths[type]}></path>
            </svg>
        </div>
    );
};

export const SectionWrapper = ({ section, children, fontSize }) => {
    // Generate styles
    const style = {
        animationDelay: '0.2s',
        backgroundColor: section.bgType === 'color' ? section.bgValue : 'transparent',
        backgroundImage: section.bgType === 'image' ? `url('${section.bgValue}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    };

    // Box Styles
    const innerMaxWidth = section.boxStyle && section.boxStyle !== 'none' ? 'w-full' : 'w-full max-w-5xl mx-auto px-6';
    const boxClasses = section.boxStyle === 'shadow' ? 'bg-white shadow-xl text-gray-800'
        : section.boxStyle === 'border' ? 'border border-current/20'
            : section.boxStyle === 'fill' ? 'bg-gray-100/50'
                : section.boxStyle === 'stitch' ? 'border-2 border-dashed border-current/30' : '';
    const boxPadding = section.boxStyle && section.boxStyle !== 'none' ? 'p-8 md:p-12 rounded-xl' : '';

    const Wrapper = section.boxStyle && section.boxStyle !== 'none'
        ? ({ children }) => <div className="w-full max-w-5xl mx-auto px-6 relative z-10"><div className={`${boxClasses} ${boxPadding}`}>{children}</div></div>
        : ({ children }) => <div className="relative z-10">{children}</div>;

    return (
        <div id={`section-${section.id}`} className={clsx("relative opacity-0 animate-fadeInUp", section.pt || 'pt-16', section.pb || 'pb-16')} style={style}>
            {section.bgType === 'image' && <div className="absolute inset-0 bg-black z-0 pointer-events-none" style={{ opacity: section.bgOverlay || 0 }}></div>}

            <Dividers type={section.dividerTop} color={section.dividerTopColor} position="top" />

            <Wrapper>
                <div className={innerMaxWidth}>
                    {children}
                </div>
            </Wrapper>

            <Dividers type={section.dividerBottom} color={section.dividerBottomColor} position="bottom" />
        </div>
    );
};

// --- Individual Renderers ---

export const TextRenderer = ({ section, fontSize }) => (
    <div className={clsx("max-w-3xl mx-auto", section.align === 'center' ? 'text-center' : section.align === 'right' ? 'text-right' : 'text-left')}>
        {section.title && <h3 className="font-medium tracking-widest mb-6" style={{ fontSize: `${fontSize.sectionTitle}rem` }}>{section.title}</h3>}
        <p className="leading-loose whitespace-pre-wrap font-light tracking-wide" style={{ fontSize: `${fontSize.body}rem` }}>{section.content}</p>
    </div>
);

export const ImageRenderer = ({ section }) => {
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    return (
        <div style={{ width: `${width}%` }} className={alignClass}>
            <img src={section.url} alt={section.caption || ''} className="w-full h-auto rounded-lg shadow-lg" />
            {section.caption && <p className="text-xs text-center mt-4 opacity-60">{section.caption}</p>}
        </div>
    );
};

export const HeadingRenderer = ({ section, fontSize }) => {
    const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
    const borderClass = section.design === 'underline' ? 'border-b border-current pb-4' : '';
    return (
        <div className={`max-w-4xl mx-auto ${alignClass}`}>
            <div className={`inline-block ${borderClass} px-4`}>
                <h2 className="font-medium tracking-widest leading-tight" style={{ fontSize: `${fontSize.sectionTitle * 1.2}rem` }}>{section.text}</h2>
                {section.subText && <p className="text-sm mt-2 opacity-60 tracking-wider">{section.subText}</p>}
            </div>
        </div>
    );
};

export const VideoRenderer = ({ section }) => {
    const youtubeId = getYouTubeId(section.url);
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    return (
        <div style={{ width: `${width}%` }} className={alignClass}>
            {youtubeId ? (
                <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden bg-black">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                </div>
            ) : (
                <video src={section.url} autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-lg"></video>
            )}
            {section.caption && <p className="text-xs text-center mt-4 opacity-60">{section.caption}</p>}
        </div>
    );
};

export const ButtonRenderer = ({ section }) => {
    const alignClass = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
    const btnStyle = section.style === 'fill'
        ? 'bg-gray-800 text-white hover:bg-gray-700 border-transparent'
        : 'bg-transparent text-current border-current hover:bg-gray-500/10';

    return (
        <div className={`max-w-4xl mx-auto ${alignClass}`}>
            <a href={section.url} target="_blank" rel="noopener noreferrer" className={`inline-block px-10 py-4 border rounded-full transition-all duration-300 ${btnStyle}`}>
                <span className="tracking-widest font-medium">{section.label}</span>
            </a>
        </div>
    );
};
