import { NextRequest, NextResponse } from 'next/server';
import { createOdooSaleOrder, createMercadoPagoPreference } from '../users/route';
import prisma from '@/lib/prisma';
import { sendAppointmentEmailToLawyer } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      partnerId,
      lawyerId,
      lawyerName,
      appointmentDate,
      appointmentTime,
      email,
      customerName,
    } = body;

    // Validación básica
    if (!userId || !partnerId || !appointmentDate || !appointmentTime || !email || !customerName) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    console.log('📋 Creando cita con datos:', {
      partnerId,
      lawyerId,
      lawyerName,
      appointmentDate,
      appointmentTime,
    });

    // Crear sale order en Odoo
    let sale_order_id: number | null = null;
    try {
      sale_order_id = await createOdooSaleOrder(partnerId, 25000);
      console.log('✅ Sale order creada:', sale_order_id);
    } catch (odooError) {
      const errorMsg = odooError instanceof Error ? odooError.message : String(odooError);
      console.error('❌ Error al crear sale order:', errorMsg);
      return NextResponse.json(
        { error: `Error al crear orden de venta: ${errorMsg}` },
        { status: 500 }
      );
    }

    // Generar link de pago en Mercado Pago
    let payment_link: string | null = null;
    let preference_id: string | null = null;
    if (sale_order_id) {
      try {
        const mpResult = await createMercadoPagoPreference(
          sale_order_id,
          25000,
          email,
          customerName
        );
        if (mpResult) {
          payment_link = mpResult.sandbox_init_point || mpResult.init_point;
          preference_id = mpResult.preference_id;
        }
      } catch (mpError) {
        const errorMsg = mpError instanceof Error ? mpError.message : String(mpError);
        console.error('⚠️ Error al generar link de pago:', errorMsg);
        // No fallamos si Mercado Pago no funciona, la orden se creó exitosamente
      }
    }

    // Guardar la cita en la base de datos
    const appointment = await prisma.appointment.create({
      data: {
        user_id: userId,
        partner_id: partnerId,
        lawyer_id: lawyerId,
        lawyer_name: lawyerName,
        appointment_date: new Date(appointmentDate),
        appointment_time: appointmentTime,
        customer_email: email,
        customer_name: customerName,
        sale_order_id: sale_order_id || undefined,
        preference_id: preference_id || undefined,
        payment_link: payment_link || undefined,
        status: 'pending', // Se actualizará a 'paid' después del pago
      },
    });

    try 
    {
      await sendAppointmentEmailToLawyer(
        process.env.ADMIN_EMAIL!,
        customerName,
        appointmentDate,
        appointmentTime,
        email
      );
      console.log('Email enviado correctamente');
    }catch(emailError)
    {
      const errorMsg = emailError instanceof Error ? emailError.message : String(emailError);
      // No fallamos si el email no se envía, la cita se creó exitosamente
      console.error('Error al enviar email:', errorMsg);
    }

    console.log('💾 Cita guardada en BD:', appointment.id);

    return NextResponse.json(
      {
        message: 'Cita agendada exitosamente',
        appointmentId: appointment.id,
        appointment: {
          id: appointment.id,
          partnerId,
          lawyerId,
          lawyerName,
          appointmentDate,
          appointmentTime,
        },
        sale_order_id,
        payment_link,
        preference_id,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error al agendar cita:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
