import { useState } from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { SearchBar } from '../../molecules/SearchBar';
import { Pagination } from '../../molecules/Pagination';
import type { BadgeType } from '../../atoms/Badge';

export type DataTableVariant =
  | 'default'
  | 'loading-skeleton'
  | 'empty-state'
  | 'row-selected'
  | 'row-hover';

export type RowStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface DataTableRow {
  /** Unique row ID */
  id: string;
  /** Order identifier (e.g. "#ORD-1001") */
  orderId: string;
  /** Customer display name */
  customerName: string;
  /** Customer initials for the avatar */
  customerInitials: string;
  /** Order status */
  status: RowStatus;
  /** Formatted amount string */
  amount: string;
  /** Date string */
  date: string;
}

export interface DataTableProps {
  /** Display variant — drives skeleton/empty/selection states */
  variant?: DataTableVariant;
  /** Table title */
  title?: string;
  /** Data rows */
  rows?: DataTableRow[];
  /** Total record count (for footer label) */
  totalCount?: number;
  /** Current page (1-based) */
  currentPage?: number;
  /** Total pages */
  totalPages?: number;
  /** Controlled selected row IDs */
  selectedIds?: string[];
  /** Called when row selection changes */
  onSelectionChange?: (ids: string[]) => void;
  /** Called when pagination changes */
  onPageChange?: (page: number) => void;
  /** Called when a row's View button is clicked */
  onRowView?: (row: DataTableRow) => void;
  /** Called when Export is clicked */
  onExport?: () => void;
  /** Called when New Order is clicked */
  onNewOrder?: () => void;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state message */
  emptyMessage?: string;
  className?: string;
}

const STATUS_BADGE: Record<RowStatus, BadgeType> = {
  completed: 'success',
  processing: 'info',
  pending: 'warning',
  failed: 'error',
  cancelled: 'default',
};

const STATUS_LABEL: Record<RowStatus, string> = {
  completed: 'Completed',
  processing: 'Processing',
  pending: 'Pending',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

const DEFAULT_ROWS: DataTableRow[] = [
  { id: '1', orderId: '#ORD-1001', customerName: 'Sarah Johnson', customerInitials: 'SJ', status: 'completed', amount: '$134.96', date: 'Dec 18, 2024' },
  { id: '2', orderId: '#ORD-1002', customerName: 'Mike Chen', customerInitials: 'MC', status: 'processing', amount: '$89.99', date: 'Dec 17, 2024' },
  { id: '3', orderId: '#ORD-1003', customerName: 'Emma Wilson', customerInitials: 'EW', status: 'pending', amount: '$234.50', date: 'Dec 17, 2024' },
  { id: '4', orderId: '#ORD-1004', customerName: 'James Taylor', customerInitials: 'JT', status: 'failed', amount: '$45.00', date: 'Dec 16, 2024' },
  { id: '5', orderId: '#ORD-1005', customerName: 'Lisa Brown', customerInitials: 'LB', status: 'completed', amount: '$178.25', date: 'Dec 15, 2024' },
];

// ── Sub-components ──────────────────────────────────────────────────────────

function SkeletonCell({ width }: { width?: string }) {
  return (
    <div
      className="h-4 rounded-[var(--storefront-radius-sm)] bg-[var(--storefront-color-neutral-100)] animate-pulse"
      style={{ width: width ?? '80%' }}
    />
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--storefront-color-surface-border)]">
      <td className="h-[var(--storefront-height-table-row)] w-11 px-[var(--storefront-spacing-3-5)]">
        <div className="size-4 rounded-[var(--storefront-radius-sm)] bg-[var(--storefront-color-neutral-100)] animate-pulse" />
      </td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]"><SkeletonCell width="80px" /></td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
        <div className="flex items-center gap-[var(--storefront-spacing-2)]">
          <div className="size-6 rounded-full bg-[var(--storefront-color-neutral-100)] animate-pulse shrink-0" />
          <SkeletonCell width="100px" />
        </div>
      </td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]"><SkeletonCell width="60px" /></td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]"><SkeletonCell width="50px" /></td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]"><SkeletonCell width="80px" /></td>
      <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]"><SkeletonCell width="40px" /></td>
    </tr>
  );
}

