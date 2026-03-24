import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Luli Arte',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans">
      {children}
    </div>
  );
}
