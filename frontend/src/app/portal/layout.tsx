'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { PortalProviders } from "@/components/portal/PortalProviders";
import { motion, AnimatePresence } from "framer-motion";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/portal/login' || pathname === '/portal/register';
  
  const [userName, setUserName] = useState("Pharmacie");
  const [userInitials, setUserInitials] = useState("PH");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Attempt to load user data from localStorage
    try {
      const b2bUser = localStorage.getItem('afaq_b2b_user');
      if (b2bUser) {
        const parsed = JSON.parse(b2bUser);
        if (parsed.name) {
          setUserName(parsed.name);
          // Generate initials (up to 2 letters)
          const words = parsed.name.split(' ');
          let initials = words[0].charAt(0).toUpperCase();
          if (words.length > 1) {
            initials += words[1].charAt(0).toUpperCase();
          }
          setUserInitials(initials);
        }
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }
  }, []);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-ivory-soft">
        {children}
      </div>
    );
  }

  const navItems = [
    { name: 'Tableau de Bord', href: '/portal/dashboard', icon: '📊' },
    { name: 'Catalogue & Commandes', href: '/portal/catalog', icon: '💊' },
    { name: 'Historique Commandes', href: '/portal/orders', icon: '📦' },
    { name: 'Mes Documents', href: '/portal/documents', icon: '📄' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-sage-light flex justify-between items-center">
        <div>
          <Logo />
          <div className="mt-4 text-xs font-bold text-teal-deep uppercase tracking-wider">
            Portail B2B
          </div>
        </div>
        {/* Mobile Close Button inside sidebar */}
        <button 
          className="md:hidden text-anthracite-soft"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center gap-3 ${
                isActive 
                  ? 'bg-teal-deep text-white shadow-md' 
                  : 'text-anthracite-soft hover:bg-sage-light hover:text-teal-deep'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sage-light bg-ivory-soft/50">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-teal-deep/10 text-teal-deep border border-teal-deep/20 flex items-center justify-center font-bold text-sm shrink-0">
            {userInitials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-teal-deep truncate" title={userName}>{userName}</p>
            <p className="text-xs text-anthracite-soft/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Compte Validé
            </p>
          </div>
        </div>
        <button 
          className="mt-4 w-full text-center px-4 py-2.5 text-sm font-bold text-red-500 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
          onClick={() => {
            document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem('afaq_b2b_user');
            window.location.href = '/portal/login';
          }}
        >
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <PortalProviders>
      <div className="flex min-h-screen bg-sage-light/30">
        
        {/* Desktop Sidebar */}
        <aside className="w-72 bg-white border-r border-sage-light flex-col hidden md:flex sticky top-0 h-screen shadow-sm z-10">
          <SidebarContent />
        </aside>

        {/* Mobile Header & Hamburger */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-sage-light z-30 flex items-center justify-between px-4 shadow-sm">
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          <button 
            className="p-2 text-teal-deep bg-sage-light rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-anthracite-soft/40 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white border-r border-sage-light flex flex-col z-50 md:hidden shadow-2xl"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-grow p-4 pt-20 md:p-8 md:pt-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PortalProviders>
  );
}
