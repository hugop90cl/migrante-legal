import { NextRequest, NextResponse } from 'next/server';

// Credenciales de Mercado Pago (modo TEST)
// Cuando tengas las credenciales reales, reemplaza estos valores
const MERCADO_PAGO_ACCESS_TOKEN = 'TEST-PLACEHOLDER'; // Reemplazar con access token real
const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences';

// Función para crear preferencia de pago en Mercado Pago
async function createMercadoPagoPreference(
  sale_order_id: number,
  amount: number,
  email: string,
  customerName: string
) {
  const payload = {
    items: [
      {
        id: `order-${sale_order_id}`,
        title: 'Agendamiento de Cita - Servicios Legales',
        quantity: 1,
        unit_price: amount,
        currency_id: 'CLP'
      }
    ],
    payer: {
      email: email,
      name: customerName
    },
    external_reference: `sale_order_${sale_order_id}`,
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/pago/exito`,
      failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/pago/error`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/pago/pendiente`
    },
    notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/webhook/mercadopago`,
    auto_return: 'approved'
  };

  console.log('📤 Enviando preferencia a Mercado Pago:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('📥 Respuesta de Mercado Pago:', JSON.stringify(data, null, 2));

    if (!response.ok || data.error) {
      throw new Error(`Error de Mercado Pago: ${data.error?.message || data.message || 'Error desconocido'}`);
    }

    return {
      preference_id: data.id,
      init_point: data.init_point, // Link de pago
      sandbox_init_point: data.sandbox_init_point // Link de pago en sandbox
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Error al crear preferencia en Mercado Pago:', errorMsg);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      sale_order_id,
      amount,
      email,
      customerName
    } = body;

    // Validación
    if (!sale_order_id || !amount || !email || !customerName) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: sale_order_id, amount, email, customerName' },
        { status: 400 }
      );
    }

    // Validar que el access token esté configurado
    if (MERCADO_PAGO_ACCESS_TOKEN === 'TEST-PLACEHOLDER') {
      return NextResponse.json(
        { 
          error: 'Mercado Pago no está configurado. Por favor, agrega el ACCESS_TOKEN en las variables de entorno.',
          warning: 'Está en modo TEST. Reemplaza "TEST-PLACEHOLDER" con tu access token real en src/app/api/payment/route.ts'
        },
        { status: 500 }
      );
    }

    // Crear preferencia en Mercado Pago
    const paymentData = await createMercadoPagoPreference(
      sale_order_id,
      amount,
      email,
      customerName
    );

    return NextResponse.json(
      {
        message: 'Link de pago generado exitosamente',
        payment_link: paymentData.sandbox_init_point || paymentData.init_point,
        preference_id: paymentData.preference_id,
        sale_order_id
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error al generar link de pago:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
