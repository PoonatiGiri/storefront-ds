import { useRef, useState, useEffect, useId } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  /** List of selectable options */
  options: DropdownOption[];
  /** Controlled selected value */
  value?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder shown when nothing is selected */
  placeholder?: string;
  /** Disables the dropdown */
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={[
        'size-4 shrink-0 transition-transform duration-150',
        'text-[var(--storefront-color-neutral-400)]',
        open ? 'rotate-180' : '',
      ].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-[var(--storefront-color-brand-primary-default)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8L6.5 11.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dropdown({
  options,
  value: valueProp,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(undefined);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  function handleSelect(optionValue: string) {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); }
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown' && !open) setOpen(true);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={['relative flex flex-col gap-[var(--storefront-spacing-1)]', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={[
          'flex items-center justify-between gap-[var(--storefront-spacing-2)]',
          'h-10 w-full px-[var(--storefront-spacing-3)]',
          'rounded-[var(--storefront-radius-md)]',
          'bg-[var(--storefront-color-surface-background)]',
          'border text-body-md text-left',
          'outline-none transition-colors duration-150',
          'focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-1',
          'disabled:opacity-60 disabled:pointer-events-none disabled:bg-[var(--storefront-color-neutral-50)]',
          open
            ? 'border-2 border-[var(--storefront-color-brand-primary-default)]'
            : 'border-[var(--storefront-color-surface-border)]',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          className={
            selectedOption
              ? 'text-[var(--storefront-color-surface-foreground)]'
              : 'text-[var(--storefront-color-neutral-400)]'
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Menu panel */}
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel ?? placeholder}
          className={[
            'absolute top-[calc(100%+var(--storefront-spacing-1))] left-0 right-0 z-50',
            'bg-[var(--storefront-color-surface-background)]',
            'border border-[var(--storefront-color-surface-border)]',
            'rounded-[var(--storefront-radius-lg)]',
            'shadow-[var(--storefront-shadow-md)]',
            'py-[var(--storefront-spacing-1)]',
            'overflow-hidden',
          ].join(' ')}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={[
                  'flex items-center justify-between',
                  'h-10 px-[var(--storefront-spacing-3)]',
                  'text-body-md cursor-pointer',
                  'transition-colors duration-100',
                  isSelected
                    ? [
                        'bg-[color-mix(in_srgb,var(--storefront-color-brand-primary-default)_15%,transparent)]',
                        'text-[var(--storefront-color-brand-primary-default)] font-medium',
                      ].join(' ')
                    : [
                        'text-[var(--storefront-color-surface-foreground)]',
                        'hover:bg-[color-mix(in_srgb,var(--storefront-color-brand-primary-default)_8%,transparent)]',
                      ].join(' '),
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span>{option.label}</span>
                {isSelected && <CheckIcon />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
