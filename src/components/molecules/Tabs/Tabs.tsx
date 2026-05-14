import { createContext, forwardRef, useContext, useId, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type TabsVariant = 'line' | 'pill';
export type TabsSize = 'sm' | 'md';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsCtx(component: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled active value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Fires when active tab changes */
  onChange?: (value: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Tab size */
  size?: TabsSize;
  children: ReactNode;
}

export function Tabs({
  value,
  defaultValue,
  onChange,
  variant = 'line',
  size = 'md',
  className = '',
  children,
  ...rest
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const baseId = useId();

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue, variant, size, baseId }}>
      <div className={['w-full', className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ariaLabel?: string;
}

export function TabList({ children, className = '', ariaLabel, ...rest }: TabListProps) {
  const { variant } = useTabsCtx('TabList');
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const buttons = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
    );
    if (buttons.length === 0) return;
    const active = document.activeElement as HTMLElement;
    const idx = buttons.indexOf(active as HTMLButtonElement);
    e.preventDefault();
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % buttons.length;
    if (e.key === 'ArrowLeft') next = (idx - 1 + buttons.length) % buttons.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = buttons.length - 1;
    buttons[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={[
        'flex items-center',
        variant === 'line'
          ? 'gap-[var(--storefront-spacing-1)] border-b border-[var(--storefront-color-surface-border)]'
          : 'gap-[var(--storefront-spacing-1)] p-[var(--storefront-spacing-1)] rounded-[var(--storefront-radius-lg)] bg-[var(--storefront-color-neutral-100)] w-fit',
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

export interface TabProps {
  /** Unique value for this tab — matches a TabPanel */
  value: string;
  /** Disable selection */
  disabled?: boolean;
  /** Optional icon shown before the label */
  iconLeft?: ReactNode;
  /** Optional badge/count shown after the label */
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

const sizeClasses: Record<TabsSize, string> = {
  sm: 'h-8 px-[var(--storefront-spacing-3)] text-[var(--storefront-typography-label-sm-size)] leading-[var(--storefront-typography-label-sm-line-height)]',
  md: 'h-10 px-[var(--storefront-spacing-4)] text-[var(--storefront-typography-label-md-size)] leading-[var(--storefront-typography-label-md-line-height)]',
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, iconLeft, badge, children, className = '' },
  ref,
) {
  const { value: current, setValue, variant, size, baseId } = useTabsCtx('Tab');
  const selected = current === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const base =
    'inline-flex items-center gap-[var(--storefront-spacing-2)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses =
    variant === 'line'
      ? selected
        ? 'text-[var(--storefront-color-brand-primary-default)] border-b-2 border-[var(--storefront-color-brand-primary-default)] -mb-px'
        : 'text-[var(--storefront-color-neutral-600)] border-b-2 border-transparent hover:text-[var(--storefront-color-surface-foreground)]'
      : selected
        ? 'bg-white text-[var(--storefront-color-surface-foreground)] rounded-[var(--storefront-radius-md)] shadow-[var(--storefront-shadow-sm)]'
        : 'text-[var(--storefront-color-neutral-600)] rounded-[var(--storefront-radius-md)] hover:text-[var(--storefront-color-surface-foreground)]';

  return (
    <button
      ref={ref}
      role="tab"
      id={tabId}
      type="button"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
      className={[base, sizeClasses[size], variantClasses, className].filter(Boolean).join(' ')}
    >
      {iconLeft && <span className="inline-flex items-center shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {badge && <span className="inline-flex items-center">{badge}</span>}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children, className = '', ...rest }: TabPanelProps) {
  const { value: current, baseId } = useTabsCtx('TabPanel');
  const selected = current === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!selected) return null;
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={[
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)] rounded-[var(--storefront-radius-sm)]',
        'pt-[var(--storefront-spacing-4)]',
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
