import type { ReactNode } from 'react';

export type MetricTrend = 'up' | 'neutral' | 'down';
export type MetricSize = 'sm' | 'md' | 'lg';

export interface MetricCardProps {
  /** Metric label shown in the card header */
  title: string;
  /** Formatted metric value (e.g. "$24,530") */
  value: string;
  /** Direction of the trend indicator */
  trend?: MetricTrend;
  /** Percentage or numeric trend value (e.g. "12.5%") */
  trendValue?: string;
  /** Comparison period label (e.g. "vs last month") */
  period?: string;
  /** Visual size of the card */
  size?: MetricSize;
  /** Icon rendered in the top-right badge; defaults to a bar-chart SVG */
  icon?: ReactNode;
  className?: string;
}

const sizeConfig = {
  sm: { widthVar: 'var(--storefront-width-metric-sm)', titleClass: 'text-label-sm', valueClass: 'text-h3', trendClass: 'text-label-sm' },
  md: { widthVar: 'var(--storefront-width-metric-md)', titleClass: 'text-label-md', valueClass: 'text-h1', trendClass: 'text-label-sm' },
  lg: { widthVar: 'var(--storefront-width-metric-lg)', titleClass: 'text-label-md', valueClass: 'text-display-sm', trendClass: 'text-label-md' },
} as const;

const trendConfig: Record<MetricTrend, { bg: string; color: string; arrow: string }> = {
  up: {
    bg: 'var(--storefront-color-semantic-success-disabled)',
    color: 'var(--storefront-color-semantic-success-active)',
    arrow: '↑',
  },
  neutral: {
    bg: 'var(--storefront-color-neutral-100)',
    color: 'var(--storefront-color-neutral-400)',
    arrow: '→',
  },
  down: {
    bg: 'var(--storefront-color-semantic-error-disabled)',
    color: 'var(--storefront-color-semantic-error-default)',
    arrow: '↓',
  },
};

function DefaultBarChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="4" height="7" rx="1" fill="var(--storefront-color-brand-primary-default)" />
      <rect x="10" y="8" width="4" height="13" rx="1" fill="var(--storefront-color-brand-primary-default)" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="var(--storefront-color-brand-primary-default)" />
    </svg>
  );
}

export function MetricCard({
  title,
  value,
  trend = 'up',
  trendValue = '12.5%',
  period = 'vs last month',
  size = 'sm',
  icon,
  className = '',
}: MetricCardProps) {
  const cfg = sizeConfig[size];
  const t = trendConfig[trend];

  return (
    <div
      className={[
        'flex flex-col gap-[var(--storefront-spacing-3)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)]',
        'rounded-[var(--storefront-radius-xl)]',
        'p-[var(--storefront-spacing-5)]',
        'shadow-[var(--storefront-shadow-sm)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: cfg.widthVar }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className={['font-medium text-[var(--storefront-color-neutral-400)]', cfg.titleClass].join(' ')}
        >
          {title}
        </span>
        <span
          className="flex items-center justify-center size-10 rounded-[var(--storefront-radius-full)] overflow-hidden"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--storefront-color-brand-primary-default) 12%, transparent)',
          }}
          aria-hidden="true"
        >
          {icon ?? <DefaultBarChartIcon />}
        </span>
      </div>

      {/* Value */}
      <p
        className={['font-bold text-[var(--storefront-color-surface-foreground)]', cfg.valueClass].join(' ')}
      >
        {value}
      </p>

      {/* Trend badge */}
      <span
        className="inline-flex items-center gap-[var(--storefront-spacing-1)] self-start px-[var(--storefront-spacing-2)] py-[var(--storefront-spacing-1)] rounded-[var(--storefront-radius-xl)] font-medium whitespace-nowrap"
        style={{ backgroundColor: t.bg, color: t.color }}
      >
        <span className={cfg.trendClass}>
          {t.arrow} {trendValue} {period}
        </span>
      </span>
    </div>
  );
}
