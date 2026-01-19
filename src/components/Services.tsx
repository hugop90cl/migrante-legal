'use client';

import Link from 'next/link';
import React from 'react';
import { ArrowRight, Banknote, Home, Users, FileText } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Banknote,
    title: 'Visa temporal – actividades lícitas remuneradas',
    description:
      'Para personas extranjeras que residen o trabajan en Chile, que desarrollan actividades lícitas remuneradas, y cuya solicitud de Visa Temporal fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos.',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    color: 'from-[#0A4D8C] to-[#063d6b]',
  },
  {
    id: 2,
    icon: Home,
    title: 'Visa temporal – asesor del hogar',
    description:
      'Para personas extranjeras que se desempeñan como asesoras o asesores del hogar en Chile, que han solicitado una Visa Temporal Asesor(a) del Hogar y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos exigidos.',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 3,
    icon: Users,
    title: 'Visa temporal – Reunificación Familiar',
    description:
      'Para personas extranjeras que solicitan una Visa Temporal por Reunificación Familiar, con el fin de reunirse con un familiar que reside legalmente en Chile, y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos.',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 4,
    icon: FileText,
    title: 'Nacionalidad Chilena',
    description:
      'Para personas extranjeras que han solicitado la Nacionalidad Chilena, ya sea por carta de nacionalización o por gracia, y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos por la normativa vigente.',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
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
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                href="/contacto"
                style={{ animationDelay: `${index * 100}ms` }}
                className="flex flex-col p-8 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 relative cursor-pointer group animate-fade-in-up"
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
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>

                {/* Botón mejorado */}
                <div
                  className={`flex items-center justify-center mt-auto w-full px-6 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}
                >
                  Agendar reunión
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
