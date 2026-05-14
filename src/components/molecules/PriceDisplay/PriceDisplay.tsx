import type { HTMLAttributes } from 'react';
import { AmountDisplay } from '../AmountDisplay/AmountDisplay';
import type { AmountSize } from '../AmountDisplay/AmountDisplay';

export type PriceDisplayLayout = 'inline' | 'stacked';

export interface PriceDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Price the customer pays */
  amount: number | null | undefined;
  /** Original price — when present and higher than `amount`, rendered with strikethrough */
  originalAmount?: number | null;
  /** ISO 4217 currency code */
  currency: string;
  /** Locale (defaults to en-US) */
  locale?: string;
  /** Size of the sale price; the original price is one tier smaller */
  size?: AmountSize;
  /** Inline (side by side) or stacked layout */
  layout?: PriceDisplayLayout;
  /** Show a "-XX%" discount badge next to the price */
  showDiscount?: boolean;
}

const smallerSize: Record<AmountSize, AmountSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

export function PriceDisplay({
  amount,
  originalAmount,
  currency,
  locale = 'en-US',
  size = 'md',
  layout = 'inline',
  showDiscount = false,
  className = '',
  ...rest
}: PriceDisplayProps) {
  const hasOriginal =
    originalAmount !== null &&
    originalAmount !== undefined &&
    !Number.isNaN(originalAmount) &&
    amount !== null &&
    amount !== undefined &&
    !Number.isNaN(amount) &&
    originalAmount > amount;

  const discountPct = hasOriginal
    ? Math.round(((originalAmount! - (amount as number)) / originalAmount!) * 100)
    : 0;

  return (
    <div
      className={[
        'flex items-center',
        layout === 'stacked' ? 'flex-col items-start gap-0' : 'gap-[var(--storefront-spacing-2)] flex-wrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span
        className={[
          'flex items-center',
          layout === 'stacked'
            ? 'gap-[var(--storefront-spacing-1-5)]'
            : 'gap-[var(--storefront-spacing-2)]',
        ].join(' ')}
      >
        <AmountDisplay
          amount={amount}
          currency={currency}
          locale={locale}
          size={size}
          className={
            hasOriginal ? 'text-[var(--storefront-color-commerce-discount)]' : undefined
          }
        />
        {showDiscount && hasOriginal && (
          <span
            className={[
              'inline-flex items-center font-semibold',
              'rounded-[var(--storefront-radius-sm)]',
              'px-[var(--storefront-spacing-1-5)] py-[2px]',
              'bg-[var(--storefront-color-commerce-discount)]/10 text-[var(--storefront-color-commerce-discount)]',
              'text-[var(--storefront-typography-label-sm-size)] leading-[var(--storefront-typography-label-sm-line-height)]',
            ].join(' ')}
          >
            −{discountPct}%
          </span>
        )}
      </span>
      {hasOriginal && (
        <AmountDisplay
          amount={originalAmount as number}
          currency={currency}
          locale={locale}
          size={smallerSize[size]}
          strikethrough
          muted
          aria-label="Original price"
        />
      )}
    </div>
  );
}
