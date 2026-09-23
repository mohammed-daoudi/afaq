'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const historyData = [
  {
    id: 1,
    year: "1997 - 2010",
    title: "The Beginnings",
    description: "The vision for accessible, premium European health standards in Morocco is born. We started with a small but dedicated team aiming to bring the best nutritional supplements to our local communities.",
    image: "/images/unsplash/formulations/plants_1.png",
  },
  {
    id: 2,
    year: "2010",
    title: "Expanding the Family",
    description: "AFAQ broadens its expertise into specialized care for mothers and babies. Our commitment to nurturing life at its earliest stages became a core part of our identity.",
    image: "/images/unsplash/babies/baby_3.jpg",
  },
  {
    id: 3,
    year: "2017",
    title: "Innovation & Science",
    description: "Strategic partnerships with top-tier European laboratories were established to ensure unparalleled purity, safety, and efficacy in every formulation we offer.",
    image: "/images/unsplash/science/microscope.jpg",
  },
  {
    id: 4,
    year: "Today",
    title: "Looking to the Future",
    description: "A leading name in wellness, innovating continuously to bring the best of health to everyone across North Africa. Our journey is just beginning.",
    image: "/images/unsplash/beauty/beauty_3.jpg",
  }
];

export function HistorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % historyData.length);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + historyData.length) % historyData.length);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentSlide = historyData[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-deep">Notre Histoire</h2>
          <p className="text-xl text-anthracite-soft/70 mt-4 max-w-2xl mx-auto">Comment tout a commencé.</p>
        </div>

        {/* Main Card Container (Matches Doppelherz clean off-white card style) */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
          
          <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                onAnimationStart={() => setIsAnimating(true)}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
              >
                {/* Left Column: Image */}
                <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Right Column: Text */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 pb-24 pt-12 md:pb-32 md:pt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest text-[#C5281C] bg-[#C5281C]/10 mb-6 w-max">
                    {currentSlide.year}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-teal-deep mb-6">
                    {currentSlide.title}
                  </h3>
                  <p className="text-lg md:text-xl text-anthracite-soft/80 leading-relaxed ">
                    {currentSlide.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-between px-8 md:px-12 z-20">
            {/* Pagination Dots */}
            <div className="flex gap-3 items-center">
              {historyData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex 
                      ? 'w-10 h-3 bg-[#C5281C]' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#C5281C] hover:text-[#C5281C] hover:bg-[#C5281C]/5 transition-all focus:outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-[#C5281C] bg-[#C5281C] flex items-center justify-center text-white hover:bg-[#A82218] hover:border-[#A82218] transition-all focus:outline-none shadow-lg shadow-[#C5281C]/20"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
