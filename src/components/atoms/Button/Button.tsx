import { forwardRef, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction */
  loading?: boolean;
  /** Icon placed before the label */
  iconLeft?: React.ReactNode;
  /** Icon placed after the label */
  iconRight?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: [
    'px-[var(--storefront-spacing-3)]',
    'py-[var(--storefront-spacing-1)]',
    'text-[var(--storefront-typography-label-sm-size)]',
    'leading-[var(--storefront-typography-label-sm-line-height)]',
    'gap-[var(--storefront-spacing-1)]',
  ].join(' '),
  md: [
    'px-[var(--storefront-spacing-4)]',
    'py-[var(--storefront-spacing-2)]',
    'text-[var(--storefront-typography-label-md-size)]',
    'leading-[var(--storefront-typography-label-md-line-height)]',
    'gap-[var(--storefront-spacing-2)]',
  ].join(' '),
  lg: [
    'px-[var(--storefront-spacing-6)]',
    'py-[var(--storefront-spacing-3)]',
    'text-[var(--storefront-typography-label-lg-size)]',
    'leading-[var(--storefront-typography-label-lg-line-height)]',
    'gap-[var(--storefront-spacing-2)]',
  ].join(' '),
};

const spinnerSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-3',
  md: 'size-[14px]',
  lg: 'size-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--storefront-color-brand-primary-default)]',
    'text-white',
    'hover:bg-[var(--storefront-color-brand-primary-hover)]',
    'active:bg-[var(--storefront-color-brand-primary-active)]',
    'disabled:bg-[var(--storefront-color-brand-primary-disabled)]',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
    'focus-visible:ring-offset-2',
  ].join(' '),
  secondary: [
    'bg-[var(--storefront-color-neutral-100)]',
    'text-[var(--storefront-color-surface-foreground)]',
    'border',
    'border-[var(--storefront-color-surface-border)]',
    'hover:bg-[var(--storefront-color-neutral-200)]',
    'active:bg-[var(--storefront-color-neutral-300)]',
    'disabled:bg-[var(--storefront-color-neutral-100)]',
    'disabled:text-[var(--storefront-color-neutral-400)]',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
    'focus-visible:ring-offset-2',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[var(--storefront-color-surface-foreground)]',
    'hover:bg-[var(--storefront-color-neutral-100)]',
    'active:bg-[var(--storefront-color-neutral-200)]',
    'disabled:text-[var(--storefront-color-neutral-400)]',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
    'focus-visible:ring-offset-2',
  ].join(' '),
  destructive: [
    'bg-[var(--storefront-color-semantic-error-default)]',
    'text-white',
    'hover:bg-[var(--storefront-color-semantic-error-hover)]',
    'active:bg-[var(--storefront-color-semantic-error-active)]',
    'disabled:bg-[var(--storefront-color-semantic-error-disabled)]',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--storefront-color-semantic-error-default)]',
    'focus-visible:ring-offset-2',
  ].join(' '),
};

function Spinner({ sizeClass }: { sizeClass: string }) {
  return (
    <svg
      className={`${sizeClass} animate-spin`}
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
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={[
          'inline-flex items-center justify-center',
          'rounded-[var(--storefront-radius-md)]',
          'font-medium',
          'outline-none',
          'transition-colors duration-150',
          'disabled:opacity-50 disabled:pointer-events-none',
          sizeClasses[size],
          variantClasses[variant],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <Spinner sizeClass={spinnerSizeClasses[size]} />
        ) : (
          iconLeft
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight}
      </button>
    );
  },
);

Button.displayName = 'Button';
