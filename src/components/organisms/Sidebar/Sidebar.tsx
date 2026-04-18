import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';

export type SidebarVariant = 'expanded' | 'collapsed';

export interface NavItem {
  /** Unique key for this nav item */
  key: string;
  /** Display label (hidden in collapsed mode) */
  label: string;
  /** Icon node rendered inside the icon badge */
  icon: ReactNode;
  /** Badge count shown on the right (expanded only) */
  badgeCount?: number;
}

export interface SidebarProps {
  /** Expanded shows labels; collapsed shows icons only */
  variant?: SidebarVariant;
  /** Currently active nav item key */
  activeKey?: string;
  /** Nav items for the main section */
  navItems?: NavItem[];
  /** Nav items for the footer section (Settings, Logout, etc.) */
  footerItems?: NavItem[];
  /** Called when a nav item is clicked */
  onNavClick?: (key: string) => void;
  /** User display name */
  userName?: string;
  /** User role / subtitle */
  userRole?: string;
  /** User avatar initials */
  userInitials?: string;
  className?: string;
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="14" height="2" rx="1" fill="currentColor" />
      <rect x="8" y="2" width="2" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

const DEFAULT_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <PlusIcon /> },
  { key: 'orders', label: 'Orders', icon: <PlusIcon />, badgeCount: 12 },
  { key: 'customers', label: 'Customers', icon: <PlusIcon /> },
  { key: 'products', label: 'Products', icon: <PlusIcon /> },
  { key: 'analytics', label: 'Analytics', icon: <PlusIcon /> },
];

const DEFAULT_FOOTER: NavItem[] = [
  { key: 'settings', label: 'Settings', icon: <PlusIcon /> },
  { key: 'logout', label: 'Logout', icon: <PlusIcon /> },
];

export function Sidebar({
  variant = 'expanded',
  activeKey = 'dashboard',
  navItems = DEFAULT_NAV,
  footerItems = DEFAULT_FOOTER,
  onNavClick,
  userName = 'Alex Morgan',
  userRole = 'Store Admin',
  userInitials = 'AM',
  className = '',
}: SidebarProps) {
  const isCollapsed = variant === 'collapsed';

  return (
    <nav
      aria-label="Main navigation"
      className={[
        'flex flex-col gap-[var(--storefront-spacing-1)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border-r border-[var(--storefront-color-surface-border)]',
        'px-[var(--storefront-spacing-3)] py-[var(--storefront-spacing-4)]',
        'h-full',
        isCollapsed ? 'w-16' : 'w-60',
        'transition-all duration-200',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* User row */}
      <div
        className={[
          'flex items-center pb-[var(--storefront-spacing-2)]',
          isCollapsed ? '' : 'gap-[var(--storefront-spacing-2)]',
        ].join(' ')}
      >
        <Avatar type="initials" size="md" initials={userInitials} className="shrink-0" />
        {!isCollapsed && (
          <div className="flex flex-col gap-[2px] min-w-0">
            <span className="text-label-md font-semibold text-[var(--storefront-color-surface-foreground)] truncate">
              {userName}
            </span>
            <span className="text-label-sm text-[var(--storefront-color-neutral-400)] truncate">
              {userRole}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)] my-[var(--storefront-spacing-1)]" />

      {/* Main nav */}
      <div className="flex flex-col gap-[var(--storefront-spacing-1)] flex-1 pt-[var(--storefront-spacing-3)]">
        {!isCollapsed && (
          <span className="text-[10px] font-semibold tracking-widest text-[var(--storefront-color-neutral-400)] mb-[var(--storefront-spacing-1)] px-[var(--storefront-spacing-3)]">
            MAIN
          </span>
        )}
        {navItems.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavClick?.(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'flex items-center rounded-[var(--storefront-radius-lg)]',
                'h-10 transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
                isCollapsed
                  ? 'justify-center w-10 mx-auto'
                  : 'gap-[var(--storefront-spacing-3)] px-[var(--storefront-spacing-3)] w-full',
                isActive
                  ? 'bg-[color-mix(in_srgb,var(--storefront-color-brand-primary-default)_12%,transparent)] text-[var(--storefront-color-brand-primary-default)]'
                  : 'text-[var(--storefront-color-neutral-400)] hover:bg-[var(--storefront-color-neutral-100)] hover:text-[var(--storefront-color-surface-foreground)]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className={[
                  'flex items-center justify-center rounded-[var(--storefront-radius-sm)] size-[18px] shrink-0',
                  isActive
                    ? 'bg-[var(--storefront-color-brand-primary-default)] text-white'
                    : 'bg-current opacity-60',
                ].join(' ')}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <>
                  <span
                    className={[
                      'text-body-sm flex-1 min-w-0 text-left',
                      isActive ? 'font-semibold' : 'font-normal text-[var(--storefront-color-surface-foreground)]',
                    ].join(' ')}
                  >
                    {item.label}
                  </span>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <Badge type="default" label={String(item.badgeCount)} size="md" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <hr className="border-0 h-px bg-[var(--storefront-color-surface-border)] my-[var(--storefront-spacing-1)]" />

      {/* Footer nav */}
      <div className="flex flex-col gap-[var(--storefront-spacing-1)] pt-[var(--storefront-spacing-2)]">
        {footerItems.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavClick?.(item.key)}
              className={[
                'flex items-center rounded-[var(--storefront-radius-lg)]',
                'h-10 text-[var(--storefront-color-neutral-400)]',
                'hover:bg-[var(--storefront-color-neutral-100)] hover:text-[var(--storefront-color-surface-foreground)]',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
                isCollapsed
                  ? 'justify-center w-10 mx-auto'
                  : 'gap-[var(--storefront-spacing-3)] px-[var(--storefront-spacing-3)] w-full',
                isActive ? 'bg-[var(--storefront-color-neutral-100)]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="flex items-center justify-center bg-current opacity-60 rounded-[var(--storefront-radius-sm)] size-[18px] shrink-0">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-body-sm font-normal text-[var(--storefront-color-surface-foreground)] flex-1 text-left">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
