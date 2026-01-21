import React, { useState } from 'react';
import { clsx } from 'clsx';
import { HeroSection } from './HeroSection';
import { SectionWrapper, TextRenderer, ImageRenderer, HeadingRenderer, VideoRenderer, ButtonRenderer } from './Sections/Renderers';
import { SocialRenderer, AccordionRenderer, PostCardRenderer, ColumnsRenderer, LinksRenderer, BoxRenderer } from './Sections/ComplexRenderers';

export const LivePreview = ({ data, viewMode, activeSectionId }) => {
    // Auto Scroll Logic
    React.useEffect(() => {
        if (activeSectionId) {
            const element = document.getElementById(`section-${activeSectionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeSectionId]);

    // Map section types to renderers
    const renderers = {
        text: TextRenderer,
        image: ImageRenderer,
        image_text: ({ section, fontSize }) => {
            const isRight = section.imagePosition === 'right';
            return (
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className={`w-full md:w-1/2 ${isRight ? 'md:order-2' : ''}`}>
                        <img src={section.image} alt={section.title} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]" />
                    </div>
                    <div className={`w-full md:w-1/2 ${isRight ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
                        <h3 className="font-medium tracking-widest mb-6 leading-tight" style={{ fontSize: `${fontSize.sectionTitle}rem` }}>{section.title}</h3>
                        <p className="leading-loose whitespace-pre-wrap font-light" style={{ fontSize: `${fontSize.body}rem` }}>{section.content}</p>
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
        box: BoxRenderer
    };

    return (
        <div
            className={clsx(
                "relative shadow-2xl overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out border border-gray-800/20",
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
            <div className={`relative min-h-full flex flex-col ${data.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>

                {/* Header */}
                <header className="absolute top-0 left-0 w-full z-30 px-6 py-4 text-white">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <div className="font-bold text-lg tracking-widest uppercase opacity-90 mix-blend-difference relative z-50">{data.siteTitle}</div>
                        <nav className="hidden md:block mix-blend-difference">
                            <ul className="flex space-x-6 text-sm tracking-widest font-medium">
                                {data.menuItems.map(item => (
                                    <li key={item.id}><a href={item.url} className="hover:opacity-70">{item.label}</a></li>
                                ))}
                            </ul>
                        </nav>
                        <div className="md:hidden mix-blend-difference">
                            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-white"></div>
                        </div>
                    </div>
                </header>

                <HeroSection data={data} />

                <div className="relative z-10 flex-1 flex flex-col w-full pb-0">
                    {data.sections.map((section) => {
                        const Renderer = renderers[section.type] || (() => <div className="text-red-500">Unknown Section Type: {section.type}</div>);

                        return (
                            <SectionWrapper key={section.id} section={section} fontSize={data.fontSize}>
                                <Renderer section={section} fontSize={data.fontSize} />
                            </SectionWrapper>
                        );
                    })}
                </div>

                <footer className="py-8 text-center border-t border-current/10 opacity-60 mt-auto">
                    <p className="text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} {data.siteTitle}. All Rights Reserved.</p>
                </footer>

            </div>
        </div>
    );
};
