import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export type DatePickerSize = 'sm' | 'md';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DatePickerBaseProps {
  /** Field label */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Render in error state with semantic-error styling */
  error?: boolean;
  /** Disable the field */
  disabled?: boolean;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  /** Locale for display formatting (defaults to en-US) */
  locale?: string;
  /** Field size */
  size?: DatePickerSize;
  /** Placeholder when no date is selected */
  placeholder?: string;
}

export interface DatePickerProps extends DatePickerBaseProps {
  /** Single-date mode (default) */
  mode?: 'single';
  /** Controlled value */
  value?: Date | null;
  /** Uncontrolled default */
  defaultValue?: Date | null;
  /** Fires when the selected date changes */
  onChange?: (value: Date | null) => void;
}

export interface DateRangePickerProps extends DatePickerBaseProps {
  mode: 'range';
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (value: DateRange) => void;
}

type AnyProps = DatePickerProps | DateRangePickerProps;

function isSameDay(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  const next = new Date(d);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = day.getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
}

function formatDate(d: Date | null, locale: string) {
  if (!d) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
}

function buildMonthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const start = new Date(year, month, 1 - startWeekday);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }
  return days;
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const sizeClasses: Record<DatePickerSize, string> = {
  sm: 'h-9 px-[var(--storefront-spacing-3)] text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
  md: 'h-10 px-[var(--storefront-spacing-3)] text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)]',
};

