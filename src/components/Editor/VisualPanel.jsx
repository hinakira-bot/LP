import React from 'react';
import { Camera, Video, Monitor, Layout } from 'lucide-react';
import { InputGroup, TextInput } from '../UI/Input';
import { Slider } from '../UI/Slider';
import { ColorPicker } from '../UI/ColorPicker';

export const VisualPanel = ({ data, setData }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Main Visual Settings */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <Monitor size={18} />
                    <h2 className="font-bold">メインビジュアル</h2>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-5">
                    <InputGroup label="メディアタイプ">
                        <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-lg">
                            <button
                                onClick={() => setData({ ...data, heroType: 'image' })}
                                className={`flex items-center justify-center gap-2 py-2 rounded text-sm transition-all ${data.heroType === 'image' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Camera size={16} /> Image
                            </button>
                            <button
                                onClick={() => setData({ ...data, heroType: 'video' })}
                                className={`flex items-center justify-center gap-2 py-2 rounded text-sm transition-all ${data.heroType === 'video' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Video size={16} /> Video
                            </button>
                        </div>
                    </InputGroup>
                    <InputGroup label="メディアURL">
                        <TextInput value={data.heroUrl} onChange={(val) => setData({ ...data, heroUrl: val })} placeholder="URLを入力" />
                    </InputGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="高さ (vh)">
                            <Slider value={data.heroHeight} min={20} max={100} onChange={(val) => setData({ ...data, heroHeight: val })} unit="vh" />
                        </InputGroup>
                        <InputGroup label="横幅 (%)">
                            <Slider value={data.heroWidth} min={50} max={100} onChange={(val) => setData({ ...data, heroWidth: val })} unit="%" />
                        </InputGroup>
                    </div>

                    <InputGroup label="画像の中心位置調整">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>横位置 (X)</span>
                                    <span>{data.heroPositionX}%</span>
                                </div>
                                <Slider value={data.heroPositionX} min={0} max={100} onChange={(val) => setData({ ...data, heroPositionX: val })} unit="%" />
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>縦位置 (Y)</span>
                                    <span>{data.heroPositionY}%</span>
                                </div>
                                <Slider value={data.heroPositionY} min={0} max={100} onChange={(val) => setData({ ...data, heroPositionY: val })} unit="%" />
                            </div>
                        </div>
                    </InputGroup>

                    <InputGroup label="オーバーレイ / ぼかし">
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">暗さ</div>
                                <Slider value={data.heroOverlayOpacity} min={0} max={0.9} step={0.1} onChange={(val) => setData({ ...data, heroOverlayOpacity: val })} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">ぼかし</div>
                                <Slider value={data.heroBlur} min={0} max={20} onChange={(val) => setData({ ...data, heroBlur: val })} unit="px" />
                            </div>
                        </div>
                    </InputGroup>
                </div>
            </section>

            {/* Global Background Settings */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <Layout size={18} />
                    <h2 className="font-bold">全体背景 (デフォルト)</h2>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-5">
                    <InputGroup label="背景タイプ">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={data.pageBgType === 'color'} onChange={() => setData({ ...data, pageBgType: 'color' })} className="accent-blue-500" />
                                <span className="text-sm">単色</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={data.pageBgType === 'image'} onChange={() => setData({ ...data, pageBgType: 'image' })} className="accent-blue-500" />
                                <span className="text-sm">画像</span>
                            </label>
                        </div>
                    </InputGroup>
                    {data.pageBgType === 'color' ? (
                        <InputGroup label="背景色">
                            <ColorPicker value={data.pageBgValue} onChange={(val) => setData({ ...data, pageBgValue: val })} />
                        </InputGroup>
                    ) : (
                        <InputGroup label="画像URL">
                            <TextInput value={data.pageBgValue} onChange={(val) => setData({ ...data, pageBgValue: val })} placeholder="URL" />
                        </InputGroup>
                    )}
                </div>
            </section>
        </div>
    );
};
