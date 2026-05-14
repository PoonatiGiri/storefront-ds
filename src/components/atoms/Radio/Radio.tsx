import { createContext, forwardRef, useContext, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export type RadioSize = 'sm' | 'md';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the radio button */
  size?: RadioSize;
  /** Label rendered next to the radio */
  label?: React.ReactNode;
  /** Helper text below the label */
  helperText?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** The value submitted when this radio is selected */
  value: string;
}

const sizeMap: Record<RadioSize, { box: string; dot: string; label: string }> = {
  sm: {
    box: 'size-4',
    dot: 'size-1.5',
    label: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  },
  md: {
    box: 'size-5',
    dot: 'size-2',
    label: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
  },
};

type GroupCtx = {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
  error?: boolean;
};

const RadioGroupContext = createContext<GroupCtx | null>(null);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size,
    label,
    helperText,
    error,
    disabled,
    id,
    name,
    value,
    checked,
    onChange,
    className = '',
    ...rest
  },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? `radio-${autoId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const effSize = size ?? group?.size ?? 'md';
  const effDisabled = disabled ?? group?.disabled ?? false;
  const effError = error ?? group?.error ?? false;
  const effName = name ?? group?.name;

  const isControlled =
    group?.value !== undefined ? group.value === value : checked !== undefined ? checked : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (group?.onChange) group.onChange(value);
  };

  const s = sizeMap[effSize];

  return (
    <div className={['inline-flex items-start gap-[var(--storefront-spacing-2)]', className].filter(Boolean).join(' ')}>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          ref={ref}
          id={inputId}
          name={effName}
          type="radio"
          value={value}
          disabled={effDisabled}
          aria-invalid={effError || undefined}
          aria-describedby={helperId}
          checked={isControlled}
          defaultChecked={isControlled === undefined ? group?.defaultValue === value : undefined}
          onChange={handleChange}
          className={[
            'peer appearance-none',
            s.box,
            'rounded-[var(--storefront-radius-full)] border',
            effError
              ? 'border-[var(--storefront-color-semantic-error-default)]'
              : 'border-[var(--storefront-color-neutral-400)]',
            'bg-white transition-colors',
            'hover:border-[var(--storefront-color-brand-primary-default)]',
            'checked:border-[var(--storefront-color-brand-primary-default)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-2',
            'disabled:bg-[var(--storefront-color-neutral-100)] disabled:border-[var(--storefront-color-neutral-200)] disabled:cursor-not-allowed',
          ].join(' ')}
          {...rest}
        />
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            s.dot,
            'rounded-[var(--storefront-radius-full)] bg-[var(--storefront-color-brand-primary-default)]',
            'opacity-0 peer-checked:opacity-100',
            'peer-disabled:bg-[var(--storefront-color-neutral-400)]',
          ].join(' ')}
        />
      </span>

      {(label || helperText) && (
        <span className="flex flex-col gap-[var(--storefront-spacing-0-5)]">
          {label && (
            <label
              htmlFor={inputId}
              className={[
                s.label,
                'select-none cursor-pointer',
                effDisabled
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
                effError
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

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps {
  /** Required field name shared by all radios in the group */
  name: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Fires when the selected radio changes */
  onChange?: (value: string) => void;
  /** Applied to every Radio child unless overridden */
  size?: RadioSize;
  /** Applied to every Radio child unless overridden */
  disabled?: boolean;
  /** Applied to every Radio child unless overridden */
  error?: boolean;
  /** Layout direction */
  orientation?: RadioGroupOrientation;
  /** Optional group label */
  label?: React.ReactNode;
  /** Children are Radio components */
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  size = 'md',
  disabled,
  error,
  orientation = 'vertical',
  label,
  children,
  className = '',
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{ name, value, defaultValue, onChange, size, disabled, error }}
    >
      <div
        role="radiogroup"
        aria-label={typeof label === 'string' ? label : undefined}
        className={['flex flex-col gap-[var(--storefront-spacing-3)]', className].filter(Boolean).join(' ')}
      >
        {label && (
          <span className="text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-medium text-[var(--storefront-color-surface-foreground)]">
            {label}
          </span>
        )}
        <div
          className={[
            'flex',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            orientation === 'vertical'
              ? 'gap-[var(--storefront-spacing-2)]'
              : 'gap-[var(--storefront-spacing-4)]',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
}
