// components/MobileNav.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Star, DollarSign, BookOpen, LogIn, Play, Users } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-teal-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold text-teal-800">
                <Link href='/'>Zuriscale</Link>
              </span>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-teal-600 transition-colors">
                Pricing
              </Link>
              <Link href="/communities" className="text-gray-600 hover:text-teal-600 transition-colors">
                Communities
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-teal-600 transition-colors">
                Blog
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-teal-600 transition-colors">
                Login
              </Link>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href='/signup'>Start Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Z</span>
                  </div>
                  <span className="text-xl font-bold text-teal-800">
                    <Link href='/'>Zuriscale</Link>
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col space-y-6">
                <Link 
                  href="#features" 
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star size={20} />
                  <span>Features</span>
                </Link>
                <Link 
                  href="/pricing" 
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DollarSign size={20} />
                  <span>Pricing</span>
                </Link>
                <Link 
                  href="/communities" 
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users size={20} />
                  <span>Communities</span>
                </Link>
                <Link 
                  href="/blog" 
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen size={20} />
                  <span>Blog</span>
                </Link>
                <Link 
                  href="/login" 
                  className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Play size={16} />
                    <span>Start Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}