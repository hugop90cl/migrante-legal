'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Asesoría Legal Para Regularizar Tu Situación Migratoria En Chile
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white mb-10 animate-fade-in-up animation-delay-100">
            Expertos en ayudarte a quedarte legalmente en el país.
          </p>

          {/* Botón rojo centrado */}
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 hover:text-xl transition-all duration-300 group"
          >
            Contáctanos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Texto adicional */}
          <p className="text-gray-300 text-lg animate-fade-in-up animation-delay-200">
            ¿Necesitas ayuda? Llámanos:{' '}
            <a href="tel:+56991381660" className="text-blue-400 font-semibold hover:underline">
              +56 9 9138 1660
            </a>
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
