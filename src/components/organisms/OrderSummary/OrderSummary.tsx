import type { HTMLAttributes, ReactNode } from 'react';
import { AmountDisplay } from '../../molecules/AmountDisplay/AmountDisplay';

export interface OrderSummaryLine {
  /** Label shown on the left (e.g. "Subtotal", "Shipping") */
  label: ReactNode;
  /** Amount on the right. Pass `null`/`undefined` to render the placeholder. */
  amount: number | null | undefined;
  /** Treat this line as a discount/credit — renders in the discount color */
  discount?: boolean;
  /** Muted styling for secondary lines */
  muted?: boolean;
  /** Optional caption below the label */
  hint?: ReactNode;
}

export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Body lines (subtotal, shipping, tax, discount, etc.) */
  lines: OrderSummaryLine[];
  /** Grand total — rendered larger with a divider above */
  total: number | null | undefined;
  /** Optional label for the total (default "Total") */
  totalLabel?: ReactNode;
  /** Currency for every amount in the summary */
  currency: string;
  /** Locale for amount formatting */
  locale?: string;
  /** Optional section above the body (e.g. line items) */
  children?: ReactNode;
  /** Optional footer slot (e.g. CTA + fine print) */
  footer?: ReactNode;
  /** Card title (default "Order summary") */
  title?: ReactNode;
}

export function OrderSummary({
  lines,
  total,
  totalLabel = 'Total',
  currency,
  locale = 'en-US',
  children,
  footer,
  title = 'Order summary',
  className = '',
  ...rest
}: OrderSummaryProps) {
  return (
    <section
      aria-label={typeof title === 'string' ? title : 'Order summary'}
      className={[
        'flex flex-col bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'rounded-[var(--storefront-radius-lg)] shadow-[var(--storefront-shadow-sm)]',
        'overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {title && (
        <header className="px-[var(--storefront-spacing-5)] py-[var(--storefront-spacing-4)] border-b border-[var(--storefront-color-surface-border)]">
          <h3 className="text-[var(--storefront-typography-heading-h5-size)] leading-[var(--storefront-typography-heading-h5-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)]">
            {title}
          </h3>
        </header>
      )}

      {children && (
        <div className="px-[var(--storefront-spacing-5)] py-[var(--storefront-spacing-3)] border-b border-[var(--storefront-color-surface-border)]">
          {children}
        </div>
      )}

      <dl className="flex flex-col gap-[var(--storefront-spacing-3)] px-[var(--storefront-spacing-5)] py-[var(--storefront-spacing-4)]">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start justify-between gap-[var(--storefront-spacing-3)]">
            <dt className="flex flex-col min-w-0">
              <span
                className={[
                  'text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
                  line.muted
                    ? 'text-[var(--storefront-color-neutral-500)]'
                    : 'text-[var(--storefront-color-surface-foreground)]',
                ].join(' ')}
              >
                {line.label}
              </span>
              {line.hint && (
                <span className="text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)] text-[var(--storefront-color-neutral-500)]">
                  {line.hint}
                </span>
              )}
            </dt>
            <dd className="shrink-0">
              <AmountDisplay
                amount={line.amount}
                currency={currency}
                locale={locale}
                size="md"
                showSign={line.discount}
                muted={line.muted}
                className={
                  line.discount
                    ? 'text-[var(--storefront-color-commerce-discount)]'
                    : undefined
                }
              />
            </dd>
          </div>
        ))}

        <div className="border-t border-[var(--storefront-color-surface-border)] pt-[var(--storefront-spacing-3)] flex items-baseline justify-between gap-[var(--storefront-spacing-3)]">
          <dt className="text-[var(--storefront-typography-label-lg-size)] leading-[var(--storefront-typography-label-lg-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)]">
            {totalLabel}
          </dt>
          <dd>
            <AmountDisplay amount={total} currency={currency} locale={locale} size="lg" />
          </dd>
        </div>
      </dl>

      {footer && (
        <div className="px-[var(--storefront-spacing-5)] py-[var(--storefront-spacing-4)] border-t border-[var(--storefront-color-surface-border)] bg-[var(--storefront-color-neutral-50)]">
          {footer}
        </div>
      )}
    </section>
  );
}
