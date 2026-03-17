import { NextRequest, NextResponse } from 'next/server';
import { createOdooSaleOrder, createMercadoPagoPreference, createOdooPartner, findOdooPartnerByEmail } from '../users/route';

const ODOO_URL = 'https://soporte.oxus.cl/jsonrpc';
const ODOO_DB = 'rapallo';
const ODOO_UID = 2;
const ODOO_API_KEY = 'A4ZGjdS0cjSX9N';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      telefono,
      documentNumber,
      documentType,
      direction,
      amount = 25000,
    } = body;

    // Validación
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !email || !telefono || !direction) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const customerName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
    console.log('📋 Generando link de pago para cliente:', customerName);

    // Buscar si el partner ya existe en Odoo
    let partnerId: number | null = null;
    try {
      partnerId = await findOdooPartnerByEmail(email);
      if (partnerId) {
        console.log('✅ Partner encontrado en Odoo:', partnerId);
      }
    } catch (findError) {
      console.warn('⚠️ Error buscando partner, continuaremos:', findError);
    }

    // Si no existe, crearlo
    if (!partnerId) {
      try {
        partnerId = await createOdooPartner(
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          email,
          telefono,
          documentNumber,
          documentType,
          direction
        );
        console.log('✅ Partner creado en Odoo:', partnerId);
      } catch (odooError) {
        const errorMsg = odooError instanceof Error ? odooError.message : String(odooError);
        console.error('❌ Error al crear partner:', errorMsg);
        return NextResponse.json(
          { error: `Error al crear cliente: ${errorMsg}` },
          { status: 500 }
        );
      }
    }

    // Crear sale order en Odoo
    if (!partnerId) {
      return NextResponse.json(
        { error: 'Partner ID no disponible' },
        { status: 500 }
      );
    }

    let sale_order_id: number | null = null;
    try {
      sale_order_id = await createOdooSaleOrder(partnerId, amount);
      console.log('✅ Sale order creada:', sale_order_id);
    } catch (odooError) {
      const errorMsg = odooError instanceof Error ? odooError.message : String(odooError);
      console.error('❌ Error al crear sale order:', errorMsg);
      return NextResponse.json(
        { error: `Error al crear orden de venta: ${errorMsg}` },
        { status: 500 }
      );
    }

    if (!sale_order_id) {
      return NextResponse.json(
        { error: 'Sale Order ID no disponible' },
        { status: 500 }
      );
    }

    // Generar link de pago en Mercado Pago
    let payment_link: string | null = null;
    let preference_id: string | null = null;
    try {
      const mpResult = await createMercadoPagoPreference(
        sale_order_id,
        amount,
        email,
        customerName,
        documentNumber,
        documentType,
        telefono,
        direction
      );
      
      if (mpResult) {
        payment_link = mpResult.sandbox_init_point || mpResult.init_point;
        preference_id = mpResult.preference_id;
      } else {
        throw new Error('No se pudo generar preferencia de Mercado Pago');
      }
    } catch (mpError) {
      const errorMsg = mpError instanceof Error ? mpError.message : String(mpError);
      console.error('❌ Error al generar link de pago:', errorMsg);
      return NextResponse.json(
        { error: `Error al generar link de pago: ${errorMsg}` },
        { status: 500 }
      );
    }

    console.log('✅ Link de pago generado:', payment_link);

    return NextResponse.json(
      {
        message: 'Link de pago generado exitosamente',
        payment_link,
        preference_id,
        sale_order_id,
        partnerId,
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
