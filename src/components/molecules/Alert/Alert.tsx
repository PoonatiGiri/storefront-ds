import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Semantic variant */
  variant?: AlertVariant;
  /** Heading (optional) */
  title?: ReactNode;
  /** Body content */
  children?: ReactNode;
  /** Custom icon — defaults to a variant-specific icon */
  icon?: ReactNode | false;
  /** Optional inline action (rendered to the right of the body) */
  action?: ReactNode;
  /** When provided, shows a close button that calls this callback */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; iconColor: string; title: string; defaultIcon: ReactNode }
> = {
  info: {
    container:
      'bg-[var(--storefront-color-semantic-info-disabled)]/30 border-[var(--storefront-color-semantic-info-default)]/40',
    iconColor: 'text-[var(--storefront-color-semantic-info-default)]',
    title: 'text-[var(--storefront-color-semantic-info-active)]',
    defaultIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zm0 3.25a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  success: {
    container:
      'bg-[var(--storefront-color-semantic-success-disabled)]/30 border-[var(--storefront-color-semantic-success-default)]/40',
    iconColor: 'text-[var(--storefront-color-semantic-success-default)]',
    title: 'text-[var(--storefront-color-semantic-success-active)]',
    defaultIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.95a.75.75 0 10-1.16-.95l-3.55 4.34-1.5-1.5a.75.75 0 10-1.06 1.06l2.1 2.1a.75.75 0 001.1-.06l4.07-4.99z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    container:
      'bg-[var(--storefront-color-semantic-warning-disabled)]/30 border-[var(--storefront-color-semantic-warning-default)]/40',
    iconColor: 'text-[var(--storefront-color-semantic-warning-default)]',
    title: 'text-[var(--storefront-color-semantic-warning-active)]',
    defaultIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M8.485 2.495a1.75 1.75 0 013.03 0l6.28 10.875A1.75 1.75 0 0116.28 16H3.72a1.75 1.75 0 01-1.515-2.63L8.485 2.495zM10 7a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 7zm0 7a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    container:
      'bg-[var(--storefront-color-semantic-error-disabled)]/30 border-[var(--storefront-color-semantic-error-default)]/40',
    iconColor: 'text-[var(--storefront-color-semantic-error-default)]',
    title: 'text-[var(--storefront-color-semantic-error-active)]',
    defaultIcon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  dismissLabel = 'Dismiss',
  className = '',
  ...rest
}: AlertProps) {
  const s = variantStyles[variant];
  const iconNode = icon === false ? null : icon ?? s.defaultIcon;

  return (
    <div
      role="alert"
      className={[
        'flex items-start gap-[var(--storefront-spacing-3)]',
        'p-[var(--storefront-spacing-4)]',
        'border rounded-[var(--storefront-radius-lg)]',
        s.container,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {iconNode && <span className={['shrink-0 mt-[2px]', s.iconColor].join(' ')}>{iconNode}</span>}
      <div className="flex-1 min-w-0 flex flex-col gap-[var(--storefront-spacing-1)]">
        {title && (
          <div
            className={[
              'text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-semibold',
              s.title,
            ].join(' ')}
          >
            {title}
          </div>
        )}
        {children && (
          <div className="text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] text-[var(--storefront-color-surface-foreground)]">
            {children}
          </div>
        )}
        {action && <div className="mt-[var(--storefront-spacing-2)]">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={[
            'shrink-0 inline-flex items-center justify-center size-6 -mr-1 -mt-1',
            'rounded-[var(--storefront-radius-sm)]',
            'text-[var(--storefront-color-neutral-500)]',
            'hover:bg-black/5 hover:text-[var(--storefront-color-surface-foreground)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
            'transition-colors',
          ].join(' ')}
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
