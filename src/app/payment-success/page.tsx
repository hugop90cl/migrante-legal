import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago Confirmado - Migrante Legal',
  description: 'Tu pago ha sido procesado exitosamente',
};

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Checkmark Animation */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">¡Pago Confirmado!</h1>

        <p className="text-gray-600">
          Tu pago ha sido procesado exitosamente. Tu cita ha sido reservada.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Datos de tu cita:</h3>
          <div id="appointmentDetails" className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Estado:</span> Cargando información...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Pronto recibirás un email de confirmación con los detalles de tu cita.
          </p>
          <a
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const appointment = JSON.parse(localStorage.getItem('pendingAppointment') || '{}');
            if (appointment.appointmentId) {
              const detailsHtml = \`
                <p><span class="font-semibold">Abogado:</span> \${appointment.lawyerName}</p>
                <p><span class="font-semibold">Fecha:</span> \${appointment.appointmentDate}</p>
                <p><span class="font-semibold">Hora:</span> \${appointment.appointmentTime}</p>
                <p><span class="font-semibold">Email:</span> \${appointment.customerEmail}</p>
              \`;
              document.getElementById('appointmentDetails').innerHTML = detailsHtml;

              // Marcar como pagada (opcional)
              // fetch('/api/appointments/confirm-payment', {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/json' },
              //   body: JSON.stringify({ appointmentId: appointment.appointmentId })
              // });
            }
          })();
        `
      }} />
    </div>
  );
}
