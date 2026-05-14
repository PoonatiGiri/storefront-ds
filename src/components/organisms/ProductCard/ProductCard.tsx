import type { HTMLAttributes, ReactNode } from 'react';
import { PriceDisplay } from '../../molecules/PriceDisplay/PriceDisplay';
import { Tag } from '../../atoms/Tag/Tag';

export type ProductCardOrientation = 'vertical' | 'horizontal';
export type ProductCardStockStatus = 'in-stock' | 'low' | 'out-of-stock';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product name */
  name: ReactNode;
  /** Image URL */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Vendor / brand / category metadata */
  meta?: ReactNode;
  /** Current price */
  price: number | null | undefined;
  /** Original price — when higher than `price`, renders strikethrough + discount */
  originalPrice?: number | null;
  /** Currency code */
  currency: string;
  /** Locale for the price */
  locale?: string;
  /** Stock indicator — controls the bottom-line status */
  stockStatus?: ProductCardStockStatus;
  /** Tag rendered top-left over the image (e.g. "New", "Bestseller") */
  badge?: ReactNode;
  /** Action slot rendered at the bottom (e.g. "Add to cart" button) */
  action?: ReactNode;
  /** Vertical card (default) or horizontal list-style */
  orientation?: ProductCardOrientation;
  /** Fires when the card itself is clicked (makes the whole card a link target) */
  onSelect?: () => void;
}

const stockConfig: Record<ProductCardStockStatus, { label: string; tone: string }> = {
  'in-stock': { label: 'In stock', tone: 'text-[var(--storefront-color-commerce-stock)]' },
  low: { label: 'Low stock', tone: 'text-[var(--storefront-color-semantic-warning-default)]' },
  'out-of-stock': {
    label: 'Out of stock',
    tone: 'text-[var(--storefront-color-semantic-error-default)]',
  },
};

export function ProductCard({
  name,
  image,
  imageAlt = '',
  meta,
  price,
  originalPrice,
  currency,
  locale = 'en-US',
  stockStatus,
  badge,
  action,
  orientation = 'vertical',
  onSelect,
  className = '',
  ...rest
}: ProductCardProps) {
  const isClickable = !!onSelect;
  const isHorizontal = orientation === 'horizontal';

  const containerProps = isClickable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick: onSelect,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
          }
        },
      }
    : {};

  return (
    <div
      className={[
        'group relative bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'rounded-[var(--storefront-radius-lg)] overflow-hidden',
        'transition-shadow',
        isClickable
          ? 'cursor-pointer hover:shadow-[var(--storefront-shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-2'
          : '',
        isHorizontal ? 'flex flex-row' : 'flex flex-col',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...containerProps}
      {...rest}
    >
      <div
        className={[
          'relative shrink-0 bg-[var(--storefront-color-neutral-100)] overflow-hidden',
          isHorizontal ? 'w-32 h-32' : 'aspect-square w-full',
        ].join(' ')}
      >
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className="size-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <span aria-hidden="true" className="size-full block" />
        )}
        {badge && (
          <span className="absolute top-[var(--storefront-spacing-2)] left-[var(--storefront-spacing-2)]">
            {typeof badge === 'string' ? <Tag variant="brand" size="sm">{badge}</Tag> : badge}
          </span>
        )}
        {stockStatus === 'out-of-stock' && (
          <span className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-semibold text-[var(--storefront-color-semantic-error-active)] bg-white px-[var(--storefront-spacing-2)] py-[var(--storefront-spacing-1)] rounded-[var(--storefront-radius-sm)] shadow-[var(--storefront-shadow-sm)]">
              Sold out
            </span>
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-[var(--storefront-spacing-2)] p-[var(--storefront-spacing-4)]">
        {meta && (
          <span className="text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)] text-[var(--storefront-color-neutral-500)] uppercase tracking-wide">
            {meta}
          </span>
        )}
        <h3 className="text-[var(--storefront-typography-label-lg-size)] leading-[var(--storefront-typography-label-lg-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)] line-clamp-2">
          {name}
        </h3>
        <PriceDisplay
          amount={price}
          originalAmount={originalPrice}
          currency={currency}
          locale={locale}
          showDiscount
          size="md"
        />
        {stockStatus && stockStatus !== 'out-of-stock' && (
          <span
            className={[
              'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] font-medium',
              stockConfig[stockStatus].tone,
            ].join(' ')}
          >
            {stockConfig[stockStatus].label}
          </span>
        )}
        {action && (
          <div
            className="mt-[var(--storefront-spacing-1)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
