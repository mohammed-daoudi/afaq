'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FAMILY_COLORS, type TherapeuticFamily } from '@/lib/products';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    category: string;
    imagePath: string;
    description: string;
    benefits: string[];
    dosage?: string;
    duration?: string;
    format?: string;
    certifications?: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const familyColors = FAMILY_COLORS[product.category as TherapeuticFamily];

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleInteraction = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    } else {
      router.push(`/produits/${product.id}`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onClick={handleInteraction}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white group"
    >
      {/* Front face */}
      <div
        className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Category badge */}
        <div className="flex justify-between items-start z-10 px-2 pt-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md bg-white/80 shadow-sm"
            style={{
              color: familyColors?.accent || '#133b3a',
            }}
          >
            {product.category}
          </span>
          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="flex gap-1">
              {product.certifications.includes('Vegan') && (
                <span className="text-[9px] font-bold bg-green-100/90 backdrop-blur-md text-green-700 px-2 py-1 rounded-full shadow-sm">🌿</span>
              )}
              {product.certifications.includes('Sans gluten') && (
                <span className="text-[9px] font-bold bg-amber-100/90 backdrop-blur-md text-amber-700 px-2 py-1 rounded-full shadow-sm">SG</span>
              )}
            </div>
          )}
        </div>

        {/* Product image container */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2 rounded-2xl overflow-hidden bg-white shadow-inner border border-sage-light/30">
          
          {/* Front Image */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 p-4"
          >
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Back Image (Generated Generic Back) */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 p-4"
          >
            <Image
              src={(product as any).imageBackPath || '/images/products/back.png'}
              alt={`${product.name} - Dos`}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Hover CTA Button (Subtle overlay at bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-4 left-4 right-4 z-30"
          >
            <div
              className="w-full bg-teal-deep/90 backdrop-blur-md text-white py-2.5 px-4 rounded-xl text-center text-sm font-bold shadow-lg flex items-center justify-center gap-2"
            >
              Découvrir le produit <span className="text-gold-soft">→</span>
            </div>
          </motion.div>

        </div>

        {/* Product name & format */}
        <div className="text-center pb-2 px-2 z-10 mt-2">
          <h3 className="font-heading font-bold text-lg text-teal-deep leading-tight group-hover:text-gold-soft transition-colors">
            {product.name}
          </h3>
          {product.format && (
            <p className="text-[11px] text-anthracite-soft/60 mt-1.5 font-medium tracking-wide">{product.format}</p>
          )}
        </div>
      </div>

      {/* Modern Glare Effect (on top of everything) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40 mix-blend-overlay rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${useTransform(x, [-0.5, 0.5], [0, 100])}% ${useTransform(y, [-0.5, 0.5], [0, 100])}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
