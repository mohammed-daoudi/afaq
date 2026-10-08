import React from "react";
import { motion } from "framer-motion";

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
  headlineAfterItalic?: string;
  headlinePart2: string;
  headlinePart2Italic?: string;

  tagline?: string;
  availability: string;
  availabilityVariant?: "default" | "announcement";
  supportText?: string;
  mobileHeadlinePart1?: string;
  mobileHeadlineItalic?: string;
  mobileHeadlineAfterItalic?: string;
  mobileHeadlinePart2?: string;
  mobileHeadlinePart2Italic?: string;
  mobileHeadlineClassName?: string;
  mobileHeadlineItalicClassName?: string;
  mobileTagline?: string;
  mobileTaglineClassName?: string;
  mobileAvailability?: string;
  mobileAvailabilityVariant?: "default" | "announcement";
  mobileSupportText?: string | null;

  ctaLabel: string;
  ctaHref: string;
  ctaBg?: string;

  accentDark?: string;
  accentMid?: string;

  bgFrom?: string;
  bgMid?: string;
  bgTo?: string;

  productOffsetClass?: string;
  productObjectPosition?: string;
  productScale?: number;
  personOffsetClass?: string;
  personImageMobileClassName?: string;
  availabilityColor?: string;
  availabilityLineColor?: string;
  availabilityClassName?: string;
  logoClassName?: string;
  logoMobileClassName?: string;
  logoMobilePosition?: 'top' | 'bottom';
  headlineClassName?: string;
  headlineItalicClassName?: string;
  supportTextClassName?: string;
  taglineClassName?: string;
  taglineColor?: string;
  hideTaglineOnMobile?: boolean;
  contentClassName?: string;
  centerAreaClassName?: string;
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
  headlineAfterItalic,
  headlinePart2,
  headlinePart2Italic,

  tagline,
  availability,
  availabilityVariant = "default",
  supportText,
  mobileHeadlinePart1,
  mobileHeadlineItalic,
  mobileHeadlineAfterItalic,
  mobileHeadlinePart2,
  mobileHeadlinePart2Italic,
  mobileHeadlineClassName,
  mobileHeadlineItalicClassName,
  mobileTagline,
  mobileTaglineClassName,
  mobileAvailability,
  mobileAvailabilityVariant,
  mobileSupportText,

  ctaLabel,
  ctaHref,
  ctaBg,

  accentDark = "#176747",
  accentMid = "#3E8B61",

  bgFrom = "#E4DDBD",
  bgMid = "#F4F1D9",
  bgTo = "#DCE8C7",
  productOffsetClass = "",
  productObjectPosition,
  productScale,
  personOffsetClass = "",
  personImageMobileClassName = "",
  availabilityColor,
  availabilityLineColor,
  availabilityClassName,
  logoClassName,
  logoMobileClassName,
  logoMobilePosition = 'bottom',
  headlineClassName,
  headlineItalicClassName,
  supportTextClassName,
  taglineClassName,
  taglineColor,
  hideTaglineOnMobile,
  contentClassName,
  centerAreaClassName = "left-[32%] right-[21%]",
}: BrandSlideProps) {
  const availabilityTone = availabilityColor || accentMid;
  const availabilityLineTone = availabilityLineColor || availabilityTone;
  const resolvedMobileHeadlinePart1 = mobileHeadlinePart1 ?? headlinePart1;
  const resolvedMobileHeadlineItalic = mobileHeadlineItalic ?? headlineItalic;
  const resolvedMobileHeadlineAfterItalic = mobileHeadlineAfterItalic ?? headlineAfterItalic;
  const resolvedMobileHeadlinePart2 = mobileHeadlinePart2 ?? headlinePart2;
  const resolvedMobileHeadlinePart2Italic = mobileHeadlinePart2Italic ?? headlinePart2Italic;
  const resolvedMobileHeadlineClassName = mobileHeadlineClassName ?? headlineClassName;
  const resolvedMobileHeadlineItalicClassName = mobileHeadlineItalicClassName ?? headlineItalicClassName;
  const resolvedMobileTagline = mobileTagline ?? tagline;
  const resolvedMobileTaglineClassName = mobileTaglineClassName ?? taglineClassName;
  const resolvedMobileAvailability = mobileAvailability ?? availability;
  const resolvedMobileAvailabilityVariant = mobileAvailabilityVariant ?? availabilityVariant;
  const resolvedMobileSupportText = mobileSupportText === undefined ? supportText : mobileSupportText;

  const renderAvailability = (
    mobile = false,
    variant = availabilityVariant,
    text = availability,
  ) => {
    if (variant === "announcement") return null;
    const shouldShimmer = text?.includes("Maroc");

    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          opacity: { duration: 0.7, ease: "easeOut" },
          y: { duration: 0.7, ease: "easeOut" },
        }}
        className={`${mobile ? "mt-3 mb-5" : "mt-4 mb-6"} mx-auto flex w-fit max-w-full flex-col items-center ${availabilityClassName || ''}`}
      >
        <span
          className={`${mobile ? "text-[14px] md:text-[15px]" : "text-[17px] xl:text-[18px]"} font-semibold uppercase tracking-[0.06em]`}
          style={shouldShimmer ? {
            background: `linear-gradient(90deg, ${availabilityTone} 25%, rgba(255,255,255,0.85) 50%, ${availabilityTone} 75%)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "availability-shimmer 4s linear 1.8s infinite",
          } : { color: availabilityTone }}
        >
          {text?.replace("Maroc", "")}{
            text?.includes("Maroc") && (
              <span style={{ fontWeight: 800, filter: `drop-shadow(0 0 4px ${availabilityTone + "80"})` }}>Maroc</span>
            )
          }
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-0.5 block h-px origin-left"
          style={{ width: "100%", background: availabilityLineTone, opacity: 0.45 }}
        />
      </motion.div>
    );
  };

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
            objectPosition: productObjectPosition || "110% 50%",
            transform: productScale ? `scale(${productScale})` : undefined,
            transformOrigin: "center center",
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
          className={`
            absolute
            inset-y-0
            ${centerAreaClassName}
            z-20
            flex
            items-center
            justify-center
          `}
        >
          <div className={`w-full max-w-[560px] px-6 xl:px-8 text-center ${contentClassName || ''}`}>

            {/* LOGO */}
            <img
              src={logo}
              alt={logoAlt}
              className={`w-auto object-contain mx-auto mb-1 ${logoClassName || 'h-[58px] xl:h-[66px]'}`}
            />

            {/* TAGLINE — right under logo */}
            {tagline && (
              <div className={`mb-6 xl:mb-8 flex items-center justify-center gap-3 ${taglineClassName || ''}`}>
                <span className="block h-px w-8 xl:w-10" style={{ backgroundColor: taglineColor || accentMid }} />
                <p className="text-[10px] xl:text-[11px] uppercase tracking-[0.22em] font-bold whitespace-nowrap" style={{ color: taglineColor || accentMid }}>
                  {tagline}
                </p>
                <span className="block h-px w-8 xl:w-10" style={{ backgroundColor: taglineColor || accentMid }} />
              </div>
            )}

            {/* HEADLINE */}
            <div style={{ color: accentDark }}>
              <p className={headlineClassName || "font-poppins text-[26px] xl:text-[32px] leading-[1.12] font-light tracking-[-0.01em]"}>
                {headlinePart1}
                {headlineItalic && (
                  <>
                    {" "}
                    <span className={headlineItalicClassName || "font-semibold"}>{headlineItalic}</span>
                  </>
                )}
                {headlineAfterItalic && <> {headlineAfterItalic}</>}
              </p>
              <p className={headlineClassName || "font-poppins text-[26px] xl:text-[32px] leading-[1.12] font-light tracking-[-0.01em]"}>
                {headlinePart2}
                {headlinePart2Italic && (
                  <>
                    {" "}
                    <span className={headlineItalicClassName || "font-semibold"}>{headlinePart2Italic}</span>
                  </>
                )}
              </p>
            </div>

            {supportText && (
              <p className={`mx-auto mt-3 max-w-[480px] text-[15px] xl:text-[16px] leading-relaxed text-[#26443a]/80 ${supportTextClassName || ""}`}>
                {supportText}
              </p>
            )}

            {renderAvailability(false)}

            {/* CTA */}
            <a
              href={ctaHref}
              className="
                inline-flex items-center justify-center gap-2
                mt-3
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

        {/* Mobile Logo & Tagline (Top Position) */}
        {logoMobilePosition === 'top' && (
          <div className="absolute top-4 inset-x-0 flex flex-col items-center z-30">
            <img src={logo} alt={logoAlt} className={`w-auto object-contain mb-2 ${logoMobileClassName || 'h-16 md:h-20'}`} />
            {resolvedMobileTagline && !hideTaglineOnMobile && (
              <div className={`flex items-center gap-2 ${resolvedMobileTaglineClassName || ''}`}>
                <span className="block h-px w-5" style={{ backgroundColor: taglineColor || accentMid }} />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-bold" style={{ color: taglineColor || accentMid }}>{resolvedMobileTagline}</p>
                <span className="block h-px w-5" style={{ backgroundColor: taglineColor || accentMid }} />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="
          absolute inset-x-0 bottom-0 z-20
          px-5 pb-8 md:pb-10
          flex flex-col items-center text-center
        ">

          {logoMobilePosition === 'bottom' && (
            <img
              src={logo}
              alt={logoAlt}
              className={`h-12 md:h-14 w-auto object-contain mb-1 ${logoMobileClassName || ''}`}
            />
          )}

          {logoMobilePosition === 'bottom' && resolvedMobileTagline && !hideTaglineOnMobile && (
            <div className={`mb-3 flex items-center gap-2 ${resolvedMobileTaglineClassName || ''}`}>
              <span className="block h-px w-5" style={{ backgroundColor: taglineColor || accentMid }} />
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-bold" style={{ color: taglineColor || accentMid }}>{resolvedMobileTagline}</p>
              <span className="block h-px w-5" style={{ backgroundColor: taglineColor || accentMid }} />
            </div>
          )}

          <div style={{ color: accentDark }}>
            <p className={resolvedMobileHeadlineClassName || "font-poppins text-[22px] md:text-[26px] leading-[1.15] font-light"}>
              {resolvedMobileHeadlinePart1}
              {resolvedMobileHeadlineItalic && (
                <>
                  {" "}
                  <span className={resolvedMobileHeadlineItalicClassName || "font-semibold"}>{resolvedMobileHeadlineItalic}</span>
                </>
              )}
              {resolvedMobileHeadlineAfterItalic && <> {resolvedMobileHeadlineAfterItalic}</>}
            </p>
            <p className={resolvedMobileHeadlineClassName || "font-poppins text-[22px] md:text-[26px] leading-[1.15] font-light"}>
              {resolvedMobileHeadlinePart2}
              {resolvedMobileHeadlinePart2Italic && (
                <>
                  {" "}
                  <span className={resolvedMobileHeadlineItalicClassName || "font-semibold"}>{resolvedMobileHeadlinePart2Italic}</span>
                </>
              )}
            </p>
          </div>

          {resolvedMobileSupportText && (
            <p className={`mx-auto mt-2 max-w-[350px] text-[13px] leading-[1.6] text-[#26443a]/80 md:text-[14.5px] ${supportTextClassName || ""}`}>
              {resolvedMobileSupportText}
            </p>
          )}

          {renderAvailability(true, resolvedMobileAvailabilityVariant, resolvedMobileAvailability)}

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
