import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/client';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import type { Obra, Encargo } from '@/lib/supabase/types';

export default async function AdminPage() {
  const session = cookies().get('admin_session')?.value;
  if (session !== process.env.ADMIN_PASSWORD) redirect('/admin/login');

  const [{ data: obras }, { data: encargos }] = await Promise.all([
    supabaseAdmin.from('obras').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('encargos').select('*').order('created_at', { ascending: false }),
  ]);

  return (
    <AdminDashboard
      initialObras={(obras as Obra[]) || []}
      initialEncargos={(encargos as Encargo[]) || []}
    />
  );
}
