'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { playCuteSound } from './MusicPlayer';

interface PetalHeartParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'petal' | 'sparkle';
  decay: number;
}

interface EndingProps {
  onRestart: () => void;
}

export default function Ending({ onRestart }: EndingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    const particles: PetalHeartParticle[] = [];
    const maxParticles = 90;
    const colors = ['#ffb6c1', '#ffc0cb', '#ff69b4', '#db7093', '#fff0f5', '#ffd700'];

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x - size/2, y - size/2, x - size, y + topCurveHeight/3, x, y + size);
      c.bezierCurveTo(x + size, y + topCurveHeight/3, x + size/2, y - size/2, x, y + topCurveHeight);
      c.closePath();
    };

    const drawLilyPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y - size);
      c.quadraticCurveTo(x + size/2, y - size/2, x + size/3, y);
      c.quadraticCurveTo(x + size/4, y + size/3, x, y + size);
      c.quadraticCurveTo(x - size/4, y + size/3, x - size/3, y);
      c.quadraticCurveTo(x - size/2, y - size/2, x, y - size);
      c.closePath();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y - size);
      c.quadraticCurveTo(x, y, x + size, y);
      c.quadraticCurveTo(x, y, x, y + size);
      c.quadraticCurveTo(x, y, x - size, y);
      c.quadraticCurveTo(x, y, x, y - size);
      c.closePath();
    };

    // Autonomous spawning loop
    const spawnParticle = () => {
      if (particles.length >= maxParticles) return;

      const typeRand = Math.random();
      const type = typeRand < 0.38 ? 'heart' : typeRand < 0.76 ? 'petal' : 'sparkle';

      // Sparkles/hearts float up, petals fall down!
      const direction = type === 'petal' ? 1 : -1;
      const x = Math.random() * canvas.width;
      const y = direction === 1 ? -30 : canvas.height + 30;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: direction === 1 ? Math.random() * 1.2 + 0.5 : -(Math.random() * 1.2 + 0.6),
        size: Math.random() * 12 + 6,
        alpha: Math.random() * 0.4 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        type,
        decay: Math.random() * 0.003 + 0.001,
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random spawn density checks
      if (Math.random() < 0.15) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Petals sway sideways as they fall
        if (p.type === 'petal') {
          p.vx += Math.sin(p.y * 0.02) * 0.015;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.shadowBlur = p.type === 'sparkle' ? 8 : 4;
        ctx.shadowColor = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, 0, -p.size/2, p.size);
          ctx.fill();
        } else if (p.type === 'petal') {
          drawLilyPetal(ctx, 0, 0, p.size);
          ctx.fill();
          
          // Draw soft center detail line inside petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, p.size * 0.7);
          ctx.strokeStyle = '#ffffff80';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, 0, 0, p.size);
          ctx.fill();
        }

        ctx.restore();

        // Bounce/Check boundaries
        const outOfBounds = p.vy > 0 ? p.y > canvas.height + 40 : p.y < -40;
        if (outOfBounds || p.x < -40 || p.x > canvas.width + 40) {
          particles.splice(i, 1);
        }
      }

      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handleRestartJourney = () => {
    // Play harp chime sound effect
    playCuteSound('chime');
    
    // Smooth scroll back to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Call parent restart handler
    setTimeout(() => {
      onRestart();
    }, 800);
  };

  return (
    <section
      id="ending"
      className="relative w-full h-screen bg-gradient-to-b from-[#251320] via-[#ffccd6] to-[#fff0f5] py-24 px-6 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Falling/Floating Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Floating particles decor */}
      <div className="absolute top-[20%] left-[10%] text-2xl animate-float-fast z-20">🎀</div>
      <div className="absolute bottom-[20%] right-[10%] text-2xl animate-float-slow z-20">🧸</div>

      <div className="max-w-xl w-full z-20 flex flex-col items-center text-center">
        
        {/* Adorable glowing heart symbol pulsating */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-6xl mb-8 filter drop-shadow-[0_0_20px_rgba(255,105,180,0.6)] cursor-pointer"
          onClick={() => playCuteSound('unlock')}
        >
          💖
        </motion.div>

        {/* Cursive Romantic Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="text-[#db7093] font-cursive text-5xl md:text-6xl font-semibold tracking-wide leading-tight filter drop-shadow-[0_2px_4px_rgba(219,112,147,0.2)]"
        >
          Thank you for being you 💖
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="mt-6 text-[#7d506d] font-sans font-semibold text-md max-w-sm tracking-wide leading-relaxed"
        >
          You are an absolute princess, a bundle of smiles, and a truly wonderful person. Never change!
        </motion.p>

        {/* Sparkling divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1.5 mt-4 text-[#ffb6c1] select-none"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>🌸🌸🌸</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Restart fairytale button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRestartJourney}
          className="mt-10 px-8 py-3.5 bg-white text-[#db7093] hover:text-[#ff69b4] font-bold text-sm rounded-full shadow-[0_4px_20px_rgba(219,112,147,0.18)] hover:shadow-[0_6px_25px_rgba(255,105,180,0.35)] cursor-pointer flex items-center gap-2 transition-all border border-[#ffecf0]"
        >
          <RefreshCw className="w-4 h-4 animate-[spin_6s_linear_infinite]" />
          <span>Restart Fairytale</span>
        </motion.button>

        {/* Small footer copyrights details */}
        <p className="mt-8 text-[9px] uppercase font-bold tracking-widest text-[#9c6a8b] opacity-60">
          Handcrafted with pure love & extra cute sparks ✨
        </p>
      </div>
    </section>
  );
}
