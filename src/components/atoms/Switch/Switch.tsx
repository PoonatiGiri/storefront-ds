import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the switch */
  size?: SwitchSize;
  /** Label rendered next to the switch */
  label?: React.ReactNode;
  /** Helper text below the label */
  helperText?: React.ReactNode;
  /** Label position relative to the switch */
  labelPosition?: 'left' | 'right';
}

const sizeMap: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string; label: string }
> = {
  sm: {
    track: 'h-4 w-7',
    thumb: 'size-3',
    translate: 'peer-checked:translate-x-3',
    label: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  },
  md: {
    track: 'h-5 w-9',
    thumb: 'size-4',
    translate: 'peer-checked:translate-x-4',
    label: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
  },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = 'md',
    label,
    helperText,
    labelPosition = 'right',
    disabled,
    id,
    className = '',
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `switch-${autoId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const s = sizeMap[size];

  const labelEl = (label || helperText) && (
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
          className="text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)] text-[var(--storefront-color-neutral-500)]"
        >
          {helperText}
        </span>
      )}
    </span>
  );

  const switchEl = (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        aria-describedby={helperId}
        className={[
          'peer appearance-none cursor-pointer',
          s.track,
          'rounded-[var(--storefront-radius-full)]',
          'bg-[var(--storefront-color-neutral-300)]',
          'checked:bg-[var(--storefront-color-brand-primary-default)]',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' ')}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2',
          s.thumb,
          'rounded-[var(--storefront-radius-full)] bg-white shadow-[var(--storefront-shadow-sm)]',
          'transition-transform',
          s.translate,
        ].join(' ')}
      />
    </span>
  );

  return (
    <div
      className={[
        'inline-flex items-start gap-[var(--storefront-spacing-2)]',
        labelPosition === 'left' ? 'flex-row-reverse' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {switchEl}
      {labelEl}
    </div>
  );
});
