import type { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  /** Visible label */
  label: ReactNode;
  /** Link href — omit for the current page */
  href?: string;
  /** Custom render fn (e.g., framework-specific link component) */
  render?: (label: ReactNode) => ReactNode;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Ordered list of items, root → current */
  items: BreadcrumbItem[];
  /** Custom separator (defaults to a chevron) */
  separator?: ReactNode;
  /** Collapse middle items if length exceeds this number (shows first + last + ellipsis) */
  maxItems?: number;
}

const defaultSeparator = (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    className="size-3 text-[var(--storefront-color-neutral-400)]"
    aria-hidden="true"
  >
    <path d="M4.5 2l3.5 4-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function renderItem(item: BreadcrumbItem, isCurrent: boolean) {
  const baseClasses = isCurrent
    ? 'text-[var(--storefront-color-surface-foreground)] font-medium'
    : 'text-[var(--storefront-color-neutral-500)] hover:text-[var(--storefront-color-surface-foreground)]';

  const classes = [
    'inline-flex items-center text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
    'rounded-[var(--storefront-radius-sm)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
    'transition-colors',
    baseClasses,
  ].join(' ');

  if (item.render) return item.render(item.label);

  if (isCurrent || !item.href) {
    return (
      <span className={classes} aria-current={isCurrent ? 'page' : undefined}>
        {item.label}
      </span>
    );
  }

  return (
    <a href={item.href} className={classes}>
      {item.label}
    </a>
  );
}

export function Breadcrumb({
  items,
  separator = defaultSeparator,
  maxItems,
  className = '',
  ...rest
}: BreadcrumbProps) {
  let displayItems: (BreadcrumbItem | 'ellipsis')[] = items;
  if (maxItems && items.length > maxItems && items.length > 2) {
    displayItems = [items[0], 'ellipsis', items[items.length - 1]];
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={['flex', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <ol className="flex items-center gap-[var(--storefront-spacing-2)] flex-wrap">
        {displayItems.map((item, i) => {
          const isLast = i === displayItems.length - 1;
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${i}`} className="flex items-center gap-[var(--storefront-spacing-2)]">
                <span
                  className="text-[var(--storefront-color-neutral-400)] text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]"
                  aria-hidden="true"
                >
                  …
                </span>
                {!isLast && separator}
              </li>
            );
          }
          return (
            <li
              key={i}
              className="flex items-center gap-[var(--storefront-spacing-2)]"
            >
              {renderItem(item, isLast)}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
