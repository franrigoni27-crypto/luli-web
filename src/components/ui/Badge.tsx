import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'success' | 'sold';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-xs uppercase tracking-widest font-sans',
        {
          'bg-white/10 text-white/70': variant === 'default',
          'bg-accent/20 text-accent': variant === 'accent',
          'bg-green-500/20 text-green-400': variant === 'success',
          'bg-red-500/20 text-red-400': variant === 'sold',
        },
        className
      )}
    >
      {label}
    </span>
  );
}
