'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function CartSlideOver() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-anthracite-soft/40 backdrop-blur-sm z-50"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-sage-light"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-light bg-ivory-soft/30">
              <h2 className="text-xl font-heading font-bold text-teal-deep">Votre Panier B2B</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-anthracite-soft/60 hover:text-teal-deep hover:bg-sage-light rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center text-anthracite-soft/60 mt-20">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p>Votre panier est vide.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-sage-light pb-6 last:border-0 last:pb-0">
                    <div className="w-20 h-20 relative bg-ivory-soft rounded-xl overflow-hidden border border-sage-light flex-shrink-0">
                      <Image
                        src={item.product.imagePath}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-teal-deep text-sm line-clamp-2 pr-4">{item.product.name}</h3>
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-anthracite-soft/40 hover:text-red-500"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-anthracite-soft/60 mt-1">{item.pph.toFixed(2)} MAD (PPH)</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-sage-light rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 bg-ivory-soft text-anthracite-soft hover:bg-sage-light transition-colors"
                          >-</button>
                          <span className="px-3 py-1 text-sm font-medium w-10 text-center border-x border-sage-light">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 bg-ivory-soft text-anthracite-soft hover:bg-sage-light transition-colors"
                          >+</button>
                        </div>
                        <p className="font-bold text-teal-deep">{(item.pph * item.quantity).toFixed(2)} MAD</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sage-light p-6 bg-ivory-soft/30">
                <div className="flex justify-between items-center mb-4 text-teal-deep">
                  <span className="font-medium text-anthracite-soft/80">Total HT (PPH)</span>
                  <span className="text-2xl font-bold font-heading">{totalPrice.toFixed(2)} <span className="text-sm">MAD</span></span>
                </div>
                
                <Link 
                  href="/portal/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-teal-deep text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-md shadow-teal-deep/20"
                >
                  Passer la commande
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-sm font-medium text-teal-deep mt-4 hover:underline"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
