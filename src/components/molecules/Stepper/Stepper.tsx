import type { HTMLAttributes, ReactNode } from 'react';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperStep {
  /** Display label */
  label: ReactNode;
  /** Supporting description below the label */
  description?: ReactNode;
  /** Custom icon (overrides the default number / checkmark) */
  icon?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  /** Ordered list of steps */
  steps: StepperStep[];
  /** Index of the current step (0-based). Steps before it are "completed", after it are "upcoming" */
  currentStep: number;
  /** Layout direction */
  orientation?: StepperOrientation;
  /** When provided, fires when a completed step is clicked (lets users jump back) */
  onStepClick?: (index: number) => void;
}

const checkmark = (
  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
    <path
      d="M3.5 8.5l3 3 6-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  className = '',
  ...rest
}: StepperProps) {
  return (
    <ol
      aria-label="Progress"
      className={[
        'flex w-full',
        orientation === 'horizontal'
          ? 'items-start gap-[var(--storefront-spacing-2)]'
          : 'flex-col gap-[var(--storefront-spacing-4)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isClickable = onStepClick && isCompleted;
        const isLast = i === steps.length - 1;

        const circleClasses = [
          'inline-flex items-center justify-center shrink-0 size-8 rounded-[var(--storefront-radius-full)] font-semibold',
          'text-[var(--storefront-typography-label-md-size)] leading-none',
          'transition-colors',
          isCompleted
            ? 'bg-[var(--storefront-color-brand-primary-default)] text-white'
            : isCurrent
              ? 'bg-white text-[var(--storefront-color-brand-primary-default)] border-2 border-[var(--storefront-color-brand-primary-default)]'
              : 'bg-[var(--storefront-color-neutral-100)] text-[var(--storefront-color-neutral-500)] border border-[var(--storefront-color-neutral-200)]',
        ].join(' ');

        const indicator = (
          <span className={circleClasses}>
            {step.icon ?? (isCompleted ? checkmark : <span>{i + 1}</span>)}
          </span>
        );

        const labelBlock = (
          <span className="flex flex-col">
            <span
              className={[
                'text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-medium',
                isCurrent
                  ? 'text-[var(--storefront-color-surface-foreground)]'
                  : isCompleted
                    ? 'text-[var(--storefront-color-surface-foreground)]'
                    : 'text-[var(--storefront-color-neutral-500)]',
              ].join(' ')}
            >
              {step.label}
            </span>
            {step.description && (
              <span className="text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] text-[var(--storefront-color-neutral-500)]">
                {step.description}
              </span>
            )}
          </span>
        );

        const itemContent = (
          <>
            {orientation === 'horizontal' ? (
              <span className="flex flex-col items-center text-center gap-[var(--storefront-spacing-2)]">
                {indicator}
                {labelBlock}
              </span>
            ) : (
              <span className="flex items-start gap-[var(--storefront-spacing-3)]">
                {indicator}
                <span className="pt-1">{labelBlock}</span>
              </span>
            )}
          </>
        );

        return (
          <li
            key={i}
            aria-current={isCurrent ? 'step' : undefined}
            className={[
              'relative',
              orientation === 'horizontal' ? 'flex-1 min-w-0' : '',
              isClickable ? 'cursor-pointer' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={isClickable ? () => onStepClick?.(i) : undefined}
          >
            {isClickable ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStepClick?.(i);
                }}
                className="text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] rounded-[var(--storefront-radius-sm)]"
              >
                {itemContent}
              </button>
            ) : (
              itemContent
            )}

            {!isLast && (
              <span
                aria-hidden="true"
                className={[
                  'absolute',
                  orientation === 'horizontal'
                    ? 'top-4 left-[calc(50%+1rem+var(--storefront-spacing-2))] right-[calc(-50%+1rem+var(--storefront-spacing-2))] h-0.5'
                    : 'left-4 top-[calc(2rem+var(--storefront-spacing-1))] bottom-[calc(-1*var(--storefront-spacing-3))] w-0.5',
                  isCompleted
                    ? 'bg-[var(--storefront-color-brand-primary-default)]'
                    : 'bg-[var(--storefront-color-neutral-200)]',
                ].join(' ')}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
