import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Called when value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when clear button is clicked */
  onClear?: () => void;
}

function SearchIcon() {
  return (
    <svg
      className="shrink-0 size-4 text-[var(--storefront-color-neutral-400)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      placeholder = 'Search…',
      onChange,
      onClear,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [focused, setFocused] = useState(false);

    const hasValue = value.length > 0;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    }

    function handleClear() {
      if (!isControlled) setInternalValue('');
      onClear?.();
      inputRef.current?.focus();
    }

    return (
      <div
        className={[
          'flex items-center gap-[var(--storefront-spacing-2)]',
          'h-10 px-[var(--storefront-spacing-3)]',
          'rounded-[var(--storefront-radius-md)]',
          'bg-[var(--storefront-color-surface-background)]',
          'border transition-colors duration-150',
          focused
            ? 'border-2 border-[var(--storefront-color-brand-primary-default)]'
            : 'border-[var(--storefront-color-surface-border)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <SearchIcon />

        <input
          ref={inputRef}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          className={[
            'flex-1 min-w-0 bg-transparent outline-none',
            'text-body-md',
            'text-[var(--storefront-color-surface-foreground)]',
            'placeholder:text-[var(--storefront-color-neutral-400)] placeholder:opacity-60',
            // hide browser-native clear button — we provide our own
            '[&::-webkit-search-cancel-button]:appearance-none',
          ].join(' ')}
          {...rest}
        />

        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className={[
              'shrink-0 flex items-center justify-center',
              'text-[var(--storefront-color-neutral-400)]',
              'hover:text-[var(--storefront-color-neutral-600)]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
              'rounded-[var(--storefront-radius-sm)]',
              'transition-colors duration-150',
            ].join(' ')}
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';
