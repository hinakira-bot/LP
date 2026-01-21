import { DEFAULT_DATA } from "../data/defaultData";

// --- Divider SVGs for Export ---
const DIVIDERS = {
    'wave': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path></svg>`,
    'tilt-right': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,120L1440,0L1440,120L0,120Z"></path></svg>`,
    'tilt-left': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0L1440,120L0,120Z"></path></svg>`,
    'triangle': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M720,0L1440,120L0,120Z"></path></svg>`,
    'curve': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path></svg>`,
};

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
};

// --- HTML Generator ---
const generateHTML = (data) => {
    const bgStyle = data.pageBgType === 'color'
        ? `background-color: ${data.pageBgValue};`
        : `background-image: url('${data.pageBgValue}'); background-size: cover;`;

    const fontClass = data.fontFamily === 'serif' ? 'font-serif' : 'font-sans';

    const heroStyle = `width: ${data.heroWidth}%; height: ${data.heroHeight}vh; margin-top: ${data.heroWidth < 100 ? '20px' : '0'}; border-radius: ${data.heroWidth < 100 ? '16px' : '0'};`;

    const mediaStyle = `filter: blur(${data.heroBlur}px); object-position: ${data.heroPositionX}% ${data.heroPositionY}%;`;

    const menuItemsHtml = data.menuItems.map(item => `<li><a href="${item.url}" class="block py-2 md:py-0 md:px-4 hover:opacity-70 transition-opacity">${item.label}</a></li>`).join('');

    const sectionsHtml = data.sections.map((section, index) => {
        const delayStyle = `animation-delay: ${0.2 + (index * 0.1)}s;`;
        const commonClass = "animate-fadeInUp";

        // Spacing
        const pt = section.pt || 'pt-16';
        const pb = section.pb || 'pb-16';

        // Section Background Logic
        let sectionBgStyle = '';
        let sectionOverlay = '';

        if (section.bgType === 'image') {
            sectionBgStyle = `background-image: url('${section.bgValue}'); background-size: cover; background-position: center; position: relative;`;
            sectionOverlay = `<div class="absolute inset-0 bg-black" style="opacity: ${section.bgOverlay || 0}; z-index: 0;"></div>`;
        } else if (section.bgType === 'color') {
            sectionBgStyle = `background-color: ${section.bgValue || 'transparent'};`;
        }

        // Dividers
        let dividerTopHtml = '';
        if (section.dividerTop && section.dividerTop !== 'none' && DIVIDERS[section.dividerTop]) {
            dividerTopHtml = `<div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[-1px] rotate-180">${DIVIDERS[section.dividerTop](section.dividerTopColor || '#ffffff')}</div>`;
        }
        let dividerBottomHtml = '';
        if (section.dividerBottom && section.dividerBottom !== 'none' && DIVIDERS[section.dividerBottom]) {
            dividerBottomHtml = `<div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[1px]">${DIVIDERS[section.dividerBottom](section.dividerBottomColor || '#ffffff')}</div>`;
        }

        // Box Wrapper Logic
        const boxClasses = section.boxStyle === 'shadow' ? 'bg-white shadow-xl text-gray-800'
            : section.boxStyle === 'border' ? 'border border-current/20'
                : section.boxStyle === 'fill' ? 'bg-gray-100/50'
                    : section.boxStyle === 'stitch' ? 'border-2 border-dashed border-current/30' : '';

        const boxPadding = section.boxStyle && section.boxStyle !== 'none' ? 'p-8 md:p-12 rounded-xl' : '';

        const boxWrapperStart = section.boxStyle && section.boxStyle !== 'none'
            ? `<div class="w-full max-w-5xl mx-auto px-6 relative z-10"><div class="${boxClasses} ${boxPadding}">`
            : `<div class="relative z-10">`;
        const boxWrapperEnd = `</div></div>`;
        const innerMaxWidth = section.boxStyle && section.boxStyle !== 'none' ? 'w-full' : 'w-full max-w-5xl mx-auto px-6';

        // Content contentHtml
        let contentHtml = '';

        if (section.type === 'text') {
            const textAlign = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
            contentHtml = `
            <div class="max-w-3xl mx-auto ${textAlign}">
             ${section.title ? `<h3 class="font-medium tracking-widest mb-6" style="font-size: ${data.fontSize.sectionTitle}rem;">${section.title}</h3>` : ''}
             <p class="leading-loose whitespace-pre-wrap font-light tracking-wide" style="font-size: ${data.fontSize.body}rem;">${section.content}</p>
            </div>`;
        }
        else if (section.type === 'image') {
            const width = section.width || 100;
            const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
            contentHtml = `
            <div style="width: ${width}%;" class="${alignClass}">
               <img src="${section.url}" alt="${section.caption || ''}" class="w-full h-auto rounded-lg shadow-lg" />
               ${section.caption ? `<p class="text-xs text-center mt-4 opacity-60">${section.caption}</p>` : ''}
            </div>`;
        }
        else if (section.type === 'image_text') {
            const isRight = section.imagePosition === 'right';
            contentHtml = `
              <div class="flex flex-col md:flex-row gap-10 items-center">
                 <div class="w-full md:w-1/2 ${isRight ? 'md:order-2' : ''}">
                    <img src="${section.image}" alt="${section.title}" class="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]" />
                 </div>
                 <div class="w-full md:w-1/2 ${isRight ? 'md:order-1 md:pr-10' : 'md:pl-10'}">
                    <h3 class="font-medium tracking-widest mb-6 leading-tight" style="font-size: ${data.fontSize.sectionTitle}rem;">${section.title}</h3>
                    <p class="leading-loose whitespace-pre-wrap font-light" style="font-size: ${data.fontSize.body}rem;">${section.content}</p>
                 </div>
              </div>`;
        }
        else if (section.type === 'heading') {
            const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
            const borderClass = section.design === 'underline' ? 'border-b border-current pb-4' : '';
            contentHtml = `
             <div class="max-w-4xl mx-auto ${alignClass}">
                <div class="inline-block ${borderClass} px-4">
                  <h2 class="font-medium tracking-widest leading-tight" style="font-size: ${data.fontSize.sectionTitle * 1.2}rem;">${section.text}</h2>
                  ${section.subText ? `<p class="text-sm mt-2 opacity-60 tracking-wider">${section.subText}</p>` : ''}
                </div>
             </div>`;
        }
        else if (section.type === 'video') {
            const youtubeId = getYouTubeId(section.url);
            const width = section.width || 100;
            const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
            let videoTag = '';
            if (youtubeId) {
                videoTag = `<div class="aspect-video w-full rounded-lg shadow-lg overflow-hidden bg-black" style="aspect-ratio: 16/9;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe></div>`;
            } else {
                videoTag = `<video src="${section.url}" autoplay loop muted playsinline class="w-full h-auto rounded-lg shadow-lg" style="aspect-ratio: 16/9;"></video>`;
            }
            contentHtml = `<div style="width: ${width}%;" class="${alignClass}">${videoTag}${section.caption ? `<p class="text-xs text-center mt-4 opacity-60">${section.caption}</p>` : ''}</div>`;
        }
        else if (section.type === 'button') {
            const alignClass = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
            const btnStyle = section.style === 'fill' ? 'bg-gray-800 text-white hover:bg-gray-700 border-transparent' : 'bg-transparent text-current border-current hover:bg-gray-500/10';
            contentHtml = `
            <div class="max-w-4xl mx-auto ${alignClass}">
               <a href="${section.url}" target="_blank" class="inline-block px-10 py-4 border rounded-full transition-all duration-300 ${btnStyle}">
                 <span class="tracking-widest font-medium">${section.label}</span>
               </a>
            </div>`;
        }
        else if (section.type === 'accordion') {
            const accTag = section.items.map(item => `
            <details class="group border border-current/10 rounded-lg bg-white/5 overflow-hidden">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-5">
                <span>${item.title}</span>
                <span class="transition group-open:rotate-180"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg></span>
              </summary>
              <div class="text-sm opacity-80 leading-relaxed p-5 pt-0 border-t border-current/5 whitespace-pre-wrap">${item.content}</div>
            </details>`).join('');
            contentHtml = `<div class="max-w-3xl mx-auto flex flex-col gap-4">${accTag}</div>`;
        }
        else if (section.type === 'links') {
            const linksTag = section.links.map(link => `
                <a href="${link.url}" target="_blank" class="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-current/10 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block text-left">
                    <div class="flex justify-between items-center relative z-10">
                        <div>
                            <div class="text-base md:text-lg font-medium tracking-wide mb-1">${link.label}</div>
                            ${link.subtext ? `<div class="text-xs opacity-60 font-light">${link.subtext}</div>` : ''}
                        </div>
                        <div class="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-current group-hover:text-white group-hover:border-transparent transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                </a>`).join('');
            contentHtml = `<div class="grid grid-cols-1 gap-4 max-w-md mx-auto">${linksTag}</div>`;
        }
        else if (section.type === 'columns') {
            const gridClass = section.columnCount === 3 ? 'md:grid-cols-3' : (section.columnCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1');
            let itemsTag = '';
            section.items.forEach(item => {
                if (section.colType === 'card') {
                    itemsTag += `<div class="flex flex-col space-y-4"><div class="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100"><img src="${item.image}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" /></div><div><h4 class="text-lg font-medium mb-1">${item.title}</h4><p class="text-xs opacity-70">${item.text}</p></div></div>`;
                } else if (section.colType === 'text') {
                    itemsTag += `<div class="p-6 bg-white/5 rounded-lg border border-current/10 h-full"><h4 class="text-lg font-bold mb-2">${item.title}</h4><p class="text-sm opacity-80 leading-relaxed">${item.text}</p></div>`;
                } else if (section.colType === 'image') {
                    itemsTag += `<div class="aspect-square w-full overflow-hidden rounded-lg shadow-sm"><img src="${item.image}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>`;
                } else if (section.colType === 'social') {
                    if (item.platform === 'twitter') itemsTag += `<div class="flex justify-center overflow-hidden"><blockquote class="twitter-tweet" data-theme="light"><a href="${item.url}"></a></blockquote></div>`;
                } else if (section.colType === 'video') {
                    const yId = getYouTubeId(item.url);
                    itemsTag += `<div class="aspect-video w-full rounded-lg overflow-hidden bg-black shadow" style="aspect-ratio: 16/9;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${yId}" frameborder="0" allowfullscreen></iframe></div>`;
                }
            });
            contentHtml = `<div class="grid grid-cols-1 ${gridClass} gap-8 md:gap-8">${itemsTag}</div>`;
        }

        return `
          <div id="section-${section.id}" class="relative ${pt} ${pb} ${commonClass}" style="${delayStyle} ${sectionBgStyle}">
             ${dividerTopHtml}
             ${sectionOverlay}
             ${boxWrapperStart}
             <div class="${section.boxStyle && section.boxStyle !== 'none' ? '' : innerMaxWidth}">
                ${contentHtml}
             </div>
             ${boxWrapperEnd}
             ${dividerBottomHtml}
          </div>`;
    }).join('\n');


    return `<!DOCTYPE html> <html lang="ja"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${data.siteTitle}</title> <script src="https://cdn.tailwindcss.com"></script> <script> tailwind.config = { theme: { extend: { keyframes: { fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, } }, animation: { fadeInUp: 'fadeInUp 0.5s ease-out forwards', } } } } </script> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet"> <style> .font-serif { font-family: 'Cormorant Garamond', 'Noto Sans JP', serif; } .font-sans { font-family: 'Noto Sans JP', sans-serif; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .hero-media { transition: transform 20s linear; transform: scale(1); } .hero-container:hover .hero-media { transform: scale(1.1); } #mobile-menu { transition: transform 0.3s ease-in-out; } html { scroll-behavior: smooth; } summary::-webkit-details-marker { display: none; } .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .bg-dots-pattern { background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px; } </style> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> <script async src="//www.instagram.com/embed.js"></script> </head> <body class="antialiased" style="${bgStyle} color: ${data.textColor};"> <div class="relative min-h-screen flex flex-col ${fontClass}"> <header class="absolute top-0 left-0 w-full z-30 px-6 py-4 text-white"> <div class="flex justify-between items-center max-w-7xl mx-auto"> <div class="font-bold text-lg tracking-widest uppercase opacity-90 mix-blend-difference relative z-50">${data.siteTitle}</div> <nav class="hidden md:block mix-blend-difference"> <ul class="flex space-x-6 text-sm tracking-widest font-medium"> ${menuItemsHtml} </ul> </nav> <button id="menu-btn" class="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 group mix-blend-difference"> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-2/3 h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> </button> </div> </header> <div id="mobile-menu" class="fixed inset-0 bg-black/95 z-40 transform translate-x-full flex items-center justify-center md:hidden"> <ul class="text-center space-y-8 text-white"> ${menuItemsHtml} </ul> </div> <div class="hero-container relative mx-auto overflow-hidden shadow-lg group" style="${heroStyle}"> <div class="absolute inset-0 w-full h-full"> ${data.heroType === 'video' ? `<video class="w-full h-full object-cover" src="${data.heroUrl}" autoplay loop muted playsinline style="${mediaStyle}"></video>` : `<img src="${data.heroUrl || data.heroImageFallback}" class="hero-media w-full h-full object-cover" alt="Hero" style="${mediaStyle}">`} </div> <div class="absolute inset-0 bg-black transition-opacity duration-300" style="opacity: ${data.heroOverlayOpacity};"></div> <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10"> <h2 class="font-light leading-tight mb-6 opacity-0 animate-fadeInUp" style="animation-delay: 0.2s; font-size: ${data.fontSize.heroTitle}rem;">${data.heroTitle}</h2> <p class="uppercase tracking-[0.2em] opacity-0 animate-fadeInUp leading-loose whitespace-pre-wrap" style="animation-delay: 0.4s; font-size: ${data.fontSize.heroSubtitle}rem;">${data.heroSubtitle}</p> </div> <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"> <div class="w-[1px] h-8 bg-white/50 mx-auto"></div> </div> </div> <div class="relative z-10 flex-1 flex flex-col w-full"> ${sectionsHtml} </div> <footer id="footer" class="py-8 text-center border-t border-current/10 opacity-60 mt-auto" style="background-color: ${data.pageBgType === 'color' ? data.pageBgValue : 'transparent'};"> <p class="text-[10px] uppercase tracking-widest">&copy; ${new Date().getFullYear()} ${data.siteTitle}. All Rights Reserved.</p> </footer> </div> <script> const menuBtn = document.getElementById('menu-btn'); const mobileMenu = document.getElementById('mobile-menu'); const spans = menuBtn.querySelectorAll('span'); let isOpen = false; menuBtn.addEventListener('click', () => { isOpen = !isOpen; if (isOpen) { mobileMenu.classList.remove('translate-x-full'); spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)'; spans[1].style.opacity = '0'; spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)'; } else { mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; } }); mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { isOpen = false; mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; }); }); </script> </body> </html>`;
};

export const exportConfig = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportHTML = (data) => {
    const htmlContent = generateHTML(data);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
