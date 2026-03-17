import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago Fallido - Migrante Legal',
  description: 'Hubo un error en el procesamiento de tu pago',
};

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Pago No Procesado</h1>

        <p className="text-gray-600">
          Hubo un error al procesar tu pago. Por favor, intenta nuevamente.
        </p>

        <div className="bg-red-50 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-700">
            Tu cita se encuentra en estado <span className="font-semibold">pendiente</span>. 
            Puedes intentar nuevamente o contactarnos para obtener ayuda.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Intentar Nuevamente
          </a>
          <a
            href="/contacto"
            className="inline-block w-full border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  );
}
