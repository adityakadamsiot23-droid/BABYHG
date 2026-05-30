'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { playCuteSound } from './MusicPlayer';

export default function Hero() {
  const handleScrollDown = () => {
    // Play sound on click
    playCuteSound('chime');
    
    const gallerySection = document.getElementById('photo-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate some random timing configurations for floating petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 10,
    size: Math.random() * 12 + 8,
  }));

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff0f5] via-[#ffe4e1] to-[#fff0f5] select-none py-20 px-6">
      
      {/* Drifting Clouds & Twinkling Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft clouds */}
        <div className="absolute top-[12%] left-[-15%] w-[45%] h-[20%] bg-white/45 rounded-full blur-xl animate-cloud-drift opacity-60" style={{ animationDuration: '35s' }} />
        <div className="absolute top-[40%] left-[60%] w-[50%] h-[25%] bg-white/35 rounded-full blur-2xl animate-cloud-drift opacity-40" style={{ animationDuration: '50s', animationDelay: '-10s' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[20%] bg-white/30 rounded-full blur-xl animate-cloud-drift opacity-50" style={{ animationDuration: '42s', animationDelay: '-25s' }} />

        {/* Twinkling star elements */}
        <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-[#ffd700] rounded-full animate-twinkle shadow-[0_0_8px_#ffd700]" style={{ animationDelay: '0.1s' }} />
        <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-white rounded-full animate-twinkle shadow-[0_0_10px_white]" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[55%] left-[10%] w-2.5 h-2.5 bg-[#ffb6c1] rounded-full animate-twinkle shadow-[0_0_8px_#ffb6c1]" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-white rounded-full animate-twinkle shadow-[0_0_6px_white]" style={{ animationDelay: '0.4s' }} />
        <div className="absolute bottom-[20%] left-[30%] w-3.5 h-3.5 bg-[#ffd700] rounded-full animate-twinkle shadow-[0_0_12px_#ffd700]" style={{ animationDelay: '1.6s' }} />
      </div>

      {/* Floating Lily Petals falling down */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: '105vh',
              x: [0, 40, -40, 20],
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: petal.left,
              width: petal.size,
              height: petal.size,
            }}
            className="text-pink-300 filter drop-shadow-[0_1px_2px_rgba(255,182,193,0.4)]"
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Hero Typography & Card */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        
        {/* Adorable glowing crown icon floating */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-5xl mb-6 filter drop-shadow-[0_4px_10px_rgba(255,215,0,0.5)] select-none cursor-pointer"
          onClick={() => playCuteSound('unlock')}
        >
          👑
        </motion.div>

        {/* Cursive Handwriting Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-[#db7093] font-cursive text-6xl md:text-7xl font-semibold tracking-wide filter drop-shadow-[0_2px_4px_rgba(219,112,147,0.15)] leading-tight"
        >
          To The Sweetest Girl Ever 💖
        </motion.h1>

        {/* Elegant modern sans subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="mt-6 text-[#9c6a8b] font-sans font-medium text-lg md:text-xl max-w-lg tracking-wide leading-relaxed"
        >
          Welcome to your tiny magical corner of the internet. A place made of soft pink skies, blooming lilies, and beautiful memories.
        </motion.p>

        {/* Micro-sparkle decor */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0, type: 'spring' }}
          className="flex items-center gap-2 mt-4 text-[#ff69b4] text-xs font-semibold uppercase tracking-widest bg-white/40 border border-white/60 py-1.5 px-3 rounded-full backdrop-blur-sm shadow-[0_2px_10px_rgba(255,105,180,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          Just For You
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Dreamy Glowing Enter Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScrollDown}
          className="mt-10 px-8 py-3.5 bg-gradient-to-r from-[#ffc0cb] via-[#ff69b4] to-[#da70d6] text-white font-semibold text-md rounded-full shadow-[0_4px_20px_rgba(255,105,180,0.4)] hover:shadow-[0_6px_25px_rgba(255,105,180,0.6)] cursor-pointer flex items-center gap-2 transition-all border border-white/30"
        >
          Open Scrapbook 📖✨
        </motion.button>
      </div>

      {/* Floating Interactive Bubbles around Hero */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] left-[8%] w-12 h-12 bg-white/10 rounded-full border border-white/20 animate-float shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]" />
        <div className="absolute bottom-[20%] right-[8%] w-16 h-16 bg-white/15 rounded-full border border-white/30 animate-float-slow shadow-[inset_0_3px_6px_rgba(255,255,255,0.2)]" />
      </div>

      {/* Scroll indicator pointing down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.0, delay: 1.5 }}
        onClick={handleScrollDown}
        className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer text-[#db7093]"
      >
        <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
