'use client';

import { getImagePath } from '@/lib/utils';
import { motion } from 'framer-motion';

const lawyers = [
  {
    id: 1,
    name: 'Elizabeth Acuña Varas',
    role: 'Abogada Migratoria',
    description:
      'Abogada con sólida experiencia en derecho migratorio y administrativo, especializada en resoluciones, recursos y acompañamiento jurídico a familias migrantes. Destaca por su enfoque cercano, ético y claro, ofreciendo orientación práctica y estrategias legales efectivas para regularizar situaciones migratorias en Chile.',
    image: getImagePath('/images/abogado_1.jpeg'),
  },
  {
    id: 2,
    name: 'Felipe Rivera',
    role: 'Abogado',
    description:
      'Abogado con sólida experiencia en derecho migratorio y administrativo, especializado en resoluciones, recursos y acompañamiento jurídico a familias migrantes.',
    image: getImagePath('/images/abogado_2.jpeg'),
  },
  /*{
    id: 3,
    name: 'Camila Soto',
    role: 'Abogada',
    description:
      'Abogada con sólida experiencia en derecho migratorio y administrativo, especializada en resoluciones, recursos y acompañamiento jurídico a familias migrantes.',
    image: getImagePath('/images/abogada_3.jpeg'),
  },*/
];

export default function Lawyers() {
  // Determinar número de columnas según cantidad de abogados
  const getGridColumns = () => {
    const count = lawyers.length;
    if (count === 1) return 'md:grid-cols-1';
    if (count === 2) return 'md:grid-cols-2';
    if (count === 3) return 'md:grid-cols-3';
    if (count === 4) return 'md:grid-cols-2';
    return 'md:grid-cols-3';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
          Nuestros Abogados
        </h2>

        {/* Línea decorativa */}
        <div className="w-11/12 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-16"></div>

        {/* Grid de abogados */}
        <div className={`grid ${getGridColumns()} gap-8 max-w-6xl mx-auto justify-items-center`}>
          {lawyers.map((lawyer) => {
            return (
              <div
                key={lawyer.id}
                className="bg-white rounded-xl shadow-lg overflow-visible duration-300 hover:shadow-2xl hover:-translate-y-2 relative cursor-pointer transition-all group w-full max-w-sm p-0.5
                before:absolute before:-top-0.5 before:-left-0.5 before:w-16 before:h-16 before:border-t-4 before:border-l-4 before:border-blue-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                after:absolute after:-bottom-0.5 after:-right-0.5 after:w-16 after:h-16 after:border-b-4 after:border-r-4 after:border-red-600 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300"
              >
              {/* Imagen abogado */}
              <div className="aspect-square bg-gray-200 relative overflow-hidden group-hover:lawyer-hover-shadow transition-all duration-300">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                />
              </div>

              {/* Info del abogado */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{lawyer.name}</h3>
                <p className="text-primary font-semibold mb-3">{lawyer.role}</p>
                <p className="text-gray-600 text-sm">{lawyer.description}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
