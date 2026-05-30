'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { galleryPhotos } from '../data/scrapbookData';
import { playCuteSound } from './MusicPlayer';

export default function PhotoGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    playCuteSound('chime');
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    playCuteSound('bubble');
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCuteSound('bubble');
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % galleryPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCuteSound('bubble');
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length
      );
    }
  };

  return (
    <section
      id="photo-gallery"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fff0f5] to-[#ffeef2] py-24 px-6 md:px-12 select-none"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <span className="text-[#db7093] font-cursive text-4xl block mb-2">My Little Collection</span>
          <h2 className="text-[#4a2c40] font-sans font-extrabold text-3xl md:text-4xl tracking-wide uppercase">
            A Gallery Of Happy Moments 🌷
          </h2>
          <div className="w-16 h-1 bg-[#ffb6c1] mx-auto mt-4 rounded-full" />
          
          {/* Subtle floating visual embellishments */}
          <span className="absolute top-0 left-1/4 animate-float-slow text-2xl">🧸</span>
          <span className="absolute bottom-0 right-1/4 animate-float text-xl">✨</span>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {galleryPhotos.map((photo, index) => {
            const isHovered = hoveredId === photo.id;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex justify-center"
              >
                {/* Polaroid Frame */}
                <div
                  onClick={() => openLightbox(index)}
                  onMouseEnter={(e) => {
                    setHoveredId(photo.id);
                    playCuteSound('bubble');
                    if (photo.type === 'video') {
                      const video = e.currentTarget.querySelector('video');
                      if (video) video.play().catch(() => {});
                    }
                  }}
                  onMouseLeave={(e) => {
                    setHoveredId(null);
                    if (photo.type === 'video') {
                      const video = e.currentTarget.querySelector('video');
                      if (video) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }
                  }}
                  className={`relative w-80 bg-white p-4 pb-6 shadow-[0_10px_25px_rgba(219,112,147,0.12)] border border-[#ffecf0] transition-all duration-300 cursor-pointer overflow-hidden ${photo.rotation} hover:rotate-0 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,105,180,0.22)]`}
                >
                  {/* Polaroid Taped Top decoration */}
                  <div className="polaroid-tape" />

                  {/* Polaroid Image/Video Block */}
                  <div className="relative w-full aspect-square overflow-hidden rounded border border-pink-100 bg-[#fff5f6] flex items-center justify-center">
                    {photo.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          src={photo.url}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                        {/* Custom video indicator overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[#ff69b4] shadow-md">
                            <span className="text-xl ml-1">▶️</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                      />
                    )}

                    {/* Floating Hearts emission overlay on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none flex items-center justify-center">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ y: 20, x: (i - 1.5) * 20, scale: 0.4, opacity: 0 }}
                              animate={{ y: -60, x: (i - 1.5) * 25 + (Math.random() - 0.5) * 20, scale: [0.4, 1.1, 0.7], opacity: [0, 1, 1, 0] }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.2 }}
                              className="absolute text-pink-400 text-lg filter drop-shadow-md"
                            >
                              ❤️
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Polaroid Caption */}
                  <div className="mt-4 text-center">
                    <p className="font-script text-2xl text-[#db7093] leading-none tracking-wide">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Polaroid shiny pins/stickers decoration */}
                  <span className="absolute bottom-2 right-2 text-xs opacity-60">💝</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Screen Lightbox Overlay modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 w-full h-full bg-[#3d2734]/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full flex items-center justify-center border border-white/20 cursor-pointer shadow-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white max-w-3xl w-full p-4 md:p-6 pb-8 md:pb-10 rounded-2xl shadow-2xl border border-white/80 overflow-hidden"
            >
              {/* Polaroid Tape detail */}
              <div className="polaroid-tape w-24 h-7 top-[-10px]" />

              {/* Slider Image aspect container */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl bg-[#fff5f6] border border-pink-50 flex items-center justify-center">
                {galleryPhotos[activePhotoIndex].type === 'video' ? (
                  <video
                    src={galleryPhotos[activePhotoIndex].url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={galleryPhotos[activePhotoIndex].url}
                    alt={galleryPhotos[activePhotoIndex].caption}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Sparkling Hearts overlay inside Lightbox */}
                <div className="absolute top-4 left-4 bg-white/40 backdrop-blur-sm py-1 px-3.5 rounded-full border border-white/50 text-[#ff69b4] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-[#ff69b4]" />
                  <span>{galleryPhotos[activePhotoIndex].type === 'video' ? 'Sweet Video' : 'Sweet Frame'}</span>
                </div>
              </div>


              {/* Navigation arrows inside card */}
              <button
                onClick={prevPhoto}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-[#db7093] hover:text-[#ff69b4] border border-[#ffecf0] rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-[#db7093] hover:text-[#ff69b4] border border-[#ffecf0] rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Caption and Slider Progress indicator */}
              <div className="mt-6 text-center select-text">
                <h3 className="font-script text-3xl md:text-4xl text-[#db7093]">
                  {galleryPhotos[activePhotoIndex].caption}
                </h3>
                <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-widest text-[#9c6a8b] bg-[#fff0f5] border border-[#ffecf0] px-3.5 py-1 rounded-full">
                  Memory {activePhotoIndex + 1} of {galleryPhotos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
