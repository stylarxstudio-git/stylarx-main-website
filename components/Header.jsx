'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be replaced with actual Outseta auth

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'AI Toolkit', href: '/ai-toolkit' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/STYLARX_Primary_Logo_Black.png"
              alt="STYLARX"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-black transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Button - Right */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium inline-block"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-black transition-colors text-base font-medium px-2 py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium text-center"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}