'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, Unlock, HelpCircle, ArrowRight } from 'lucide-react';
import { secretBoxConfig } from '../data/scrapbookData';
import { playCuteSound } from './MusicPlayer';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'circle' | 'sparkle';
  decay: number;
}

export default function SecretSurprise() {
  const [isLocked, setIsLocked] = useState(true);
  const [inputCode, setInputCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiArrayRef = useRef<Confetti[]>([]);
  const animationIdRef = useRef<number | null>(null);

  // Confetti explosive loop
  const triggerConfettiExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff69b4', '#ffb6c1', '#db7093', '#da70d6', '#ffd700', '#fff0f5'];
    const count = 120;
    
    // Spawn active confetti pieces
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      const typeRand = Math.random();
      
      confettiArrayRef.current.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5, // shoot upwards!
        size: Math.random() * 16 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        type: typeRand < 0.4 ? 'heart' : typeRand < 0.75 ? 'sparkle' : 'circle',
        decay: Math.random() * 0.01 + 0.008,
      });
    }

    const drawConfettiHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x - size/2, y - size/2, x - size, y + topCurveHeight/3, x, y + size);
      c.bezierCurveTo(x + size, y + topCurveHeight/3, x + size/2, y - size/2, x, y + topCurveHeight);
      c.closePath();
    };

    const drawConfettiSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y - size);
      c.quadraticCurveTo(x, y, x + size, y);
      c.quadraticCurveTo(x, y, x, y + size);
      c.quadraticCurveTo(x, y, x - size, y);
      c.quadraticCurveTo(x, y, x, y - size);
      c.closePath();
    };

    const updateAndRender = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = confettiArrayRef.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const c = arr[i];
        c.alpha -= c.decay;
        c.size -= c.decay * 3;

        if (c.alpha <= 0 || c.size <= 0) {
          arr.splice(i, 1);
          continue;
        }

        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.18; // gravity
        c.vx *= 0.98; // air resistance
        c.rotation += c.rotationSpeed;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.globalAlpha = c.alpha;
        ctx.fillStyle = c.color;

        if (c.type === 'heart') {
          drawConfettiHeart(ctx, 0, -c.size/2, c.size);
          ctx.fill();
        } else if (c.type === 'sparkle') {
          drawConfettiSparkle(ctx, 0, 0, c.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (arr.length > 0) {
        animationIdRef.current = requestAnimationFrame(updateAndRender);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    updateAndRender();
  };

  // Clean up animation frame
  useEffect(() => {
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (inputCode.trim().toLowerCase() === secretBoxConfig.passcode) {
      // Success Sound
      playCuteSound('unlock');
      setIsLocked(false);
      
      // Delay explosion until box unwrap is slightly active
      setTimeout(() => {
        triggerConfettiExplosion();
      }, 300);
    } else {
      // Fail Sound
      playCuteSound('bubble');
      setIsShaking(true);
      setErrorMsg('Oops! That is not the magic passcode 🧸');
      setInputCode('');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <section
      id="secret-surprise"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#ffeef2] to-[#fff0f5] py-24 px-6 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Fullscreen Canvas Confetti */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-40 select-none" />

      {/* Decorative stars */}
      <div className="absolute top-[10%] left-[8%] text-3xl animate-twinkle">✨</div>
      <div className="absolute bottom-[10%] right-[8%] text-3xl animate-twinkle" style={{ animationDelay: '1s' }}>💖</div>

      <div className="max-w-2xl w-full z-10 flex flex-col items-center">
        
        {/* Section Title */}
        <div className="text-center mb-12 relative">
          <span className="text-[#db7093] font-cursive text-4xl block mb-2">A Secret Surprise</span>
          <h2 className="text-[#4a2c40] font-sans font-extrabold text-3xl md:text-4xl tracking-wide uppercase">
            Unlock The Gift Box 🎁✨
          </h2>
          <div className="w-16 h-1 bg-[#ffb6c1] mx-auto mt-4 rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {isLocked ? (
            /* LOCKED INTERFACE */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`glass-panel p-8 md:p-10 rounded-3xl w-full text-center flex flex-col items-center relative overflow-hidden border-white/60 shadow-[0_10px_35px_rgba(219,112,147,0.15)] ${
                isShaking ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : ''
              }`}
            >
              
              {/* Wrapped Gift Box Visual */}
              <div className="relative w-44 h-44 mb-6 cursor-pointer flex items-center justify-center">
                <motion.div
                  whileHover={{ rotate: [-3, 3, -3, 3, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => playCuteSound('bubble')}
                  className="w-full h-full text-[#ff69b4] filter drop-shadow-[0_4px_15px_rgba(255,105,180,0.4)]"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Box Base */}
                    <rect x="25" y="45" width="50" height="45" rx="4" fill="#ffb6c1" stroke="#ffa8be" strokeWidth="1" />
                    {/* Box Lid */}
                    <rect x="20" y="35" width="60" height="12" rx="2" fill="#ff69b4" stroke="#ffa8be" strokeWidth="1" />
                    {/* Ribbon Vertical */}
                    <rect x="46" y="35" width="8" height="55" fill="#ffd700" />
                    {/* Ribbon Horizontal */}
                    <rect x="25" y="60" width="50" height="8" fill="#ffd700" />
                    {/* Ribbon Bow Left */}
                    <path d="M48,35 C35,20 30,30 46,35 Z" fill="#ffd700" />
                    {/* Ribbon Bow Right */}
                    <path d="M52,35 C65,20 70,30 54,35 Z" fill="#ffd700" />
                    
                    {/* Keyhole detail */}
                    <circle cx="50" cy="64" r="3" fill="#3a2331" />
                    <polygon points="48,64 52,64 54,76 46,76" fill="#3a2331" />
                  </svg>
                </motion.div>
                
                {/* Floating Lock badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md text-[#ff69b4] border border-pink-100">
                  <Lock className="w-4 h-4 fill-none" />
                </div>
              </div>

              {/* Passcode input form */}
              <form onSubmit={handleUnlockAttempt} className="w-full max-w-sm flex flex-col gap-4">
                <p className="text-sm font-semibold text-[#8e607e] tracking-wide leading-relaxed">
                  A locked digital gift lies here. Enter the magical word to unwrap the ribbons!
                </p>

                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold text-[#e05275] bg-[#fff0f3] border border-[#ffd5df] py-1.5 px-3 rounded-full"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                <div className="relative flex items-center">
                  <input
                    type="password"
                    placeholder="Enter passcode..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-5 pr-14 py-3 bg-white/70 border-2 border-[#ffecf0] rounded-full focus:outline-none focus:border-[#ff69b4] focus:bg-white text-center text-[#4a2c40] font-bold text-sm tracking-widest placeholder:text-pink-300 placeholder:font-normal placeholder:tracking-normal transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 w-10 h-10 bg-gradient-to-tr from-[#ffb6c1] to-[#ff69b4] hover:from-[#ff69b4] hover:to-[#da70d6] active:scale-95 rounded-full flex items-center justify-center text-white cursor-pointer shadow-md transition-all border border-white/20"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Helper hint buttons */}
                <div className="flex items-center justify-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playCuteSound('bubble');
                      setShowHint(!showHint);
                    }}
                    className="text-xs font-bold text-[#db7093] hover:text-[#ff69b4] flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                </div>

                {/* Hint Text display */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#fffbf0] border border-[#f5ebcd] p-3 rounded-2xl text-[11px] text-[#9c784e] leading-relaxed select-text"
                    >
                      {secretBoxConfig.hint}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            /* UNLOCKED INTERFACE (Scrapbook Polaroid Reveal) */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, delay: 0.4 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-4 border-white max-w-lg w-full text-center relative overflow-hidden"
              style={{
                boxShadow: '0 20px 50px rgba(219, 112, 147, 0.22)',
              }}
            >
              {/* Polaroid Tape decorations */}
              <div className="polaroid-tape w-24 h-7 top-[-10px] bg-pink-100/70" />

              {/* Sparkle badge */}
              <div className="absolute top-4 right-4 text-2xl animate-spin" style={{ animationDuration: '6s' }}>✨</div>

              {/* Full Unlocked Image inside frame */}
              <div className="relative w-full aspect-square md:aspect-[16/11] rounded-2xl overflow-hidden mb-6 border border-[#ffecf0] bg-[#fff5f6]">
                <img
                  src={secretBoxConfig.unlockedPhoto}
                  alt="Secret surprise photo"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Ribbon sticker */}
                <div className="absolute bottom-3 left-3 bg-[#ffd700] text-[#4a2c40] font-bold text-[10px] tracking-widest uppercase py-1 px-3 border border-white/50 rounded-full shadow-sm">
                  🎀 Unlocked
                </div>
              </div>

              {/* Title & Handwritten text */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#4a2c40] leading-tight">
                {secretBoxConfig.unlockedTitle}
              </h3>
              <p className="mt-1 text-xs text-[#ff69b4] font-bold tracking-widest uppercase">
                {secretBoxConfig.unlockedCaption}
              </p>

              <div className="w-12 h-0.5 bg-pink-100 mx-auto my-4" />

              {/* Custom message text body */}
              <p className="font-script text-2xl md:text-3xl text-[#db7093] leading-relaxed max-w-md select-text">
                {secretBoxConfig.unlockedMessage}
              </p>

              {/* Interactive restart lock button details */}
              <button
                onClick={() => {
                  playCuteSound('bubble');
                  setIsLocked(true);
                  setInputCode('');
                  setShowHint(false);
                  setErrorMsg('');
                }}
                className="mt-6 text-[10px] text-[#9c6a8b] hover:text-[#ff69b4] font-extrabold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-1 mx-auto transition-all"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Re-lock Gift Box</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
