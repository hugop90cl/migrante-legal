'use client';

export default function Requirements() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          Requisitos para obtener la nacionalidad chilena (Carta de Nacionalización)
        </h2>

        {/* Requisitos */}
        <div className="mb-16">
          <ol className="space-y-6">
            {/* Requisito 1 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">1. Ser mayor de 18 años</h3>
              <p className="text-gray-700 ml-2">Salvo que estés casado/a o seas padre/madre de un chileno, donde puede ser antes.</p>
            </li>

            {/* Requisito 2 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">2. Haber residido en Chile por al menos 5 años continuos</h3>
              <p className="text-gray-700 ml-2">Contados desde la obtención de la primera visa. El tiempo debe ser legal y acreditado.</p>
            </li>

            {/* Requisito 3 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">3. Tener residencia definitiva vigente</h3>
              <p className="text-gray-700 ml-2">Debe estar otorgada al momento de solicitar la nacionalidad.</p>
            </li>

            {/* Requisito 4 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">4. No tener antecedentes penales en Chile</h3>
              <ul className="space-y-1 list-disc list-inside ml-2 text-gray-700">
                <li>Ni en el país de origen</li>
                <li>Se exigen certificados recientes</li>
              </ul>
            </li>

            {/* Requisito 5 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">5. Acreditar medios de vida lícitos</h3>
              <p className="text-gray-700 ml-2 mb-2">Demostrar ingresos formales:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Contrato de trabajo</li>
                <li>Boletas/honorarios</li>
                <li>Emprendimiento formal</li>
                <li>Declaraciones de renta, etc.</li>
              </ul>
            </li>

            {/* Requisito 6 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">6. Cumplir con la normativa migratoria</h3>
              <p className="text-gray-700 ml-2">No haber tenido sanciones graves ni infracciones migratorias pendientes.</p>
            </li>

            {/* Requisito 7 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">7. Acreditar integración a la vida nacional</h3>
              <p className="text-gray-700 ml-2 mb-2">Normalmente con:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Permanencia estable</li>
                <li>Trabajo</li>
                <li>Familia en Chile</li>
                <li>Actividades sociales, etc.</li>
              </ul>
              <p className="text-gray-600 text-sm ml-2 mt-2 italic">(No es un requisito "duro", pero se evalúa)</p>
            </li>

            {/* Requisito 8 */}
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">8. Presentar la documentación exigida por el Servicio Nacional de Migraciones (SERMIG)</h3>
              <p className="text-gray-700 ml-2 mb-2">Incluye:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Certificado de nacimiento del país de origen</li>
                <li>Copia de cédula chilena para extranjeros</li>
                <li>Certificado de antecedentes del país de origen</li>
                <li>Certificado de antecedentes chilenos</li>
                <li>Certificado de viajes</li>
                <li>Comprobante de ingresos</li>
                <li>Carta de solicitud fundada</li>
                <li>Fotografía</li>
              </ul>
              <p className="text-gray-600 text-sm ml-2 mt-2">El listado puede variar según el caso.</p>
            </li>
          </ol>
        </div>

        {/* Cómo se obtiene */}
        <div className="mb-16 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">¿Cómo se obtiene la nacionalidad chilena? Proceso resumido</h2>
          <ol className="space-y-6">
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">1. Reunir todos los documentos requeridos</h3>
              <p className="text-gray-700 ml-2">Deben estar apostillados o legalizados si vienen del extranjero.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">2. Ingresar la solicitud en línea</h3>
              <p className="text-gray-700 ml-2">A través de la plataforma del Servicio Nacional de Migraciones (SERMIG): Trámite: Carta de Nacionalización.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">3. Presentar antecedentes económicos y de residencia</h3>
              <p className="text-gray-700 ml-2">Se evalúa estabilidad, permanencia y medios de vida.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">4. Esperar la revisión del SERMIG</h3>
              <p className="text-gray-700 ml-2">Pueden solicitar documentos adicionales o aclaraciones.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">5. Aprobación del Ministerio del Interior</h3>
              <p className="text-gray-700 ml-2">La resolución es firmada finalmente por el Presidente de la República.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">6. Publicación y juramento</h3>
              <p className="text-gray-700 ml-2 mb-2">Una vez aprobada, se debe:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Firmar el acta</li>
                <li>Prestar juramento</li>
                <li>Tramitar la nueva cédula de identidad chilena</li>
              </ul>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">7. Obtener la nacionalidad chilena</h3>
              <p className="text-gray-700 ml-2">Queda formalizada tras cumplir el juramento y efectuar los trámites finales.</p>
            </li>
          </ol>
        </div>

        {/* Tiempos de espera */}
        <div className="border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Tiempos de espera</h2>
          <ol className="space-y-6">
            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">1. Revisión inicial de documentos: 2 a 4 meses</h3>
              <p className="text-gray-700 ml-2">Es cuando el Servicio Nacional de Migraciones (SERMIG) revisa si los documentos están completos y válidos.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">2. Evaluación del expediente: 8 a 14 meses</h3>
              <p className="text-gray-700 ml-2 mb-2">Incluye:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Verificación de antecedentes</li>
                <li>Revisión de la residencia</li>
                <li>Revisión de ingresos y medios de vida</li>
                <li>Evaluación de integración a la vida nacional</li>
              </ul>
              <p className="text-gray-600 text-sm ml-2 mt-2">Este es el tramo que más demora.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">3. Envío al Ministerio del Interior: 1 a 3 meses</h3>
              <p className="text-gray-700 ml-2">Después de la evaluación del SERMIG, el caso pasa a Interior para revisión y firma.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">4. Firma por parte del Presidente de la República: 1 a 3 meses</h3>
              <p className="text-gray-700 ml-2">La nacionalidad por carta siempre se formaliza con la firma del Presidente.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">5. Notificación al solicitante: 1 mes aprox.</h3>
              <p className="text-gray-700 ml-2">Te informan que fue aprobada y te indican los pasos siguientes.</p>
            </li>

            <li className="ml-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">6. Juramento y obtención de cédula chilena: 1 a 2 meses</h3>
              <p className="text-gray-700 ml-2 mb-2">Incluye:</p>
              <ul className="space-y-1 list-disc list-inside ml-6 text-gray-700">
                <li>Firma del acta</li>
                <li>Juramento</li>
                <li>Trámite de la nueva cédula en el Registro Civil</li>
              </ul>
            </li>
          </ol>

          <div className="mt-8 p-4 bg-blue-100 border-l-4 border-blue-900 rounded">
            <p className="text-gray-800">
              <span className="font-bold text-blue-900">Tiempo total estimado: 12 a 24 meses</span><br />
              El promedio actual en Chile es entre 1 año y 2 años desde que ingresas la solicitud hasta tener la cédula chilena.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
