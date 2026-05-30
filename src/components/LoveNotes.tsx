'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { loveNotes, LoveNote } from '../data/scrapbookData';
import { playCuteSound } from './MusicPlayer';

export default function LoveNotes() {
  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);
  const [openedNotes, setOpenedNotes] = useState<number[]>([]);

  const handleOpenNote = (note: LoveNote) => {
    // Play chime sound
    playCuteSound('unlock');
    setSelectedNote(note);
    if (!openedNotes.includes(note.id)) {
      setOpenedNotes([...openedNotes, note.id]);
    }
  };

  const handleCloseNote = () => {
    // Play bubble pop
    playCuteSound('bubble');
    setSelectedNote(null);
  };

  return (
    <section
      id="love-notes"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#ffeef2] to-[#fff0f5] py-24 px-6 md:px-12 select-none"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[15%] left-[5%] text-7xl animate-float">💌</div>
        <div className="absolute bottom-[20%] right-[5%] text-7xl animate-float-slow">🎀</div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <span className="text-[#db7093] font-cursive text-4xl block mb-2">Sweet Reminders</span>
          <h2 className="text-[#4a2c40] font-sans font-extrabold text-3xl md:text-4xl tracking-wide uppercase">
            Letters From The Heart 💌
          </h2>
          <div className="w-16 h-1 bg-[#ffb6c1] mx-auto mt-4 rounded-full" />
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {loveNotes.map((note, index) => {
            const isOpened = openedNotes.includes(note.id);
            
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleOpenNote(note)}
                className={`glass-card p-6 cursor-pointer border-2 bg-gradient-to-br ${note.color} relative overflow-hidden flex flex-col justify-between min-h-[220px] rounded-3xl`}
              >
                {/* Cute visual stamp / sticker overlay */}
                <div className="absolute top-4 right-4 text-4xl filter drop-shadow-md select-none opacity-80 animate-float-fast" style={{ animationDelay: `${index * 0.5}s` }}>
                  {note.sticker}
                </div>

                {/* Envelope details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className={`w-5 h-5 ${isOpened ? 'text-[#9c6a8b]' : 'text-[#ff69b4] animate-pulse'}`} />
                    <span className="text-[10px] tracking-widest font-extrabold uppercase text-[#9c6a8b]">
                      {isOpened ? 'Already Read' : 'Unread Letter'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#4a2c40] leading-snug">
                    {note.title}
                  </h3>
                  
                  <p className="text-xs text-[#7d536f] font-medium leading-relaxed max-w-[85%]">
                    {note.summary}
                  </p>
                </div>

                {/* Ribbon decoration at the bottom */}
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#e6c8d2] pt-4">
                  <span className="text-[10px] text-[#9c6a8b] font-bold tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ff69b4]" /> Read Note
                  </span>
                  <span className="text-xs">🎗️</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Screen Letter Modal Overlay */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseNote}
            className="fixed inset-0 w-full h-full bg-[#3d2734]/80 z-50 flex items-center justify-center p-6 backdrop-blur-md"
          >
            {/* Inner envelope popup frame */}
            <motion.div
              initial={{ scale: 0.9, y: 30, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 30, rotate: 2 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#fffbf9] p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-white overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at 100% 100%, #fff5f2 0%, #fffbf9 100%)',
              }}
            >
              {/* Top Tape decor */}
              <div className="polaroid-tape w-24 h-7 top-[-10px] bg-pink-100/50" />

              {/* Close Button */}
              <button
                onClick={handleCloseNote}
                className="absolute top-4 right-4 w-9 h-9 bg-pink-50 hover:bg-pink-100 active:scale-95 text-[#db7093] rounded-full flex items-center justify-center cursor-pointer transition-all border border-[#ffe0e6]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Envelope Letter Content */}
              <div className="flex flex-col gap-4 text-center items-center">
                
                {/* Floating sticker badge */}
                <div className="text-5xl mb-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {selectedNote.sticker}
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-[#4a2c40]">
                  {selectedNote.title}
                </h3>
                
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#ffc0cb] to-[#ff69b4]" />

                {/* Handwritten sweet body text */}
                <p className="mt-4 font-script text-2xl md:text-3xl text-[#db7093] leading-relaxed max-w-md select-text">
                  "{selectedNote.content}"
                </p>

                {/* Bottom signatures/stickers decoration */}
                <div className="mt-6 flex items-center gap-1.5 text-xs text-[#9c6a8b] font-medium tracking-wide uppercase">
                  <span>Wrapped in cute ribbons & extra sparkles</span>
                  <span>✨🎀</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
