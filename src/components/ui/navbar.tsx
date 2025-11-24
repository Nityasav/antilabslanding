'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'px-6 md:px-8 h-14 md:h-16 rounded-full shadow-lg' 
        : 'pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 lg:pr-20 h-12 md:h-14 rounded-none shadow-none'
    } flex items-center justify-between bg-white overflow-visible`}>
      {/* Left side - Logo */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={75}
          className={`w-auto transition-all duration-500 ease-in-out ${
            isScrolled ? 'h-12 md:h-14 lg:h-16' : 'h-20 md:h-28 lg:h-32'
          }`}
          priority
        />
      </div>

      {/* Right side - CTA Buttons */}
      <div className="flex items-center gap-3 flex-shrink-0 z-10">
        <button className="bg-[#1d40b0] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-sm md:text-base hover:bg-[#1a3a9e] transition-colors duration-200">
          Start free trial
        </button>
        <button className="text-black px-5 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-colors duration-200">
          Log in
        </button>
      </div>
    </nav>
  );
}

