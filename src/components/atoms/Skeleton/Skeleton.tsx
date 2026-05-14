import type { HTMLAttributes } from 'react';

export type SkeletonShape = 'rect' | 'circle' | 'text';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Shape of the placeholder */
  shape?: SkeletonShape;
  /** Width — number (px) or CSS value */
  width?: number | string;
  /** Height — number (px) or CSS value */
  height?: number | string;
  /** Number of stacked lines (only used when shape is "text") */
  lines?: number;
  /** Disable the pulse animation */
  noAnimation?: boolean;
}

const shapeClasses: Record<SkeletonShape, string> = {
  rect: 'rounded-[var(--storefront-radius-md)]',
  circle: 'rounded-[var(--storefront-radius-full)]',
  text: 'rounded-[var(--storefront-radius-sm)]',
};

function toCss(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export function Skeleton({
  shape = 'rect',
  width,
  height,
  lines = 1,
  noAnimation = false,
  className = '',
  style,
  ...rest
}: SkeletonProps) {
  const baseClasses = [
    'block bg-[var(--storefront-color-neutral-200)]',
    noAnimation ? '' : 'animate-pulse',
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (shape === 'text' && lines > 1) {
    return (
      <span
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="flex flex-col gap-[var(--storefront-spacing-2)]"
        {...rest}
      >
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1;
          return (
            <span
              key={i}
              className={baseClasses}
              style={{
                width: isLast ? '60%' : toCss(width) ?? '100%',
                height: toCss(height) ?? '12px',
                ...style,
              }}
              aria-hidden="true"
            />
          );
        })}
      </span>
    );
  }

  const defaultSize =
    shape === 'circle'
      ? { width: 40, height: 40 }
      : shape === 'text'
        ? { width: '100%', height: 12 }
        : { width: '100%', height: 16 };

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={baseClasses}
      style={{
        width: toCss(width) ?? defaultSize.width,
        height: toCss(height) ?? defaultSize.height,
        ...style,
      }}
      {...rest}
    />
  );
}
