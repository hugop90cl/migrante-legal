import { NextRequest, NextResponse } from 'next/server';

/* ========== ODOO & MERCADO PAGO INTEGRATION [COMMENTED OUT] ==========
All functions imported from users/route.ts:
- createOdooSaleOrder()
- createMercadoPagoPreference()
- createOdooPartner()
- findOdooPartnerByEmail()

Constants:
const ODOO_URL = 'https://soporte.oxus.cl/jsonrpc';
const ODOO_DB = 'rapallo';
const ODOO_UID = 2;
const ODOO_API_KEY = 'A4ZGjdS0cjSX9N';

MERCADO PAGO endpoints and API calls have been disabled.
========================================================================= */

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { message: 'Endpoint desactivado - Odoo y Mercado Pago comentados' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
