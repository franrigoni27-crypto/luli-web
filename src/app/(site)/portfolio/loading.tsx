export default function PortfolioLoading() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="h-12 w-48 bg-white/5 rounded animate-pulse mx-auto mb-4" />
        <div className="h-5 w-64 bg-white/5 rounded animate-pulse mx-auto" />
      </div>
      <div className="masonry-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="masonry-item bg-white/5 animate-pulse rounded"
            style={{ height: `${200 + (i * 37) % 200}px` }}
          />
        ))}
      </div>
    </div>
  );
}
