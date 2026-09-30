import React from "react";

/**
 * BrandSlide
 *
 * Desktop (≥ lg):
 *   40% products | 35% clean center | 25% woman
 *   Each photo fades deeply into the shared cream background via CSS maskImage.
 *   Center is genuinely wide — not a thin strip.
 *
 * Mobile / Tablet (< lg):
 *   Woman photo full-bleed background
 *   Soft cream gradient overlay rising from bottom
 *   Logo + headline + availability + CTA anchored at the bottom
 */

type BrandSlideProps = {
  productImage: string;
  productImageAlt: string;

  personImage: string;
  personImageMobile?: string;
  personImageAlt: string;

  logo: string;
  logoAlt: string;

  headlinePart1: string;
  headlineItalic: string;
  headlinePart2: string;

  tagline: string;
  availability: string;

  ctaLabel: string;
  ctaHref: string;
  ctaBg?: string;

  accentDark?: string;
  accentMid?: string;

  bgFrom?: string;
  bgMid?: string;
  bgTo?: string;

  productOffsetClass?: string;
  personOffsetClass?: string;
  personImageMobileClassName?: string;
  availabilityBg?: string;
  logoClassName?: string;
  headlineClassName?: string;
  taglineClassName?: string;
};

export default function BrandSlide({
  productImage,
  productImageAlt,

  personImage,
  personImageMobile,
  personImageAlt,

  logo,
  logoAlt,

  headlinePart1,
  headlineItalic,
  headlinePart2,

  tagline,
  availability,

  ctaLabel,
  ctaHref,
  ctaBg,

  accentDark = "#176747",
  accentMid = "#3E8B61",

  bgFrom = "#E4DDBD",
  bgMid  = "#F4F1D9",
  bgTo   = "#DCE8C7",
  productOffsetClass = "",
  personOffsetClass = "",
  personImageMobileClassName = "",
  availabilityBg,
  logoClassName,
  headlineClassName,
  taglineClassName,
}: BrandSlideProps) {
  return (
    <section
      className="relative w-full h-[460px] md:h-[440px] lg:h-[460px] overflow-hidden"
    >

      {/* =========================================================
          DESKTOP  ≥ lg
          Layout: 40% products | 35% center | 25% woman
      ========================================================= */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(
            90deg,
            ${bgFrom}  0%,
            ${bgMid}  42%,
            ${bgMid}  58%,
            ${bgTo}  100%
          )`,
        }}
      >

        {/* ── LEFT : products ── */}
        <img
          src={productImage}
          alt={productImageAlt}
          className={`absolute inset-y-0 left-0 w-[41%] h-full object-cover ${productOffsetClass}`}
          style={{
            objectPosition: "110% 50%",
            maskImage:
              "linear-gradient(to right, black 0%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 78%, transparent 100%)",
          }}
        />

        {/* ── RIGHT : woman ── */}
        <img
          src={personImage}
          alt={personImageAlt}
          className={`absolute inset-y-0 right-0 w-[34%] h-full object-cover ${personOffsetClass}`}
          style={{
            objectPosition: "35% 0%",
            maskImage:
              "linear-gradient(to left, black 0%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 65%, transparent 100%)",
          }}
        />

        {/* ── CENTER : wide clean zone ── */}
        <div
          className="
            absolute
            inset-y-0
            left-[32%]
            right-[21%]
            z-20
            flex
            items-center
            justify-center
          "
        >
          <div className="w-full max-w-[560px] px-6 xl:px-8 text-center">

            {/* LOGO */}
            <img
              src={logo}
              alt={logoAlt}
              className={`w-auto object-contain mx-auto mb-1 ${logoClassName || 'h-[58px] xl:h-[66px]'}`}
            />

            {/* TAGLINE — right under logo */}
            <div className={`mb-6 xl:mb-8 flex items-center justify-center gap-3 ${taglineClassName || ''}`}>
              <span
                className="block h-px w-8 xl:w-10"
                style={{ backgroundColor: accentMid }}
              />
              <p
                className="text-[10px] xl:text-[11px] uppercase tracking-[0.22em] font-bold whitespace-nowrap"
                style={{ color: accentMid }}
              >
                {tagline}
              </p>
              <span
                className="block h-px w-8 xl:w-10"
                style={{ backgroundColor: accentMid }}
              />
            </div>

            {/* HEADLINE */}
            <div style={{ color: accentDark }}>
              <p className={headlineClassName || "font-poppins text-[26px] xl:text-[32px] leading-[1.12] font-light tracking-[-0.01em]"}>
                {headlinePart1}{" "}
                <span className="font-semibold">{headlineItalic}</span>
              </p>
              <p className={headlineClassName || "font-poppins text-[26px] xl:text-[32px] leading-[1.12] font-light tracking-[-0.01em]"}>
                {headlinePart2}
              </p>
            </div>

            {/* AVAILABILITY — organic marker highlight */}
            <div className="mt-4 mb-6 relative inline-flex items-center justify-center px-7 py-2.5">
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ 
                  background: availabilityBg || "#11763b",
                  opacity: 0.95,
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                  transform: "rotate(-1deg) scaleY(1.05) scaleX(1.02)"
                }}
              />
              <p
                className="relative text-[15px] xl:text-[18px] font-bold tracking-[0.04em] whitespace-nowrap"
                style={{ color: "#ffffff" }}
              >
                {availability}
              </p>
            </div>

            {/* CTA */}
            <a
              href={ctaHref}
              className="
                inline-flex items-center justify-center gap-2
                rounded-full px-6 py-2.5
                text-xs md:text-sm font-semibold
                transition-transform hover:scale-105
              "
              style={{
                border: ctaBg ? "none" : `1.5px solid ${accentDark}`,
                color: "#ffffff",
                background: ctaBg || accentDark,
              }}
            >
              {ctaLabel} <span aria-hidden="true">→</span>
            </a>

          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET  < lg
          Woman full-bleed + cream scrim from bottom + content
      ========================================================= */}
      <div className="absolute inset-0 lg:hidden">

        {/* Person photo */}
        <img
          src={personImageMobile || personImage}
          alt={personImageAlt}
          className={`absolute inset-0 w-full h-full object-cover object-[68%_center] lg:hidden ${personImageMobileClassName}`}
        />

        {/* Cream scrim rising from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-[78%] md:h-[68%]"
          style={{
            background: `linear-gradient(
              to top,
              ${bgMid}   0%,
              ${bgMid}F5 30%,
              ${bgMid}BB 54%,
              transparent 100%
            )`,
          }}
        />

        {/* Left-side side fade so the text area feels clean */}
        <div
          className="absolute inset-y-0 left-0 w-[60%]"
          style={{
            background: `linear-gradient(
              to right,
              ${bgMid}CC 0%,
              ${bgMid}66 55%,
              transparent 100%
            )`,
          }}
        />

        {/* Content */}
        <div className="
          absolute inset-x-0 bottom-0 z-20
          px-5 pb-8 md:pb-10
          flex flex-col items-center text-center
        ">

          <img
            src={logo}
            alt={logoAlt}
            className="h-12 md:h-14 w-auto object-contain mb-1"
          />

          <div className="mb-3 flex items-center gap-2">
            <span className="block h-px w-5" style={{ backgroundColor: accentMid }} />
            <p
              className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-bold"
              style={{ color: accentMid }}
            >
              {tagline}
            </p>
            <span className="block h-px w-5" style={{ backgroundColor: accentMid }} />
          </div>

          <div style={{ color: accentDark }}>
            <p className={headlineClassName || "font-poppins text-[22px] md:text-[26px] leading-[1.15] font-light"}>
              {headlinePart1}{" "}
              <span className="font-semibold">{headlineItalic}</span>
            </p>
            <p className={headlineClassName || "font-poppins text-[22px] md:text-[26px] leading-[1.15] font-light"}>
              {headlinePart2}
            </p>
          </div>

          {/* AVAILABILITY — organic marker highlight */}
          <div className="mt-3 mb-5 relative inline-flex items-center justify-center px-5 py-2">
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ 
                background: availabilityBg || "#11763b",
                opacity: 0.95,
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                transform: "rotate(-1deg) scaleY(1.05) scaleX(1.02)"
              }}
            />
            <p
              className="relative text-[12px] md:text-[14px] font-bold tracking-[0.04em] whitespace-nowrap"
              style={{ color: "#ffffff" }}
            >
              {availability}
            </p>
          </div>

          <a
            href={ctaHref}
            className="
              inline-flex items-center justify-center gap-2
              rounded-full px-6 py-2.5
              text-xs md:text-sm font-semibold
              transition-transform hover:scale-105
            "
            style={{
              border: ctaBg ? "none" : `1.5px solid ${accentDark}`,
              color: "#ffffff",
              background: ctaBg || accentDark,
            }}
          >
            {ctaLabel} <span aria-hidden="true">→</span>
          </a>

        </div>
      </div>
    </section>
  );
}