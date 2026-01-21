import React from 'react';
import { clsx } from 'clsx';

export const HeroSection = ({ data }) => {
    const heroStyle = {
        width: `${data.heroWidth}%`,
        height: `${data.heroHeight}vh`,
        marginTop: data.heroWidth < 100 ? '20px' : '0',
        borderRadius: data.heroWidth < 100 ? '16px' : '0',
    };

    const mediaStyle = {
        filter: `blur(${data.heroBlur}px)`,
        objectPosition: `${data.heroPositionX}% ${data.heroPositionY}%`,
    };

    return (
        <div className="hero-container relative mx-auto overflow-hidden shadow-lg group" style={heroStyle}>
            <div className="absolute inset-0 w-full h-full">
                {data.heroType === 'video' ? (
                    <video
                        className="w-full h-full object-cover"
                        src={data.heroUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={mediaStyle}
                    ></video>
                ) : (
                    <img
                        src={data.heroUrl || data.heroImageFallback}
                        className="hero-media w-full h-full object-cover"
                        alt="Hero"
                        style={mediaStyle}
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: data.heroOverlayOpacity }}></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
                <h2
                    className="font-light leading-tight mb-6 opacity-0 animate-fadeInUp"
                    style={{ animationDelay: '0.2s', fontSize: `${data.fontSize.heroTitle}rem` }}
                >
                    {data.heroTitle}
                </h2>
                <p
                    className="uppercase tracking-[0.2em] opacity-0 animate-fadeInUp leading-loose whitespace-pre-wrap"
                    style={{ animationDelay: '0.4s', fontSize: `${data.fontSize.heroSubtitle}rem` }}
                >
                    {data.heroSubtitle}
                </p>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
                <div className="w-[1px] h-8 bg-white/50 mx-auto"></div>
            </div>
        </div>
    );
};
