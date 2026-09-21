'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/products';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    categories: string[];
    imagePath: string;
    labelImagePath?: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('ProductCard');

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

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

  return (
    <>
      {/* Simple Product Item */}
      <div 
        className="group cursor-pointer flex flex-col h-full"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square mb-4 flex items-center justify-center overflow-hidden">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Optional Badges (like Vegan/Gluten Free) */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.certifications.includes('Vegan') && (
                <span className="text-xs font-bold bg-green-100/90 text-green-700 px-2 py-1 rounded-full shadow-sm">🌿</span>
              )}
              {product.certifications.includes('Sans gluten') && (
                <span className="text-xs font-bold bg-amber-100/90 text-amber-700 px-2 py-1 rounded-full shadow-sm">SG</span>
              )}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 text-left mt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-soft mb-1 line-clamp-1">
            {product.categories.join(' · ')}
          </span>
          <h3 className="font-heading font-bold text-sm md:text-base text-anthracite-deep leading-snug group-hover:text-teal-deep transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-anthracite-soft mt-1.5 line-clamp-2">
            {product.format || product.description}
          </p>
          <div className="mt-4 flex items-center text-teal-deep text-xs font-bold group-hover:text-gold-soft transition-colors">
            Découvrir le produit <span className="ml-1">→</span>
          </div>
        </div>
      </div>

      {/* Quick-View Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-anthracite-deep/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur hover:bg-ivory-soft text-anthracite-soft px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm flex items-center gap-1 border border-sage-light"
              >
                Quitter <span className="text-base leading-none">&times;</span>
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-ivory-soft/50 p-6 relative flex items-center justify-center min-h-[280px] md:min-h-[400px]">
                <div className="relative w-full h-full min-h-[250px]">
                  <Image
                    src={product.imagePath}
                    alt={`${product.name}`}
                    fill
                    className="object-contain mix-blend-multiply p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-deep/60 mb-2">
                  {product.categories.join(' · ')}
                </span>
                <h2 className="text-3xl font-heading font-extrabold text-teal-deep mb-2">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-gold-soft mb-4">
                  {product.format}
                </p>
                <p className="text-sm text-anthracite-soft/80 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.dosage && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-teal-deep mt-0.5">💊</span>
                      <span className="text-anthracite-soft font-medium">{product.dosage}</span>
                    </div>
                  )}
                  {product.duration && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-teal-deep mt-0.5">⏱️</span>
                      <span className="text-anthracite-soft font-medium">{product.duration}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => router.push(`/produits/${product.id}`)}
                    className="w-full bg-teal-deep hover:bg-teal-deep/90 text-white py-3.5 rounded-xl font-bold transition-colors shadow-md hover:shadow-lg"
                  >
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
