'use client';

export default function Requirements() {
  return (
    <section
      className="
        py-16
        px-4
        md:px-8
        lg:px-16
        bg-gray-50
        "
    >
      <div
        className="
        max-w-4xl 
        mx-auto
        "
      >
        <h2
          className="
                text-4xl 
                font-bold 
                mb-12 
                text-gray-900
                "
        >
          Requisitos para reunificación familiar: 
        </h2>

        {/* 1. Vínculo habilitante */}
        <div className="mb-12">
          <h3
            className="
                text-2xl 
                font-bold 
                text-blue-900 
                mb-6
                "
            >
            1. Vínculo habilitante (debe ser con):
          </h3>
          <div className="ml-4 mb-8">
            <p className="font-semibold text-gray-800 mb-3">Chileno/a o Extranjero con residencia definitiva en Chile</p>
            <p className="font-semibold text-gray-700 mb-3">Vínculos aceptados:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-gray-700">Padre o madre</li>
              <li className="text-gray-700">Cónyuge (matrimonio)</li>
              <li className="text-gray-700">Conviviente civil (Acuerdo de Unión Civil)</li>
              <li className="text-gray-700">Hijos menores de edad</li>
              <li className="text-gray-700">Hijos con discapacidad (cualquier edad)</li>
              <li className="text-gray-700">Hijos menores de 24 años que sigan estudiando</li>
            </ul>
          </div>
        </div>

        {/* 2. Requisitos del requirente */}
        <div className="mb-12">
          <h3
            className="
                text-2xl 
                font-bold 
                text-blue-900 
                mb-6
                "
            >
            2. Requisitos del familiar que está en Chile (el &quot;requirente&quot;)
          </h3>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li className="text-gray-700">Cédula de identidad vigente</li>
            <li className="text-gray-700">Certificado de vínculo</li>
            <li className="text-gray-700">Certificado de nacimiento</li>
            <li className="text-gray-700">Certificado de matrimonio</li>
            <li className="text-gray-700">Certificado de unión civil</li>
            <li className="text-gray-700">Declaración de manutención (notariada) - Documento donde se compromete a mantener al familiar extranjero</li>
            <li className="text-gray-700">Certificado de permanencia definitiva (solo si el requirente es extranjero definitivo)</li>
            <li className="text-gray-700">Domicilio en Chile</li>
            <li className="text-gray-700">Teléfono</li>
            <li className="text-gray-700">Correo electrónico</li>
          </ul>
        </div>

        {/* 3. Requisitos del solicitante */}
        <div className="mb-12">
          <h3
            className="
                text-2xl 
                font-bold 
                text-blue-900 
                mb-6
                "
            >
            3. Requisitos del familiar que está fuera de Chile (el &quot;solicitante&quot;)
          </h3>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li className="text-gray-700">Pasaporte vigente</li>
            <li className="text-gray-700">Fotografía actual con fondo blanco</li>
            <li className="text-gray-700">Certificado de antecedentes penales del país de origen (debe venir apostillado)</li>
            <li className="text-gray-700">Teléfono de contacto</li>
            <li className="text-gray-700">Domicilio actual en el país de residencia</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
