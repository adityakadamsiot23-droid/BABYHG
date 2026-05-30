'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

// Custom lightweight Event dispatcher for sound effects
export function playCuteSound(type: 'bubble' | 'sparkle' | 'chime' | 'unlock') {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('play-cute-sfx', { detail: { type } });
    document.dispatchEvent(event);
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [trackUrl] = useState(
    'assets/love-song.mp3' // Custom cozy love song
  );
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize background audio element
  useEffect(() => {
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Listen for custom sound effects events
    const handleSfxRequest = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: 'bubble' | 'sparkle' | 'chime' | 'unlock' }>;
      const type = customEvent.detail?.type;
      if (type) triggerSynthSfx(type);
    };

    document.addEventListener('play-cute-sfx', handleSfxRequest);

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener('play-cute-sfx', handleSfxRequest);
    };
  }, [trackUrl]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle play toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    // Play sound FX for interaction
    triggerSynthSfx('bubble');

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented. Awaiting user interaction.", err);
      });
      setIsPlaying(true);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    triggerSynthSfx('bubble');
    setIsMuted(!isMuted);
  };

  // Dynamic Web Audio API Sound Effects Synthesizer
  const triggerSynthSfx = (type: 'bubble' | 'sparkle' | 'chime' | 'unlock') => {
    try {
      // Lazy initialize AudioContext on user interaction
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'bubble') {
        // High-pitched quick rising pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.13);
      } 
      
      else if (type === 'sparkle') {
        // Cascading chimes
        const frequencies = [880, 1109, 1318, 1760]; // A major arpeggio
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = idx * 0.05;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + delay);
          
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + delay);
          osc.stop(now + delay + 0.35);
        });
      } 
      
      else if (type === 'chime') {
        // Pentatonic harp glide
        const freqs = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]; // C major pentatonic
        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = i * 0.06;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + delay);
          osc.stop(now + delay + 0.5);
        });
      } 
      
      else if (type === 'unlock') {
        // Magical Double chime ding-ding!
        const notes = [987.77, 1318.51]; // B5 and E6
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = i * 0.08;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + delay);
          osc.stop(now + delay + 0.4);
        });
      }
    } catch (error) {
      console.log("Audio Context Synth error: ", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none">
      
      {/* Floating Sparkles around Player while playing */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute -top-3 left-1/4 animate-bounce text-xs">✨</span>
          <span className="absolute -top-1 -left-2 animate-pulse text-xs text-[#ff69b4]">💖</span>
          <span className="absolute -bottom-2 right-1/4 animate-ping text-[8px]">🎵</span>
        </div>
      )}

      {/* Main Glassmorphic Music Player Controller */}
      <div className="glass-panel rounded-full py-2 px-3 flex items-center gap-3 shadow-[0_4px_20px_rgba(219,112,147,0.2)] border-white/60">
        
        {/* Spinning Vinyl Icon */}
        <button
          onClick={togglePlay}
          className={`relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#3a2f35] to-[#120c10] flex items-center justify-center cursor-pointer shadow-md overflow-hidden ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '6s' }}
          title={isPlaying ? 'Pause Cozy Music' : 'Play Cozy Music'}
        >
          {/* Groove details */}
          <div className="absolute inset-1 rounded-full border border-white/10" />
          <div className="absolute inset-2.5 rounded-full border border-white/10" />
          
          {/* Center cute sticker */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffb6c1] flex items-center justify-center border border-white/20">
            <Heart className="w-1.5 h-1.5 text-white fill-white" />
          </div>
        </button>

        {/* Player Status / Info */}
        <div className="flex flex-col pr-1">
          <span className="text-[10px] uppercase tracking-widest text-[#db7093] font-bold">
            {isPlaying ? 'Playing' : 'Muted'}
          </span>
          <span className="text-xs font-semibold text-[#4a2c40] max-w-[80px] truncate" title="I Think They Call This Love">
            {isPlaying ? 'They Call This Love 💖' : 'Cozy Ambient'}
          </span>
        </div>

        {/* Volume visualization bars (Pulsing sound waves) */}
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-[2px] h-3.5 px-1">
            <div className="w-[3px] bg-[#ff69b4] rounded-full animate-pulse" style={{ height: '50%', animationDuration: '0.6s' }} />
            <div className="w-[3px] bg-[#da70d6] rounded-full animate-pulse" style={{ height: '90%', animationDuration: '0.4s' }} />
            <div className="w-[3px] bg-[#ffb6c1] rounded-full animate-pulse" style={{ height: '40%', animationDuration: '0.7s' }} />
            <div className="w-[3px] bg-[#ff69b4] rounded-full animate-pulse" style={{ height: '75%', animationDuration: '0.5s' }} />
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex items-center border-l border-white/40 pl-2 gap-1.5">
          {/* Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#db7093] hover:text-[#ff69b4] hover:bg-white/40 active:scale-95 transition-all cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          {/* Volume slider details */}
          {!isMuted && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-12 h-1 accent-[#ff69b4] rounded-full bg-white/60 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
          )}
        </div>
      </div>
    </div>
  );
}
