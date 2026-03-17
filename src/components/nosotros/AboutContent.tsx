import React from 'react';

export default function AboutContent() {
    const values = [
        {
            icon: "👥",
            title: "Experiencia",
            description: "Años de experiencia ayudando a migrantes a cumplir sus sueños en Chile"
        },
        {
            icon: "🏆",
            title: "Profesionalismo",
            description: "Abogados especializados en derecho migratorio con altos estándares"
        },
        {
            icon: "🌍",
            title: "Diversidad",
            description: "Atendemos migrantes de todas las nacionalidades con respeto y comprensión"
        },
        {
            icon: "❤️",
            title: "Compromiso",
            description: "Nos dedicamos completamente a lograr el éxito de cada caso"
        }
    ];

    return (
        <div className="bg-white">
            {/* Sección Principal */}
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Valores */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Nuestros Valores
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <span className="text-4xl">⚖️</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Transparencia
                            </h4>
                            <p className="text-gray-600">
                                Trabajamos con total claridad en todos nuestros procesos.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <span className="text-4xl">🤝</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Confianza
                            </h4>
                            <p className="text-gray-600">
                                Construimos relaciones duraderas basadas en la confianza mutua.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <span className="text-4xl">🎯</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Efectividad
                            </h4>
                            <p className="text-gray-600">
                                Nos enfocamos en resultados exitosos para nuestros clientes.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <span className="text-4xl">💼</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Profesionalismo
                            </h4>
                            <p className="text-gray-600">
                                Mantenemos los más altos estándares en nuestro trabajo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Misión y Visión */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-blue-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Nuestra Misión</h3>
                        <p className="text-blue-800">
                            Facilitar los procesos migratorios en Chile mediante asesoría legal especializada,
                            brindando un servicio de excelencia que permita a nuestros clientes alcanzar
                            sus objetivos de residencia y nacionalización.
                        </p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-900 mb-4">Nuestra Visión</h3>
                        <p className="text-green-800">
                            Ser reconocidos como el despacho líder en asesoría migratoria en Chile,
                            destacando por nuestra experiencia, profesionalismo y compromiso con
                            el éxito de cada cliente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}