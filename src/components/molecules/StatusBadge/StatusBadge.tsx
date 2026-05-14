import type { HTMLAttributes, ReactNode } from 'react';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type StatusBadgeSize = 'sm' | 'md';

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Order/payment lifecycle status — must be one of the five mandated values */
  status: OrderStatus;
  /** Size variant */
  size?: StatusBadgeSize;
  /** Override the default label (e.g. localize the text) */
  label?: ReactNode;
  /** Hide the leading status dot */
  hideDot?: boolean;
}

const config: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: 'Pending',
    bg: 'bg-[var(--storefront-color-semantic-warning-disabled)]/40',
    text: 'text-[var(--storefront-color-semantic-warning-active)]',
    dot: 'bg-[var(--storefront-color-semantic-warning-default)]',
  },
  processing: {
    label: 'Processing',
    bg: 'bg-[var(--storefront-color-semantic-info-disabled)]/40',
    text: 'text-[var(--storefront-color-semantic-info-active)]',
    dot: 'bg-[var(--storefront-color-semantic-info-default)]',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-[var(--storefront-color-semantic-success-disabled)]/40',
    text: 'text-[var(--storefront-color-semantic-success-active)]',
    dot: 'bg-[var(--storefront-color-semantic-success-default)]',
  },
  failed: {
    label: 'Failed',
    bg: 'bg-[var(--storefront-color-semantic-error-disabled)]/40',
    text: 'text-[var(--storefront-color-semantic-error-active)]',
    dot: 'bg-[var(--storefront-color-semantic-error-default)]',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-[var(--storefront-color-neutral-100)]',
    text: 'text-[var(--storefront-color-neutral-600)]',
    dot: 'bg-[var(--storefront-color-neutral-400)]',
  },
};

const sizeClasses: Record<StatusBadgeSize, string> = {
  sm: 'h-5 px-[var(--storefront-spacing-2)] gap-[var(--storefront-spacing-1)] text-[var(--storefront-typography-label-sm-size)] leading-[var(--storefront-typography-label-sm-line-height)]',
  md: 'h-6 px-[var(--storefront-spacing-3)] gap-[var(--storefront-spacing-1-5)] text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)]',
};

const dotSize: Record<StatusBadgeSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
};

export function StatusBadge({
  status,
  size = 'md',
  label,
  hideDot = false,
  className = '',
  ...rest
}: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={[
        'inline-flex items-center font-medium whitespace-nowrap',
        'rounded-[var(--storefront-radius-full)]',
        sizeClasses[size],
        c.bg,
        c.text,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={`Status: ${typeof label === 'string' ? label : c.label}`}
      {...rest}
    >
      {!hideDot && (
        <span
          aria-hidden="true"
          className={['rounded-full shrink-0', dotSize[size], c.dot].join(' ')}
        />
      )}
      <span>{label ?? c.label}</span>
    </span>
  );
}
