'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import CursorTrail from '../components/CursorTrail';
import MusicPlayer from '../components/MusicPlayer';
import LoadingScreen from '../components/LoadingScreen';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import LoveNotes from '../components/LoveNotes';
import LilyGarden from '../components/LilyGarden';
import MemoryTimeline from '../components/MemoryTimeline';
import SecretSurprise from '../components/SecretSurprise';
import GoodNight from '../components/GoodNight';
import Ending from '../components/Ending';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none bg-gradient-to-b from-[#fff0f5] to-[#fff0f5]">
      
      {/* 1. Global Interactivity: Heart & Sparkle Cursor Trail overlay */}
      <CursorTrail />

      {/* 2. Global Sound & Background Music Player widget */}
      {!isLoading && <MusicPlayer />}

      {/* Main Fairytale Container */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* 3. ADORABLE LOADING SCREEN */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LoadingScreen onFinished={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          /* 4. MAGIC FAIRYTALE WORKSPACE LAYOUT */
          <motion.main
            key="fairytale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* a. Fullscreen Hero intro sky */}
            <Hero />

            {/* b. Scrapbook Polaroid gallery wall */}
            <PhotoGallery />

            {/* c. Envelope Love Notes card set */}
            <LoveNotes />

            {/* d. Interactive Wind-swaying Lily field */}
            <LilyGarden />

            {/* e. Glowing vertical Memories Timeline */}
            <MemoryTimeline />

            {/* f. Passcode locked secret gift box surprise */}
            <SecretSurprise />

            {/* g. Sleepy night-gradient moon and starry sky */}
            <GoodNight />

            {/* h. Closing credits scene with restart trigger */}
            <Ending onRestart={() => setIsLoading(true)} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
