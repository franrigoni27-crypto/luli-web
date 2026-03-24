import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/client';

function isAuthenticated() {
  return cookies().get('admin_session')?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { data, error } = await supabaseAdmin
    .from('obras')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('obras').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
