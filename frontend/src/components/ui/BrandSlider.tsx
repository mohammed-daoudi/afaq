'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from '@/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export const BrandSlider = () => {
  const [current, setCurrent] = useState(0);
  const t = useTranslations('BrandSlider');

  const slides = [
    {
      id: 1,
      brand: "SOTYA",
      title: t('sotyaTitle'),
      subtitle: t('sotyaSubtitle'),
      link: "/marques/sotya",
      leftImage: "/images/unsplash/welness/laura-ohlman-sW6TRpgZLMw-unsplash.jpg",
      productImage: "/uploaded/sotya_girl_1786532115167.png",
      bgColor: "bg-[#f4eedb]",
      accentColor: "bg-[#009b4d]",
      textColor: "text-[#1a3b2b]"
    },
    {
      id: 2,
      brand: "NATURAMINS KIDS",
      title: t('naturaminsTitle'),
      subtitle: t('naturaminsSubtitle'),
      link: "/marques/naturamins-kids",
      leftImage: "/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jfif",
      productImage: "/uploaded/sotya_smile_1786930963164.png",
      bgColor: "bg-[#eaf4ec]",
      accentColor: "bg-[#0f4c3a]",
      textColor: "text-[#0f4c3a]"
    },
    {
      id: 3,
      brand: "COLAGENOVA",
      title: t('colagenovaTitle'),
      subtitle: t('colagenovaSubtitle'),
      link: "/marques/colagenova",
      leftImage: "/images/unsplash/welness/capture_welness_2.png",
      productImage: "/uploaded/onagre_bottle_final_1786939944849.png",
      bgColor: "bg-[#fcf5f5]",
      accentColor: "bg-[#db2777]",
      textColor: "text-[#831843]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 w-full h-full ${slides[current].bgColor} flex`}
        >
          {/* Background/Left Image */}
          <div className="absolute inset-0 w-full h-full lg:relative lg:w-[35%] z-0">
            <div className="absolute inset-0 bg-black/20 lg:hidden z-10" /> {/* Mobile darkening overlay */}
            <Image
              src={slides[current].leftImage}
              alt={slides[current].brand}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Curved SVG Separator (Green Wave) */}
          <div className="hidden lg:block absolute left-[35%] top-0 bottom-0 w-[150px] z-10 -ml-[75px]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={`w-full h-full`}
              style={{ fill: slides[current].accentColor.replace('bg-', '') }}
            >
              <path d="M0,0 Q100,50 0,100 Z" />
            </svg>
          </div>

          {/* Center Area - Text (Overlay on mobile, 35% on desktop) */}
          <div className="absolute inset-0 lg:relative lg:w-[35%] h-full flex flex-col justify-end lg:justify-center items-center text-center px-4 lg:px-8 lg:pl-20 z-20 pb-20 lg:pb-0">
            {/* Overlay Box for Mobile */}
            <div className="bg-white/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none max-w-[90%] lg:max-w-none w-full flex flex-col items-center">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl lg:text-5xl xl:text-6xl font-bold font-heading mb-2 lg:mb-4 ${slides[current].textColor}`}
              >
                {slides[current].title}
              </motion.h2>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="my-4 lg:my-8"
              >
                <h1 className={`text-4xl lg:text-7xl font-extrabold tracking-tighter opacity-90`}
                  style={{ color: slides[current].accentColor.replace('bg-', '') }}
                >
                  {slides[current].brand}
                </h1>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  href={slides[current].link}
                  className={`inline-block px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base text-white font-bold rounded-full transition-transform hover:scale-105 shadow-lg`}
                  style={{ backgroundColor: slides[current].accentColor.replace('bg-', '') }}
                >
                  {t('discoverRange')}
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Area - Products (30%) */}
          <div className="relative w-full lg:w-[30%] h-full hidden lg:flex items-center justify-center pr-10 z-20">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full h-[80%] max-w-sm drop-shadow-2xl"
            >
              <Image
                src={slides[current].productImage}
                alt={`${slides[current].brand} Products`}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-gray-800 z-30 transition-colors shadow-md"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-gray-800 z-30 transition-colors shadow-md"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx
                ? 'scale-125'
                : 'bg-gray-400/50 hover:bg-gray-400'
              }`}
            style={{ backgroundColor: current === idx ? slides[current].accentColor.replace('bg-', '') : '' }}
          />
        ))}
      </div>
    </section>
  );
};
