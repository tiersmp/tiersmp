'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import CustomLink from './ui/CustomLink';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <CustomLink 
                href="/" 
                className="flex items-center space-x-2"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.png"
                    alt="SmpTier"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  SmpTier
                </span>
              </CustomLink>
              
              <nav className="hidden md:ml-10 md:flex items-center space-x-8">
                <CustomLink 
                  href="/classement" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Classement
                </CustomLink>
                <CustomLink 
                  href="/criteres" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Critères
                </CustomLink>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              
              <CustomLink 
                href="/tester"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Tester mon SMP
              </CustomLink>
            
              <div className="md:hidden">
                <button 
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Ouvrir le menu principal</span>
                  <svg 
                    className="h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Espace pour le header fixe */}
    </>
  );
};

export default Header;
