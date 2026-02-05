'use client';

export default function Requirements() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Requisitos</h2>

        {/* Documentación del Empleador */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            1. Documentación del Empleador
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Cédula del empleador</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">RUT de la empresa</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Domicilio del empleador</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Teléfono de contacto</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Inicio de actividades del SII</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Carpeta tributaria del SII</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Representante legal de la empresa (SII)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Certificado de vigencia de la empresa (Empresa en un Día o Conservador)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Estatutos o Escritura de la empresa (Empresa en un Día o Conservador)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Oferta de trabajo o Contrato de trabajo</strong>
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Debe estar firmado y notariado por un funcionario chileno</span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Debe indicar funciones, sueldo, jornada, duración y firma del empleador</span>
            </li>
          </ul>
        </div>

        {/* Documentación del Extranjero */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            2. Documentación del Extranjero
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
              <span className="text-gray-700">Apostillado o legalizado por el consulado chileno en el país de origen</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">Fotografía con fondo blanco</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Creación de usuario</strong> en el Servicio Nacional de Migraciones
              </span>
            </li>
            <li className="flex items-start ml-6">
              <span className="text-blue-400 mr-4 font-bold">◦</span>
              <span className="text-gray-700">Correo y contraseña para ingresar solicitudes</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-4 font-bold">•</span>
              <span className="text-gray-700">
                <strong>Carta de aceptación</strong> del trabajador extranjero (acepta la oferta o contrato)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}