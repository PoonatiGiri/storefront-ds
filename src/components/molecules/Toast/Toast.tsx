import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPlacement =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastProps {
  /** Variant — controls icon + color accent */
  variant?: ToastVariant;
  /** Title (bolded) */
  title?: ReactNode;
  /** Body text */
  children?: ReactNode;
  /** Inline action shown next to the close button */
  action?: ReactNode;
  /** Close handler — called when X is clicked or auto-dismiss fires */
  onDismiss?: () => void;
  /** Accessible label for the close button */
  dismissLabel?: string;
}

const variantStyles: Record<
  ToastVariant,
  { accent: string; icon: ReactNode; iconColor: string }
> = {
  info: {
    accent: 'border-l-[var(--storefront-color-semantic-info-default)]',
    iconColor: 'text-[var(--storefront-color-semantic-info-default)]',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zm0 3.25a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  success: {
    accent: 'border-l-[var(--storefront-color-semantic-success-default)]',
    iconColor: 'text-[var(--storefront-color-semantic-success-default)]',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.95a.75.75 0 10-1.16-.95l-3.55 4.34-1.5-1.5a.75.75 0 10-1.06 1.06l2.1 2.1a.75.75 0 001.1-.06l4.07-4.99z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    accent: 'border-l-[var(--storefront-color-semantic-warning-default)]',
    iconColor: 'text-[var(--storefront-color-semantic-warning-default)]',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M8.485 2.495a1.75 1.75 0 013.03 0l6.28 10.875A1.75 1.75 0 0116.28 16H3.72a1.75 1.75 0 01-1.515-2.63L8.485 2.495zM10 7a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 7zm0 7a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    accent: 'border-l-[var(--storefront-color-semantic-error-default)]',
    iconColor: 'text-[var(--storefront-color-semantic-error-default)]',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export function Toast({
  variant = 'info',
  title,
  children,
  action,
  onDismiss,
  dismissLabel = 'Close',
}: ToastProps) {
  const s = variantStyles[variant];
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'flex items-start gap-[var(--storefront-spacing-3)]',
        'min-w-[280px] max-w-[400px] p-[var(--storefront-spacing-4)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border border-[var(--storefront-color-surface-border)] border-l-4',
        s.accent,
        'rounded-[var(--storefront-radius-lg)]',
        'shadow-[var(--storefront-shadow-lg)]',
        'pointer-events-auto',
      ].join(' ')}
    >
      <span className={['shrink-0 mt-[2px]', s.iconColor].join(' ')}>{s.icon}</span>
      <div className="flex-1 min-w-0 flex flex-col gap-[var(--storefront-spacing-0-5)]">
        {title && (
          <div className="text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)] font-semibold text-[var(--storefront-color-surface-foreground)]">
            {title}
          </div>
        )}
        {children && (
          <div className="text-[var(--storefront-typography-body-sm-size)] leading-[var(--storefront-typography-body-sm-line-height)] text-[var(--storefront-color-neutral-600)]">
            {children}
          </div>
        )}
        {action && <div className="mt-[var(--storefront-spacing-2)]">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={[
            'shrink-0 inline-flex items-center justify-center size-6 -mr-1 -mt-1',
            'rounded-[var(--storefront-radius-sm)]',
            'text-[var(--storefront-color-neutral-500)]',
            'hover:bg-[var(--storefront-color-neutral-100)] hover:text-[var(--storefront-color-surface-foreground)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
            'transition-colors',
          ].join(' ')}
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

const placementClasses: Record<ToastPlacement, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
};

export interface ToastContainerProps {
  placement?: ToastPlacement;
  children?: ReactNode;
}

export function ToastContainer({ placement = 'top-right', children }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className={[
        'fixed z-[60] flex flex-col gap-[var(--storefront-spacing-2)] pointer-events-none',
        placementClasses[placement],
      ].join(' ')}
    >
      {children}
    </div>
  );
}

// ── Hook / Provider ───────────────────────────────────────────────────────────
type ToastItem = ToastProps & { id: string; duration?: number };
type ToastInput = Omit<ToastItem, 'id' | 'onDismiss'> & { id?: string };

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  placement?: ToastPlacement;
  /** Default auto-dismiss duration in ms. Pass 0 to disable. */
  defaultDuration?: number;
  children: ReactNode;
}

export function ToastProvider({
  placement = 'top-right',
  defaultDuration = 4500,
  children,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput): string => {
      const id = input.id ?? `toast-${Math.random().toString(36).slice(2, 9)}`;
      const duration = input.duration ?? defaultDuration;
      setItems((prev) => [...prev, { ...input, id }]);
      if (duration > 0) {
        const handle = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, handle);
      }
      return id;
    },
    [defaultDuration, dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer placement={placement}>
        {items.map(({ id, ...rest }) => (
          <Toast key={id} {...rest} onDismiss={() => dismiss(id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}
