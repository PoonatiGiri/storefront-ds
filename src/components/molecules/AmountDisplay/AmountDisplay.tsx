import type { HTMLAttributes } from 'react';

export type AmountSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AmountDisplayProps extends HTMLAttributes<HTMLSpanElement> {
  /** Amount in major units (e.g. 12.5 for $12.50). Pass null/undefined to render a placeholder. */
  amount: number | null | undefined;
  /** ISO 4217 currency code (e.g. "USD", "INR", "EUR") */
  currency: string;
  /** BCP-47 locale (defaults to "en-US") */
  locale?: string;
  /** Visual size */
  size?: AmountSize;
  /** Strike through the value (useful for original-price display) */
  strikethrough?: boolean;
  /** Force a + sign for positive numbers (useful for credits/adjustments) */
  showSign?: boolean;
  /** Render with a muted tone (e.g. for secondary totals) */
  muted?: boolean;
  /** Placeholder shown when amount is null/undefined */
  placeholder?: string;
  /** Custom NumberFormat options merged into the default config */
  formatOptions?: Intl.NumberFormatOptions;
}

const sizeClasses: Record<AmountSize, string> = {
  sm: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  md: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
  lg: 'text-[var(--storefront-typography-heading-h5-size)] leading-[var(--storefront-typography-heading-h5-line-height)]',
  xl: 'text-[var(--storefront-typography-heading-h3-size)] leading-[var(--storefront-typography-heading-h3-line-height)] font-semibold',
};

export function AmountDisplay({
  amount,
  currency,
  locale = 'en-US',
  size = 'md',
  strikethrough = false,
  showSign = false,
  muted = false,
  placeholder = '—',
  formatOptions,
  className = '',
  ...rest
}: AmountDisplayProps) {
  const isMissing = amount === null || amount === undefined || Number.isNaN(amount);

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    signDisplay: showSign ? 'exceptZero' : 'auto',
    ...formatOptions,
  });

  const display = isMissing ? placeholder : formatter.format(amount as number);

  return (
    <span
      className={[
        'tabular-nums font-medium whitespace-nowrap',
        sizeClasses[size],
        strikethrough ? 'line-through' : '',
        muted
          ? 'text-[var(--storefront-color-neutral-500)]'
          : 'text-[var(--storefront-color-commerce-price)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={isMissing ? 'Amount unavailable' : undefined}
      {...rest}
    >
      {display}
    </span>
  );
}
