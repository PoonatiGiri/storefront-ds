export type AvatarType = 'initials' | 'image';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Display type — initials or photo */
  type?: AvatarType;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Initials to display when type is "initials" (max 2 chars) */
  initials?: string;
  /** Image URL to display when type is "image" */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Shows an online status indicator dot */
  showStatus?: boolean;
  className?: string;
}

type SizeConfig = {
  container: string;
  text: string;
  font: string;
  dot: string;
  bg: string;
};

const sizeConfig: Record<AvatarSize, SizeConfig> = {
  xs: {
    container: 'size-6',
    text: 'text-[10px]',
    font: 'font-medium',
    dot: 'size-[6px] bottom-0 right-0',
    bg: 'bg-[var(--storefront-color-brand-primary-default)]',
  },
  sm: {
    container: 'size-8',
    text: 'text-[12px]',
    font: 'font-medium',
    dot: 'size-[7px] bottom-0 right-0',
    bg: 'bg-[var(--storefront-color-brand-secondary-default)]',
  },
  md: {
    container: 'size-10',
    text: 'text-[16px]',
    font: 'font-semibold',
    dot: 'size-[9px] bottom-0 right-0',
    bg: 'bg-[var(--storefront-color-brand-accent-default)]',
  },
  lg: {
    container: 'size-14',
    text: 'text-[20px]',
    font: 'font-semibold',
    dot: 'size-3 bottom-0 right-0',
    bg: 'bg-[var(--storefront-color-brand-primary-default)]',
  },
};

export function Avatar({
  type = 'initials',
  size = 'md',
  initials = 'JD',
  src,
  alt = '',
  showStatus = false,
  className = '',
}: AvatarProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={[
        'relative inline-flex items-center justify-center shrink-0',
        'rounded-[var(--storefront-radius-full)]',
        'overflow-hidden',
        config.container,
        type === 'initials'
          ? config.bg
          : 'bg-[var(--storefront-color-neutral-200)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {type === 'image' ? (
        src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <span
            className="absolute inset-0 size-full"
            style={{ backgroundColor: 'var(--storefront-color-neutral-300)' }}
            aria-hidden="true"
          />
        )
      ) : (
        <span
          className={[
            'select-none text-white leading-none',
            config.text,
            config.font,
          ].join(' ')}
          aria-label={initials}
        >
          {initials.slice(0, 2).toUpperCase()}
        </span>
      )}

      {showStatus && (
        <span
          className={[
            'absolute rounded-full',
            'ring-2 ring-[var(--storefront-color-surface-background)]',
            'bg-[var(--storefront-color-semantic-success-default)]',
            config.dot,
          ].join(' ')}
          aria-label="Online"
        />
      )}
    </div>
  );
}
