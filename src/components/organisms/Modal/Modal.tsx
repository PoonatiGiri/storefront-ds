import { useCallback, useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Fires when overlay click, Escape key, or close button is used */
  onClose: () => void;
  /** Width preset */
  size?: ModalSize;
  /** Header content — usually a title; pair with ModalHeader for more control */
  title?: ReactNode;
  /** Description ID announced to screen readers; omit if you use ModalHeader */
  description?: ReactNode;
  /** Footer content — usually action buttons */
  footer?: ReactNode;
  /** Hide the default close button */
  hideCloseButton?: boolean;
  /** Disable overlay click → close */
  disableOverlayClose?: boolean;
  /** Disable Escape key → close */
  disableEscClose?: boolean;
  /** Accessible label for the close button */
  closeLabel?: string;
  /** Body content */
  children?: ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Modal({
  open,
  onClose,
  size = 'md',
  title,
  description,
  footer,
  hideCloseButton = false,
  disableOverlayClose = false,
  disableEscClose = false,
  closeLabel = 'Close',
  children,
  className = '',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;

    const focusable = getFocusable(dialogRef.current);
    (focusable[0] ?? dialogRef.current)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscClose) {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const items = getFocusable(dialogRef.current);
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, disableEscClose, close]);

  if (!open) return null;

  const node = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[var(--storefront-spacing-4)]"
      onMouseDown={(e) => {
        if (!disableOverlayClose && e.target === e.currentTarget) close();
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--storefront-color-surface-overlay)]"
        onMouseDown={() => {
          if (!disableOverlayClose) close();
        }}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={[
          'relative w-full',
          sizeClasses[size],
          'bg-[var(--storefront-color-surface-background)]',
          'rounded-[var(--storefront-radius-xl)] shadow-[var(--storefront-shadow-lg)]',
          'max-h-[calc(100vh-2rem)] flex flex-col',
          'focus-visible:outline-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-[var(--storefront-spacing-3)] p-[var(--storefront-spacing-5)] border-b border-[var(--storefront-color-surface-border)]">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-[var(--storefront-typography-heading-h5-size)] leading-[var(--storefront-typography-heading-h5-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descId}
                  className="mt-[var(--storefront-spacing-1)] text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] text-[var(--storefront-color-neutral-500)]"
                >
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                type="button"
                aria-label={closeLabel}
                onClick={close}
                className={[
                  'shrink-0 inline-flex items-center justify-center size-8',
                  'rounded-[var(--storefront-radius-md)]',
                  'text-[var(--storefront-color-neutral-500)]',
                  'hover:bg-[var(--storefront-color-neutral-100)] hover:text-[var(--storefront-color-surface-foreground)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
                  'transition-colors',
                ].join(' ')}
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden="true">
                  <path
                    d="M5 5l10 10M15 5l-10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-[var(--storefront-spacing-5)] text-[var(--storefront-typography-body-md-size)] leading-[var(--storefront-typography-body-md-line-height)] text-[var(--storefront-color-surface-foreground)]">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-[var(--storefront-spacing-2)] p-[var(--storefront-spacing-5)] border-t border-[var(--storefront-color-surface-border)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return node;
  return createPortal(node, document.body);
}

// ── Optional compound slots for advanced layouts ─────────────────────────────
export interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ModalHeader({ className = '', children, ...rest }: ModalSectionProps) {
  return (
    <div
      className={[
        'flex items-start justify-between gap-[var(--storefront-spacing-3)] p-[var(--storefront-spacing-5)] border-b border-[var(--storefront-color-surface-border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ModalBody({ className = '', children, ...rest }: ModalSectionProps) {
  return (
    <div
      className={[
        'flex-1 overflow-y-auto p-[var(--storefront-spacing-5)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ className = '', children, ...rest }: ModalSectionProps) {
  return (
    <div
      className={[
        'flex flex-wrap items-center justify-end gap-[var(--storefront-spacing-2)] p-[var(--storefront-spacing-5)] border-t border-[var(--storefront-color-surface-border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
