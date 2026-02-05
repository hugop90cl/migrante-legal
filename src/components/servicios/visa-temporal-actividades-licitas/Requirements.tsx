'use client';

export default function Requirements() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Requisitos</h2>

        {/* Requisitos del Empleador */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            1. Requisitos del empleador (persona natural)
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Cédula de identidad vigente del empleador</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Acreditación de ingresos</strong> (uno o más de los siguientes):
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Liquidaciones de sueldo</span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Contrato de trabajo</span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Declaración de renta</span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Cartola bancaria</span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Declaración jurada simple de ingresos</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700 italic">
                (Debe demostrar capacidad económica para contratar a un asesor/a de hogar)
              </span>
            </li>
          </ul>
        </div>

        {/* Requisitos del Trabajador Extranjero */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            2. Requisitos del trabajador extranjero
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Pasaporte vigente</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Certificado de antecedentes penales</strong> del país de origen
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">
                Apostillado por autoridad competente (consulado chileno o apostilla del país)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Fotografía reciente con fondo blanco</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Creación de usuario</strong> en el Servicio Nacional de Migraciones
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Correo electrónico y clave</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Carta de aceptación</strong> del trabajador extranjero
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Acepta la oferta de trabajo o contrato del empleador</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
