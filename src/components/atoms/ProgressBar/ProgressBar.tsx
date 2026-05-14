import type { HTMLAttributes } from 'react';

export type ProgressBarVariant = 'brand' | 'success' | 'warning' | 'error';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Current value (0–max). Omit for indeterminate mode. */
  value?: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Color variant of the filled portion */
  variant?: ProgressBarVariant;
  /** Bar thickness */
  size?: ProgressBarSize;
  /** Optional label rendered above the bar */
  label?: React.ReactNode;
  /** Show numeric value next to the label (e.g. "62%") */
  showValue?: boolean;
  /** Accessible label when no visual label is provided */
  ariaLabel?: string;
}

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses: Record<ProgressBarVariant, string> = {
  brand: 'bg-[var(--storefront-color-brand-primary-default)]',
  success: 'bg-[var(--storefront-color-semantic-success-default)]',
  warning: 'bg-[var(--storefront-color-semantic-warning-default)]',
  error: 'bg-[var(--storefront-color-semantic-error-default)]',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'brand',
  size = 'md',
  label,
  showValue = false,
  ariaLabel,
  className = '',
  ...rest
}: ProgressBarProps) {
  const isIndeterminate = value === undefined;
  const clamped = isIndeterminate ? 0 : Math.max(0, Math.min(max, value));
  const pct = isIndeterminate ? 0 : (clamped / max) * 100;

  return (
    <div className={['w-full flex flex-col gap-[var(--storefront-spacing-1-5)]', className].filter(Boolean).join(' ')} {...rest}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-[var(--storefront-spacing-2)]">
          {label && (
            <span className="text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-medium text-[var(--storefront-color-surface-foreground)]">
              {label}
            </span>
          )}
          {showValue && !isIndeterminate && (
            <span className="text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] text-[var(--storefront-color-neutral-500)] tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={typeof label === 'string' ? label : ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        className={[
          'relative w-full overflow-hidden',
          sizeClasses[size],
          'rounded-[var(--storefront-radius-full)] bg-[var(--storefront-color-neutral-200)]',
        ].join(' ')}
      >
        {isIndeterminate ? (
          <span
            aria-hidden="true"
            className={[
              'absolute inset-y-0 left-0 w-1/3 rounded-[var(--storefront-radius-full)]',
              variantClasses[variant],
              'animate-[progress-indeterminate_1.2s_ease-in-out_infinite]',
            ].join(' ')}
            style={{
              animationName: 'progress-indeterminate',
            }}
          />
        ) : (
          <span
            aria-hidden="true"
            className={[
              'block h-full rounded-[var(--storefront-radius-full)] transition-[width] duration-300',
              variantClasses[variant],
            ].join(' ')}
            style={{ width: `${pct}%` }}
          />
        )}
        <style>{`
          @keyframes progress-indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    </div>
  );
}
