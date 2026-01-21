import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Plus } from 'lucide-react';
import { InputGroup, TextInput, TextArea } from '../UI/Input';
import { Slider } from '../UI/Slider';
import { ColorPicker } from '../UI/ColorPicker';
import { Button } from '../UI/Button';

// Internal Link Editor for inside sections (like 'links' type)
const LinkEditor = ({ link, onChange, onDelete }) => (
    <div className="bg-gray-900/50 p-2 rounded mb-2 border border-gray-700/50">
        <div className="space-y-2">
            <TextInput value={link.label} onChange={(val) => onChange({ ...link, label: val })} placeholder="ラベル" className="text-xs py-1" />
            <TextInput value={link.url} onChange={(val) => onChange({ ...link, url: val })} placeholder="URL" className="text-xs py-1" />
            <TextInput value={link.subtext} onChange={(val) => onChange({ ...link, subtext: val })} placeholder="サブテキスト" className="text-xs py-1" />
        </div>
        <button onClick={onDelete} className="text-red-400 text-xs mt-1 hover:underline">削除</button>
    </div>
);

export const SectionEditor = ({ section, onChange }) => {

    // Helper to update specific field
    const update = (field, value) => {
        onChange({ ...section, [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* --- COMMON SETTINGS (Background, Divider, Box) --- */}
            <div className="bg-gray-900/50 p-3 rounded-lg space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">セクション設定</h3>

                {/* Background Settings */}
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-12">背景:</span>
                        <select
                            value={section.bgType || 'color'}
                            onChange={(e) => update('bgType', e.target.value)}
                            className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white focus:outline-none"
                        >
                            <option value="color">単色</option>
                            <option value="image">画像</option>
                        </select>
                        {section.bgType === 'color' ? (
                            <ColorPicker value={section.bgValue || '#ffffff'} onChange={(val) => update('bgValue', val)} />
                        ) : (
                            <TextInput value={section.bgValue} onChange={(val) => update('bgValue', val)} placeholder="画像URL" className="py-1 text-xs" />
                        )}
                    </div>
                    {section.bgType === 'image' && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-12">暗さ:</span>
                            <Slider value={section.bgOverlay || 0} min={0} max={0.9} step={0.1} onChange={(val) => update('bgOverlay', val)} />
                        </div>
                    )}
                </div>

                {/* Padding & Box Style */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">上余白</label>
                        <select value={section.pt || 'pt-16'} onChange={(e) => update('pt', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pt-4">狭い</option>
                            <option value="pt-12">普通</option>
                            <option value="pt-20">広い</option>
                            <option value="pt-24">特大</option>
                            <option value="pt-0">なし</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">下余白</label>
                        <select value={section.pb || 'pb-16'} onChange={(e) => update('pb', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pb-4">狭い</option>
                            <option value="pb-12">普通</option>
                            <option value="pb-20">広い</option>
                            <option value="pb-24">特大</option>
                            <option value="pb-0">なし</option>
                        </select>
                    </div>
                </div>
                {/* Divider Settings */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">上部区切り</label>
                        <select value={section.dividerTop || 'none'} onChange={(e) => update('dividerTop', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full mb-1 text-white">
                            <option value="none">なし</option>
                            <option value="wave">波</option>
                            <option value="tilt-right">斜めR</option>
                            <option value="tilt-left">斜めL</option>
                            <option value="triangle">山</option>
                            <option value="curve">カーブ</option>
                        </select>
                        <ColorPicker value={section.dividerTopColor || '#ffffff'} onChange={(val) => update('dividerTopColor', val)} />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">下部区切り</label>
                        <select value={section.dividerBottom || 'none'} onChange={(e) => update('dividerBottom', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full mb-1 text-white">
                            <option value="none">なし</option>
                            <option value="wave">波</option>
                            <option value="tilt-right">斜めR</option>
                            <option value="tilt-left">斜めL</option>
                            <option value="triangle">山</option>
                            <option value="curve">カーブ</option>
                        </select>
                        <ColorPicker value={section.dividerBottomColor || '#ffffff'} onChange={(val) => update('dividerBottomColor', val)} />
                    </div>
                </div>
                <div>
                    <label className="text-[9px] text-gray-500 mb-1">コンテンツ枠</label>
                    <select value={section.boxStyle || 'none'} onChange={(e) => update('boxStyle', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full text-white">
                        <option value="none">なし</option>
                        <option value="shadow">影付き箱</option>
                        <option value="border">線枠</option>
                        <option value="fill">塗りつぶし</option>
                        <option value="stitch">ステッチ</option>
                    </select>
                </div>
            </div>

            {/* --- SPECIFIC TYPE FIELDS --- */}

            {section.type === 'text' && (
                <>
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="見出し" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="本文" />
                    <div className="flex gap-2">
                        {['left', 'center', 'right'].map(align => (
                            <button key={align} onClick={() => update('align', align)} className={`p-1.5 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {section.type === 'image' && (
                <>
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="画像URL" />
                    <TextInput value={section.caption} onChange={(val) => update('caption', val)} placeholder="キャプション" />

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 w-12">サイズ:</span>
                        <Slider value={section.width || 100} min={20} max={100} step={5} onChange={(val) => update('width', val)} />
                        <span className="text-xs text-gray-400 w-8 text-right">{section.width || 100}%</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">配置:</span>
                        <div className="flex gap-1">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('align', align)} className={`p-1 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {section.type === 'image_text' && (
                <>
                    <TextInput value={section.image} onChange={(val) => update('image', val)} placeholder="画像URL" />
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="見出し" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="本文" />
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">画像位置:</span>
                        <div className="flex bg-gray-900 p-1 rounded">
                            <button onClick={() => update('imagePosition', 'left')} className={`p-1.5 rounded ${section.imagePosition === 'left' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}><AlignLeft size={14} /></button>
                            <button onClick={() => update('imagePosition', 'right')} className={`p-1.5 rounded ${section.imagePosition === 'right' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}><AlignRight size={14} /></button>
                        </div>
                    </div>
                </>
            )}

            {section.type === 'heading' && (
                <>
                    <TextInput value={section.text} onChange={(val) => update('text', val)} placeholder="見出しテキスト" />
                    <TextInput value={section.subText} onChange={(val) => update('subText', val)} placeholder="サブテキスト" />
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('style', align)} className={`p-1.5 rounded border transition-colors ${section.style === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 text-xs">
                            <button onClick={() => update('design', 'simple')} className={`px-2 py-1 rounded border ${section.design === 'simple' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>シンプル</button>
                            <button onClick={() => update('design', 'underline')} className={`px-2 py-1 rounded border ${section.design === 'underline' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>下線</button>
                        </div>
                    </div>
                </>
            )}
            {section.type === 'button' && (
                <>
                    <TextInput value={section.label} onChange={(val) => update('label', val)} placeholder="ボタンの文字" />
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="リンクURL" />
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('align', align)} className={`p-1.5 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 text-xs">
                            <button onClick={() => update('style', 'fill')} className={`px-2 py-1 rounded border ${section.style === 'fill' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>塗り</button>
                            <button onClick={() => update('style', 'outline')} className={`px-2 py-1 rounded border ${section.style === 'outline' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>枠線</button>
                        </div>
                    </div>
                </>
            )}

            {section.type === 'video' && (
                <>
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="動画URL (YouTube/MP4)" />
                    <TextInput value={section.caption} onChange={(val) => update('caption', val)} placeholder="キャプション" />

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 w-12">サイズ:</span>
                        <Slider value={section.width || 100} min={20} max={100} step={5} onChange={(val) => update('width', val)} />
                        <span className="text-xs text-gray-400 w-8 text-right">{section.width || 100}%</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">配置:</span>
                        <div className="flex gap-1">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('align', align)} className={`p-1 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {section.type === 'social' && (
                <>
                    <div className="flex gap-2 mb-3">
                        <button onClick={() => update('platform', 'twitter')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs border ${section.platform === 'twitter' ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-600 text-gray-400'}`}>Twitter</button>
                        <button onClick={() => update('platform', 'instagram')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs border ${section.platform === 'instagram' ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-600 text-gray-400'}`}>Instagram</button>
                    </div>
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="投稿のURL" />
                </>
            )}
            {section.type === 'accordion' && (
                <div className="space-y-4">
                    {section.items.map((item, i) => (
                        <div key={item.id} className="space-y-2 pb-2 border-b border-gray-700">
                            <TextInput value={item.title} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, title: val }; update('items', newItems); }} placeholder="質問" />
                            <TextArea value={item.content} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, content: val }; update('items', newItems); }} placeholder="回答" />
                        </div>
                    ))}
                    <Button onClick={() => update('items', [...section.items, { id: Math.random(), title: 'Q', content: 'A' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                </div>
            )}
            {section.type === 'post_card' && (
                <>
                    <TextInput value={section.image} onChange={(val) => update('image', val)} placeholder="サムネイルURL" />
                    <TextInput value={section.date} onChange={(val) => update('date', val)} placeholder="日付" />
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="記事タイトル" />
                    <TextArea value={section.excerpt} onChange={(val) => update('excerpt', val)} placeholder="抜粋" />
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="記事URL" />
                </>
            )}
            {section.type === 'links' && (
                <div className="space-y-3">
                    {section.links.map((link, i) => (
                        <LinkEditor key={link.id} link={link} onChange={(newLink) => { const n = [...section.links]; n[i] = newLink; update('links', n); }} onDelete={() => { const n = section.links.filter(l => l.id !== link.id); update('links', n); }} />
                    ))}
                    <Button onClick={() => update('links', [...section.links, { id: Math.random(), label: 'Button', url: '#', subtext: '' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                </div>
            )}

            {/* Columns (Complex!) */}
            {section.type === 'columns' && (
                <>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">数:</span>
                        {[1, 2, 3].map(num => (
                            <button key={num} onClick={() => update('columnCount', num)} className={`px-2 py-0.5 rounded text-xs border ${section.columnCount === num ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{num}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">タイプ:</span>
                        <select value={section.colType || 'card'} onChange={(e) => update('colType', e.target.value)} className="bg-gray-900 text-xs border border-gray-700 rounded px-1 py-0.5 text-white">
                            <option value="card">画像+文</option>
                            <option value="text">文字</option>
                            <option value="image">画像</option>
                            <option value="video">動画</option>
                            <option value="social">SNS</option>
                        </select>
                    </div>

                    <div className="space-y-4 pl-2 border-l-2 border-gray-700">
                        {section.items.map((item, i) => (
                            <div key={item.id} className="space-y-2 pt-2 border-t border-gray-800 first:border-0 relative">
                                <div className="text-xs text-gray-500 font-bold mb-1">Item {i + 1}</div>

                                {(section.colType === 'card' || section.colType === 'text') && <><TextInput value={item.title} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, title: val }; update('items', n); }} placeholder="タイトル" /><TextInput value={item.text} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, text: val }; update('items', n); }} placeholder="テキスト" /></>}

                                {(section.colType === 'card' || section.colType === 'image') && <TextInput value={item.image} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, image: val }; update('items', n); }} placeholder="画像URL" />}

                                {(section.colType === 'video' || section.colType === 'social') && <TextInput value={item.url} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, url: val }; update('items', n); }} placeholder="URL" />}

                                {section.colType === 'social' && <div className="flex gap-2"><button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'twitter' }; update('items', n); }} className={`px-2 py-1 text-[10px] rounded ${item.platform === 'twitter' ? 'bg-blue-600' : 'bg-gray-700'}`}>Tw</button><button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'instagram' }; update('items', n); }} className={`px-2 py-1 text-[10px] rounded ${item.platform === 'instagram' ? 'bg-pink-600' : 'bg-gray-700'}`}>Ig</button></div>}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {section.type === 'box' && (
                <>
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="タイトル" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="内容" />
                </>
            )}
        </div>
    );
};
