'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { CartSlideOver } from '@/components/portal/CartSlideOver';

export function PortalProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSlideOver />
    </CartProvider>
  );
}
