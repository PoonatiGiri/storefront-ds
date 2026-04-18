import { useId } from 'react';
import { Input } from '../../atoms/Input';
import type { InputProps } from '../../atoms/Input';

export interface FormFieldProps extends Omit<InputProps, 'variant' | 'id'> {
  /** Label text shown above the input */
  label: string;
  /** Marks the field as required — appends a red asterisk to the label */
  required?: boolean;
  /** Secondary text shown below the input in default/focused states */
  helperText?: string;
  /** Error message shown below the input; also activates error styling */
  errorMessage?: string;
  /** Disables the field */
  disabled?: boolean;
}

export function FormField({
  label,
  required = false,
  helperText,
  errorMessage,
  disabled = false,
  id: idProp,
  ...inputProps
}: FormFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(errorMessage);

  return (
    <div
      className="flex flex-col w-full"
      style={{ gap: 'var(--storefront-spacing-1-5)' }}
    >
      {/* Label row */}
      <div className="flex items-start gap-[3px]">
        <label
          htmlFor={id}
          className={[
            'flex-1 min-w-0',
            'text-body-md font-medium',
            disabled
              ? 'text-[var(--storefront-color-neutral-400)] opacity-60'
              : 'text-[var(--storefront-color-neutral-700)]',
          ].join(' ')}
        >
          {label}
        </label>
        {required && (
          <span
            aria-hidden="true"
            className="text-body-md font-medium text-[var(--storefront-color-semantic-error-default)] shrink-0"
          >
            *
          </span>
        )}
      </div>

      {/* Input atom */}
      <Input
        id={id}
        variant={hasError ? 'error' : 'default'}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={helperText || errorMessage ? `${id}-hint` : undefined}
        aria-required={required || undefined}
        {...inputProps}
      />

      {/* Helper / error text */}
      {(helperText || errorMessage) && (
        <p
          id={`${id}-hint`}
          className={[
            'text-label-sm',
            hasError
              ? 'text-[var(--storefront-color-semantic-error-default)]'
              : disabled
              ? 'text-[var(--storefront-color-neutral-400)] opacity-50'
              : 'text-[var(--storefront-color-neutral-400)]',
          ].join(' ')}
        >
          {errorMessage ?? helperText}
        </p>
      )}
    </div>
  );
}
