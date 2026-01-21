import React, { useEffect, useRef } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { getYouTubeId } from '../../../utils/helpers';
import { clsx } from 'clsx';

// Social Embed Component
export const SocialEmbedPreview = ({ platform, url }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Clean up previous content
        container.innerHTML = '';

        if (platform === 'twitter') {
            const match = url.match(/status\/(\d+)/);
            const tweetId = match ? match[1] : null;

            if (!tweetId) {
                container.innerHTML = '<div class="text-xs text-gray-500 p-4 border border-dashed border-gray-600 rounded">Invalid Twitter URL</div>';
                return;
            }

            const tweetContainer = document.createElement('div');
            container.appendChild(tweetContainer);

            const loadTwitter = () => {
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.createTweet(tweetId, tweetContainer, {
                        theme: 'dark',
                        align: 'center',
                        dnt: true,
                        conversation: 'none'
                    });
                } else {
                    if (!document.getElementById('twitter-wjs')) {
                        const script = document.createElement('script');
                        script.id = 'twitter-wjs';
                        script.src = "https://platform.twitter.com/widgets.js";
                        script.async = true;
                        document.head.appendChild(script);
                        script.onload = () => loadTwitter();
                    } else {
                        setTimeout(loadTwitter, 500);
                    }
                }
            };
            loadTwitter();

        } else if (platform === 'instagram') {
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'instagram-media';
            blockquote.setAttribute('data-instgrm-permalink', url);
            blockquote.setAttribute('data-instgrm-version', '14');
            blockquote.style.width = "100%";
            blockquote.style.maxWidth = "540px";
            blockquote.style.margin = "0 auto";
            container.appendChild(blockquote);

            const loadInstagram = () => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                } else {
                    if (!document.getElementById('insta-wjs')) {
                        const script = document.createElement('script');
                        script.id = 'insta-wjs';
                        script.src = "//www.instagram.com/embed.js";
                        script.async = true;
                        document.head.appendChild(script);
                        script.onload = () => window.instgrm && window.instgrm.Embeds.process();
                    }
                }
            };
            loadInstagram();
        }

    }, [platform, url]);

    return <div ref={containerRef} className="w-full flex justify-center min-h-[150px] bg-white/5 rounded-lg"></div>;
};

export const SocialRenderer = ({ section }) => (
    <div className="max-w-xl mx-auto">
        <SocialEmbedPreview platform={section.platform} url={section.url} />
    </div>
);

export const AccordionRenderer = ({ section }) => (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {section.items.map(item => (
            <details key={item.id} className="group border border-current/10 rounded-lg bg-white/5 overflow-hidden">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5">
                    <span>{item.title}</span>
                    <span className="transition-transform duration-200 group-open:rotate-180">
                        <ChevronRight size={20} className="rotate-90" />
                    </span>
                </summary>
                <div className="text-sm opacity-80 leading-relaxed p-5 pt-0 border-t border-current/5 whitespace-pre-wrap">
                    {item.content}
                </div>
            </details>
        ))}
    </div>
);

export const PostCardRenderer = ({ section }) => (
    <div className="max-w-3xl mx-auto">
        <a href={section.url} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row gap-6 p-6 bg-white/5 backdrop-blur-sm border border-current/10 rounded-xl hover:shadow-lg transition-all duration-300 group">
            <div className="w-full md:w-48 aspect-video md:aspect-square flex-shrink-0 overflow-hidden rounded-md">
                <img src={section.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs opacity-50 mb-2 font-mono">{section.date}</p>
                <h4 className="text-lg font-medium mb-3 leading-snug group-hover:underline underline-offset-4">{section.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed line-clamp-2">{section.excerpt}</p>
            </div>
        </a>
    </div>
);

export const ColumnsRenderer = ({ section }) => {
    const gridClass = section.columnCount === 3 ? 'md:grid-cols-3' : (section.columnCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1');

    return (
        <div className={`grid grid-cols-1 ${gridClass} gap-8 md:gap-8`}>
            {section.items.map(item => (
                <div key={item.id} className="flex flex-col space-y-4">
                    {section.colType === 'card' && (
                        <>
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                                <p className="text-sm opacity-70 leading-relaxed text-xs">{item.text}</p>
                            </div>
                        </>
                    )}
                    {section.colType === 'text' && (
                        <div className="p-6 bg-white/5 rounded-lg border border-current/10 h-full">
                            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                            <p className="text-sm opacity-80 leading-relaxed">{item.text}</p>
                        </div>
                    )}
                    {section.colType === 'image' && (
                        <div className="aspect-square w-full overflow-hidden rounded-lg shadow-sm">
                            <img src={item.image} alt="Image" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    )}
                    {section.colType === 'social' && (
                        <div className="flex justify-center overflow-hidden">
                            <SocialEmbedPreview platform={item.platform} url={item.url} />
                        </div>
                    )}
                    {section.colType === 'video' && (
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow">
                            {getYouTubeId(item.url) ? (
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`} frameBorder="0" allowFullScreen></iframe>
                            ) : (
                                <video src={item.url} controls className="w-full h-full object-cover"></video>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const LinksRenderer = ({ section }) => (
    <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {section.links.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-current/10 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block text-left">
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <div className="text-base md:text-lg font-medium tracking-wide mb-1">{link.label}</div>
                        {link.subtext && <div className="text-xs opacity-60 font-light">{link.subtext}</div>}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-current group-hover:text-white group-hover:border-transparent transition-all">
                        <ChevronRight size={14} />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
            </a>
        ))}
    </div>
);

export const BoxRenderer = ({ section }) => (
    <div className="text-center">
        {section.title && <h4 className="font-bold text-lg mb-4">{section.title}</h4>}
        <p className="leading-loose whitespace-pre-wrap font-light">{section.content}</p>
    </div>
);
