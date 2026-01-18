'use client'

import Link from 'next/link';

const services = [
    {
        id: 1,
        icon: '💵',
        title: 'Visa temporal – actividades lícitas remuneradas',
        description: 'Para personas extranjeras que residen o trabajan en Chile, que desarrollan actividades lícitas remuneradas, y cuya solicitud de Visa Temporal fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos.',
        buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
        id: 2,
        icon: '🏠',
        title: 'Visa temporal – asesor del hogar',
        description: 'Para personas extranjeras que se desempeñan como asesoras o asesores del hogar en Chile, que han solicitado una Visa Temporal Asesor(a) del Hogar y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos exigidos.',
        buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
        id: 3,
        icon: '👨‍👩‍👧‍👦',
        title: 'Visa temporal – Reunificación Familiar',
        description: 'Para personas extranjeras que solicitan una Visa Temporal por Reunificación Familiar, con el fin de reunirse con un familiar que reside legalmente en Chile, y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos.',
        buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
        id: 4,
        icon: '🇨🇱',
        title: 'Nacionalidad Chilena',
        description: 'Para personas extranjeras que han solicitado la Nacionalidad Chilena, ya sea por carta de nacionalización o por gracia, y cuya solicitud fue rechazada, archivada o no resuelta dentro de los plazos legales, pese a cumplir con los requisitos establecidos por la normativa vigente.',
        buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
];

export default function Services() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
                    Trámites Disponibles
                </h2>

                {/* Línea decorativa */}
                <div className="w-24 h-1 bg-gray-800 mx-auto mb-16"></div>

                {/* Grid de servicios */}
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href="/contacto"
                            className="block text-center p-8 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:z-10 relative bg-white cursor-pointer"
                        >
                            {/* Icono */}
                            <div className="text-6xl mb-6">
                                {service.icon}
                            </div>

                            {/* Título del servicio */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {service.title}
                            </h3>

                            {/* Descripción */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Botón visual (ya no es link, solo decorativo) */}
                            <div className={`flex items-center justify-center w-full px-6 py-3 ${service.buttonColor} text-white font-semibold rounded transition-colors`}>
                                Agendar reunión
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}