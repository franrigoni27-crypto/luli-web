'use client';

export default function PortfolioError({ reset }: { reset: () => void }) {
  return (
    <div className="pt-28 pb-20 px-4 text-center min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="font-serif text-3xl text-white">Algo salió mal</h2>
      <p className="text-white/40 font-sans">No se pudieron cargar las obras.</p>
      <button
        onClick={reset}
        className="border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-background transition-colors font-sans text-sm"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
