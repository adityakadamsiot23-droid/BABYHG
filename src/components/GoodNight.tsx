'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Star, Sparkles } from 'lucide-react';
import { playCuteSound } from './MusicPlayer';

export default function GoodNight() {
  const [starCount, setStarCount] = useState(6);
  const [clickCount, setClickCount] = useState(0);

  const handleMoonClick = () => {
    playCuteSound('chime');
    setClickCount((c) => c + 1);
    
    // Add extra twinkling stars on clicking the moon!
    if (starCount < 20) {
      setStarCount((prev) => prev + 3);
    }
  };

  // Generate coordinates for stars
  const customStars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() * 3 + 1.5,
  }));

  return (
    <section
      id="good-night"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fff0f5] via-[#4d3244] to-[#251320] py-24 px-6 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      
      {/* Dynamic Twinkling Bedtime Sky Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sleeping floating clouds */}
        <div className="absolute top-[20%] left-[-15%] w-[45%] h-[20%] bg-white/10 rounded-full blur-xl animate-cloud-drift opacity-40" style={{ animationDuration: '45s' }} />
        <div className="absolute bottom-[25%] left-[55%] w-[50%] h-[25%] bg-white/5 rounded-full blur-2xl animate-cloud-drift opacity-30" style={{ animationDuration: '60s', animationDelay: '-20s' }} />

        {/* Twinkling Star Field */}
        {customStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-twinkle shadow-[0_0_10px_white]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: `${2.0 + Math.random() * 1.5}s`,
            }}
          />
        ))}

        {/* shooting star occasionally (simulated via Framer Motion infinite loop) */}
        <motion.div
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{ x: '110vw', y: '20vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 12, ease: 'linear' }}
          className="absolute w-28 h-0.5 bg-gradient-to-r from-white/0 to-white z-10"
          style={{ transform: 'rotate(-25deg)', top: '15%' }}
        />
      </div>

      <div className="max-w-xl w-full z-10 flex flex-col items-center text-center">
        
        {/* Soft Glowing Pink Crescent Moon */}
        <div className="relative mb-8 cursor-pointer flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
            onClick={handleMoonClick}
            className="w-36 h-36 flex items-center justify-center text-[#ffb6c1] filter drop-shadow-[0_0_25px_rgba(255,182,193,0.7)] z-10"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Crescent Moon */}
              <path
                d="M75,80 C40,80 20,60 20,35 C20,20 28,10 32,5 C18,12 8,28 8,45 C8,70 28,90 53,90 C68,90 80,82 85,73 C81,77 79,80 75,80 Z"
                fill="url(#moon-gradient)"
                stroke="#fff0f5"
                strokeWidth="0.8"
              />
              <defs>
                <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff0f5" />
                  <stop offset="50%" stopColor="#ffb6c1" />
                  <stop offset="100%" stopColor="#db7093" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Interactive sleepy emoji floating */}
          <div className="absolute bottom-2 left-6 text-xl animate-float-fast font-bold select-none opacity-80">
            🧸💤
          </div>
          
          {/* Moon backdrop glow halo */}
          <div className="absolute inset-0 bg-[#ffb6c1]/20 rounded-full blur-2xl animate-pulse-glow" style={{ animationDuration: '4s' }} />
        </div>

        {/* Cozy BEDTIME Card message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 rounded-3xl w-full border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          style={{
            background: 'rgba(255, 240, 245, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Elegant headline */}
          <h3 className="font-cursive text-5xl text-[#ffb6c1] tracking-wide filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
            Sleep Well Princess 💕
          </h3>

          <div className="w-12 h-[1px] bg-white/20 mx-auto my-4" />

          {/* Dreamy bedtime prose */}
          <p className="text-sm md:text-md text-[#dfc5d6] leading-relaxed font-sans font-medium select-text max-w-sm mx-auto">
            As the moon glows softly and the stars fill up the night sky, I hope you have the absolute sweetest dreams. Today was a beautiful day, and tomorrow will be even brighter. Curl up, stay cozy, and get a wonderful rest! 🌌🛌🧸
          </p>

          {/* Interactive micro-chime reaction indicator */}
          <AnimatePresence>
            {clickCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-center gap-1.5 text-[#ffd700] text-xs font-bold uppercase tracking-wider bg-white/5 py-1 px-3 rounded-full border border-white/10"
              >
                <Sparkles className="w-3 h-3 text-[#ffd700] animate-spin" />
                <span>Starfield Expanded!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Small floating instructions helper */}
        <p className="mt-4 text-[10px] uppercase font-bold tracking-widest text-[#9c7590]">
          (Click the cozy moon to expand the starry sky)
        </p>
      </div>
    </section>
  );
}
