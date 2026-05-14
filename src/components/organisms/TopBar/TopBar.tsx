import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Button } from '../../atoms/Button';
import { SearchBar } from '../../molecules/SearchBar';

export type TopBarVariant = 'default' | 'with-back-button';

export interface TopBarProps {
  /** Layout variant — default shows logo, with-back-button shows a back nav */
  variant?: TopBarVariant;
  /** Page title shown next to the back button (with-back-button only) */
  pageTitle?: string;
  /** App name shown in the logo area (default only) */
  appName?: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** User initials for the avatar */
  userInitials?: string;
  /** Called when the back button is clicked */
  onBack?: () => void;
  /** Called when the notification bell is clicked */
  onNotifications?: () => void;
  /** Notification count badge — shown on the bell when > 0 */
  notificationCount?: number;
  /** Custom right-section content (overrides avatar + bell) */
  rightSlot?: ReactNode;
  className?: string;
}

function BellIcon({ count = 0 }: { count?: number }) {
  return (
    <button
      type="button"
      aria-label={count > 0 ? `${count} notifications` : 'Notifications'}
      className={[
        'relative flex items-center justify-center size-9',
        'rounded-[var(--storefront-radius-lg)]',
        'text-[var(--storefront-color-neutral-400)]',
        'hover:bg-[var(--storefront-color-neutral-100)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--storefront-color-brand-primary-default)]',
        'transition-colors duration-150',
      ].join(' ')}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6zM8.5 16a1.5 1.5 0 003 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span
          className="absolute top-1 right-1 size-[7px] rounded-full bg-[var(--storefront-color-semantic-error-default)]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export function TopBar({
  variant = 'default',
  pageTitle = 'Customers',
  appName = 'Storefront DS',
  searchPlaceholder = 'Search orders…',
  userInitials = 'JD',
  onBack,
  onNotifications: _onNotifications,
  notificationCount = 0,
  rightSlot,
  className = '',
}: TopBarProps) {
  return (
    <header
      className={[
        'flex items-center justify-between',
        'h-16 px-[var(--storefront-spacing-6)]',
        'bg-[var(--storefront-color-surface-background)]',
        'border-b border-[var(--storefront-color-surface-border)]',
        'shadow-[var(--storefront-shadow-sm)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Left section */}
      <div className="flex items-center gap-[var(--storefront-spacing-3)] shrink-0">
        {variant === 'default' ? (
          <div className="flex items-center gap-[var(--storefront-spacing-2)]">
            <span
              className="size-7 rounded-[var(--storefront-radius-md)] bg-[var(--storefront-color-brand-primary-default)] shrink-0"
              aria-hidden="true"
            />
            <span className="text-h6 font-bold text-[var(--storefront-color-surface-foreground)] whitespace-nowrap">
              {appName}
            </span>
          </div>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={onBack} aria-label="Go back">
              ← Back
            </Button>
            <span className="text-h6 font-semibold text-[var(--storefront-color-surface-foreground)]">
              {pageTitle}
            </span>
          </>
        )}
      </div>

      {/* Center section */}
      <div className="flex-1 flex justify-center px-[var(--storefront-spacing-6)]">
        <div style={{ width: 'var(--storefront-width-search-bar)' }}>
          <SearchBar placeholder={searchPlaceholder} />
        </div>
      </div>

      {/* Right section */}
      {rightSlot ?? (
        <div className="flex items-center gap-[var(--storefront-spacing-2)] shrink-0">
          <BellIcon count={notificationCount} />
          <Avatar type="initials" size="sm" initials={userInitials} />
        </div>
      )}
    </header>
  );
}
