'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  type: 'heart' | 'bubble' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
  decay: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const maxParticles = 80;

    // Palette of dreamy scrapbook colors
    const colors = [
      '#ffb6c1', // LightPink
      '#ff69b4', // HotPink
      '#ffc0cb', // Pink
      '#db7093', // PaleVioletRed
      '#e6e6fa', // Lavender
      '#faf0e6', // Linen (warm cream)
      '#fff0f5', // LavenderBlush
      '#ffd700', // Gold sparkles
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(x, y + topCurveHeight);
      
      // Top left curve
      context.bezierCurveTo(
        x - size / 2,
        y - size / 2,
        x - size,
        y + topCurveHeight / 3,
        x,
        y + size
      );

      // Top right curve
      context.bezierCurveTo(
        x + size,
        y + topCurveHeight / 3,
        x + size / 2,
        y - size / 2,
        x,
        y + topCurveHeight
      );

      context.closePath();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      // 4-pointed star
      context.moveTo(x, y - size);
      context.quadraticCurveTo(x, y, x + size, y);
      context.quadraticCurveTo(x, y, x, y + size);
      context.quadraticCurveTo(x, y, x - size, y);
      context.quadraticCurveTo(x, y, x, y - size);
      context.closePath();
    };

    const createParticle = (x: number, y: number, isBurst = false) => {
      const typeRand = Math.random();
      let type: 'heart' | 'bubble' | 'sparkle' = 'sparkle';
      if (typeRand < 0.35) {
        type = 'heart';
      } else if (typeRand < 0.7) {
        type = 'bubble';
      }

      // Spreading physics
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4 + 1.5 : Math.random() * 1.2 + 0.3;
      
      const size = type === 'heart'
        ? Math.random() * 14 + 8 
        : type === 'bubble'
        ? Math.random() * 10 + 6
        : Math.random() * 12 + 6;

      const p: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(angle) * speed - (type === 'bubble' ? Math.random() * 0.6 + 0.3 : Math.random() * 0.4), // Bubbles float upwards!
        size,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        decay: isBurst ? Math.random() * 0.015 + 0.01 : Math.random() * 0.02 + 0.015,
      };

      particles.push(p);

      // Limit particle count to avoid overhead
      if (particles.length > maxParticles) {
        particles.shift();
      }
    };

    // Track mouse coordinates and spawn particles
    let lastX = 0;
    let lastY = 0;
    let distanceThreshold = 8; // Pixels mouse needs to move before spawning a trail particle

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > distanceThreshold) {
        createParticle(x, y);
        lastX = x;
        lastY = y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > distanceThreshold) {
        createParticle(x, y);
        lastX = x;
        lastY = y;
      }
    };

    // Spawn a cute explosion on screen clicks
    const handleClick = (e: MouseEvent) => {
      const burstSize = 16;
      for (let i = 0; i < burstSize; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const burstSize = 10;
      for (let i = 0; i < burstSize; i++) {
        createParticle(x, y, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart);

    // Main Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply decay
        p.alpha -= p.decay;
        p.size -= p.decay * 5; // shrink slowly

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Apply slight gravity/float effects
        if (p.type === 'bubble') {
          p.vy -= 0.02; // float up faster
        } else {
          p.vy += 0.03; // fall down gently like autumn petals
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Soft glow shadow filter for sparkles and hearts
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, 0, -p.size / 2, p.size);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'bubble') {
          // Glassy bubble outline
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '26'; // transparent fill
          ctx.fill();
          ctx.strokeStyle = p.color + 'b3'; // semi-solid border
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Bubble glossy reflection highlight
          ctx.beginPath();
          ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffffb3';
          ctx.fill();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 select-none"
    />
  );
}