function EmptyState({ title, message, onNewOrder }: { title: string; message: string; onNewOrder?: () => void }) {
  return (
    <tr>
      <td colSpan={7}>
        <div className="flex flex-col items-center justify-center gap-[var(--storefront-spacing-4)] py-16">
          <div className="flex items-center justify-center size-16 rounded-[var(--storefront-radius-full)] bg-[var(--storefront-color-neutral-100)]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="24" height="18" rx="2" stroke="var(--storefront-color-neutral-400)" strokeWidth="1.5" />
              <path d="M4 13h24" stroke="var(--storefront-color-neutral-400)" strokeWidth="1.5" />
              <path d="M10 18h4M10 22h8" stroke="var(--storefront-color-neutral-400)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-[var(--storefront-spacing-2)] text-center">
            <span className="text-h5 font-semibold text-[var(--storefront-color-surface-foreground)]">{title}</span>
            <span className="text-body-sm text-[var(--storefront-color-neutral-400)] max-w-xs">{message}</span>
          </div>
          {onNewOrder && (
            <Button size="sm" variant="primary" onClick={onNewOrder}>
              + New Order
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function DataTable({
  variant = 'default',
  title = 'Orders',
  rows = DEFAULT_ROWS,
  totalCount = 2847,
  currentPage: currentPageProp,
  totalPages = 10,
  selectedIds: selectedIdsProp,
  onSelectionChange,
  onPageChange,
  onRowView,
  onExport,
  onNewOrder,
  searchPlaceholder = 'Search orders…',
  emptyTitle = 'No orders found',
  emptyMessage = "Try adjusting your search or filters to find what you're looking for.",
  className = '',
}: DataTableProps) {
  const [internalPage, setInternalPage] = useState(2);
  const currentPage = currentPageProp ?? internalPage;

  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedIds = selectedIdsProp ?? internalSelected;

  const isLoading = variant === 'loading-skeleton';
  const isEmpty = variant === 'empty-state';
  const hasSelection = variant === 'row-selected';

  // Pre-select row 2 for row-selected variant demo
  const effectiveSelected = hasSelection && selectedIds.length === 0 ? ['2'] : selectedIds;

  function toggleRow(id: string) {
    const next = effectiveSelected.includes(id)
      ? effectiveSelected.filter((s) => s !== id)
      : [...effectiveSelected, id];
    if (!selectedIdsProp) setInternalSelected(next);
    onSelectionChange?.(next);
  }

  function toggleAll() {
    const allIds = rows.map((r) => r.id);
    const next = effectiveSelected.length === rows.length ? [] : allIds;
    if (!selectedIdsProp) setInternalSelected(next);
    onSelectionChange?.(next);
  }

  const allSelected = rows.length > 0 && effectiveSelected.length === rows.length;
  const someSelected = effectiveSelected.length > 0 && !allSelected;

  const pageStart = (currentPage - 1) * rows.length + 1;
  const pageEnd = Math.min(currentPage * rows.length, totalCount);

  return (
    <div
      className={[
        'flex flex-col',
        'bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'rounded-[var(--storefront-radius-xl)]',
        'p-[var(--storefront-spacing-5)]',
        'shadow-[var(--storefront-shadow-sm)]',
        'overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between h-12 mb-[var(--storefront-spacing-2)]">
        <div className="flex items-center gap-[var(--storefront-spacing-2)]">
          <span className="text-h5 font-bold text-[var(--storefront-color-surface-foreground)]">{title}</span>
          <span className="inline-flex items-center px-[var(--storefront-spacing-2)] py-[2px] rounded-[var(--storefront-radius-xl)] bg-[var(--storefront-color-neutral-100)]">
            <span className="text-label-sm font-semibold text-[var(--storefront-color-neutral-400)]">
              {totalCount.toLocaleString()}
            </span>
          </span>
          {effectiveSelected.length > 0 && (
            <span className="text-label-sm text-[var(--storefront-color-brand-primary-default)] ml-[var(--storefront-spacing-2)]">
              {effectiveSelected.length} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-[var(--storefront-spacing-2)]">
          <SearchBar placeholder={searchPlaceholder} style={{ width: 'var(--storefront-width-search-bar)' }} />
          <Button size="sm" variant="secondary" onClick={onExport}>Export</Button>
          <Button size="sm" variant="primary" onClick={onNewOrder}>+ New Order</Button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-[var(--storefront-color-neutral-100)]">
              <th className="h-11 w-11 px-[var(--storefront-spacing-3-5)] text-left">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  className="size-4 rounded-[var(--storefront-radius-sm)] accent-[var(--storefront-color-brand-primary-default)]"
                />
              </th>
              {['ORDER', 'CUSTOMER', 'STATUS', 'AMOUNT', 'DATE', 'ACTIONS'].map((col) => (
                <th
                  key={col}
                  className="h-11 px-[var(--storefront-spacing-3)] text-left text-label-sm font-semibold text-[var(--storefront-color-neutral-400)] whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Divider row */}
          <tbody>
            <tr>
              <td colSpan={7} className="p-0">
                <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />
              </td>
            </tr>

            {/* Loading skeleton */}
            {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

            {/* Empty state */}
            {isEmpty && (
              <EmptyState title={emptyTitle} message={emptyMessage} onNewOrder={onNewOrder} />
            )}

            {/* Data rows */}
            {!isLoading && !isEmpty && rows.map((row, idx) => {
              const isSelected = effectiveSelected.includes(row.id);
              const isHovered = variant === 'row-hover' && idx === 1;

              return (
                <tr
                  key={row.id}
                  className={[
                    'border-b border-[var(--storefront-color-surface-border)]',
                    'transition-colors duration-100',
                    isSelected
                      ? 'bg-[color-mix(in_srgb,var(--storefront-color-brand-primary-default)_6%,transparent)]'
                      : isHovered
                      ? 'bg-[var(--storefront-color-neutral-100)]'
                      : 'bg-[var(--storefront-color-surface-background)] hover:bg-[var(--storefront-color-neutral-100)]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {/* Checkbox */}
                  <td className="h-[var(--storefront-height-table-row)] w-11 px-[var(--storefront-spacing-3-5)]">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${row.orderId}`}
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      className="size-4 rounded-[var(--storefront-radius-sm)] accent-[var(--storefront-color-brand-primary-default)]"
                    />
                  </td>

                  {/* Order ID */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <span className="text-label-md font-medium text-[var(--storefront-color-brand-primary-default)] whitespace-nowrap cursor-pointer hover:underline">
                      {row.orderId}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <div className="flex items-center gap-[var(--storefront-spacing-2)]">
                      <Avatar type="initials" size="xs" initials={row.customerInitials} />
                      <span className="text-label-md text-[var(--storefront-color-surface-foreground)] whitespace-nowrap">
                        {row.customerName}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <Badge type={STATUS_BADGE[row.status]} label={STATUS_LABEL[row.status]} size="sm" />
                  </td>

                  {/* Amount */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <span className="text-label-md font-semibold text-[var(--storefront-color-surface-foreground)] whitespace-nowrap">
                      {row.amount}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <span className="text-label-md text-[var(--storefront-color-neutral-400)] whitespace-nowrap">
                      {row.date}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="h-[var(--storefront-height-table-row)] px-[var(--storefront-spacing-3)]">
                    <Button size="sm" variant="ghost" onClick={() => onRowView?.(row)}>
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)] mt-auto" />
      <div className="flex items-center justify-between h-12 pt-[var(--storefront-spacing-2)]">
        <span className="text-label-md text-[var(--storefront-color-neutral-400)] whitespace-nowrap">
          {isLoading || isEmpty
            ? '\u00A0'
            : `Showing ${pageStart}–${pageEnd} of ${totalCount.toLocaleString()} orders`}
        </span>
        {!isEmpty && (
          <Pagination
            size="sm"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => {
              if (!currentPageProp) setInternalPage(p);
              onPageChange?.(p);
            }}
          />
        )}
      </div>
    </div>
  );
}
