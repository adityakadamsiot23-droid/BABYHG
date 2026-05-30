'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { lilyGardenQuotes, LilyQuote } from '../data/scrapbookData';
import { playCuteSound } from './MusicPlayer';

export default function LilyGarden() {
  const [selectedLily, setSelectedLily] = useState<LilyQuote | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleLilyClick = (lily: LilyQuote) => {
    // Play harp chime sound effect
    playCuteSound('chime');
    setSelectedLily(lily);
  };

  const handleClose = () => {
    playCuteSound('bubble');
    setSelectedLily(null);
  };

  // Pre-configured offsets and styling for each lily in our row
  const lilies = [
    { id: 1, left: '12%', height: '170px', scale: 0.9, delay: '0.2s', quoteIndex: 0, color: '#fff0f5' },
    { id: 2, left: '30%', height: '210px', scale: 1.1, delay: '0.9s', quoteIndex: 1, color: '#ffffff' },
    { id: 3, left: '50%', height: '185px', scale: 1.0, delay: '0.5s', quoteIndex: 2, color: '#ffe4e1' },
    { id: 4, left: '70%', height: '220px', scale: 1.15, delay: '1.2s', quoteIndex: 3, color: '#ffffff' },
    { id: 5, left: '88%', height: '165px', scale: 0.85, delay: '0.7s', quoteIndex: 4, color: '#fff5ee' },
  ];

  return (
    <section
      id="lily-garden"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fff0f5] to-[#fcebf0] py-24 px-6 md:px-12 select-none overflow-hidden flex flex-col justify-between"
    >
      
      {/* Interactive Floating Sparkles & Butterflies Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Ambient Light blobs */}
        <div className="absolute top-[30%] left-[20%] w-72 h-72 bg-[#ffe4e1]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-[#ffd5e0]/30 rounded-full blur-3xl" />

        {/* Fluttering CSS Butterflies */}
        <div className="absolute top-[25%] left-[-10%] animate-[cloud-drift_25s_linear_infinite] pointer-events-none opacity-80" style={{ animationDelay: '0s' }}>
          <div className="text-3xl animate-bounce" style={{ animationDuration: '3.5s' }}>🦋</div>
        </div>
        <div className="absolute top-[55%] right-[-10%] animate-[cloud-drift_35s_linear_infinite] pointer-events-none opacity-70" style={{ animationDelay: '-12s', animationDirection: 'reverse' }}>
          <div className="text-4xl animate-bounce" style={{ animationDuration: '4.5s' }}>🦋</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="text-center mb-10 relative">
          <span className="text-[#db7093] font-cursive text-4xl block mb-2">Her Favorite Flower</span>
          <h2 className="text-[#4a2c40] font-sans font-extrabold text-3xl md:text-4xl tracking-wide uppercase">
            The Lily Garden 🌷🌸
          </h2>
          <div className="w-16 h-1 bg-[#ffb6c1] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-[#9c6a8b] text-sm max-w-md mx-auto leading-relaxed">
            A magical digital field of lilies swaying in the gentle wind. Clicking any flower makes it bloom to reveal a cute, hidden message.
          </p>
        </div>
      </div>

      {/* Swaying Lily Garden Field */}
      <div className="relative w-full max-w-5xl mx-auto h-[320px] flex items-end justify-center z-10 border-b-2 border-dashed border-[#ffecf0] pb-2">
        {lilies.map((lily, index) => {
          const quote = lilyGardenQuotes[lily.quoteIndex];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={lily.id}
              className="absolute bottom-0 cursor-pointer flex flex-col items-center group"
              style={{
                left: lily.left,
                transform: `scale(${lily.scale})`,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                playCuteSound('bubble');
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleLilyClick(quote)}
            >
              
              {/* Floating hint box above flower */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute bottom-full mb-3 bg-white/80 border border-[#ffecf0] backdrop-blur-sm py-1 px-3 rounded-full shadow-md text-[10px] text-[#db7093] font-bold uppercase tracking-wider whitespace-nowrap z-20 flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#ffd700]" />
                    {quote.hint}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vector Swaying Lily Flower Body */}
              <div
                className="animate-sway lily-sway-origin relative"
                style={{
                  height: lily.height,
                  animationDelay: lily.delay,
                  animationDuration: `${4.5 + index * 0.5}s`,
                }}
              >
                <svg
                  viewBox="0 0 100 120"
                  className="h-full w-auto overflow-visible select-none drop-shadow-[0_4px_12px_rgba(255,182,193,0.35)] group-hover:drop-shadow-[0_6px_18px_rgba(255,105,180,0.5)] transition-all duration-300"
                >
                  {/* Stem */}
                  <path
                    d="M50,120 Q50,70 50,45"
                    fill="none"
                    stroke="#8bc34a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Swaying Leaves */}
                  <path
                    d="M50,90 C35,85 26,88 24,96 C26,96 39,95 50,90"
                    fill="#9ccc65"
                  />
                  <path
                    d="M50,75 C65,70 74,73 76,80 C74,80 61,78 50,75"
                    fill="#9ccc65"
                  />

                  {/* Lily Back Petals */}
                  <path
                    d="M50,45 C38,25 36,5 50,-8 C64,5 62,25 50,45 Z"
                    fill={lily.color}
                    stroke="#ffb6c1"
                    strokeWidth="0.5"
                  />

                  {/* Side petals */}
                  <path
                    d="M50,45 C28,35 18,18 22,5 C36,9 43,26 50,45 Z"
                    fill="#ffe4e1"
                    stroke="#ffb6c1"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M50,45 C72,35 82,18 78,5 C64,9 57,26 50,45 Z"
                    fill="#ffe4e1"
                    stroke="#ffb6c1"
                    strokeWidth="0.5"
                  />

                  {/* Front Petals */}
                  <path
                    d="M50,45 C32,41 24,30 32,18 C43,25 47,36 50,45 Z"
                    fill="#ffffff"
                    stroke="#ffa8be"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M50,45 C68,41 76,30 68,18 C57,25 53,36 50,45 Z"
                    fill="#ffffff"
                    stroke="#ffa8be"
                    strokeWidth="0.5"
                  />

                  {/* Center Pistils with bright orange-gold pollen tips */}
                  <g>
                    <line x1="50" y1="45" x2="45" y2="22" stroke="#ffd700" strokeWidth="1.2" />
                    <circle cx="45" cy="22" r="1.8" fill="#ff7f50" />

                    <line x1="50" y1="45" x2="50" y2="18" stroke="#ffd700" strokeWidth="1.2" />
                    <circle cx="50" cy="18" r="1.8" fill="#ff7f50" />

                    <line x1="50" y1="45" x2="55" y2="22" stroke="#ffd700" strokeWidth="1.2" />
                    <circle cx="55" cy="22" r="1.8" fill="#ff7f50" />
                  </g>
                </svg>

                {/* Soft glowing ambient circle behind active hover */}
                {isHovered && (
                  <div className="absolute inset-x-0 bottom-1/2 w-14 h-14 bg-[#ff69b4]/10 rounded-full blur-md mx-auto animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Screen Lily Bloom message pop-up */}
      <AnimatePresence>
        {selectedLily && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 w-full h-full bg-[#3d2734]/75 z-50 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#ffecf0] overflow-hidden text-center flex flex-col items-center"
            >
              {/* Glowing flower halo backdrop */}
              <div className="absolute top-0 w-72 h-72 bg-[#ffe4e1]/30 rounded-full blur-3xl -z-10" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 bg-pink-50 hover:bg-pink-100 active:scale-95 text-[#db7093] rounded-full flex items-center justify-center cursor-pointer transition-all border border-[#ffe0e6]"
              >
                🔑
              </button>

              {/* Glowing Lily Flower SVG Icon inside note */}
              <div className="w-24 h-24 mb-4 filter drop-shadow-[0_4px_10px_rgba(255,105,180,0.4)]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,75 C30,60 25,40 30,22 C44,28 48,50 50,75 Z" fill="#ffb6c1" />
                  <path d="M50,75 C70,60 75,40 70,22 C56,28 52,50 50,75 Z" fill="#ffb6c1" />
                  <path d="M50,75 C35,65 30,55 35,40 C46,45 49,55 50,75 Z" fill="#ffffff" />
                  <path d="M50,75 C65,65 70,55 65,40 C54,45 51,55 50,75 Z" fill="#ffffff" />
                  <circle cx="50" cy="45" r="3" fill="#ffd700" />
                </svg>
              </div>

              {/* Handwritten Sweet Hidden Quote text */}
              <p className="font-script text-3xl text-[#db7093] leading-relaxed max-w-[85%] select-text">
                {selectedLily.content}
              </p>

              {/* Tiny footer details */}
              <div className="mt-6 flex items-center gap-1 text-[10px] text-[#9c6a8b] font-extrabold tracking-widest uppercase">
                <Heart className="w-3.5 h-3.5 fill-[#ff69b4] text-[#ff69b4]" />
                <span>Bloomed with love</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
