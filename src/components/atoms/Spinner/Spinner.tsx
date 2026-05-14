import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';
export type SpinnerTone = 'brand' | 'neutral' | 'inverse';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Color tone */
  tone?: SpinnerTone;
  /** Accessible label announced to screen readers */
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const toneClasses: Record<SpinnerTone, string> = {
  brand: 'text-[var(--storefront-color-brand-primary-default)]',
  neutral: 'text-[var(--storefront-color-neutral-500)]',
  inverse: 'text-white',
};

export function Spinner({
  size = 'md',
  tone = 'brand',
  label = 'Loading',
  className = '',
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <svg
        className={[sizeClasses[size], toneClasses[tone], 'animate-spin'].join(' ')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
