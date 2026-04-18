import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  /** Product name */
  name: string;
  /** Quantity */
  quantity: number;
  /** Formatted price string (e.g. "$89.99") */
  price: string;
}

export interface OrderCardProps {
  /** Order status — drives badge and action button variants */
  status?: OrderStatus;
  /** Customer display name */
  customerName?: string;
  /** Customer initials for the avatar */
  customerInitials?: string;
  /** Order identifier string (e.g. "ORD-2024-0891") */
  orderId?: string;
  /** Order date string (e.g. "Dec 18, 2024") */
  orderDate?: string;
  /** Line items in the order */
  items?: OrderItem[];
  /** Formatted total amount (e.g. "$134.96") */
  total?: string;
  /** Called when the primary action button is clicked */
  onPrimaryAction?: () => void;
  /** Called when the Details button is clicked */
  onDetails?: () => void;
  className?: string;
}

const statusBadgeType: Record<OrderStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'default',
};

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const primaryActionConfig: Record<OrderStatus, { label: string; variant: 'primary' | 'secondary' | 'ghost' | 'destructive' }> = {
  pending: { label: 'Cancel', variant: 'destructive' },
  processing: { label: 'Track', variant: 'secondary' },
  completed: { label: 'Reorder', variant: 'primary' },
  cancelled: { label: 'View Details', variant: 'ghost' },
};

const DEFAULT_ITEMS: OrderItem[] = [
  { name: 'Wireless Headphones', quantity: 1, price: '$89.99' },
  { name: 'USB-C Cable 2m', quantity: 2, price: '$19.98' },
  { name: 'Phone Case', quantity: 1, price: '$24.99' },
];

export function OrderCard({
  status = 'pending',
  customerName = 'Sarah Johnson',
  customerInitials = 'SJ',
  orderId = 'ORD-2024-0891',
  orderDate = 'Dec 18, 2024',
  items = DEFAULT_ITEMS,
  total = '$134.96',
  onPrimaryAction,
  onDetails,
  className = '',
}: OrderCardProps) {
  const primaryAction = primaryActionConfig[status];
  const showDetailsButton = status !== 'cancelled';

  return (
    <div
      className={[
        'flex flex-col gap-[var(--storefront-spacing-4)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'rounded-[var(--storefront-radius-xl)]',
        'p-[var(--storefront-spacing-5)]',
        'shadow-[var(--storefront-shadow-sm)]',
        'w-[var(--storefront-width-card-order)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--storefront-spacing-3)]">
          <Avatar type="initials" size="md" initials={customerInitials} />
          <div className="flex flex-col gap-[2px]">
            <span className="text-body-sm font-semibold text-[var(--storefront-color-surface-foreground)]">
              {customerName}
            </span>
            <span className="text-label-sm text-[var(--storefront-color-neutral-400)]">
              Order #{orderId} · {orderDate}
            </span>
          </div>
        </div>
        <Badge type={statusBadgeType[status]} label={statusLabel[status]} size="sm" />
      </div>

      {/* Divider */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />

      {/* Order items */}
      <div className="flex flex-col gap-[var(--storefront-spacing-2)]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-label-md text-[var(--storefront-color-surface-foreground)]">
              {item.name} × {item.quantity}
            </span>
            <span className="text-label-md font-medium text-[var(--storefront-color-surface-foreground)]">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <span className="text-label-sm text-[var(--storefront-color-neutral-400)]">Total</span>
          <span className="text-h6 font-semibold text-[var(--storefront-color-surface-foreground)]">
            {total}
          </span>
        </div>
        <div className="flex items-center gap-[var(--storefront-spacing-2)]">
          <Button size="sm" variant={primaryAction.variant} onClick={onPrimaryAction}>
            {primaryAction.label}
          </Button>
          {showDetailsButton && (
            <Button size="sm" variant="ghost" onClick={onDetails}>
              Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
