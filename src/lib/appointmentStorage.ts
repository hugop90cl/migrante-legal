/**
 * Utilidades para gestionar datos de citas en localStorage y BD
 * Permite guardar/recuperar datos de citas antes y después del pago
 */

export interface AppointmentInfo {
  appointmentId: string;
  partnerId: number;
  lawyerId: number;
  lawyerName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  customerEmail: string;
  customerName: string;
  saleOrderId: number;
  preferenceId: string;
  savedAt: string; // ISO timestamp
}

/**
 * Guardar datos de cita en localStorage
 */
export const saveAppointmentToStorage = (appointmentData: AppointmentInfo): void => {
  try {
    localStorage.setItem('pendingAppointment', JSON.stringify(appointmentData));
    console.log('✅ Cita guardada en localStorage:', appointmentData.appointmentId);
  } catch (error) {
    console.error('❌ Error al guardar cita en localStorage:', error);
  }
};

/**
 * Recuperar datos de cita desde localStorage
 */
export const getAppointmentFromStorage = (): AppointmentInfo | null => {
  try {
    const data = localStorage.getItem('pendingAppointment');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('❌ Error al recuperar cita de localStorage:', error);
    return null;
  }
};

/**
 * Limpiar datos de cita de localStorage (después de procesar el pago)
 */
export const clearAppointmentFromStorage = (): void => {
  try {
    localStorage.removeItem('pendingAppointment');
    console.log('🗑️ Datos de cita eliminados de localStorage');
  } catch (error) {
    console.error('❌ Error al limpiar localStorage:', error);
  }
};

/**
 * Verificar si hay una cita pendiente sin pagar
 */
export const hasPendingAppointment = (): boolean => {
  return getAppointmentFromStorage() !== null;
};

/**
 * Marcar una cita como pagada (actualizar estado en BD)
 * Se llama después de que Mercado Pago confirme el pago
 */
export const markAppointmentAsPaid = async (appointmentId: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/appointments/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al confirmar pago');
    }

    console.log('✅ Cita marcada como pagada:', appointmentId);
    clearAppointmentFromStorage();
    return true;
  } catch (error) {
    console.error('❌ Error al marcar cita como pagada:', error);
    return false;
  }
};
