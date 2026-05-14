import type { HTMLAttributes, MouseEvent } from 'react';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onRemove'> {
  /** Visual variant */
  variant?: TagVariant;
  /** Size of the tag */
  size?: TagSize;
  /** Icon shown before the label */
  iconLeft?: React.ReactNode;
  /** Shows an "x" remove button when provided */
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label for the remove button */
  removeLabel?: string;
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'h-5 px-[var(--storefront-spacing-1-5)] gap-[var(--storefront-spacing-1)] text-[var(--storefront-typography-label-sm-size)] leading-[var(--storefront-typography-label-sm-line-height)]',
  md: 'h-6 px-[var(--storefront-spacing-2)] gap-[var(--storefront-spacing-1-5)] text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)]',
};

const variantClasses: Record<TagVariant, string> = {
  neutral:
    'bg-[var(--storefront-color-neutral-100)] text-[var(--storefront-color-neutral-700)] border border-[var(--storefront-color-neutral-200)]',
  brand:
    'bg-[var(--storefront-color-brand-primary-disabled)] text-[var(--storefront-color-brand-primary-active)] border border-[var(--storefront-color-brand-primary-default)]/20',
  success:
    'bg-[var(--storefront-color-semantic-success-disabled)] text-[var(--storefront-color-semantic-success-active)] border border-[var(--storefront-color-semantic-success-default)]/20',
  warning:
    'bg-[var(--storefront-color-semantic-warning-disabled)] text-[var(--storefront-color-semantic-warning-active)] border border-[var(--storefront-color-semantic-warning-default)]/20',
  error:
    'bg-[var(--storefront-color-semantic-error-disabled)] text-[var(--storefront-color-semantic-error-active)] border border-[var(--storefront-color-semantic-error-default)]/20',
  info:
    'bg-[var(--storefront-color-semantic-info-disabled)] text-[var(--storefront-color-semantic-info-active)] border border-[var(--storefront-color-semantic-info-default)]/20',
};

export function Tag({
  variant = 'neutral',
  size = 'md',
  iconLeft,
  onRemove,
  removeLabel = 'Remove',
  children,
  className = '',
  ...rest
}: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium whitespace-nowrap',
        'rounded-[var(--storefront-radius-full)]',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {iconLeft && <span className="inline-flex items-center shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={[
            'inline-flex items-center justify-center shrink-0',
            'rounded-[var(--storefront-radius-full)]',
            'hover:bg-black/10 active:bg-black/15',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
            'transition-colors',
            size === 'sm' ? 'size-3 -mr-0.5' : 'size-4 -mr-1',
          ].join(' ')}
        >
          <svg viewBox="0 0 12 12" fill="none" className="size-full" aria-hidden="true">
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
