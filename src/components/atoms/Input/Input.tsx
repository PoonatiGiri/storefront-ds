import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'error';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  /** Visual and semantic variant */
  variant?: InputVariant;
  /** Disables the input */
  disabled?: boolean;
  /** Accessible label (use instead of a visible label only for icon-only scenarios) */
  'aria-label'?: string;
}

const baseClasses = [
  'flex items-center w-full',
  'h-10',
  'px-[var(--storefront-spacing-3)] py-[var(--storefront-spacing-2)]',
  'rounded-[var(--storefront-radius-md)]',
  'border',
  'bg-[var(--storefront-color-surface-background)]',
  'text-body-md',
  'text-[var(--storefront-color-surface-foreground)]',
  'placeholder:text-[var(--storefront-color-neutral-400)] placeholder:opacity-50',
  'outline-none',
  'transition-colors duration-150',
  'disabled:bg-[var(--storefront-color-neutral-50)] disabled:opacity-60 disabled:pointer-events-none',
].join(' ');

const variantClasses: Record<InputVariant, string> = {
  default: [
    'border-[var(--storefront-color-surface-border)]',
    'focus-visible:border-2',
    'focus-visible:border-[var(--storefront-color-brand-primary-default)]',
  ].join(' '),
  error: [
    'border-[var(--storefront-color-semantic-error-default)]',
    'focus-visible:border-2',
    'focus-visible:border-[var(--storefront-color-semantic-error-default)]',
    'pr-[var(--storefront-spacing-8)]',
  ].join(' '),
};

function ErrorDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-[var(--storefront-spacing-3)] top-1/2 -translate-y-1/2 shrink-0 rounded-full"
      style={{
        width: 6,
        height: 6,
        backgroundColor: 'var(--storefront-color-semantic-error-default)',
      }}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', disabled = false, className = '', ...rest }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          disabled={disabled}
          className={[
            baseClasses,
            variantClasses[variant],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {variant === 'error' && <ErrorDot />}
      </div>
    );
  },
);

Input.displayName = 'Input';
