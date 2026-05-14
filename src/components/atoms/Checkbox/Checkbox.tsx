import { forwardRef, useEffect, useRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Label rendered next to the checkbox */
  label?: React.ReactNode;
  /** Helper text below the label */
  helperText?: React.ReactNode;
  /** Error state — switches border + helper text to error color */
  error?: boolean;
  /** Indeterminate state — renders a dash instead of a check */
  indeterminate?: boolean;
}

const sizeMap: Record<CheckboxSize, { box: string; icon: string; label: string }> = {
  sm: {
    box: 'size-4',
    icon: 'size-3',
    label: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  },
  md: {
    box: 'size-5',
    icon: 'size-4',
    label: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = 'md',
    label,
    helperText,
    error = false,
    indeterminate = false,
    disabled,
    id,
    className = '',
    ...rest
  },
  ref,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? `checkbox-${autoId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const s = sizeMap[size];

  return (
    <div className={['inline-flex items-start gap-[var(--storefront-spacing-2)]', className].filter(Boolean).join(' ')}>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          ref={setRefs}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          className={[
            'peer appearance-none',
            s.box,
            'rounded-[var(--storefront-radius-sm)] border',
            error
              ? 'border-[var(--storefront-color-semantic-error-default)]'
              : 'border-[var(--storefront-color-neutral-400)]',
            'bg-white',
            'transition-colors',
            'hover:border-[var(--storefront-color-brand-primary-default)]',
            'checked:bg-[var(--storefront-color-brand-primary-default)] checked:border-[var(--storefront-color-brand-primary-default)]',
            'indeterminate:bg-[var(--storefront-color-brand-primary-default)] indeterminate:border-[var(--storefront-color-brand-primary-default)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-2',
            'disabled:bg-[var(--storefront-color-neutral-100)] disabled:border-[var(--storefront-color-neutral-200)] disabled:cursor-not-allowed',
            'disabled:checked:bg-[var(--storefront-color-neutral-300)] disabled:checked:border-[var(--storefront-color-neutral-300)]',
          ].join(' ')}
          {...rest}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={[
            'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white',
            s.icon,
            indeterminate ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100',
          ].join(' ')}
        >
          {indeterminate ? (
            <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path
              d="M3.5 8.5l3 3 6-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </span>

      {(label || helperText) && (
        <span className="flex flex-col gap-[var(--storefront-spacing-0-5)]">
          {label && (
            <label
              htmlFor={inputId}
              className={[
                s.label,
                'select-none cursor-pointer',
                disabled
                  ? 'text-[var(--storefront-color-neutral-400)] cursor-not-allowed'
                  : 'text-[var(--storefront-color-surface-foreground)]',
              ].join(' ')}
            >
              {label}
            </label>
          )}
          {helperText && (
            <span
              id={helperId}
              className={[
                'text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)]',
                error
                  ? 'text-[var(--storefront-color-semantic-error-default)]'
                  : 'text-[var(--storefront-color-neutral-500)]',
              ].join(' ')}
            >
              {helperText}
            </span>
          )}
        </span>
      )}
    </div>
  );
});
