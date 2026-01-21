import React from 'react';
import { Type, Layout, Plus, Trash2, ArrowUp, ArrowDown, AlignLeft, ImageIcon, MousePointerClick, Heading, PlayCircle, Share2, ListPlus, BoxSelect, FileText, Columns, Link as LinkIcon, Menu, X } from 'lucide-react';
import { InputGroup, TextInput, TextArea } from '../UI/Input';
import { SectionEditor } from './SectionEditor';
import { Button } from '../UI/Button';

// Link Editor Component (Internal)
const LinkEditor = ({ link, onChange, onDelete, type = 'button' }) => (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-3 group animate-fadeIn">
        <div className="flex justify-between items-start mb-3">
            <div className="bg-gray-700/50 p-1.5 rounded text-gray-400">
                {type === 'menu' ? <Menu size={14} /> : <LinkIcon size={14} />}
            </div>
            <button onClick={onDelete} className="text-gray-500 hover:text-red-400 transition-colors">
                <X size={16} />
            </button>
        </div>
        <div className="space-y-3">
            <TextInput
                value={link.label}
                onChange={(val) => onChange({ ...link, label: val })}
                placeholder={type === 'menu' ? "メニュー名" : "ボタンのテキスト"}
            />
            {type === 'button' && (
                <TextInput
                    value={link.subtext}
                    onChange={(val) => onChange({ ...link, subtext: val })}
                    placeholder="サブテキスト (省略可)"
                />
            )}
            <TextInput
                value={link.url}
                onChange={(val) => onChange({ ...link, url: val })}
                placeholder="リンクURL (例: #about, https://...)"
            />
        </div>
    </div>
);

