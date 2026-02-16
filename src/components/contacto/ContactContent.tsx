export default function ContactContent() {
  const whatsappNumber = "+56 9 9138 1660";
  const whatsappMessage = "Hola! Me interesa obtener información sobre sus servicios de asesoría migratoria.";
  const whatsappURL = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50">
         {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Información de contacto */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              La forma más rápida de obtener respuesta a tus consultas es a través de WhatsApp. 
              Nuestro equipo está disponible para asesorarte en todos tus trámites migratorios.
            </p>
          </div>

          {/* Card de WhatsApp */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8 border-l-4 border-green-500 mb-8">
            <div className="flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Contacto por WhatsApp
                </h3>
                <p className="text-xl text-green-700 font-semibold mb-2">
                  {whatsappNumber}
                </p>
                <p className="text-gray-600 mb-6">
                  Respuesta inmediata • Disponible de Lunes a Viernes 9:00 - 18:00
                </p>
                
                <a 
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors inline-flex items-center"
                >
                  <span className="mr-3">💬</span>
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Horarios de Atención</h4>
              <p className="text-gray-600">
                Lunes a Viernes<br/>
                9:00 - 18:00 hrs
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Modalidad</h4>
              <p className="text-gray-600">
                Atención presencial y online<br/>
                Según tus necesidades
              </p>
            </div>
          </div>

          {/* Llamada a la acción */}
          <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              ¿Tienes dudas sobre tu proceso migratorio?
            </h4>
            <p className="text-gray-600 mb-4">
              No esperes más. Haz clic en el botón de WhatsApp y recibe asesoría personalizada de inmediato.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}