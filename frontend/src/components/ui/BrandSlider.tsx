  'use client';
import { useText } from '@/lib/useText';

  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { Link } from '@/navigation';
  import { motion, AnimatePresence } from "framer-motion";
  import { ChevronLeft, ChevronRight } from "lucide-react";
  import BrandSlide from "./BrandSlide";
  import { useTranslations } from 'next-intl';

  export const BrandSlider = () => {
  const tx = useText();
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
        leftImage: "/images/unsplash/comp/naturamins-kids-nutrition-pediatrique.jpg",
        productImage: "/uploaded/sotya_smile_1786930963164.png",
        bgColor: "bg-[#eaf4ec]",
        accentColor: "bg-[#0f4c3a]",
        textColor: "text-[#0f4c3a]"
      },
      {
        id: 3,
        brand: "COLAGENOVA®",
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
                productImageAlt={tx("Gamme de compléments alimentaires SOTYA au Maroc")}

                personImage="/images/sotyaslider/madamsotya.png"
                personImageAlt={tx("SOTYA compléments alimentaires naturels et bien-être au Maroc")}

                logo="/images/sotyaslider/nobgsotya.png"
                logoAlt={tx("SOTYA - Compléments alimentaires naturels au Maroc")}
                logoClassName="h-[64px] xl:h-[74px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 xl:translate-x-2"

                headlinePart1={tx("Le naturel au service de votre")}
                headlineItalic={tx("")}
                headlinePart2={tx("au quotidien")}
                headlinePart2Italic="bien-être"
                headlinePart2ItalicFirst
                headlineClassName="font-poppins text-[18px] md:text-[20px] xl:text-[24px] leading-[1.24] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-bold text-[#176747]"
                mobileHeadlinePart1={tx("Le naturel au service de votre")}
                mobileHeadlineItalic={tx("")}
                mobileHeadlinePart2={tx("au quotidien")}
                mobileHeadlinePart2Italic="bien-être"
                mobileHeadlinePart2ItalicFirst
                mobileHeadlineClassName="font-poppins text-[23px] md:text-[27px] leading-[1.12] font-normal tracking-normal"
                mobileTagline={tx("Compléments Alimentaires")}
                mobileTaglineClassName="-translate-x-2 lg:-translate-x-4"
                mobileAvailabilityVariant="default"
                mobileSupportText={tx(null)}

                tagline={tx("Compléments alimentaires")}
                availability={tx("Désormais disponible au Maroc")}
                availabilityColor="#176747"
                availabilityClassName="-translate-x-6 lg:-translate-x-16"

                ctaLabel={tx("Découvrir la gamme")}
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
                productImageAlt={tx("Gamme COLAGENOVA® collagène beauté et articulations au Maroc")}

                personImage="/images/collagenslider/madamcollagene.png"
                personImageAlt={tx("COLAGENOVA® beauté de la peau et confort articulaire au Maroc")}

                logo="/images/collagenslider/nobgcollagene.png"
                logoAlt={tx("COLAGENOVA® - Solutions à base de collagène au Maroc")}
                logoClassName="h-[74px] xl:h-[88px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 -translate-y-6 xl:translate-x-2 xl:-translate-y-8"

                headlinePart1={tx("Le collagène")}
                headlineItalic={tx("ciblé")}
                headlineAfterItalic={tx("pour")}
                headlinePart2={tx("chaque besoin")}
                headlineClassName="font-poppins text-[18px] md:text-[20px] xl:text-[24px] leading-[1.24] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-bold text-[#db2777]"
                mobileHeadlinePart1={tx("Le collagène")}
                mobileHeadlineItalic={tx("ciblé")}
                mobileHeadlineAfterItalic={tx("pour")}
                mobileHeadlinePart2={tx("chaque besoin")}
                mobileHeadlineClassName="font-poppins text-[23px] md:text-[27px] leading-[1.12] font-normal tracking-normal"
                mobileAvailabilityVariant="default"
                mobileSupportText={tx(null)}

                tagline={tx("BEAUTÉ & ARTICULATIONS")}
                availability={tx("Lancement en 2027")}
                availabilityColor="#be185d"
                availabilityClassName="-translate-x-6 lg:-translate-x-16"

                ctaLabel={tx("Découvrir la gamme")}
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
                productImageAlt={tx("NATURAMINS KIDS nutrition pédiatrique et vitamines au Maroc")}
                productObjectPosition="0% 50%"

                personImage="/images/kidsslider/nizz.png"
                personImageMobile="/images/kidsslider/nizarr.png"
                personImageAlt={tx("NATURAMINS KIDS santé et vitalité de l'enfant au Maroc")}
                personOffsetClass="translate-x-8 lg:translate-x-16"
                personImageMobileClassName="-translate-y-8 md:-translate-y-12"

                logo="/images/kidsslider/nobgkids.png"
                logoAlt={tx("NATURAMINS KIDS - Nutrition pédiatrique au Maroc")}
                logoClassName="h-[104px] xl:h-[132px]"
                logoMobilePosition="top"
                logoMobileClassName="h-[96px] md:h-[116px]"
                centerAreaClassName="left-[29%] right-[22%]"
                contentClassName="translate-x-1 -translate-y-6 xl:translate-x-2 xl:-translate-y-8"

                headlinePart1={tx("Nourrir chaque étape")}
                headlineItalic={tx("")}
                headlinePart2={tx("de")}
                headlinePart2Italic="l’enfance"
                headlineClassName="font-poppins text-[18px] md:text-[20px] xl:text-[24px] leading-[1.24] font-normal tracking-normal"
                headlineItalicClassName="font-poppins not-italic font-semibold text-[#1F3763]"
                mobileHeadlinePart1={tx("Nourrir chaque étape")}
                mobileHeadlineItalic={tx("")}
                mobileHeadlinePart2={tx("de")}
                mobileHeadlinePart2Italic="l’enfance"
                mobileHeadlineClassName="font-poppins text-[23px] md:text-[27px] leading-[1.12] font-normal tracking-normal"
                mobileHeadlineItalicClassName="font-poppins not-italic font-semibold text-[#1F3763]"
                mobileAvailabilityVariant="default"
                mobileSupportText={tx(null)}

                tagline={tx("NUTRITION PÉDIATRIQUE")}
                taglineClassName="!mb-4"
                taglineColor="#344469"
                hideTaglineOnMobile

                availability={tx("Lancement en 2027")}
                availabilityColor="#284F8C"
                availabilityLineColor="#245C42"

                ctaLabel={tx("Découvrir la gamme")}
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
                    alt={tx(`${slides[current].brand} - Compléments alimentaires et santé au Maroc`)}
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
                      {tx(slides[current].title)}
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
                        {tx(slides[current].brand)}
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
                      alt={tx(`${slides[current].brand} - Gamme certifiée disponible en pharmacie au Maroc`)}
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
