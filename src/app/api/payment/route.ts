import { NextRequest, NextResponse } from 'next/server';

/* ========== MERCADO PAGO INTEGRATION [COMMENTED OUT] ==========
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';
const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences';

async function createMercadoPagoPreference(...) {
  // [CÓDIGO COMENTADO]
}
====================================================== */

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { message: 'Endpoint desactivado - Mercado Pago comentado' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
