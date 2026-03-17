import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago Pendiente - Migrante Legal',
  description: 'Tu pago está en proceso de verificación',
};

export default function PaymentPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Pending Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-yellow-600 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Pago Pendiente</h1>

        <p className="text-gray-600">
          Tu pago está siendo verificado. Esto puede tomar algunos minutos.
        </p>

        <div className="bg-yellow-50 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-700">
            No cierres esta página ni hagas otra compra hasta que se complete el proceso.
            Recibirás una confirmación por email cuando tu pago sea procesado.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
