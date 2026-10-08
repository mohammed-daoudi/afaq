  'use client';
  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { Link } from '@/navigation';
  import { motion, AnimatePresence } from "framer-motion";
  import { ChevronLeft, ChevronRight } from "lucide-react";
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
        link: "/produits?brand=sotya",

        bgColor: "bg-[#f4f1d9]",
        accentColor: "bg-[#176747]",
        textColor: "text-[#176747]",
      },
      {
        id: 2,
        brand: "NATURAMINS KIDS",
        title: t('naturaminsTitle'),
        subtitle: t('naturaminsSubtitle'),
        link: "/produits?brand=naturamins-kids",
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
        link: "/produits?brand=colagenova",
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
                logoClassName="h-[64px] xl:h-[74px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 xl:translate-x-2"

                headlinePart1="Le naturel au service de votre"
                headlineItalic="bien-être"
                headlinePart2="au quotidien"
                headlineClassName="font-poppins text-[18px] md:text-[20px] xl:text-[24px] leading-[1.24] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-bold text-[#176747]"
                mobileHeadlinePart1="Le naturel au service de votre"
                mobileHeadlineItalic="bien-être"
                mobileHeadlinePart2="au quotidien"
                mobileHeadlineClassName="font-poppins text-[23px] md:text-[27px] leading-[1.12] font-normal tracking-normal"
                mobileTagline="Compléments Alimentaires"
                mobileTaglineClassName="-translate-x-2 lg:-translate-x-4"
                mobileAvailabilityVariant="default"
                mobileSupportText={null}

                tagline="Compléments alimentaires"
                availability="Désormais disponible au Maroc"
                availabilityColor="#176747"
                availabilityClassName="-translate-x-6 lg:-translate-x-16"

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
                productImage="/images/collagenslider/zyounat.png"
                productImageAlt="Gamme COLAGENOVA"

                personImage="/images/collagenslider/madamcollagene.png"
                personImageAlt="Beauté et articulations au naturel"

                logo="/images/collagenslider/nobgcollagene.png"
                logoAlt="COLAGENOVA"
                logoClassName="h-[74px] xl:h-[88px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 -translate-y-6 xl:translate-x-2 xl:-translate-y-8"

                headlinePart1="Le collagène"
                headlineItalic="ciblé"
                headlineAfterItalic="pour"
                headlinePart2="chaque besoin"
                headlineClassName="font-poppins text-[18px] md:text-[20px] xl:text-[24px] leading-[1.24] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-bold text-[#db2777]"
                mobileHeadlinePart1="Le collagène"
                mobileHeadlineItalic="ciblé"
                mobileHeadlineAfterItalic="pour"
                mobileHeadlinePart2="chaque besoin"
                mobileHeadlineClassName="font-poppins text-[23px] md:text-[27px] leading-[1.12] font-normal tracking-normal"
                mobileAvailabilityVariant="default"
                mobileSupportText={null}

                tagline="BEAUTÉ & ARTICULATIONS"
                availability="Lancement en 2027"
                availabilityColor="#be185d"
                availabilityClassName="-translate-x-6 lg:-translate-x-16"

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
                productImage="/images/kidsslider/naturamins-kids-fdf5e6-left.png"
                productImageAlt="Produits NATURAMINS KIDS"
                productObjectPosition="0% 50%"

                personImage="/images/kidsslider/nizz.png"
                personImageMobile="/images/kidsslider/nizarr.png"
                personImageAlt="Enfance et santé"
                personOffsetClass="translate-x-8 lg:translate-x-16"
                personImageMobileClassName="-translate-y-8 md:-translate-y-12"

                logo="/images/kidsslider/nobgkids.png"
                logoAlt="NATURAMINS KIDS"
                logoClassName="h-[104px] xl:h-[132px]"
                logoMobilePosition="top"
                logoMobileClassName="h-[96px] md:h-[116px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 -translate-y-6 xl:translate-x-2 xl:-translate-y-8"

                headlinePart1="Nourrir chaque étape"
                headlineItalic=""
                headlinePart2="de"
                headlinePart2Italic="l’enfance"
                headlineClassName="font-poppins text-[20px] md:text-[24px] xl:text-[30px] leading-[1.16] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-semibold text-[#1F3763]"
                mobileHeadlinePart1="Nourrir chaque étape"
                mobileHeadlineItalic=""
                mobileHeadlinePart2="de"
                mobileHeadlinePart2Italic="l’enfance"
                mobileHeadlineClassName="font-poppins text-[25px] md:text-[29px] leading-[1.1] font-normal tracking-normal"
                mobileHeadlineItalicClassName="font-poppins not-italic font-semibold text-[#1F3763]"
                mobileAvailabilityVariant="default"
                mobileSupportText={null}

                tagline="NUTRITION PÉDIATRIQUE"
                taglineClassName="!mb-4"
                taglineColor="#344469"
                hideTaglineOnMobile

                availability="Lancement en 2027"
                availabilityColor="#284F8C"
                availabilityLineColor="#245C42"

                ctaLabel="Découvrir la gamme"
                ctaHref={slides[current].link}
                ctaBg="linear-gradient(90deg, #294A7F 0%, #3F63BC 100%)"

                accentDark="#344469"
                accentMid="#F2A23A"

                bgFrom="#EAF6EA"
                bgMid="#FFF8EA"
                bgTo="#ECF7EF"
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
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-30 lg:bottom-8">
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
