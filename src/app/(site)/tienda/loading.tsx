export default function TiendaLoading() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="h-10 w-32 bg-white/5 rounded animate-pulse mx-auto mb-4" />
        <div className="h-5 w-56 bg-white/5 rounded animate-pulse mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[4/5] bg-white/5 animate-pulse" />
            <div className="h-4 w-3/4 bg-white/5 animate-pulse" />
            <div className="h-3 w-1/2 bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
