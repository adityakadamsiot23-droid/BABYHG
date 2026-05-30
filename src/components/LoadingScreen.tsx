'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onFinished: () => void;
}

const loadingTexts = [
  "Loading memories 💕",
  "Preparing princess mode 👑",
  "Collecting cute moments 🌷",
  "Adding extra love 💖"
];

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  // Animate the progress bar with organic speeds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // Simulates an organic network load (slows down near 90%, then bursts)
        let increment = 1;
        if (prev < 30) {
          increment = Math.floor(Math.random() * 8) + 4; // fast start
        } else if (prev < 70) {
          increment = Math.floor(Math.random() * 5) + 2; // steady mid
        } else if (prev < 90) {
          increment = Math.floor(Math.random() * 3) + 1; // slow end crawl
        } else {
          increment = 2; // final jump
        }

        const next = Math.min(prev + increment, 100);
        return next;
      });
    };

    timer = setInterval(updateProgress, 250);
    return () => clearInterval(timer);
  }, []);

  // Cycle the adorable texts as progress proceeds
  useEffect(() => {
    if (progress < 25) {
      setTextIndex(0);
    } else if (progress < 50) {
      setTextIndex(1);
    } else if (progress < 75) {
      setTextIndex(2);
    } else if (progress < 100) {
      setTextIndex(3);
    }
  }, [progress]);

  // Handle the transition at 100%
  useEffect(() => {
    if (progress === 100) {
      // Trigger bloom explosion sequence
      const explodeTimer = setTimeout(() => {
        setIsExploding(true);
        // Call the parent callback after the explosion animation finishes
        const finishTimer = setTimeout(() => {
          onFinished();
        }, 1000);
        return () => clearTimeout(finishTimer);
      }, 600);
      return () => clearTimeout(explodeTimer);
    }
  }, [progress, onFinished]);

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-tr from-[#ffebf0] via-[#ffd5e0] to-[#e8dbff] z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Soft Floating Clouds & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-20%] w-[50%] h-[30%] bg-white/20 rounded-full blur-2xl animate-cloud-drift opacity-60" style={{ animationDuration: '30s' }} />
        <div className="absolute top-[60%] left-[-20%] w-[60%] h-[25%] bg-white/25 rounded-full blur-3xl animate-cloud-drift opacity-50" style={{ animationDuration: '45s', animationDelay: '-15s' }} />
        
        {/* Decorative sparkles floating around */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-twinkle shadow-[0_0_10px_white]" style={{ animationDelay: '0.2s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#ffb6c1] rounded-full animate-twinkle shadow-[0_0_8px_#ffb6c1]" style={{ animationDelay: '0.9s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#ffd700] rounded-full animate-twinkle shadow-[0_0_12px_#ffd700]" style={{ animationDelay: '1.4s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-twinkle shadow-[0_0_8px_white]" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center z-10 max-w-md px-6 text-center select-none">
        
        {/* Animated SVG Lily Flower Blooming */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-[#ff69b4] filter drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]"
          >
            {/* Stem & Leaves */}
            <motion.path
              d="M50,90 Q50,65 50,55"
              fill="none"
              stroke="#8bc34a"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Left Leaf */}
            <motion.path
              d="M50,75 C40,70 32,73 30,80 C32,80 43,80 50,75"
              fill="#9ccc65"
              initial={{ scale: 0, originX: 0.5, originY: 0.75 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Right Leaf */}
            <motion.path
              d="M50,68 C60,65 68,68 70,75 C68,75 57,73 50,68"
              fill="#9ccc65"
              initial={{ scale: 0, originX: 0.5, originY: 0.68 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            />

            {/* Back Lily Petals (bloom scaled) */}
            <motion.path
              d="M50,55 C40,40 38,20 50,8 C62,20 60,40 50,55 Z"
              fill="#fff0f5"
              stroke="#ffb6c1"
              strokeWidth="0.5"
              initial={{ scale: 0, originX: 0.5, originY: 0.55 }}
              animate={{ scale: Math.max(0.2, progress / 100) }}
              transition={{ type: 'spring', damping: 15 }}
            />

            {/* Side Petals Left */}
            <motion.path
              d="M50,55 C30,45 22,30 25,18 C38,22 45,38 50,55 Z"
              fill="#ffe4e1"
              stroke="#ffb6c1"
              strokeWidth="0.5"
              initial={{ scale: 0, originX: 0.5, originY: 0.55 }}
              animate={{ scale: Math.max(0.1, (progress - 15) / 85) }}
              transition={{ type: 'spring', damping: 12 }}
            />

            {/* Side Petals Right */}
            <motion.path
              d="M50,55 C70,45 78,30 75,18 C62,22 55,38 50,55 Z"
              fill="#ffe4e1"
              stroke="#ffb6c1"
              strokeWidth="0.5"
              initial={{ scale: 0, originX: 0.5, originY: 0.55 }}
              animate={{ scale: Math.max(0.1, (progress - 15) / 85) }}
              transition={{ type: 'spring', damping: 12 }}
            />

            {/* Front Lily Petals */}
            <motion.path
              d="M50,55 C35,52 28,42 35,32 C45,38 48,48 50,55 Z"
              fill="#ffffff"
              stroke="#ffa8be"
              strokeWidth="0.5"
              initial={{ scale: 0, originX: 0.5, originY: 0.55 }}
              animate={{ scale: Math.max(0.05, (progress - 30) / 70) }}
              transition={{ type: 'spring', damping: 10 }}
            />

            <motion.path
              d="M50,55 C65,52 72,42 65,32 C55,38 52,48 50,55 Z"
              fill="#ffffff"
              stroke="#ffa8be"
              strokeWidth="0.5"
              initial={{ scale: 0, originX: 0.5, originY: 0.55 }}
              animate={{ scale: Math.max(0.05, (progress - 30) / 70) }}
              transition={{ type: 'spring', damping: 10 }}
            />

            {/* Lily Pistil / Stamen (center glowing orange-gold) */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 50 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <line x1="50" y1="55" x2="46" y2="35" stroke="#ffd700" strokeWidth="1" />
              <circle cx="46" cy="35" r="1.5" fill="#ff7f50" />
              
              <line x1="50" y1="55" x2="50" y2="32" stroke="#ffd700" strokeWidth="1" />
              <circle cx="50" cy="32" r="1.5" fill="#ff7f50" />
              
              <line x1="50" y1="55" x2="54" y2="35" stroke="#ffd700" strokeWidth="1" />
              <circle cx="54" cy="35" r="1.5" fill="#ff7f50" />
            </motion.g>
          </svg>

          {/* Sparkly halo behind flower */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-[#ffb6c1]/20 rounded-full blur-xl scale-90 animate-pulse-glow" />
        </div>

        {/* Adorable Rotating Status Messages */}
        <div className="h-10 mb-4 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[#db7093] font-script text-3xl font-medium tracking-wide"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Cute Progress Bar with Heart Rider */}
        <div className="relative w-72 h-4 bg-white/60 border border-white/80 rounded-full backdrop-blur-sm p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          {/* Progress fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#ffc0cb] via-[#ff69b4] to-[#da70d6] rounded-full shadow-[0_0_8px_rgba(255,105,180,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />

          {/* Heart Rider on the slider */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-xl filter drop-shadow-[0_1px_3px_rgba(219,112,147,0.4)]"
            style={{ left: `calc(${progress}% - 10px)` }}
            animate={{ y: [-10, -14, -10] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            💖
          </motion.div>
        </div>

        {/* Percentage text */}
        <p className="mt-3 text-xs text-[#9c6a8b] font-medium tracking-widest uppercase">
          {progress}% Ready
        </p>
      </div>

      {/* Screen Blast Explosion overlay triggered at 100% */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-white z-[60] flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Explosion circles expansion */}
              <div className="absolute w-[150vw] h-[150vw] bg-[#ffe4e1] rounded-full scale-120 animate-ping opacity-30" style={{ animationDuration: '1.2s' }} />
              <div className="absolute w-[120vw] h-[120vw] bg-[#fff0f5] rounded-full scale-110 animate-ping opacity-45" style={{ animationDuration: '0.9s' }} />
              <div className="text-6xl text-[#ff69b4] select-none filter drop-shadow-lg font-script animate-bounce">
                Welcome, Princess! ✨🌸
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
