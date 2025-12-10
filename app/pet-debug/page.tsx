"use client";

import React, { useState } from "react";

const IMAGES = [
    "/pet/barking.png",
    "/pet/playful.png",
    "/pet/sitting-facing-left.png",
    "/pet/walking-left.png",
    "/pet/walking-right.png"
];

export default function PetDebugPage() {
    const [selectedImage, setSelectedImage] = useState(IMAGES[0]);
    const [spriteWidth, setSpriteWidth] = useState(48);
    const [spriteHeight, setSpriteHeight] = useState(48);
    const [scale, setScale] = useState(2); // Display scale
    const [sourceScale, setSourceScale] = useState(1); // Image source scale
    const [framesPerRow, setFramesPerRow] = useState(5);
    const [rows, setRows] = useState(5);
    const [isAnimating, setIsAnimating] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    
    // New alignment state
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [viewMode, setViewMode] = useState<"preview" | "sheet">("preview");
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

    const spriteWidthPx = spriteWidth * scale;
    const spriteHeightPx = spriteHeight * scale;
    
    // Apply source scale to the natural size, then apply display scale
    const sheetWidthPx = (naturalSize.width || (spriteWidth * framesPerRow)) * sourceScale * scale;
    const sheetHeightPx = (naturalSize.height || (spriteHeight * rows)) * sourceScale * scale;
    
    // Grid size is based on sprite settings * display scale (independent of source scale)
    const gridWidthPx = spriteWidth * framesPerRow * scale;
    const gridHeightPx = spriteHeight * rows * scale;

    // Calculate animation keyframes with offset
    // We need to inject these into the style tag
    const keyframes = `
        @keyframes sprite-x {
            from { background-position-x: ${offsetX * scale}px; }
            to { background-position-x: -${gridWidthPx - (offsetX * scale)}px; }
        }
        @keyframes sprite-y {
            from { background-position-y: ${offsetY * scale}px; }
            to { background-position-y: -${gridHeightPx - (offsetY * scale)}px; }
        }
    `;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center gap-8">
            {/* Hidden image to capture natural dimensions */}
            <img 
                src={selectedImage} 
                className="hidden" 
                onLoad={(e) => setNaturalSize({ width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight })} 
                style={{ display: 'none' }}
            />

            <div className="flex items-center justify-between w-full max-w-6xl">
                <h1 className="text-3xl font-bold">Pet Sprite Debugger</h1>
                <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                    <button
                        onClick={() => setViewMode("preview")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            viewMode === "preview" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Animation Preview
                    </button>
                    <button
                        onClick={() => setViewMode("sheet")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            viewMode === "sheet" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Sheet Alignment
                    </button>
                </div>
            </div>

            <div className="flex gap-8 items-start w-full max-w-6xl">
                {/* Controls */}
                <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-xl border border-gray-700 w-80 shrink-0 h-fit">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-300 border-b border-gray-700 pb-2">Source</h3>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Image</label>
                            <select 
                                value={selectedImage} 
                                onChange={(e) => setSelectedImage(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                            >
                                {IMAGES.map(img => (
                                    <option key={img} value={img}>{img.split("/").pop()}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Natural Size: {naturalSize.width}x{naturalSize.height}px
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Source Scale</label>
                                <span className="text-xs text-blue-400">{sourceScale}x</span>
                            </div>
                            <input 
                                type="range" min="0.1" max="5" step="0.1" 
                                value={sourceScale} 
                                onChange={(e) => setSourceScale(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-300 border-b border-gray-700 pb-2">Grid Dimensions</h3>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Sprite Width</label>
                                <span className="text-xs text-blue-400">{spriteWidth}px</span>
                            </div>
                            <input 
                                type="range" min="16" max="128" step="1" 
                                value={spriteWidth} 
                                onChange={(e) => setSpriteWidth(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Sprite Height</label>
                                <span className="text-xs text-blue-400">{spriteHeight}px</span>
                            </div>
                            <input 
                                type="range" min="16" max="128" step="1" 
                                value={spriteHeight} 
                                onChange={(e) => setSpriteHeight(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Display Scale</label>
                                <span className="text-xs text-blue-400">{scale}x</span>
                            </div>
                            <input 
                                type="range" min="1" max="10" step="0.5" 
                                value={scale} 
                                onChange={(e) => setScale(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Cols</label>
                                <input 
                                    type="number" min="1" max="20" 
                                    value={framesPerRow} 
                                    onChange={(e) => setFramesPerRow(Number(e.target.value))}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Rows</label>
                                <input 
                                    type="number" min="1" max="20" 
                                    value={rows} 
                                    onChange={(e) => setRows(Number(e.target.value))}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-300 border-b border-gray-700 pb-2">Alignment (Crop)</h3>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Offset X</label>
                                <span className="text-xs text-blue-400">{offsetX}px</span>
                            </div>
                            <input 
                                type="range" min="-50" max="50" step="1" 
                                value={offsetX} 
                                onChange={(e) => setOffsetX(Number(e.target.value))}
                                className="w-full accent-green-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-400">Offset Y</label>
                                <span className="text-xs text-blue-400">{offsetY}px</span>
                            </div>
                            <input 
                                type="range" min="-50" max="50" step="1" 
                                value={offsetY} 
                                onChange={(e) => setOffsetY(Number(e.target.value))}
                                className="w-full accent-green-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-700">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={isAnimating} 
                                onChange={(e) => setIsAnimating(e.target.checked)}
                                id="animate"
                                className="rounded bg-gray-900 border-gray-700 text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="animate" className="text-sm text-gray-300">Animate</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={showGrid} 
                                onChange={(e) => setShowGrid(e.target.checked)}
                                id="grid"
                                className="rounded bg-gray-900 border-gray-700 text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="grid" className="text-sm text-gray-300">Show Grid Overlay</label>
                        </div>
                    </div>
                </div>

                {/* Viewport Area */}
                <div className="flex-1 flex flex-col items-center gap-6 bg-gray-800/50 p-8 rounded-xl border border-gray-700 min-h-[600px]">
                    {viewMode === "preview" ? (
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-300">Animation Preview</h2>
                            <div className="relative bg-gray-900 p-12 rounded-xl border border-gray-700 shadow-2xl">
                                <div 
                                    className="relative overflow-hidden border border-red-500/30"
                                    style={{
                                        width: spriteWidthPx,
                                        height: spriteHeightPx,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: spriteWidthPx,
                                            height: spriteHeightPx,
                                            imageRendering: "pixelated",
                                            backgroundImage: `url("${selectedImage}")`,
                                            backgroundSize: `${sheetWidthPx}px ${sheetHeightPx}px`,
                                            animation: isAnimating 
                                                ? `sprite-x 1s steps(${framesPerRow}) infinite, sprite-y 5s steps(${rows}) infinite` 
                                                : "none",
                                            backgroundPosition: `${offsetX * scale}px ${offsetY * scale}px`
                                        }}
                                    />
                                    {showGrid && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute inset-0 border border-blue-400/30"></div>
                                            <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/20"></div>
                                            <div className="absolute left-1/2 top-0 h-full w-px bg-blue-400/20"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm font-mono bg-gray-900 px-3 py-1 rounded">
                                Viewport: {spriteWidthPx}x{spriteHeightPx}px
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full overflow-auto">
                            <h2 className="text-xl font-semibold text-gray-300">Sheet Alignment</h2>
                            <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700 shadow-2xl overflow-auto max-w-full">
                                <div className="relative inline-block">
                                    {/* The Image */}
                                    <img 
                                        src={selectedImage} 
                                        alt="Sprite Sheet"
                                        style={{
                                            width: sheetWidthPx,
                                            height: sheetHeightPx,
                                            imageRendering: "pixelated",
                                            maxWidth: "none"
                                        }}
                                        className="opacity-80"
                                    />
                                    
                                    {/* The Grid Overlay */}
                                    {showGrid && (
                                        <div 
                                            className="absolute top-0 left-0 pointer-events-none border border-green-500/50"
                                            style={{
                                                width: gridWidthPx,
                                                height: gridHeightPx,
                                                transform: `translate(${offsetX * scale}px, ${offsetY * scale}px)`,
                                                display: "grid",
                                                gridTemplateColumns: `repeat(${framesPerRow}, 1fr)`,
                                                gridTemplateRows: `repeat(${rows}, 1fr)`
                                            }}
                                        >
                                            {Array.from({ length: framesPerRow * rows }).map((_, i) => (
                                                <div key={i} className="border border-green-400/30 relative">
                                                    {/* Center marker for each cell */}
                                                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400/40 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm font-mono bg-gray-900 px-4 py-2 rounded text-left space-y-1">
                                <p>Sheet Size: {sheetWidthPx}x{sheetHeightPx}px</p>
                                <p>Grid Size: {gridWidthPx}x{gridHeightPx}px</p>
                                <p className="text-green-400">Grid Offset: X={offsetX}, Y={offsetY}</p>
                                <p>Cell Size: {spriteWidthPx}x{spriteHeightPx}px</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{keyframes}</style>
        </div>
    );
}
