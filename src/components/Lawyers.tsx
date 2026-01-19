'use client';

import { getImagePath } from '@/lib/utils';

const lawyers = [
  {
    id: 1,
    name: 'Elizabeth Acuña Varas',
    role: 'Abogada Migratoria',
    description:
      'Abogada con sólida experiencia en derecho migratorio y administrativo, especializada en resoluciones, recursos y acompañamiento jurídico a familias migrantes. Destaca por su enfoque cercano, ético y claro, ofreciendo orientación práctica y estrategias legales efectivas para regularizar situaciones migratorias en Chile.',
    image: getImagePath('/images/abogada_1.jpeg'),
  },
  {
    id: 2,
    name: 'Felipe Rivera',
    role: 'Abogado',
    description:
      'Abogado con sólida experiencia en derecho migratorio y administrativo, especializado en resoluciones, recursos y acompañamiento jurídico a familias migrantes.',
    image: getImagePath('/images/abogado_2.jpeg'),
  },
  {
    id: 3,
    name: 'Camila Soto',
    role: 'Abogada',
    description:
      'Abogada con sólida experiencia en derecho migratorio y administrativo, especializada en resoluciones, recursos y acompañamiento jurídico a familias migrantes.',
    image: getImagePath('/images/abogada_3.jpeg'),
  },
];

export default function Lawyers() {
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
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden duration-300 hover:shadow-2xl hover:-translate-y-2 relative cursor-pointer transition-all group "
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
          ))}
        </div>
      </div>
    </section>
  );
}
