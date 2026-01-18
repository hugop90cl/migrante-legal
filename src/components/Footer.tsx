import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Columna 1: Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Migrante Legal</h3>
                        <p className="text-gray-400 mb-4">
                            Expertos en asesoría legal para regularizar tu situación migratoria en Chile.
                        </p>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+56991381660" className="hover:text-white transition">
                                    +56 9 9138 1660
                                </a>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:contacto@migrantelegal.cl" className="hover:text-white transition">
                                    contacto@migrantelegal.cl
                                </a>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Santiago, Chile</span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Horarios */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Horario de Atención</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Lunes a Viernes: 9:00 - 18:00</li>
                            <li>Sábado: 10:00 - 14:00</li>
                            <li>Domingo: Cerrado</li>
                        </ul>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Migrante Legal. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}