export const ContentPanel = ({ data, setData, setActiveSectionId }) => {

    const handleSectionChange = (id, newSection) => {
        setData(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === id ? newSection : s)
        }));
    };

    const addSection = (type) => {
        const newId = (data.sections.length > 0 ? Math.max(...data.sections.map(s => s.id)) : 0) + 1;
        let newSection = { id: newId, type, pt: 'pt-24', pb: 'pb-24', boxStyle: 'none', bgType: 'color', bgValue: 'transparent' };

        // Default Init Logic
        if (type === 'text') newSection = { ...newSection, title: 'New Section', content: 'コンテンツを入力してください', align: 'center' };
        if (type === 'columns') newSection = { ...newSection, columnCount: 3, colType: 'card', items: [{ id: 1, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop', title: 'Card 1', text: 'Text', url: '#', platform: 'twitter' }, { id: 2, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop', title: 'Card 2', text: 'Text', url: '#', platform: 'twitter' }, { id: 3, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987&auto=format&fit=crop', title: 'Card 3', text: 'Text', url: '#', platform: 'twitter' }] };
        if (type === 'links') newSection = { ...newSection, links: [{ id: 1, label: 'Button', url: '#', subtext: '' }] };
        if (type === 'image') newSection = { ...newSection, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', caption: '' };
        if (type === 'image_text') newSection = { ...newSection, title: 'Title', content: 'Text here...', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop', imagePosition: 'left' };
        if (type === 'button') newSection = { ...newSection, label: 'Click Me', url: '#', align: 'center', style: 'fill' };
        if (type === 'heading') newSection = { ...newSection, text: 'Heading', subText: 'Subtitle', style: 'center', design: 'simple' };
        if (type === 'video') newSection = { ...newSection, url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', caption: '' };
        if (type === 'post_card') newSection = { ...newSection, title: 'Article Title', date: '2023.01.01', excerpt: 'Article summary...', image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop', url: '#' };
        if (type === 'social') newSection = { ...newSection, platform: 'twitter', url: 'https://twitter.com/SpaceX/status/1856890374974914755' };
        if (type === 'accordion') newSection = { ...newSection, items: [{ id: 1, title: 'Question 1', content: 'Answer 1' }, { id: 2, title: 'Question 2', content: 'Answer 2' }] };
        if (type === 'box') newSection = { ...newSection, boxStyle: 'border', title: 'Box Title', content: 'Content here...' };

        setData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
        setActiveSectionId(newId);
    };

    const deleteSection = (id) => {
        if (confirm('Are you sure you want to delete this section?')) {
            setData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));
        }
    };

    const moveSection = (index, direction) => {
        const newSections = [...data.sections];
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        }
        setData(prev => ({ ...prev, sections: newSections }));
    };

    // Menu Handlers
    const handleMenuChange = (id, newItem) => {
        setData(prev => ({ ...prev, menuItems: prev.menuItems.map(m => m.id === id ? newItem : m) }));
    };
    const addMenu = () => {
        const newId = (data.menuItems.length > 0 ? Math.max(...data.menuItems.map(m => m.id)) : 0) + 1;
        setData(prev => ({ ...prev, menuItems: [...prev.menuItems, { id: newId, label: 'Menu', url: '#' }] }));
    };
    const deleteMenu = (id) => {
        setData(prev => ({ ...prev, menuItems: prev.menuItems.filter(m => m.id !== id) }));
    };


    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header Settings */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <InputGroup label="サイトタイトル">
                        <TextInput value={data.siteTitle} onChange={(val) => setData({ ...data, siteTitle: val })} />
                    </InputGroup>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">メニュー</label>
                            <button onClick={addMenu} className="text-blue-400 hover:text-white"><Plus size={14} /></button>
                        </div>
                        <div className="space-y-2">
                            {data.menuItems.map(item => (
                                <LinkEditor key={item.id} link={item} type="menu" onChange={(newItem) => handleMenuChange(item.id, newItem)} onDelete={() => deleteMenu(item.id)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Text */}
            <section>
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Type size={16} className="text-blue-400" /> メインビジュアル文字</h2>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <InputGroup label="メインコピー">
                        <TextInput value={data.heroTitle} onChange={(val) => setData({ ...data, heroTitle: val })} />
                    </InputGroup>
                    <InputGroup label="サブコピー">
                        <TextArea value={data.heroSubtitle} onChange={(val) => setData({ ...data, heroSubtitle: val })} rows={2} />
                    </InputGroup>
                </div>
            </section>

            {/* DYNAMIC SECTIONS */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2"><Layout size={16} className="text-blue-400" /> コンテンツパーツ</h2>
                </div>

                <div className="space-y-6">
                    {data.sections.map((section, index) => (
                        <div
                            key={section.id}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all"
                            onClick={() => setActiveSectionId(section.id)}
                        >
                            {/* Section Header */}
                            <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700/50">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                    <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-[10px]">{section.type}</span>
                                    {index + 1}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30"><ArrowUp size={14} /></button>
                                    <button onClick={() => moveSection(index, 'down')} disabled={index === data.sections.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30"><ArrowDown size={14} /></button>
                                    <button onClick={() => deleteSection(section.id)} className="p-1 text-red-900 hover:text-red-400 ml-2"><Trash2 size={14} /></button>
                                </div>
                            </div>

                            {/* Section Body */}
                            <div className="p-4 space-y-6">
                                <SectionEditor section={section} onChange={(newSection) => handleSectionChange(section.id, newSection)} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Section Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                    <button onClick={() => addSection('text')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><AlignLeft size={20} className="mb-1 text-blue-400" /><span className="text-[10px]">テキスト</span></button>
                    <button onClick={() => addSection('image')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><ImageIcon size={20} className="mb-1 text-green-400" /><span className="text-[10px]">画像</span></button>
                    <button onClick={() => addSection('image_text')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Layout size={20} className="mb-1 text-orange-400" /><span className="text-[10px]">画＆文</span></button>
                    <button onClick={() => addSection('button')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><MousePointerClick size={20} className="mb-1 text-red-400" /><span className="text-[10px]">ボタン</span></button>
                    <button onClick={() => addSection('heading')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Heading size={20} className="mb-1 text-pink-400" /><span className="text-[10px]">見出し</span></button>
                    <button onClick={() => addSection('video')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><PlayCircle size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">動画</span></button>
                    <button onClick={() => addSection('social')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Share2 size={20} className="mb-1 text-sky-400" /><span className="text-[10px]">SNS</span></button>
                    <button onClick={() => addSection('accordion')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><ListPlus size={20} className="mb-1 text-teal-400" /><span className="text-[10px]">Q&A</span></button>
                    <button onClick={() => addSection('box')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><BoxSelect size={20} className="mb-1 text-yellow-200" /><span className="text-[10px]">BOX</span></button>
                    <button onClick={() => addSection('post_card')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><FileText size={20} className="mb-1 text-cyan-400" /><span className="text-[10px]">記事</span></button>
                    <button onClick={() => addSection('columns')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Columns size={20} className="mb-1 text-purple-400" /><span className="text-[10px]">カラム</span></button>
                    <button onClick={() => addSection('links')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><LinkIcon size={20} className="mb-1 text-yellow-400" /><span className="text-[10px]">リンク集</span></button>
                </div>
            </section>
        </div>
    );
};
