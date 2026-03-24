import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

function isAuthenticated() {
  return cookies().get('admin_session')?.value === process.env.ADMIN_PASSWORD;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from('obras')
    .update(body as Database['public']['Tables']['obras']['Update'])
    .eq('id', params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { error } = await supabaseAdmin.from('obras').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
