'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Coffee, Camera, Star } from 'lucide-react';
import { timelineEvents, TimelineEvent } from '../data/scrapbookData';

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  coffee: Coffee,
  camera: Camera,
  star: Star,
};

export default function MemoryTimeline() {
  return (
    <section
      id="memory-timeline"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fcebf0] to-[#ffeef2] py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Sparkles background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[20%] right-[8%] text-3xl animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
        <div className="absolute bottom-[35%] left-[6%] text-3xl animate-bounce" style={{ animationDuration: '5s' }}>⭐</div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        
        {/* Section Title */}
        <div className="text-center mb-20 relative">
          <span className="text-[#db7093] font-cursive text-4xl block mb-2">Our Fairytale Timeline</span>
          <h2 className="text-[#4a2c40] font-sans font-extrabold text-3xl md:text-4xl tracking-wide uppercase">
            A Journey of Beautiful Memories 🌸📖
          </h2>
          <div className="w-16 h-1 bg-[#ffb6c1] mx-auto mt-4 rounded-full" />
        </div>

        {/* Central Vertical Connector Line (hidden on tiny screens, aligned left on mobile) */}
        <div className="absolute left-4 md:left-1/2 top-[180px] bottom-[40px] w-0.5 border-l-2 border-dashed border-[#ffb6c1]/60 -translate-x-1/2" />

        {/* Timeline Event Cards */}
        <div className="flex flex-col gap-16 relative">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const IconComponent = iconMap[event.icon as keyof typeof iconMap] || Heart;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                } pl-10 md:pl-0 w-full`}
              >
                
                {/* Central glowing icon node on the vertical path */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', damping: 10, delay: 0.1 }}
                  className="absolute left-4 md:left-1/2 top-4 md:top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ff69b4] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,105,180,0.6)] z-20"
                >
                  <IconComponent className="w-4 h-4 fill-white" />
                </motion.div>

                {/* Event card details */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: 'spring', damping: 15 }}
                  className={`w-full md:w-[45%] bg-white p-5 pb-6 rounded-3xl shadow-[0_8px_20px_rgba(219,112,147,0.08)] border border-[#ffecf0] hover:shadow-[0_12px_30px_rgba(255,105,180,0.15)] transition-all duration-300 relative ${
                    isLeft ? 'rotate-1' : '-rotate-1'
                  } hover:rotate-0`}
                >
                  {/* Adhesive tape design element */}
                  <div className="polaroid-tape w-20 h-6 -top-3 bg-pink-50" />

                  {/* Header Date Tag */}
                  <span className="inline-block px-3 py-1 bg-[#fff0f5] border border-[#ffecf0] text-xs font-bold text-[#db7093] tracking-widest uppercase rounded-full mb-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]">
                    {event.date}
                  </span>

                  {/* Integrated memory photo/video */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-[#ffecf0] bg-[#fff5f6]">
                    {event.image.endsWith('.mp4') ? (
                      <video
                        src={event.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-[#4a2c40] tracking-wide mb-2 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-sm text-[#7d536f] leading-relaxed font-sans select-text">
                    {event.description}
                  </p>

                  {/* Scrapbook pin decoration */}
                  <div className="absolute -bottom-2 -right-1 text-xl filter drop-shadow-md select-none opacity-80">
                    ⭐
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
