import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const ODOO_URL = 'https://soporte.oxus.cl/jsonrpc';
const ODOO_DB = 'rapallo';
const ODOO_UID = 2; // Usuario con API key válida
const ODOO_API_KEY = 'A4ZGjdS0cjSX9N';
const PRODUCT_SERVICE_ID = 18; // ID del servicio "Agendamiento de Cita"

// Credenciales de Mercado Pago desde variables de entorno
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';
const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences';

// Función para crear partner en Odoo
// Función para buscar un partner por email
export async function findOdooPartnerByEmail(email: string): Promise<number | null> {
  const odooPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        ODOO_DB,
        ODOO_UID,
        ODOO_API_KEY,
        "res.partner",
        "search",
        [[["email", "=", email]]]
      ]
    },
    id: 1
  };

  console.log('🔍 Buscando partner por email:', email);

  const odooResponse = await fetch(ODOO_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(odooPayload),
  });

  const odooData = await odooResponse.json();
  console.log('Respuesta Odoo (Search Partner):', odooData);

  if (odooData.error) {
    throw new Error(`Error al buscar partner en Odoo: ${JSON.stringify(odooData.error)}`);
  }

  const partnerIds = odooData.result;
  if (partnerIds && partnerIds.length > 0) {
    console.log('✅ Partner encontrado con ID:', partnerIds[0]);
    return partnerIds[0];
  }

  console.log('❌ Partner no encontrado para email:', email);
  return null;
}

// Función para crear un partner en Odoo (exportada)
export async function createOdooPartner(
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  email: string,
  telefono: string,
  documentNumber: string | undefined,
  documentType: string | undefined,
  direction: string
) {
  const fullName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

  const documentTypeMap: Record<string, number> = {
    'rut': 4,
    'pasaporte': 2,
    'otro': 3,
    'sin_documento': 0,
  };

  const odooPartnerData: Record<string, any> = {
    name: fullName,
    email: email,
    phone: telefono,
    street: direction,
  };

  if (documentType && documentTypeMap[documentType] && documentTypeMap[documentType] !== 0) {
    odooPartnerData.l10n_latam_identification_type_id = documentTypeMap[documentType];
  }

  if (documentNumber) {
    odooPartnerData.vat = documentNumber;
  }

  const odooPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        ODOO_DB,
        ODOO_UID,
        ODOO_API_KEY,
        "res.partner",
        "create",
        [odooPartnerData]
      ]
    },
    id: 2
  };

  const odooResponse = await fetch(ODOO_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(odooPayload),
  });

  const odooData = await odooResponse.json();
  console.log('Respuesta Odoo (Partner):', odooData);

  if (odooData.error) {
    throw new Error(`Error al crear partner en Odoo: ${JSON.stringify(odooData.error)}`);
  }

  return odooData.result; // Retorna el partner_id
}

// Exportar funciones para uso en appointments endpoint
export async function createOdooSaleOrder(
  partner_id: number,
  amount: number
) {
  const saleOrderData = {
    partner_id: partner_id,
    order_line: [
      [0, 0, {
        name: "Agendamiento de Cita - Servicios Legales",
        product_uom_qty: 1,
        price_unit: amount
      }]
    ]
  };

  const odooPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        ODOO_DB,
        ODOO_UID,
        ODOO_API_KEY,
        "sale.order",
        "create",
        [saleOrderData]
      ]
    },
    id: 3
  };

  console.log('📤 Enviando payload a Odoo (Sale Order):', JSON.stringify(odooPayload, null, 2));

  const odooResponse = await fetch(ODOO_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(odooPayload),
  });

  const odooData = await odooResponse.json();
  console.log('📥 Respuesta Odoo (Sale Order):', JSON.stringify(odooData, null, 2));

  if (odooData.error) {
    throw new Error(`Error al crear sale order en Odoo: ${JSON.stringify(odooData.error)}`);
  }

  const sale_order_id = odooData.result;

  // Confirmar la orden automáticamente
  await confirmOdooSaleOrder(sale_order_id);

  return sale_order_id; // Retorna el sale_order_id
}

// Función para confirmar la orden de venta
export async function confirmOdooSaleOrder(sale_order_id: number) {
  const confirmPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        ODOO_DB,
        ODOO_UID,
        ODOO_API_KEY,
        "sale.order",
        "write",
        [[sale_order_id], { state: 'sale' }]
      ]
    },
    id: 4
  };

  console.log('📤 Confirmando orden de venta en Odoo...');

  const odooResponse = await fetch(ODOO_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(confirmPayload),
  });

  const odooData = await odooResponse.json();
  console.log('📥 Respuesta Odoo (Confirm Sale Order):', JSON.stringify(odooData, null, 2));

  if (odooData.error) {
    console.error('⚠️ Error al confirmar orden:', odooData.error);
    // No lanzamos error aquí, la orden se creó correctamente
  } else {
    console.log('✅ Orden confirmada exitosamente');
  }
}

// Exportar función para crear preferencia de pago en Mercado Pago
export async function createMercadoPagoPreference(
  sale_order_id: number,
  amount: number,
  email: string,
  customerName: string,
  documentNumber?: string,
  documentType?: string,
  phone?: string,
  address?: string
) {
  // Si no está configurado el access token, retornar null
  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    console.warn('⚠️ Mercado Pago no está configurado. Variable MERCADO_PAGO_ACCESS_TOKEN no encontrada.');
    return null;
  }

  console.log('✅ Token de MP cargado correctamente - primeros 20 caracteres:', MERCADO_PAGO_ACCESS_TOKEN.substring(0, 20) + '...');

  try {
    const preferenceRequest = {
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
        name: customerName,
        ...(documentNumber && documentType ? {
          identification: {
            type: documentType === 'RUT' ? 'RUT' : 'DNI',
            number: documentNumber.replace(/\./g, '').replace(/-/g, '')
          }
        } : {}),
        ...(phone ? { phone: { number: phone } } : {}),
        ...(address ? { address: { street_name: address } } : {})
      },
      external_reference: `sale_order_${sale_order_id}`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/payment-success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/payment-error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/payment-pending`
      }
    };

    console.log('📤 Enviando preferencia a Mercado Pago:', JSON.stringify(preferenceRequest, null, 2));

    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceRequest)
    });

    const data = await response.json();
    console.log('📥 Respuesta de Mercado Pago:', JSON.stringify(data, null, 2));

    if (!response.ok || data.error) {
      throw new Error(`Error de Mercado Pago: ${data.error?.message || data.message || 'Error desconocido'}`);
    }

    return {
      preference_id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
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
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      telefono,
      documentNumber,
      documentType,
      direction,
      serviceType,
    } = body;

    // Validación básica
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !email || !telefono || !direction) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Si ya existe, retornar el user_id existente
      console.log('ℹ️ Usuario ya existe con email:', email, 'ID:', existingUser.id);
      return NextResponse.json(
        {
          message: 'Usuario ya existe',
          user_id: existingUser.id,
          user: existingUser,
        },
        { status: 200 }
      );
    }

    // Crear el usuario EN PRISMA SOLAMENTE (el partner en Odoo se crea en generate-payment)
    const user = await prisma.user.create({
      data: {
        name: nombre,
        paternal_surname: apellidoPaterno,
        maternal_surname: apellidoMaterno,
        email,
        phone: telefono,
        document_number: documentNumber,
        document_type: documentType,
        direction,
        service_type: serviceType,
      },
    });

    console.log('✅ Usuario creado en BD:', user.id);

    return NextResponse.json(
      {
        message: 'Cliente registrado exitosamente',
        user_id: user.id,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error al guardar cliente:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
