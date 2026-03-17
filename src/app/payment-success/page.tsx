'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface AppointmentData {
  userId: string;
  partnerId: number;
  lawyerId: number;
  lawyerName: string;
  appointmentDate: string;
  appointmentTime: string;
  customerEmail: string;
  customerName: string;
  sale_order_id?: number;
  preference_id?: string;
}

export default function PaymentSuccessPage() {
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createAppointmentAfterPayment = async () => {
      try {
        // Recuperar datos temporales de localStorage
        const pendingData = localStorage.getItem('pendingPaymentData');
        
        if (!pendingData) {
          throw new Error('No se encontraron datos de la cita. Por favor, intenta de nuevo.');
        }

        const data = JSON.parse(pendingData) as AppointmentData;
        console.log('📥 Datos recuperados del pago:', data);

        // Crear la cita en BD
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.userId,
            partnerId: data.partnerId,
            lawyerId: data.lawyerId,
            lawyerName: data.lawyerName,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            email: data.customerEmail,
            customerName: data.customerName,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Error al crear la cita');
        }

        console.log('✅ Cita creada exitosamente:', result.appointmentId);
        setAppointmentData(data);
        setIsCreatingAppointment(false);

        // Limpiar datos temporales
        localStorage.removeItem('pendingPaymentData');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
        console.error('❌ Error al crear cita:', errorMsg);
        setError(errorMsg);
        setIsCreatingAppointment(false);
      }
    };

    createAppointmentAfterPayment();
  }, []);

  if (isCreatingAppointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="animate-spin">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
                <path d="M12 2a10 10 0 0 1 0 20" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Finalizando tu cita...</h1>
          <p className="text-gray-600">Estamos creando tu cita con los detalles del pago.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">¡Algo salió mal!</h1>
          <p className="text-gray-600">{error}</p>
          <a
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Checkmark Animation */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
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

        <h1 className="text-3xl font-bold text-gray-900">¡Cita Agendada!</h1>

        <p className="text-gray-600">
          Tu pago ha sido procesado exitosamente y tu cita ha sido reservada.
        </p>

        {appointmentData && (
          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Datos de tu cita:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Abogado:</span> {appointmentData.lawyerName}
              </p>
              <p>
                <span className="font-semibold">Fecha:</span> {appointmentData.appointmentDate}
              </p>
              <p>
                <span className="font-semibold">Hora:</span> {appointmentData.appointmentTime}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {appointmentData.customerEmail}
              </p>
            </div>
          </div>
        )}

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
    </div>
  );
}
