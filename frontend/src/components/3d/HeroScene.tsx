'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Premium animated background using 2D Canvas instead of Three.js.
 * This avoids SSR issues with @react-three/fiber while achieving
 * a similar organic, floating particle effect.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Responsive resize handler
    const resize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating orb class
    class Orb {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      phase: number;

      constructor(color: string, radius: number) {
        this.x = Math.random() * (width / window.devicePixelRatio);
        this.y = Math.random() * (height / window.devicePixelRatio);
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(t: number) {
        const w = width / window.devicePixelRatio;
        const h = height / window.devicePixelRatio;
        this.x += this.vx + Math.sin(t * 0.001 + this.phase) * 0.2;
        this.y += this.vy + Math.cos(t * 0.0012 + this.phase) * 0.15;

        // Wrap around screen edges
        if (this.x < -this.radius) this.x = w + this.radius;
        if (this.x > w + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = h + this.radius;
        if (this.y > h + this.radius) this.y = -this.radius;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Small particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      opacity: number;
      phase: number;

      constructor() {
        const w = width / window.devicePixelRatio;
        const h = height / window.devicePixelRatio;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2.5 + 0.5;
        this.speed = Math.random() * 0.3 + 0.05;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(t: number) {
        const w = width / window.devicePixelRatio;
        const h = height / window.devicePixelRatio;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity = 0.15 + Math.sin(t * 0.002 + this.phase) * 0.15;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(217, 160, 91, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create orbs with brand colors
    const orbs = [
      new Orb('rgba(19, 59, 58, 0.15)', 200),   // Teal Deep
      new Orb('rgba(217, 160, 91, 0.12)', 180),  // Gold Soft
      new Orb('rgba(42, 157, 143, 0.10)', 160),  // Accent Teal
      new Orb('rgba(19, 59, 58, 0.08)', 220),    // Teal Deep (larger, subtler)
      new Orb('rgba(217, 160, 91, 0.06)', 250),  // Gold Soft (larger, subtler)
    ];

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = (t: number) => {
      const w = width / window.devicePixelRatio;
      const h = height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      // Draw orbs (large blurry glowing spheres)
      for (const orb of orbs) {
        orb.update(t);
        orb.draw(ctx);
      }

      // Draw particles (small dots)
      for (const particle of particles) {
        particle.update(t);
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-70">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}

export default HeroScene;
