import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

    // Crear el usuario EN PRISMA SOLAMENTE
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
