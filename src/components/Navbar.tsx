'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { getImagePath } from '@/lib/utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0A4D8C] fixed w-full z-50 top-0 border-b border-blue-900/20 shadow-lg hover:shadow-xl transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src={getImagePath('/images/logoMigrantes.jpeg')}
              alt="Migrante Legal Logo"
              className="h-16 w-auto transition-transform group-hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="px-3 py-2 text-white font-medium hover:text-blue-100 transition-colors relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-100 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/servicios"
              className="px-3 py-2 text-white font-medium hover:text-blue-100 transition-colors relative group"
            >
              Servicios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-100 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/nosotros"
              className="px-3 py-2 text-white font-medium hover:text-blue-100 transition-colors relative group"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-100 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contacto"
              className="px-3 py-2 text-white font-medium hover:text-blue-100 transition-colors relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-100 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md bg-red-700 text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Abrir menú"
          >
            {!isMenuOpen ? (
              <Menu className="h-6 w-6 text-white" />
            ) : (
              <X className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-blue-900/30 bg-blue-900/10 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/nosotros"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
