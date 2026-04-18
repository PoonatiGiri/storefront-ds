export type BadgeType = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Semantic color variant */
  type?: BadgeType;
  /** Size of the badge */
  size?: BadgeSize;
  /** Text label displayed inside the badge */
  label?: string;
  className?: string;
}

type TypeTokens = {
  bg: string;
  text: string;
  dot: string;
};

const typeTokens: Record<BadgeType, TypeTokens> = {
  default: {
    bg:   'var(--storefront-color-neutral-100)',
    text: 'var(--storefront-color-neutral-700)',
    dot:  'var(--storefront-color-neutral-400)',
  },
  success: {
    bg:   'var(--storefront-color-semantic-success-disabled)',
    text: 'var(--storefront-color-semantic-success-active)',
    dot:  'var(--storefront-color-semantic-success-active)',
  },
  warning: {
    bg:   'var(--storefront-color-semantic-warning-disabled)',
    text: 'var(--storefront-color-semantic-warning-active)',
    dot:  'var(--storefront-color-semantic-warning-active)',
  },
  error: {
    bg:   'var(--storefront-color-semantic-error-disabled)',
    text: 'var(--storefront-color-semantic-error-active)',
    dot:  'var(--storefront-color-semantic-error-active)',
  },
  info: {
    bg:   'var(--storefront-color-semantic-info-disabled)',
    text: 'var(--storefront-color-semantic-info-active)',
    dot:  'var(--storefront-color-semantic-info-active)',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-[var(--storefront-spacing-2)] py-[2px] text-label-sm',
  md: 'px-[var(--storefront-spacing-3)] py-[var(--storefront-spacing-1)] text-label-md',
};

export function Badge({
  type = 'default',
  size = 'sm',
  label = 'Label',
  className = '',
}: BadgeProps) {
  const { bg, text, dot } = typeTokens[type];

  return (
    <span
      className={[
        'inline-flex items-center gap-[var(--storefront-spacing-1)]',
        'rounded-[var(--storefront-radius-full)]',
        'font-medium whitespace-nowrap',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ backgroundColor: bg, color: text }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: dot,
        }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
