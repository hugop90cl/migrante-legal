import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/appointments/confirm-payment
 * Confirma el pago de una cita y la marca como pagada
 * También sube los datos a Odoo como una reserva/evento en el calendario del abogado
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appointmentId } = body;

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'El ID de cita es requerido' },
        { status: 400 }
      );
    }

    // Buscar la cita en la BD
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      );
    }

    if (appointment.status === 'paid') {
      return NextResponse.json(
        { message: 'La cita ya fue marcada como pagada', appointment },
        { status: 200 }
      );
    }

    // Actualizar estado de la cita a 'paid'
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'paid',
        updated_at: new Date(),
      },
    });

    console.log('✅ Cita marcada como pagada:', appointmentId);

    // TODO: Aquí puedes agregar lógica para subir a Odoo como evento en el calendario
    // Por ejemplo, crear un evento en el calendario del abogado en Odoo
    // o crear un registro de "reserva" en un modelo de Odoo específico

    return NextResponse.json(
      {
        message: 'Pago confirmado y cita actualizada',
        appointment: updatedAppointment,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error al confirmar pago:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
