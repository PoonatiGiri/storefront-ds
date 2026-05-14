import { cloneElement, isValidElement, useId, useState } from 'react';
import type { ReactElement } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipSize = 'sm' | 'md';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Where the tooltip renders relative to the trigger */
  placement?: TooltipPlacement;
  /** Size of the tooltip */
  size?: TooltipSize;
  /** Forces the tooltip open (uncontrolled defaults to hover/focus) */
  open?: boolean;
  /** Disable the tooltip entirely */
  disabled?: boolean;
  /** Optional className applied to the bubble */
  className?: string;
  /** Trigger element — must be a single React element that can receive event handlers */
  children: ReactElement;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-[var(--storefront-spacing-2)]',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-[var(--storefront-spacing-2)]',
  left: 'right-full top-1/2 -translate-y-1/2 mr-[var(--storefront-spacing-2)]',
  right: 'left-full top-1/2 -translate-y-1/2 ml-[var(--storefront-spacing-2)]',
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-px border-t-[var(--storefront-color-neutral-900)] border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-[var(--storefront-color-neutral-900)] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-px border-l-[var(--storefront-color-neutral-900)] border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 -mr-px border-r-[var(--storefront-color-neutral-900)] border-y-transparent border-l-transparent',
};

const sizeClasses: Record<TooltipSize, string> = {
  sm: 'text-[var(--storefront-typography-body-xs-size)] leading-[var(--storefront-typography-body-xs-line-height)] px-[var(--storefront-spacing-2)] py-[var(--storefront-spacing-1)]',
  md: 'text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] px-[var(--storefront-spacing-3)] py-[var(--storefront-spacing-1-5)]',
};

export function Tooltip({
  content,
  placement = 'top',
  size = 'sm',
  open,
  disabled = false,
  className = '',
  children,
}: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tooltipId = useId();
  const isOpen = !disabled && (open ?? (hovered || focused));

  if (!isValidElement(children)) return children;

  type TriggerProps = {
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    'aria-describedby'?: string;
  };
  const trigger = children as ReactElement<TriggerProps>;
  const existing = trigger.props;

  const triggerWithHandlers = cloneElement(trigger, {
    onMouseEnter: (e: React.MouseEvent) => {
      existing.onMouseEnter?.(e);
      setHovered(true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      existing.onMouseLeave?.(e);
      setHovered(false);
    },
    onFocus: (e: React.FocusEvent) => {
      existing.onFocus?.(e);
      setFocused(true);
    },
    onBlur: (e: React.FocusEvent) => {
      existing.onBlur?.(e);
      setFocused(false);
    },
    'aria-describedby': isOpen ? tooltipId : existing['aria-describedby'],
  });

  return (
    <span className="relative inline-flex">
      {triggerWithHandlers}
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className={[
            'absolute z-50 pointer-events-none whitespace-nowrap',
            'rounded-[var(--storefront-radius-md)]',
            'bg-[var(--storefront-color-neutral-900)] text-white',
            'shadow-[var(--storefront-shadow-md)]',
            sizeClasses[size],
            placementClasses[placement],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {content}
          <span
            aria-hidden="true"
            className={[
              'absolute size-0 border-[5px]',
              arrowClasses[placement],
            ].join(' ')}
          />
        </span>
      )}
    </span>
  );
}
