'use client'

import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                }}
            >
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Contenido centrado */}
            <div className="relative h-full flex items-center justify-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Título principal */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Asesoría Legal Para Regularizar Tu Situación Migratoria En Chile
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-xl md:text-2xl text-white mb-10">
                        Expertos en ayudarte a quedarte legalmente en el país.
                    </p>

                    {/* Botón rojo centrado */}
                    <Link
                        href="/contacto"
                        className="inline-block px-12 py-4 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl"
                    >
                        Contáctanos
                    </Link>
                    {/* Texto adicional */}
                    <p className="text-gray-300 text-lg">
                        ¿Necesitas ayuda? Llámanos: <a href="tel:+56991381660" className="text-blue-400 font-semibold hover:underline">+56 9 9138 1660</a>
                    </p>
                </div>
            </div>
        </section>
    )
}