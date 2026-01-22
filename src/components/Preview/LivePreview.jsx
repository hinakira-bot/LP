import React, { useState } from 'react';
import { clsx } from 'clsx';
import { HeroSection } from './HeroSection';
import { SectionWrapper, TextRenderer, ImageRenderer, HeadingRenderer, VideoRenderer, ButtonRenderer } from './Sections/Renderers';
import { SocialRenderer, AccordionRenderer, PostCardRenderer, ColumnsRenderer, LinksRenderer, BoxRenderer } from './Sections/ComplexRenderers';
import { ConversionPanel, PointList, ProblemChecklist } from './Sections/BusinessRenderers';

export const LivePreview = ({ data, viewMode, activeSectionId }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCta, setShowCta] = useState(false);

    // Auto Scroll Logic
    React.useEffect(() => {
        if (activeSectionId) {
            const element = document.getElementById(`section-${activeSectionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeSectionId]);

    // Scroll Handler for CTA
    const handleScroll = (e) => {
        const scrollTop = e.currentTarget.scrollTop;
        if (scrollTop > 400) { // Show after 400px (approx after Hero)
            setShowCta(true);
        } else {
            setShowCta(false);
        }
    };

    // Map section types to renderers
    const renderers = {
        text: TextRenderer,
        image: ImageRenderer,
        image_text: ({ section, fontSize }) => {
            const isRight = section.imagePosition === 'right';
            const isMobile = viewMode === 'mobile';

            // Text Styles Logic
            let textClasses = "";
            if (section.textShadow === 'soft') textClasses += " drop-shadow-md";
            if (section.textShadow === 'strong') textClasses += " drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";

            let containerClasses = "";
            if (section.textBackdrop === 'blur') containerClasses += " backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg";
            if (section.textBackdrop === 'white') containerClasses += " bg-white/90 backdrop-blur text-gray-800 p-6 rounded-xl shadow-lg";
            if (section.textBackdrop === 'black') containerClasses += " bg-black/70 backdrop-blur text-white p-6 rounded-xl shadow-lg";

            return (
                <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-10 items-center`}>
                    <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${!isMobile && isRight ? 'md:order-2' : ''}`}>
                        <img src={section.image} alt={section.title} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]" />
                    </div>
                    <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${!isMobile && isRight ? 'md:order-1 md:pr-10' : (isMobile ? '' : 'md:pl-10')}`}>
                        <div className={containerClasses}>
                            <h3 className={`font-medium tracking-widest mb-6 leading-tight ${textClasses}`} style={{ fontSize: `${fontSize.sectionTitle}rem` }}>{section.title}</h3>
                            <p className={`leading-loose whitespace-pre-wrap font-light ${textClasses}`} style={{ fontSize: `${fontSize.body}rem` }}>{section.content}</p>
                        </div>
                    </div>
                </div>
            );
        },
        heading: HeadingRenderer,
        video: VideoRenderer,
        button: ButtonRenderer,
        social: SocialRenderer,
        accordion: AccordionRenderer,
        post_card: PostCardRenderer,
        columns: ColumnsRenderer,
        links: LinksRenderer,
        box: BoxRenderer,
        conversion_panel: ConversionPanel,
        point_list: PointList,
        problem_checklist: ProblemChecklist
    };

    return (
        <div
            className={clsx(
                "relative shadow-2xl overflow-hidden transition-all duration-500 ease-in-out border border-gray-800/20 transform flex flex-col",
                viewMode === 'mobile' ? 'w-[390px] h-[800px] rounded-[3rem] border-8 border-gray-900' : 'w-full h-full rounded-md'
            )}
            style={{
                color: data.textColor,
                backgroundColor: data.pageBgType === 'color' ? data.pageBgValue : 'transparent',
                backgroundImage: data.pageBgType === 'image' ? `url(${data.pageBgValue})` : 'none',
                backgroundSize: data.pageBgType === 'image' ? 'cover' : 'auto',
                fontFamily: data.fontFamily === 'serif' ? "'Cormorant Garamond', 'Noto Sans JP', serif" : "'Noto Sans JP', sans-serif"
            }}
        >
            {/* Scrollable Content */}
            <div className="flex-1 w-full overflow-y-auto scrollbar-hide relative" onScroll={handleScroll}>
                <div className={`relative min-h-full flex flex-col ${data.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>

                    {/* Header */}
                    <header
                        className={`w-full z-30 px-6 py-4 transition-all ${data.header?.style === 'solid' ? 'relative shadow-sm' : 'absolute top-0 left-0'}`}
                        style={data.header?.style === 'solid' ? { backgroundColor: data.header?.bgValue, color: data.header?.textColor } : { color: 'white' }}
                    >
                        <div className={`flex items-center max-w-7xl mx-auto relative ${data.header?.layout === 'center' ? 'justify-end' : 'justify-between'}`} style={{ minHeight: '40px' }}>
                            {/* Logo / Title */}
                            <div className={`z-50 ${data.header?.layout === 'center' ? 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'relative'}`}>
                                {data.header?.logoUrl ? (
                                    <img src={data.header.logoUrl} alt={data.siteTitle} style={{ height: `${data.header.logoHeight || 40}px` }} className="object-contain" />
                                ) : (
                                    <div className={`font-bold text-lg tracking-widest uppercase opacity-90 ${data.header?.style === 'overlay' ? 'mix-blend-difference' : ''}`}>
                                        {data.siteTitle}
                                    </div>
                                )}
                            </div>

                            {/* Desktop Menu */}
                            <nav className={`hidden md:block ${data.header?.style === 'overlay' ? 'mix-blend-difference' : ''}`}>
                                <ul className="flex space-x-6 text-sm tracking-widest font-medium">
                                    {data.menuItems.map(item => (
                                        <li key={item.id}>
                                            <a href={item.url} className="hover:opacity-70 transition-opacity">{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 group ${data.header?.style === 'overlay' ? 'mix-blend-difference' : ''}`}
                            >
                                <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px] translate-x-[5px]' : ''}`}></span>
                                <span className={`w-2/3 h-0.5 bg-current transition-all duration-300 origin-right ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] translate-x-[5px]' : ''}`}></span>
                            </button>
                        </div>
                    </header>

                    <HeroSection data={data} viewMode={viewMode} />

                    <div className="relative z-10 flex-1 flex flex-col w-full pb-0">
                        {data.sections.map((section) => {
                            const Renderer = renderers[section.type] || (() => <div className="text-red-500">Unknown Section Type: {section.type}</div>);

                            // Responsive Font Scaling
                            const responsiveFontSize = viewMode === 'mobile' ? {
                                heroTitle: data.fontSize.heroTitle * 0.6,
                                heroSubtitle: data.fontSize.heroSubtitle * 0.8,
                                sectionTitle: data.fontSize.sectionTitle * 0.7,
                                body: data.fontSize.body * 0.85
                            } : data.fontSize;

                            return (
                                <SectionWrapper key={section.id} section={section} fontSize={responsiveFontSize}>
                                    <Renderer section={section} fontSize={responsiveFontSize} viewMode={viewMode} />
                                </SectionWrapper>
                            );
                        })}
                    </div>

                    <footer className="py-8 text-center border-t border-current/10 opacity-60 mt-auto">
                        <p className="text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} {data.siteTitle}. All Rights Reserved.</p>
                    </footer>

                    {/* Spacer for Floating CTA */}
                    {data.floatingCta?.enabled && <div className="h-24 md:hidden"></div>}
                </div>
            </div>

            {/* Floating CTA (Docked) */}
            {data.floatingCta?.enabled && (
                <div className={`absolute bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${viewMode === 'mobile' ? '' : 'md:hidden'} ${showCta ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                    <a
                        href={data.floatingCta.url}
                        className="block w-full py-3.5 rounded-full shadow-lg text-center font-bold text-sm tracking-widest transition-transform active:scale-95"
                        style={{ backgroundColor: data.floatingCta.bgColor, color: data.floatingCta.textColor }}
                    >
                        {data.floatingCta.text}
                    </a>
                </div>
            )}
        </div>
    );
};
