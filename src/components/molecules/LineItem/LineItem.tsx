import type { HTMLAttributes, ReactNode } from 'react';
import { AmountDisplay } from '../AmountDisplay/AmountDisplay';

export type LineItemSize = 'sm' | 'md';

export interface LineItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Product / line title */
  name: ReactNode;
  /** Variant or option label (e.g. "Size M / Black") */
  variant?: ReactNode;
  /** SKU or external id, rendered as muted metadata */
  sku?: string;
  /** Product image URL */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Unit price */
  unitPrice: number | null | undefined;
  /** Currency for the unit price + line total */
  currency: string;
  /** Locale for amount formatting */
  locale?: string;
  /** Quantity in the cart/order */
  quantity: number;
  /** Slot for an inline quantity stepper or qty control */
  quantityControl?: ReactNode;
  /** Size */
  size?: LineItemSize;
  /** Show the line total on the right side (default true) */
  showLineTotal?: boolean;
  /** When provided, renders a remove button */
  onRemove?: () => void;
  /** Accessible label for the remove button */
  removeLabel?: string;
}

const sizeConfig: Record<
  LineItemSize,
  { image: string; name: string; meta: string; padding: string }
> = {
  sm: {
    image: 'size-12',
    name: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
    meta: 'text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)]',
    padding: 'py-[var(--storefront-spacing-2)]',
  },
  md: {
    image: 'size-16',
    name: 'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
    meta: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
    padding: 'py-[var(--storefront-spacing-3)]',
  },
};

export function LineItem({
  name,
  variant,
  sku,
  image,
  imageAlt = '',
  unitPrice,
  currency,
  locale = 'en-US',
  quantity,
  quantityControl,
  size = 'md',
  showLineTotal = true,
  onRemove,
  removeLabel = 'Remove item',
  className = '',
  ...rest
}: LineItemProps) {
  const s = sizeConfig[size];
  const lineTotal =
    unitPrice === null || unitPrice === undefined || Number.isNaN(unitPrice)
      ? null
      : unitPrice * quantity;

  return (
    <div
      className={[
        'flex items-start gap-[var(--storefront-spacing-3)] w-full',
        s.padding,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div
        className={[
          'shrink-0 overflow-hidden rounded-[var(--storefront-radius-md)]',
          'bg-[var(--storefront-color-neutral-100)] border border-[var(--storefront-color-surface-border)]',
          s.image,
        ].join(' ')}
      >
        {image ? (
          <img src={image} alt={imageAlt} className="size-full object-cover" />
        ) : (
          <span aria-hidden="true" className="size-full block" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-[var(--storefront-spacing-0-5)]">
        <span
          className={[
            'font-medium text-[var(--storefront-color-surface-foreground)] truncate',
            s.name,
          ].join(' ')}
        >
          {name}
        </span>
        {variant && (
          <span className={['text-[var(--storefront-color-neutral-600)]', s.meta].join(' ')}>
            {variant}
          </span>
        )}
        {sku && (
          <span className={['text-[var(--storefront-color-neutral-500)]', s.meta].join(' ')}>
            SKU {sku}
          </span>
        )}
        {(quantityControl || onRemove) && (
          <div className="flex items-center gap-[var(--storefront-spacing-3)] mt-[var(--storefront-spacing-1)]">
            {quantityControl}
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                aria-label={removeLabel}
                className={[
                  'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
                  'text-[var(--storefront-color-neutral-500)] hover:text-[var(--storefront-color-semantic-error-default)]',
                  'rounded-[var(--storefront-radius-sm)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
                  'transition-colors',
                ].join(' ')}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-[var(--storefront-spacing-1)] text-right">
        {!quantityControl && (
          <span className={['text-[var(--storefront-color-neutral-500)]', s.meta].join(' ')}>
            Qty {quantity}
          </span>
        )}
        <AmountDisplay
          amount={unitPrice}
          currency={currency}
          locale={locale}
          size={size}
          muted={showLineTotal && quantity > 1}
        />
        {showLineTotal && quantity > 1 && (
          <AmountDisplay
            amount={lineTotal}
            currency={currency}
            locale={locale}
            size={size}
          />
        )}
      </div>
    </div>
  );
}
