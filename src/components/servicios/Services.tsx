'use client';

import React from 'react';
import Link from 'next/link';
import { Banknote, Home, Users, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    icon: Banknote,
    title: 'Visa temporal – actividades lícitas remuneradas',
    shortDescription: 'Para personas extranjeras que residen o trabajan en Chile, que desarrollan actividades lícitas remuneradas...',
    slug: 'visa-temporal-actividades-licitas',
    color: 'from-[#0A4D8C] to-[#063d6b]',
  },
  {
    id: 2,
    icon: Home,
    title: 'Visa temporal – asesor del hogar',
    shortDescription: 'Para personas extranjeras que se desempeñan como asesoras o asesores del hogar en Chile...',
    slug: 'visa-temporal-asesor-hogar',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 3,
    icon: Users,
    title: 'Visa temporal – Reunificación Familiar',
    shortDescription: 'Para personas extranjeras que solicitan una Visa Temporal por Reunificación Familiar...',
    slug: 'visa-temporal-reunificacion-familiar',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 4,
    icon: FileText,
    title: 'Nacionalidad Chilena',
    shortDescription: 'Para personas extranjeras que han solicitado la Nacionalidad Chilena...',
    slug: 'nacionalidad-chilena',
    color: 'from-green-500 to-green-600',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
          Trámites Disponibles
        </h2>

        {/* Línea decorativa */}
        <div className="w-11/12 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-16"></div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <Link key={service.id} href={`/servicios/${service.slug}`}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="h-full flex flex-col p-8 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-gray-300 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                >
                  {/* Icono con gradiente */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${service.color} text-white transition-transform duration-300 group-hover:scale-110 mb-6`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Título del servicio */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>

                  {/* Descripción */}
                  <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                    {service.shortDescription}
                  </p>

                  {/* Botón Ver detalles */}
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    Ver detalles <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
