import { Button } from '../../atoms/Button';

export type PaginationSize = 'sm' | 'md';

export interface PaginationProps {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Called with the target page when user clicks a page button or Prev/Next */
  onPageChange: (page: number) => void;
  /** Size of the pagination controls */
  size?: PaginationSize;
  className?: string;
}

function buildPages(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: Array<number | '…'> = [1];

  if (current > 3) pages.push('…');

  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);
  for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p);

  if (current < total - 2) pages.push('…');
  pages.push(total);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = 'sm',
  className = '',
}: PaginationProps) {
  const pages = buildPages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={['flex items-center gap-[var(--storefront-spacing-1)]', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Button
        size={size}
        variant="ghost"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ← Prev
      </Button>

      {pages.map((page, idx) =>
        page === '…' ? (
          <span
            key={`ellipsis-${idx}`}
            className={[
              'flex items-center justify-center px-[var(--storefront-spacing-3)] py-[var(--storefront-spacing-1)]',
              'text-[var(--storefront-color-neutral-400)]',
              size === 'md' ? 'text-label-md' : 'text-label-sm',
            ].join(' ')}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Button
            key={page}
            size={size}
            variant={page === currentPage ? 'primary' : 'ghost'}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {String(page)}
          </Button>
        ),
      )}

      <Button
        size={size}
        variant="ghost"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next →
      </Button>
    </nav>
  );
}
