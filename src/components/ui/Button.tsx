import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-sans transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-accent text-background hover:bg-accent-light active:scale-95': variant === 'primary',
            'border border-accent text-accent hover:bg-accent hover:text-background active:scale-95': variant === 'secondary',
            'text-white/70 hover:text-white active:scale-95': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        data-cursor="grow"
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
