import type { HTMLAttributes, ReactNode } from 'react';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title — short and specific */
  title: ReactNode;
  /** Supporting description */
  description?: ReactNode;
  /** Icon or illustration */
  icon?: ReactNode;
  /** Primary action (e.g. <Button>Create order</Button>) */
  primaryAction?: ReactNode;
  /** Secondary action (e.g. <Button variant="ghost">Learn more</Button>) */
  secondaryAction?: ReactNode;
  /** Visual scale */
  size?: EmptyStateSize;
}

const defaultIcon = (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="size-full text-[var(--storefront-color-neutral-300)]"
    aria-hidden="true"
  >
    <rect x="8" y="14" width="48" height="38" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M14 24h36M14 32h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="44" cy="44" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M50 50l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const sizeMap: Record<
  EmptyStateSize,
  { wrapper: string; icon: string; title: string; desc: string }
> = {
  sm: {
    wrapper: 'py-[var(--storefront-spacing-6)] gap-[var(--storefront-spacing-3)]',
    icon: 'size-10',
    title:
      'text-[var(--storefront-typography-heading-h6-size)] leading-[var(--storefront-typography-heading-h6-line-height)]',
    desc: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  },
  md: {
    wrapper: 'py-[var(--storefront-spacing-10)] gap-[var(--storefront-spacing-4)]',
    icon: 'size-14',
    title:
      'text-[var(--storefront-typography-heading-h5-size)] leading-[var(--storefront-typography-heading-h5-line-height)]',
    desc: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
  },
  lg: {
    wrapper: 'py-[var(--storefront-spacing-16)] gap-[var(--storefront-spacing-5)]',
    icon: 'size-20',
    title:
      'text-[var(--storefront-typography-heading-h4-size)] leading-[var(--storefront-typography-heading-h4-line-height)]',
    desc: 'text-[var(--storefront-typography-body-lg-size)] leading-[var(--storefront-typography-body-lg-line-height)]',
  },
};

export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  size = 'md',
  className = '',
  ...rest
}: EmptyStateProps) {
  const s = sizeMap[size];
  return (
    <div
      role="status"
      className={[
        'flex flex-col items-center text-center',
        'px-[var(--storefront-spacing-6)]',
        s.wrapper,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className={s.icon}>{icon ?? defaultIcon}</div>
      <div className="flex flex-col items-center gap-[var(--storefront-spacing-1-5)] max-w-md">
        <h3
          className={[
            'font-semibold text-[var(--storefront-color-surface-foreground)]',
            s.title,
          ].join(' ')}
        >
          {title}
        </h3>
        {description && (
          <p className={['text-[var(--storefront-color-neutral-500)]', s.desc].join(' ')}>
            {description}
          </p>
        )}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap gap-[var(--storefront-spacing-2)] mt-[var(--storefront-spacing-2)] items-center justify-center">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
