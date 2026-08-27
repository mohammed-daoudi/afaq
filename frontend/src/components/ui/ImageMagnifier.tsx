'use client';

import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

export function ImageMagnifier({
  src,
  alt,
  magnifierHeight = 250,
  magnifierWidth = 250,
  zoomLevel = 2.5
}: ImageMagnifierProps) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setXY([x, y]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      className="relative w-full h-full cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-sage-light/30 shadow-inner flex items-center justify-center p-8">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain mix-blend-multiply p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {showMagnifier && (
        <div
          className="pointer-events-none absolute border-4 border-sage-light shadow-2xl rounded-2xl z-50 overflow-hidden bg-white"
          style={{
            display: showMagnifier ? '' : 'none',
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${imgWidth * zoomLevel}px`,
              height: `${imgHeight * zoomLevel}px`,
              left: `-${(x * zoomLevel) - magnifierWidth / 2}px`,
              top: `-${(y * zoomLevel) - magnifierHeight / 2}px`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain mix-blend-multiply p-8"
            />
          </div>
        </div>
      )}
    </div>
  );
}