export function DatePicker(props: AnyProps) {
  const isRange = props.mode === 'range';
  const locale = props.locale ?? 'en-US';
  const placeholder = props.placeholder ?? (isRange ? 'Select date range' : 'Select date');
  const size = props.size ?? 'md';
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Internal state for uncontrolled mode
  const [single, setSingle] = useState<Date | null>(() =>
    !isRange ? (props as DatePickerProps).defaultValue ?? null : null,
  );
  const [range, setRange] = useState<DateRange>(() =>
    isRange ? (props as DateRangePickerProps).defaultValue ?? { start: null, end: null } : { start: null, end: null },
  );

  const singleValue = !isRange
    ? (props as DatePickerProps).value !== undefined
      ? (props as DatePickerProps).value ?? null
      : single
    : null;

  const rangeValue = isRange
    ? (props as DateRangePickerProps).value !== undefined
      ? (props as DateRangePickerProps).value ?? { start: null, end: null }
      : range
    : { start: null, end: null };

  const anchorDate = isRange
    ? rangeValue.start ?? new Date()
    : singleValue ?? new Date();

  const [viewYear, setViewYear] = useState(anchorDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(anchorDate.getMonth());

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
    }
  };

  const inputDisplay = isRange
    ? rangeValue.start && rangeValue.end
      ? `${formatDate(rangeValue.start, locale)} — ${formatDate(rangeValue.end, locale)}`
      : rangeValue.start
        ? `${formatDate(rangeValue.start, locale)} — …`
        : ''
    : formatDate(singleValue, locale);

  const dayDisabled = (day: Date) => {
    if (props.minDate && startOfDay(day) < startOfDay(props.minDate)) return true;
    if (props.maxDate && startOfDay(day) > startOfDay(props.maxDate)) return true;
    return false;
  };

  const selectDay = (day: Date) => {
    if (dayDisabled(day)) return;
    if (isRange) {
      const r = rangeValue;
      let next: DateRange;
      if (!r.start || (r.start && r.end)) {
        next = { start: day, end: null };
      } else if (day < r.start) {
        next = { start: day, end: r.start };
      } else {
        next = { start: r.start, end: day };
      }
      if ((props as DateRangePickerProps).value === undefined) setRange(next);
      (props as DateRangePickerProps).onChange?.(next);
      if (next.end) setOpen(false);
    } else {
      if ((props as DatePickerProps).value === undefined) setSingle(day);
      (props as DatePickerProps).onChange?.(day);
      setOpen(false);
    }
  };

  const grid = buildMonthGrid(viewYear, viewMonth);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(viewYear, viewMonth, 1));

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" onKeyDown={onKeyDown}>
      {props.label && (
        <label
          htmlFor={id}
          className="block mb-[var(--storefront-spacing-1-5)] text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-medium text-[var(--storefront-color-surface-foreground)]"
        >
          {props.label}
        </label>
      )}
      <button
        id={id}
        type="button"
        disabled={props.disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={props.error || undefined}
        onClick={() => setOpen((o) => !o)}
        className={[
          'w-full inline-flex items-center justify-between',
          sizeClasses[size],
          'rounded-[var(--storefront-radius-md)]',
          'bg-white border',
          props.error
            ? 'border-[var(--storefront-color-semantic-error-default)]'
            : 'border-[var(--storefront-color-surface-border)]',
          'hover:border-[var(--storefront-color-neutral-400)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-1',
          'disabled:bg-[var(--storefront-color-neutral-100)] disabled:text-[var(--storefront-color-neutral-400)] disabled:cursor-not-allowed',
          'text-left',
        ].join(' ')}
      >
        <span
          className={
            inputDisplay
              ? 'text-[var(--storefront-color-surface-foreground)]'
              : 'text-[var(--storefront-color-neutral-400)]'
          }
        >
          {inputDisplay || placeholder}
        </span>
        <svg viewBox="0 0 20 20" fill="none" className="size-4 text-[var(--storefront-color-neutral-500)]" aria-hidden="true">
          <path
            d="M6 2v2M14 2v2M3 7h14M5 4h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {props.helperText && (
        <span
          className={[
            'block mt-[var(--storefront-spacing-1)] text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)]',
            props.error
              ? 'text-[var(--storefront-color-semantic-error-default)]'
              : 'text-[var(--storefront-color-neutral-500)]',
          ].join(' ')}
        >
          {props.helperText}
        </span>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={props.label ?? 'Date picker'}
          className={[
            'absolute z-40 mt-[var(--storefront-spacing-2)] left-0',
            'bg-white border border-[var(--storefront-color-surface-border)]',
            'rounded-[var(--storefront-radius-lg)] shadow-[var(--storefront-shadow-md)]',
            'p-[var(--storefront-spacing-3)] min-w-[280px]',
          ].join(' ')}
        >
          <div className="flex items-center justify-between mb-[var(--storefront-spacing-2)]">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="size-7 inline-flex items-center justify-center rounded-[var(--storefront-radius-md)] text-[var(--storefront-color-neutral-600)] hover:bg-[var(--storefront-color-neutral-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]"
            >
              <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)]">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="size-7 inline-flex items-center justify-center rounded-[var(--storefront-radius-md)] text-[var(--storefront-color-neutral-600)] hover:bg-[var(--storefront-color-neutral-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]"
            >
              <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-[2px] mb-[var(--storefront-spacing-1)]">
            {weekdayLabels.map((w) => (
              <div
                key={w}
                className="text-center text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)] text-[var(--storefront-color-neutral-500)] py-1"
              >
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-[2px]">
            {grid.map((day, i) => {
              const inMonth = day.getMonth() === viewMonth;
              const today = isSameDay(day, new Date());
              const isStart = isRange && isSameDay(day, rangeValue.start);
              const isEnd = isRange && isSameDay(day, rangeValue.end);
              const isSelected = !isRange && isSameDay(day, singleValue);
              const inRangeMid = isRange && isInRange(day, rangeValue.start, rangeValue.end);
              const disabled = dayDisabled(day);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  aria-pressed={isSelected || isStart || isEnd}
                  className={[
                    'h-8 text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)]',
                    'rounded-[var(--storefront-radius-sm)] inline-flex items-center justify-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
                    'transition-colors',
                    disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--storefront-color-neutral-100)]',
                    !inMonth ? 'text-[var(--storefront-color-neutral-400)]' : 'text-[var(--storefront-color-surface-foreground)]',
                    today && !isSelected && !isStart && !isEnd
                      ? 'ring-1 ring-inset ring-[var(--storefront-color-brand-primary-default)]'
                      : '',
                    isSelected || isStart || isEnd
                      ? 'bg-[var(--storefront-color-brand-primary-default)] text-white hover:bg-[var(--storefront-color-brand-primary-hover)]'
                      : '',
                    inRangeMid
                      ? 'bg-[var(--storefront-color-brand-primary-disabled)]/40'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
