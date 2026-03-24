import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/client';

// Allowlist of fields the admin can update on an encargo
const ALLOWED_UPDATE_FIELDS: Array<string> = ['estado'];

function isAuthenticated() {
  return cookies().get('admin_session')?.value === process.env.ADMIN_PASSWORD;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();

  // Strip any fields not in the allowlist to prevent mass assignment
  const safeBody = Object.fromEntries(
    Object.entries(body).filter(([key]) => ALLOWED_UPDATE_FIELDS.includes(key))
  );

  if (Object.keys(safeBody).length === 0) {
    return NextResponse.json({ error: 'No hay campos válidos para actualizar' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('encargos')
    .update(safeBody as never)
    .eq('id', params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
