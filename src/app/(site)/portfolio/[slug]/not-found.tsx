import Link from 'next/link';

export default function ObraNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-serif text-8xl text-accent/20 mb-4">404</p>
      <h1 className="font-serif text-3xl text-white mb-3">Obra no encontrada</h1>
      <p className="text-white/40 font-sans mb-8">Esta obra no existe en el portfolio.</p>
      <Link
        href="/portfolio"
        className="border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-background transition-colors font-sans text-sm"
      >
        Volver al portfolio
      </Link>
    </div>
  );
}
