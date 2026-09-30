  'use client';
  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { Link } from '@/navigation';
  import { motion, AnimatePresence } from "framer-motion";
  import { ChevronLeft, ChevronRight, Leaf, Sprout, ShieldCheck, Heart } from "lucide-react";
  import BrandSlide from "./BrandSlide";
  import { useTranslations } from 'next-intl';

  export const BrandSlider = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const t = useTranslations('BrandSlider');

    const slides = [
      {
        id: 1,
        brand: "SOTYA",
        title: t('sotyaTitle'),
        subtitle: t('sotyaSubtitle'),
        link: "/marques/sotya",

        bgColor: "bg-[#f4f1d9]",
        accentColor: "bg-[#176747]",
        textColor: "text-[#176747]",
      },
      {
        id: 2,
        brand: "NATURAMINS KIDS",
        title: t('naturaminsTitle'),
        subtitle: t('naturaminsSubtitle'),
        link: "/marques/naturamins-kids",
        leftImage: "/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jpg",
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
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
      setDirection(-1);
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
      <section className="relative w-full h-[460px] md:h-[440px] lg:h-[460px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? '100%' : '-100%',
                opacity: 0.8,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (dir: number) => ({
                x: dir < 0 ? '100%' : '-100%',
                opacity: 0.8,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            className={`absolute inset-0 w-full h-full ${slides[current].bgColor} flex`}
          >
            {slides[current].id === 1 ? (
              <BrandSlide
                productImage="/images/sotyaslider/sotyat.png"
                productImageAlt="Gamme de compléments alimentaires SOTYA"

                personImage="/images/sotyaslider/madamsotya.png"
                personImageAlt="Femme avec un complément alimentaire SOTYA"

                logo="/images/sotyaslider/nobgsotya.png"
                logoAlt="SOTYA"
                logoClassName="h-[58px] xl:h-[66px] -translate-x-4 lg:-translate-x-8"

                headlinePart1="La force"
                headlineItalic="naturelle"
                headlinePart2="pour votre bien-être"

                tagline="Compléments Alimentaires"
                taglineClassName="-translate-x-4 lg:-translate-x-8"
                availability="Désormais disponible au Maroc"

                ctaLabel="Découvrir la gamme"
                ctaHref={slides[current].link}

                accentDark="#176747"
                accentMid="#3E8B61"

                bgFrom="#E4DDBD"
                bgMid="#F4F1D9"
                bgTo="#DCE8C7"
              />
            ) : slides[current].id === 3 ? (
              <BrandSlide
                productImage="/images/collagenslider/collagenat.png"
                productImageAlt="Gamme COLAGENOVA"

                personImage="/images/collagenslider/madamcollagene.png"
                personImageAlt="Beauté et mobilité au naturel"

                logo="/images/collagenslider/nobgcollagene.png"
                logoAlt="COLAGENOVA"
                logoClassName="h-[74px] xl:h-[86px] -translate-x-4 lg:-translate-x-8"

                headlinePart1="Le secret de votre"
                headlineItalic="vitalité"
                headlinePart2="intérieure"
                headlineClassName="font-poppins text-[20px] md:text-[22px] xl:text-[26px] leading-[1.15] font-light tracking-[-0.01em]"

                tagline="BEAUTÉ & MOBILITÉ"
                taglineClassName="-translate-x-4 lg:-translate-x-8"
                availability="Désormais disponible au Maroc"
                availabilityBg="linear-gradient(90deg, #be185d 0%, #f472b6 100%)"

                ctaLabel="Découvrir la gamme"
                ctaHref={slides[current].link}

                accentDark="#831843"
                accentMid="#db2777"

                bgFrom="#fdf2f8"
                bgMid="#fcf5f5"
                bgTo="#fce7f3"
              />
            ) : slides[current].id === 2 ? (
              <BrandSlide
                productImage="/images/kidsslider/natuu.png"
                productImageAlt="Produits NATURAMINS KIDS"

                personImage="/images/kidsslider/nizz.png"
                personImageMobile="/images/kidsslider/nizarr.png"
                personImageAlt="Enfance et santé"
                personOffsetClass="translate-x-8 lg:translate-x-16"
                personImageMobileClassName="-translate-y-8 md:-translate-y-12"

                logo="/images/kidsslider/nobgkids.png"
                logoAlt="NATURAMINS KIDS"
                logoClassName="h-[95px] xl:h-[120px]"

                headlinePart1="Des nutriments essentiels"
                headlineItalic="pour chaque étape"
                headlinePart2="de l'enfance"
                headlineClassName="font-poppins text-[22px] md:text-[26px] xl:text-[32px] leading-[1.12] font-light tracking-[-0.01em] bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700"

                tagline="NUTRIMENTS PÉDIATRIQUES"
                availability="Désormais disponible au Maroc"
                availabilityBg="linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)"

                ctaLabel="Découvrir la gamme"
                ctaHref={slides[current].link}
                ctaBg="linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)"

                accentDark="#0f4c3a"
                accentMid="#176747"

                bgFrom="#eaf4ec"
                bgMid="#f3f9f4"
                bgTo="#eaf4ec"
              />
            ) : (
              <>
                {/* Background/Left Image */}
                <div className="absolute inset-0 w-full h-full lg:relative lg:w-[35%] z-0">
                  <div className="absolute inset-0 bg-black/20 lg:hidden z-10" /> {/* Mobile darkening overlay */}
                  <Image
                    src={slides[current].leftImage || ""}
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
                  <div className="bg-white/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-5 lg:p-0 rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none max-w-[90%] lg:max-w-none w-full flex flex-col items-center">
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`text-2xl lg:text-4xl xl:text-5xl font-bold mb-1 lg:mb-2 leading-tight ${slides[current].textColor}`}
                    >
                      {slides[current].title}
                    </motion.h2>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="my-2 lg:my-4"
                    >
                      <h1 className={`text-3xl lg:text-6xl font-extrabold tracking-tighter opacity-90 leading-none`}
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
                        className={`inline-block px-6 lg:px-8 py-3 text-sm lg:text-base text-white font-bold rounded-full transition-transform hover:scale-105 shadow-lg`}
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
                    className="relative w-full h-[90%] max-w-sm drop-shadow-2xl"
                  >
                    <Image
                      src={slides[current].productImage || ""}
                      alt={`${slides[current].brand} Products`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </>
            )}
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
