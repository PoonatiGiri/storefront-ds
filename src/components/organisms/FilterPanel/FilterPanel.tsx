import { useState } from 'react';
import { Button } from '../../atoms/Button';

export type FilterPanelVariant = 'sidebar-panel' | 'modal-panel';

export interface FilterGroup {
  /** Group key (used as internal ID) */
  key: string;
  /** Section heading */
  label: string;
  /** Options within this group */
  options: Array<{ value: string; label: string }>;
}

export interface FilterPanelProps {
  /** Layout variant — sidebar-panel is narrow, modal-panel is wider with a close button */
  variant?: FilterPanelVariant;
  /** Filter groups to render */
  groups?: FilterGroup[];
  /** Currently selected values per group key */
  selected?: Record<string, string[]>;
  /** Called when selection changes */
  onChange?: (selected: Record<string, string[]>) => void;
  /** Called when Apply is clicked */
  onApply?: (selected: Record<string, string[]>) => void;
  /** Called when Reset is clicked */
  onReset?: () => void;
  /** Called when the close button is clicked (modal-panel only) */
  onClose?: () => void;
  className?: string;
}

const DEFAULT_GROUPS: FilterGroup[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'all', label: 'All statuses' },
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
  {
    key: 'dateRange',
    label: 'Date Range',
    options: [
      { value: 'today', label: 'Today' },
      { value: 'last7', label: 'Last 7 days' },
      { value: 'last30', label: 'Last 30 days' },
      { value: 'custom', label: 'Custom range' },
    ],
  },
  {
    key: 'orderValue',
    label: 'Order Value',
    options: [
      { value: 'under50', label: 'Under $50' },
      { value: '50to200', label: '$50 – $200' },
      { value: '200to500', label: '$200 – $500' },
      { value: 'over500', label: 'Over $500' },
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

function CheckboxRow({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-[var(--storefront-spacing-2)] h-5 cursor-pointer group"
    >
      <span
        className={[
          'flex items-center justify-center shrink-0 size-4 rounded-[var(--storefront-radius-sm)] border transition-colors duration-150',
          checked
            ? 'bg-[var(--storefront-color-brand-primary-default)] border-[var(--storefront-color-brand-primary-default)]'
            : 'bg-[var(--storefront-color-surface-background)] border-[var(--storefront-color-surface-border)] group-hover:border-[var(--storefront-color-brand-primary-default)]',
        ].join(' ')}
      >
        {checked && <CheckIcon />}
      </span>
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-body-sm text-[var(--storefront-color-surface-foreground)]">{label}</span>
    </label>
  );
}

export function FilterPanel({
  variant = 'sidebar-panel',
  groups = DEFAULT_GROUPS,
  selected: selectedProp,
  onChange,
  onApply,
  onReset,
  onClose,
  className = '',
}: FilterPanelProps) {
  const isModal = variant === 'modal-panel';

  const [internalSelected, setInternalSelected] = useState<Record<string, string[]>>(
    () => groups.reduce<Record<string, string[]>>((acc, g) => ({ ...acc, [g.key]: [] }), {}),
  );
  const selected = selectedProp ?? internalSelected;

  function toggle(groupKey: string, value: string, checked: boolean) {
    const current = selected[groupKey] ?? [];
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    const updated = { ...selected, [groupKey]: next };
    if (!selectedProp) setInternalSelected(updated);
    onChange?.(updated);
  }

  function handleReset() {
    const empty = groups.reduce<Record<string, string[]>>((acc, g) => ({ ...acc, [g.key]: [] }), {});
    if (!selectedProp) setInternalSelected(empty);
    onChange?.(empty);
    onReset?.();
  }

  return (
    <div
      className={[
        'flex flex-col gap-[var(--storefront-spacing-5)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'p-[var(--storefront-spacing-6)]',
        isModal
          ? 'rounded-[var(--storefront-radius-xl)] shadow-[var(--storefront-shadow-lg)] w-[480px]'
          : 'rounded-[var(--storefront-radius-xl)] w-[280px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-h6 font-bold text-[var(--storefront-color-surface-foreground)]">
          Filters
        </span>
        {isModal && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className={[
              'flex items-center justify-center size-7 rounded-[var(--storefront-radius-lg)]',
              'text-[var(--storefront-color-neutral-400)]',
              'hover:bg-[var(--storefront-color-neutral-100)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
              'transition-colors duration-150',
            ].join(' ')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />

      {/* Filter groups */}
      {groups.map((group) => (
        <div key={group.key} className="flex flex-col gap-[var(--storefront-spacing-2)]">
          <span className="text-label-sm font-semibold tracking-wide text-[var(--storefront-color-neutral-400)] uppercase">
            {group.label}
          </span>
          {group.options.map((opt) => (
            <CheckboxRow
              key={opt.value}
              id={`${group.key}-${opt.value}`}
              label={opt.label}
              checked={(selected[group.key] ?? []).includes(opt.value)}
              onChange={(checked) => toggle(group.key, opt.value, checked)}
            />
          ))}
        </div>
      ))}

      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)]" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Button size="sm" variant="ghost" onClick={handleReset}>
          Reset filters
        </Button>
        <Button size="sm" variant="primary" onClick={() => onApply?.(selected)}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}
