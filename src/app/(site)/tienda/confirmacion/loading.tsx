export default function ConfirmacionLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
      <div className="h-8 w-64 bg-white/5 animate-pulse rounded" />
      <div className="h-4 w-48 bg-white/5 animate-pulse rounded" />
    </div>
  );
}
